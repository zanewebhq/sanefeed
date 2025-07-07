import { Request, Response } from 'express';
import catchAsync from '../../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../../../utils/send-email';
import { getUserByEmail, updateUser } from '../../../models/user';
import generateCode from '../../../utils/generate-code';

export const sendRecovery = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  }

  const { code, expiresAt } = generateCode();

  await updateUser(user.id, {
    recovery_code: code,
    recovery_code_expires_at: expiresAt,
  });

  await sendEmail({
    email,
    subject: 'Password recovery code',
    text: `Your password recovery code is: ${code}.`,
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
  });
});

export default sendRecovery;
