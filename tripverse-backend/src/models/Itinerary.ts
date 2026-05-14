import mongoose, { Schema, Document } from 'mongoose';

export interface IItinerary extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  destinations: {
    destinationId: mongoose.Types.ObjectId;
    order: number;
    startDate: Date;
    endDate: Date;
    notes?: string;
  }[];
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const itinerarySchema = new Schema<IItinerary>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: String,
    destinations: [
      {
        destinationId: {
          type: Schema.Types.ObjectId,
          ref: 'Destination',
        },
        order: Number,
        startDate: Date,
        endDate: Date,
        notes: String,
      },
    ],
    startDate: Date,
    endDate: Date,
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Populate references
itinerarySchema.pre(/^find/, function () {
  this.populate('userId', 'firstName lastName').populate(
    'destinations.destinationId',
    'name location'
  );
});

export const Itinerary = mongoose.model<IItinerary>(
  'Itinerary',
  itinerarySchema
);
