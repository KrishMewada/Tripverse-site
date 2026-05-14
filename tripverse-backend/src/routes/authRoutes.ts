import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

export const authRoutes = Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);
authRoutes.post('/refresh-token', AuthController.refreshToken);
authRoutes.get('/me', authenticate, AuthController.getCurrentUser);
authRoutes.post('/logout', authenticate, AuthController.logout);
