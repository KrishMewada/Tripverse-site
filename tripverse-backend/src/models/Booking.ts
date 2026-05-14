import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  destinationId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  numberOfPeople: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  passengers: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }[];
  specialRequests?: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    destinationId: {
      type: Schema.Types.ObjectId,
      ref: 'Destination',
      required: [true, 'Destination ID is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    numberOfPeople: {
      type: Number,
      required: [true, 'Number of people is required'],
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    passengers: [
      {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
      },
    ],
    specialRequests: String,
    paymentId: String,
  },
  { timestamps: true }
);

// Populate references
bookingSchema.pre(/^find/, function () {
  this.populate('userId', 'firstName lastName email phone').populate(
    'destinationId',
    'name location basePrice'
  );
});

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
