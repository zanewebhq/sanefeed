import { Request, Response } from 'express';

import catchAsync from '../../utils/catch-async';

const logout = catchAsync(async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({
      status: 'success',
    });
});

export default logout;
