import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  description: string;
  category: string;
  location: {
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
  images: string[];
  highlights: string[];
  bestTimeToVisit: string[];
  basePrice: number;
  rating: number;
  reviewCount: number;
  duration: number;
  includedServices: string[];
  excludedServices: string[];
  availability: {
    startDate: Date;
    endDate: Date;
    slots: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const destinationSchema = new Schema<IDestination>(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['beach', 'mountain', 'city', 'adventure', 'cultural', 'luxury'],
    },
    location: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    images: [String],
    highlights: [String],
    bestTimeToVisit: [String],
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: [true, 'Duration in days is required'],
      min: 1,
    },
    includedServices: [String],
    excludedServices: [String],
    availability: {
      startDate: Date,
      endDate: Date,
      slots: { type: Number, min: 0 },
    },
  },
  { timestamps: true }
);

export const Destination = mongoose.model<IDestination>(
  'Destination',
  destinationSchema
);
