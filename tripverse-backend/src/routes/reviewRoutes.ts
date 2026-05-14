import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';

export const reviewRoutes = Router();

reviewRoutes.post('/', authenticate, ReviewController.createReview);
reviewRoutes.get('/user', authenticate, ReviewController.getUserReviews);
reviewRoutes.get('/destination/:destinationId', ReviewController.getDestinationReviews);
reviewRoutes.patch('/:id', authenticate, ReviewController.updateReview);
reviewRoutes.delete('/:id', authenticate, ReviewController.deleteReview);
reviewRoutes.patch('/:id/helpful', authenticate, ReviewController.markHelpful);
