import { Request, Response } from 'express';
import * as z from 'zod/v4';
import catchAsync from '../../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../../../utils/send-email';
import { getUserByEmail, updateUser } from '../../../models/user';
import generateCode from '../../../utils/generate-code';

const sendRecoverySchema = z.object({
  email: z.email(),
});

export const sendRecovery = catchAsync(async (req: Request, res: Response) => {
  const validation = sendRecoverySchema.safeParse(req.body);

  if (validation.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Invalid email.',
    });
  }

  const { email } = validation.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(StatusCodes.OK).json({
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
