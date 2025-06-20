import { Request, Response } from 'express';
import catchAsync from '../../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../../../utils/send-email';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { getUserByEmail, updateUser } from '../../../models/user';

export const sendRecovery = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  }

  const recoveryCode = crypto.randomBytes(3).toString('hex').toUpperCase();
  const recoveryCodeExpiresAt = dayjs().add(1, 'hour').toDate();

  const updatedUser = await updateUser(user.id, {
    recovery_code: recoveryCode,
    recovery_code_expires_at: recoveryCodeExpiresAt,
  });

  await sendEmail({
    email,
    subject: 'Password recovery code',
    text: `Your password recovery code is: ${updatedUser.recovery_code}.`,
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
  });
});

export default sendRecovery;
