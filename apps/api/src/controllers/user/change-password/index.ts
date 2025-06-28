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
import hashPassword from '../../../utils/hash-password';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(128),
  newPassword: z.string().min(8).max(128),
});

const changePassword = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const validation = changePasswordSchema.safeParse(req.body);

    if (validation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid current or new password.',
      });
    }

    const { currentPassword, newPassword } = validation.data;

    const match = await comparePassword(currentPassword, req.user.password);

    if (!match) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid current password.',
      });
    }

    const { code, expiresAt } = generateCode();
    const hashedNewPassword = await hashPassword(newPassword);

    const user = await updateUser(req.user.id, {
      password_change_code: code,
      password_change_code_expires_at: expiresAt,
      password_change_new: hashedNewPassword,
    });

    await sendEmail({
      email: req.user.email,
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
  }
);

export default changePassword;
