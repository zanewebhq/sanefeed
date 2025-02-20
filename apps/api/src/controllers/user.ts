import { Request, Response } from 'express';
import catchAsync from '../utils/catch-async';

export const protectedRoute = catchAsync(
  async (req: Request, res: Response) => {
    res.json({
      message: 'You have accessed a protected route!',
      user: req.user,
    });
  }
);
