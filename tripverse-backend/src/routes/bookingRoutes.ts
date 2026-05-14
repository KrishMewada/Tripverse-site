import { Router } from 'express';
import { BookingController } from '../controllers/bookingController.js';
import { authenticate, authorize } from '../middleware/auth.js';

export const bookingRoutes = Router();

bookingRoutes.post('/', authenticate, BookingController.createBooking);
bookingRoutes.get('/', authenticate, BookingController.getUserBookings);
bookingRoutes.get('/all', authenticate, authorize('admin'), BookingController.getAllBookings);
bookingRoutes.get('/:id', authenticate, BookingController.getBookingById);
bookingRoutes.patch('/:id', authenticate, BookingController.updateBooking);
bookingRoutes.delete('/:id', authenticate, BookingController.cancelBooking);
