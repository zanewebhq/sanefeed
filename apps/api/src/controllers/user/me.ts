import { Response } from 'express';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sanitizeUser from '../../utils/sanitize-user';
import { RequestWithUser } from '../../types';

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
