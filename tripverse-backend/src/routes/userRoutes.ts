import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

export const userRoutes = Router();

userRoutes.get('/profile', authenticate, UserController.getProfile);
userRoutes.patch('/profile', authenticate, UserController.updateProfile);
userRoutes.patch('/password', authenticate, UserController.changePassword);
userRoutes.delete('/account', authenticate, UserController.deleteAccount);
userRoutes.get('/', authenticate, authorize('admin'), UserController.getAllUsers);
