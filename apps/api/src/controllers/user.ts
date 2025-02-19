import { Request, Response } from 'express';

export const protectedRoute = (req: Request, res: Response) => {
  res.json({
    message: 'You have accessed a protected route!',
    user: req.user,
  });
};