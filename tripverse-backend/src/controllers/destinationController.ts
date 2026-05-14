import { Request, Response } from 'express';
import { Destination } from '../models/Destination.js';
import { NotFoundError, ValidationError } from '../utils/AppError.js';

export class DestinationController {
  static async getAllDestinations(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const category = req.query.category as string;
    const search = req.query.search as string;
    const skip = (page - 1) * limit;

    let filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.country': { $regex: search, $options: 'i' } },
      ];
    }

    const destinations = await Destination.find(filter)
      .skip(skip)
      .limit(limit);

    const total = await Destination.countDocuments(filter);

    res.status(200).json({
      success: true,
      destinations,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  static async getDestinationById(req: Request, res: Response) {
    const { id } = req.params;

    const destination = await Destination.findById(id);

    if (!destination) {
      throw new NotFoundError('Destination');
    }

    res.status(200).json({
      success: true,
      destination,
    });
  }

  static async createDestination(req: Request, res: Response) {
    const {
      name,
      description,
      category,
      location,
      images,
      highlights,
      bestTimeToVisit,
      basePrice,
      duration,
      includedServices,
      excludedServices,
      availability,
    } = req.body;

    if (!name || !description || !category || !basePrice || !duration) {
      throw new ValidationError('Required fields missing');
    }

    const destination = new Destination({
      name,
      description,
      category,
      location,
      images,
      highlights,
      bestTimeToVisit,
      basePrice,
      duration,
      includedServices,
      excludedServices,
      availability,
    });

    await destination.save();

    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      destination,
    });
  }

  static async updateDestination(req: Request, res: Response) {
    const { id } = req.params;

    const destination = await Destination.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!destination) {
      throw new NotFoundError('Destination');
    }

    res.status(200).json({
      success: true,
      message: 'Destination updated successfully',
      destination,
    });
  }

  static async deleteDestination(req: Request, res: Response) {
    const { id } = req.params;

    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
      throw new NotFoundError('Destination');
    }

    res.status(200).json({
      success: true,
      message: 'Destination deleted successfully',
    });
  }

  static async getDestinationsByCategory(req: Request, res: Response) {
    const { category } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const destinations = await Destination.find({ category })
      .skip(skip)
      .limit(limit);

    const total = await Destination.countDocuments({ category });

    res.status(200).json({
      success: true,
      destinations,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  static async searchDestinations(req: Request, res: Response) {
    const { query } = req.query;

    if (!query) {
      throw new ValidationError('Search query is required');
    }

    const destinations = await Destination.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'location.city': { $regex: query, $options: 'i' } },
        { 'location.country': { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({
      success: true,
      destinations,
    });
  }
}
