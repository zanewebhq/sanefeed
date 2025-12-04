import { Response } from 'express';
import crypto from 'crypto';
import catchAsync from '../../../utils/catch-async';
import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../../../utils/send-email';
import { RequestWithUser } from '../../../types';
import { updateUser } from '../../../models/user';

const resendVerification = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    if (req.user.verified) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'User is already verified.',
      });
    }

    const verificationCode = crypto
      .randomBytes(3)
      .toString('hex')
      .toUpperCase();
    const verificationCodeExpiresAt = dayjs().add(1, 'hour').toDate();

    const user = await updateUser(req.user.id, {
      verification_code: verificationCode,
      verification_code_expires_at: verificationCodeExpiresAt,
    });

    await sendEmail({
      email: req.user.email,
      subject: 'Verification code',
      text: `Your verification code is: ${verificationCode}.`,
    });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        user,
      },
    });
  },
);

export default resendVerification;
