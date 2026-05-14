import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { ValidationError, ConflictError, AuthenticationError } from '../utils/AppError.js';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      throw new ValidationError('All fields are required');
    }

    if (password !== confirmPassword) {
      throw new ValidationError('Passwords do not match');
    }

    if (password.length < 6) {
      throw new ValidationError('Password must be at least 6 characters');
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  }

  static async getCurrentUser(req: any, res: Response) {
    const user = await User.findById(req.userId);

    res.status(200).json({
      success: true,
      user,
    });
  }

  static async logout(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }

  static async refreshToken(req: Request, res: Response) {
    const { token } = req.body;

    if (!token) {
      throw new ValidationError('Token is required');
    }

    try {
      const decoded: any = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const newToken = generateToken(decoded.userId);

      res.status(200).json({
        success: true,
        token: newToken,
      });
    } catch (error) {
      throw new AuthenticationError('Invalid token');
    }
  }
}
