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

const deleteAccountSchema = z.object({
  password: z.string().min(8).max(128),
});

const deleteAccount = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const validation = deleteAccountSchema.safeParse(req.body);

    if (validation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid password.',
      });
    }

    const { password } = validation.data;

    const match = await comparePassword(password, req.user.password);

    if (!match) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid password.',
      });
    }

    const { code, expiresAt } = generateCode();

    const user = await updateUser(req.user.id, {
      deletion_code: code,
      deletion_code_expires_at: expiresAt,
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
  },
);

export default deleteAccount;
