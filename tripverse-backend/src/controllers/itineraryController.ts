import { Response } from 'express';
import { Itinerary } from '../models/Itinerary.js';
import { AuthRequest } from '../middleware/auth.js';
import { NotFoundError, ValidationError } from '../utils/AppError.js';

export class ItineraryController {
  static async createItinerary(req: AuthRequest, res: Response) {
    const { title, description, destinations, startDate, endDate, isPublic } =
      req.body;

    if (!title) {
      throw new ValidationError('Title is required');
    }

    const itinerary = new Itinerary({
      userId: req.userId,
      title,
      description,
      destinations,
      startDate,
      endDate,
      isPublic: isPublic || false,
    });

    await itinerary.save();

    res.status(201).json({
      success: true,
      message: 'Itinerary created successfully',
      itinerary,
    });
  }

  static async getUserItineraries(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const itineraries = await Itinerary.find({ userId: req.userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Itinerary.countDocuments({ userId: req.userId });

    res.status(200).json({
      success: true,
      itineraries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  static async getItineraryById(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      throw new NotFoundError('Itinerary');
    }

    // Check if public or owned by user
    if (
      !itinerary.isPublic &&
      itinerary.userId.toString() !== req.userId
    ) {
      throw new ValidationError('Unauthorized access');
    }

    res.status(200).json({
      success: true,
      itinerary,
    });
  }

  static async updateItinerary(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { title, description, destinations, startDate, endDate, isPublic } =
      req.body;

    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      throw new NotFoundError('Itinerary');
    }

    if (itinerary.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    itinerary.title = title || itinerary.title;
    itinerary.description = description || itinerary.description;
    itinerary.destinations = destinations || itinerary.destinations;
    itinerary.startDate = startDate || itinerary.startDate;
    itinerary.endDate = endDate || itinerary.endDate;
    itinerary.isPublic = isPublic !== undefined ? isPublic : itinerary.isPublic;

    await itinerary.save();

    res.status(200).json({
      success: true,
      message: 'Itinerary updated successfully',
      itinerary,
    });
  }

  static async deleteItinerary(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const itinerary = await Itinerary.findById(id);

    if (!itinerary) {
      throw new NotFoundError('Itinerary');
    }

    if (itinerary.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    await Itinerary.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Itinerary deleted successfully',
    });
  }

  static async getPublicItineraries(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const itineraries = await Itinerary.find({ isPublic: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Itinerary.countDocuments({ isPublic: true });

    res.status(200).json({
      success: true,
      itineraries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  static async addDestinationToItinerary(req: AuthRequest, res: Response) {
    const { itineraryId } = req.params;
    const { destinationId, order, startDate, endDate, notes } = req.body;

    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      throw new NotFoundError('Itinerary');
    }

    if (itinerary.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    itinerary.destinations.push({
      destinationId,
      order,
      startDate,
      endDate,
      notes,
    });

    await itinerary.save();

    res.status(200).json({
      success: true,
      message: 'Destination added to itinerary',
      itinerary,
    });
  }
}
