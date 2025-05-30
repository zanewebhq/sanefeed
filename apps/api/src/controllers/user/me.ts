import { Request, Response } from 'express';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sanitizeUser from '../../utils/sanitize-user';

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
  const user = req.user;
  const sanitizedUser = sanitizeUser(user);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user: sanitizedUser,
    },
  });
});

export default me;
