import { Response } from 'express';
import { Review } from '../models/Review.js';
import { Destination } from '../models/Destination.js';
import { Booking } from '../models/Booking.js';
import { AuthRequest } from '../middleware/auth.js';
import { NotFoundError, ValidationError } from '../utils/AppError.js';

export class ReviewController {
  static async createReview(req: AuthRequest, res: Response) {
    const { destinationId, rating, comment, images } = req.body;

    if (!destinationId || !rating || !comment) {
      throw new ValidationError('Required fields missing');
    }

    // Check if user has booked this destination
    const booking = await Booking.findOne({
      userId: req.userId,
      destinationId,
      status: { $in: ['confirmed', 'completed'] },
    });

    if (!booking) {
      throw new ValidationError('You must have a confirmed booking to leave a review');
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      userId: req.userId,
      destinationId,
    });

    if (existingReview) {
      throw new ValidationError('You have already reviewed this destination');
    }

    const review = new Review({
      userId: req.userId,
      destinationId,
      rating,
      comment,
      images,
      verified: true,
    });

    await review.save();

    // Update destination rating
    const reviews = await Review.find({ destinationId });
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Destination.findByIdAndUpdate(destinationId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review,
    });
  }

  static async getDestinationReviews(req: AuthRequest, res: Response) {
    const { destinationId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ destinationId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments({ destinationId });

    res.status(200).json({
      success: true,
      reviews,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  static async getUserReviews(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ userId: req.userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments({ userId: req.userId });

    res.status(200).json({
      success: true,
      reviews,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  static async updateReview(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { rating, comment, images } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      throw new NotFoundError('Review');
    }

    if (review.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.images = images || review.images;

    await review.save();

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      review,
    });
  }

  static async deleteReview(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      throw new NotFoundError('Review');
    }

    if (review.userId.toString() !== req.userId) {
      throw new ValidationError('Unauthorized access');
    }

    const destinationId = review.destinationId;
    await Review.findByIdAndDelete(id);

    // Update destination rating
    const reviews = await Review.find({ destinationId });
    if (reviews.length > 0) {
      const avgRating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
      await Destination.findByIdAndUpdate(destinationId, {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length,
      });
    } else {
      await Destination.findByIdAndUpdate(destinationId, {
        rating: 0,
        reviewCount: 0,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  }

  static async markHelpful(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(
      id,
      { $inc: { helpful: 1 } },
      { new: true }
    );

    if (!review) {
      throw new NotFoundError('Review');
    }

    res.status(200).json({
      success: true,
      review,
    });
  }
}
