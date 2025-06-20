import { Request, Response } from 'express';
import catchAsync from '../../../utils/catch-async';

import { StatusCodes } from 'http-status-codes';
import dayjs from 'dayjs';
import { getUserByEmail, updateUser } from '../../../models/user';
import hashPassword from '../../../utils/hash-password';

export const recover = catchAsync(async (req: Request, res: Response) => {
  const { email, code, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Unable to recover password.',
    });
  }

  const currentTime = dayjs();
  const recoveryCodeExpiresAt = dayjs(user.recovery_code_expires_at);
  const hasExpired = currentTime.isAfter(recoveryCodeExpiresAt);
  const isMatching = code === user.recovery_code;

  if (hasExpired || !isMatching) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Unable to recover password.',
    });
  }

  const hashedPassword = await hashPassword(password);

  await updateUser(user.id, {
    password: hashedPassword,
    recovery_code: null,
    recovery_code_expires_at: null,
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
  });
});

export default recover;
