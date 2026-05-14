import { Response } from 'express';
import { User } from '../models/User.js';
import { AuthRequest } from '../middleware/auth.js';
import { NotFoundError, ValidationError } from '../utils/AppError.js';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    const user = await User.findById(req.userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    res.status(200).json({
      success: true,
      user,
    });
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    const { firstName, lastName, phone, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, phone, profileImage },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError('User');
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  }

  static async changePassword(req: AuthRequest, res: Response) {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new ValidationError('All fields are required');
    }

    if (newPassword !== confirmPassword) {
      throw new ValidationError('Passwords do not match');
    }

    if (newPassword.length < 6) {
      throw new ValidationError('Password must be at least 6 characters');
    }

    const user = await User.findById(req.userId).select('+password');

    if (!user) {
      throw new NotFoundError('User');
    }

    const isPasswordMatch = await user.comparePassword(currentPassword);
    if (!isPasswordMatch) {
      throw new ValidationError('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  }

  static async deleteAccount(req: AuthRequest, res: Response) {
    const user = await User.findByIdAndDelete(req.userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  }

  static async getAllUsers(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password -resetPasswordToken -resetPasswordExpires')
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }
}
