import { Request, Response } from 'express';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';

export const recover = catchAsync(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
  });
});

export default recover;
