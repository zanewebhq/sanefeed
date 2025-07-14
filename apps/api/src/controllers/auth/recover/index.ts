import { Request, Response } from 'express';
import * as z from 'zod/v4';
import catchAsync from '../../../utils/catch-async';

import { StatusCodes } from 'http-status-codes';
import { getUserByEmail, updateUser } from '../../../models/user';
import hashPassword from '../../../utils/hash-password';
import validateCode from '../../../utils/validate-code';

const recoverSchema = z.object({
  email: z.email(),
  code: z.string().min(6).max(6),
  password: z.string().min(8).max(128),
});

export const recover = catchAsync(async (req: Request, res: Response) => {
  const validation = recoverSchema.safeParse(req.body);

  if (validation.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Invalid recovery code.',
    });
  }

  const { email, code, password } = validation.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Unable to recover password.',
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
      message: 'Unable to recover password.',
    });
  }

  const hashedPassword = await hashPassword(password);

  await updateUser(user.id, {
    password: hashedPassword,
    recovery_code: null,
    recovery_code_expires_at: null,
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
  });
});

export default recover;
