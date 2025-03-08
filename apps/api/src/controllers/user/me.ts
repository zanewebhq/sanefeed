import { Request, Response } from 'express';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';

const me = catchAsync(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

export default me;
