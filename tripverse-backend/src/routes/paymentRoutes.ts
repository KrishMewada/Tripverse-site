import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

export const paymentRoutes = Router();

paymentRoutes.post('/create-intent', authenticate, PaymentController.createPaymentIntent);
paymentRoutes.post('/confirm', authenticate, PaymentController.confirmPayment);
paymentRoutes.get('/', authenticate, PaymentController.getPaymentHistory);
paymentRoutes.get('/:id', authenticate, PaymentController.getPaymentById);
paymentRoutes.post('/refund', authenticate, PaymentController.refundPayment);
