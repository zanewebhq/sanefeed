import { Request, Response } from 'express';
import * as z from 'zod/v4';
import catchAsync from '../../../utils/catch-async';

import { StatusCodes } from 'http-status-codes';
import { getUserByEmail } from '../../../models/user';
import validateCode from '../../../utils/validate-code';

const verifyRecoverySchema = z.object({
  email: z.email(),
  code: z.string().min(6).max(6),
});

export const verifyRecovery = catchAsync(
  async (req: Request, res: Response) => {
    const validation = verifyRecoverySchema.safeParse(req.body);

    if (validation.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid recovery code.',
      });
    }

    const { email, code } = validation.data;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid recovery code.',
      });
    }

    const validCode = validateCode(
      code,
      user.recovery_code,
      user.recovery_code_expires_at,
    );

    if (!validCode) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid recovery code.',
      });
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  },
);

export default verifyRecovery;
