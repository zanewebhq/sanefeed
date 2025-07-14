import { Response } from 'express';
import catchAsync from '../../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sanitizeUser from '../../../utils/sanitize-user';
import { RequestWithUser } from '../../../types';
import * as z from 'zod/v4';
import validateCode from '../../../utils/validate-code';
import { updateUser } from '../../../models/user';

const confirmPasswordChangeSchema = z.object({
  code: z.string().min(6).max(6),
});

const confirmPasswordChange = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const validation = confirmPasswordChangeSchema.safeParse(req.body);

    if (validation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid verification code.',
      });
    }

    const { code } = validation.data;

    const validCode = validateCode(
      code,
      req.user.password_change_code,
      req.user.password_change_code_expires_at,
    );

    if (!validCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid verification code.',
      });
    }

    const newPassword = req.user.password_change_new;

    if (!newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'No pending email change request.',
      });
    }

    const user = await updateUser(req.user.id, {
      password: newPassword,
      password_change_code: null,
      password_change_code_expires_at: null,
      password_change_new: null,
    });

    // TODO: Invalidate active sessions

    const sanitizedUser = sanitizeUser(user);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        user: sanitizedUser,
      },
    });
  },
);

export default confirmPasswordChange;
