import { Request, Response } from 'express';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';

interface User {
  id: number;
  email: string;
  password: string;
  verified: boolean;
  verification_code: string;
  verification_code_expires_at: string;
}

interface RequestWithUser extends Request {
  user: User;
}

const me = catchAsync(async (req: RequestWithUser, res: Response) => {
  const sanitizedUser = { id: req.user.id, email: req.user.email };

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user: sanitizedUser,
    },
  });
});

export default me;
