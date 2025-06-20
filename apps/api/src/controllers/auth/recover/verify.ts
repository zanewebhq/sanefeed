import { Request, Response } from 'express';
import catchAsync from '../../../utils/catch-async';

import { StatusCodes } from 'http-status-codes';
import dayjs from 'dayjs';
import { getUserByEmail } from '../../../models/user';

export const verifyRecovery = catchAsync(
  async (req: Request, res: Response) => {
    const { email, code } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid recovery code.',
      });
    }

    const currentTime = dayjs();
    const recoveryCodeExpiresAt = dayjs(user.recovery_code_expires_at);
    const hasExpired = currentTime.isAfter(recoveryCodeExpiresAt);
    const isMatching = code === user.recovery_code;

    if (hasExpired || !isMatching) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid recovery code.',
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  }
);

export default verifyRecovery;
