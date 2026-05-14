import { Response } from 'express';
import { Booking } from '../models/Booking.js';
import { Destination } from '../models/Destination.js';
import { AuthRequest } from '../middleware/auth.js';
import { NotFoundError, ValidationError } from '../utils/AppError.js';

export class BookingController {
  static async createBooking(req: AuthRequest, res: Response) {
    const {
      destinationId,
      startDate,
      endDate,
      numberOfPeople,
      passengers,
      specialRequests,
    } = req.body;

    if (!destinationId || !startDate || !endDate || !numberOfPeople) {
      throw new ValidationError('Required fields missing');
    }

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      throw new NotFoundError('Destination');
    }

    const totalPrice = destination.basePrice * numberOfPeople;

    const booking = new Booking({
      userId: req.userId,
      destinationId,
      startDate,
      endDate,
      numberOfPeople,
      totalPrice,
      passengers,
      specialRequests,
      status: 'pending',
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  }

  static async getUserBookings(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find({ userId: req.userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments({ userId: req.userId });

    res.status(200).json({
      success: true,
      bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  static async getBookingById(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      throw new NotFoundError('Booking');
    }

    // Verify ownership
    if (booking.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    res.status(200).json({
      success: true,
      booking,
    });
  }

  static async updateBooking(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { startDate, endDate, numberOfPeople, specialRequests } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      throw new NotFoundError('Booking');
    }

    if (booking.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    if (booking.status !== 'pending') {
      throw new ValidationError('Can only modify pending bookings');
    }

    booking.startDate = startDate || booking.startDate;
    booking.endDate = endDate || booking.endDate;
    booking.numberOfPeople = numberOfPeople || booking.numberOfPeople;
    booking.specialRequests = specialRequests || booking.specialRequests;

    // Recalculate total price
    const destination = await Destination.findById(booking.destinationId);
    if (destination) {
      booking.totalPrice = destination.basePrice * booking.numberOfPeople;
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking,
    });
  }

  static async cancelBooking(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      throw new NotFoundError('Booking');
    }

    if (booking.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    });
  }

  static async getAllBookings(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status as string;

    let filter: any = {};
    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }
}
