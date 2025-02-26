import { Request, Response } from 'express';
import catchAsync from '../utils/catch-async';

export const me = catchAsync(async (req: Request, res: Response) => {
  res.json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});
