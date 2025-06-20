import { Request, Response } from 'express';
import catchAsync from '../../../utils/catch-async';

import { StatusCodes } from 'http-status-codes';
import { getUserByEmail } from '../../../models/user';
import validateCode from '../../../utils/validate-code';

export const verifyRecovery = catchAsync(
  async (req: Request, res: Response) => {
    const { email, code } = req.body;

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
      user.recovery_code_expires_at
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
  }
);

export default verifyRecovery;
