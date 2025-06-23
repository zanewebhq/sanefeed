import { Response } from 'express';
import catchAsync from '../../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sanitizeUser from '../../../utils/sanitize-user';
import { RequestWithUser } from '../../../types';
import * as z from 'zod/v4';
import comparePassword from '../../../utils/compare-password';
import { updateUser } from '../../../models/user';
import generateCode from '../../../utils/generate-code';
import sendEmail from '../../../utils/send-email';

const changeEmailSchema = z.object({
  password: z.string().min(8).max(128),
  newEmail: z.email(),
});

const changeEmail = catchAsync(async (req: RequestWithUser, res: Response) => {
  const validation = changeEmailSchema.safeParse(req.body);

  if (validation.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Invalid password or new email address.',
    });
  }

  const { password, newEmail } = validation.data;

  const match = await comparePassword(password, req.user.password);

  if (!match) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Invalid password.',
    });
  }

  const { code, expiresAt } = generateCode();

  const user = await updateUser(req.user.id, {
    email_change_code: code,
    email_change_code_expires_at: expiresAt,
    email_change_new: newEmail,
  });

  await sendEmail({
    email: newEmail,
    subject: 'Verification code',
    text: `Your verification code is: ${code}.`,
  });

  const sanitizedUser = sanitizeUser(user);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user: sanitizedUser,
    },
  });
});

export default changeEmail;
