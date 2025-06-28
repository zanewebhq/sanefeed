import { Response } from 'express';
import catchAsync from '../../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUser } from '../../../types';
import * as z from 'zod/v4';
import validateCode from '../../../utils/validate-code';
import { deleteUser } from '../../../models/user';

const confirmAccountDeletionSchema = z.object({
  code: z.string().min(6).max(6),
});

const confirmAccountDeletion = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const validation = confirmAccountDeletionSchema.safeParse(req.body);

    if (validation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid verification code.',
      });
    }

    const { code } = validation.data;

    const validCode = validateCode(
      code,
      req.user.deletion_code,
      req.user.deletion_code_expires_at
    );

    if (!validCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid verification code.',
      });
    }

    await deleteUser(req.user.id);

    res
      .status(StatusCodes.OK)
      .clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .json({
        status: 'success',
      });
  }
);

export default confirmAccountDeletion;
