import { Response } from 'express';
import catchAsync from '../../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sanitizeUser from '../../../utils/sanitize-user';
import { RequestWithUser } from '../../../types';
import * as z from 'zod/v4';
import validateCode from '../../../utils/validate-code';
import { updateUser } from '../../../models/user';

const confirmEmailChangeSchema = z.object({
  code: z.string().min(6).max(6),
});

const confirmEmailChange = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const validation = confirmEmailChangeSchema.safeParse(req.body);

    if (validation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid verification code.',
      });
    }

    const { code } = validation.data;

    const validCode = validateCode(
      code,
      req.user.email_change_code,
      req.user.email_change_code_expires_at
    );

    if (!validCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid verification code.',
      });
    }

    const newEmail = req.user.email_change_new;

    if (!newEmail) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'No pending email change request.',
      });
    }

    const user = await updateUser(req.user.id, {
      email: newEmail,
      email_change_code: null,
      email_change_code_expires_at: null,
      email_change_new: null,
    });

    // TODO: Invalidate active sessions

    const sanitizedUser = sanitizeUser(user);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        user: sanitizedUser,
      },
    });
  }
);

export default confirmEmailChange;
