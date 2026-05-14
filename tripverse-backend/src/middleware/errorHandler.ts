import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

interface IError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: number;
}

const errorHandler = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;

  // Mongoose duplicate error
  if (error.code === 11000) {
    const field = Object.keys((error as any).keyValue)[0];
    return res.status(409).json({
      success: false,
      error: `${field} already exists`,
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired',
    });
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const messages = Object.values((error as any).errors)
      .map((err: any) => err.message)
      .join(', ');
    return res.status(400).json({
      success: false,
      error: messages,
    });
  }

  // AppError
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
  }

  // Unknown error
  console.error('Unhandled Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};

export default errorHandler;
