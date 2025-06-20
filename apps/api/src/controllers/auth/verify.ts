import { Response } from 'express';
import catchAsync from '../../utils/catch-async';
import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import sanitizeUser from '../../utils/sanitize-user';
import { RequestWithUser } from '../../types';
import { updateUser } from '../../models/user';

export const verify = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const currentTime = dayjs();
    const verificationCodeExpiresAt = dayjs(
      req.user.verification_code_expires_at
    );
    const hasExpired = currentTime.isAfter(verificationCodeExpiresAt);
    const isMatching = req.body.code === req.user.verification_code;

    if (hasExpired || !isMatching) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        message: 'Invalid verification code.',
      });
    }

    const user = await updateUser(req.user.id, {
      verified: true,
      verification_code: null,
      verification_code_expires_at: null,
    });

    const sanitizedUser = sanitizeUser(user);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        user: sanitizedUser,
      },
    });
  }
);

export default verify;
