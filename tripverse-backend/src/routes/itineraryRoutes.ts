import { Router } from 'express';
import { ItineraryController } from '../controllers/itineraryController.js';
import { authenticate } from '../middleware/auth.js';

export const itineraryRoutes = Router();

itineraryRoutes.post('/', authenticate, ItineraryController.createItinerary);
itineraryRoutes.get('/', authenticate, ItineraryController.getUserItineraries);
itineraryRoutes.get('/public', ItineraryController.getPublicItineraries);
itineraryRoutes.get('/:id', authenticate, ItineraryController.getItineraryById);
itineraryRoutes.patch('/:id', authenticate, ItineraryController.updateItinerary);
itineraryRoutes.delete('/:id', authenticate, ItineraryController.deleteItinerary);
itineraryRoutes.post('/:itineraryId/destinations', authenticate, ItineraryController.addDestinationToItinerary);
