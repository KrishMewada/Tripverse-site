import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, expiresIn?: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: expiresIn || process.env.JWT_EXPIRE || '7d',
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch (error) {
    throw error;
  }
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};
