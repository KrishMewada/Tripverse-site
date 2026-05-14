import { Response } from 'express';
import Stripe from 'stripe';
import { Payment } from '../models/Payment.js';
import { Booking } from '../models/Booking.js';
import { AuthRequest } from '../middleware/auth.js';
import { NotFoundError, ValidationError } from '../utils/AppError.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export class PaymentController {
  static async createPaymentIntent(req: AuthRequest, res: Response) {
    const { bookingId, amount } = req.body;

    if (!bookingId || !amount) {
      throw new ValidationError('Booking ID and amount are required');
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new NotFoundError('Booking');
    }

    if (booking.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        metadata: {
          bookingId: bookingId.toString(),
          userId: req.userId,
        },
      });

      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      throw new ValidationError('Payment intent creation failed');
    }
  }

  static async confirmPayment(req: AuthRequest, res: Response) {
    const { bookingId, paymentIntentId, transactionId } = req.body;

    if (!bookingId || !paymentIntentId || !transactionId) {
      throw new ValidationError('Required fields missing');
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new NotFoundError('Booking');
    }

    if (booking.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    try {
      // Verify payment with Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (paymentIntent.status !== 'succeeded') {
        throw new ValidationError('Payment not successful');
      }

      // Create payment record
      const payment = new Payment({
        bookingId,
        userId: req.userId,
        amount: booking.totalPrice,
        currency: 'USD',
        paymentMethod: 'stripe',
        transactionId,
        stripePaymentIntentId: paymentIntentId,
        status: 'completed',
      });

      await payment.save();

      // Update booking status
      booking.status = 'confirmed';
      booking.paymentId = payment._id.toString();
      await booking.save();

      res.status(200).json({
        success: true,
        message: 'Payment confirmed successfully',
        payment,
      });
    } catch (error) {
      throw new ValidationError('Payment confirmation failed');
    }
  }

  static async getPaymentHistory(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const payments = await Payment.find({ userId: req.userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Payment.countDocuments({ userId: req.userId });

    res.status(200).json({
      success: true,
      payments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  static async getPaymentById(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      throw new NotFoundError('Payment');
    }

    if (payment.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    res.status(200).json({
      success: true,
      payment,
    });
  }

  static async refundPayment(req: AuthRequest, res: Response) {
    const { paymentId } = req.body;

    if (!paymentId) {
      throw new ValidationError('Payment ID is required');
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      throw new NotFoundError('Payment');
    }

    if (payment.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    try {
      if (payment.stripePaymentIntentId) {
        await stripe.refunds.create({
          payment_intent: payment.stripePaymentIntentId,
        });
      }

      payment.status = 'refunded';
      await payment.save();

      // Update booking status
      await Booking.findByIdAndUpdate(payment.bookingId, {
        status: 'cancelled',
      });

      res.status(200).json({
        success: true,
        message: 'Refund processed successfully',
        payment,
      });
    } catch (error) {
      throw new ValidationError('Refund failed');
    }
  }
}
