import { Router } from 'express';
import { DestinationController } from '../controllers/destinationController.js';
import { authenticate, authorize } from '../middleware/auth.js';

export const destinationRoutes = Router();

destinationRoutes.get('/', DestinationController.getAllDestinations);
destinationRoutes.get('/search', DestinationController.searchDestinations);
destinationRoutes.get('/category/:category', DestinationController.getDestinationsByCategory);
destinationRoutes.get('/:id', DestinationController.getDestinationById);
destinationRoutes.post('/', authenticate, authorize('admin'), DestinationController.createDestination);
destinationRoutes.patch('/:id', authenticate, authorize('admin'), DestinationController.updateDestination);
destinationRoutes.delete('/:id', authenticate, authorize('admin'), DestinationController.deleteDestination);
