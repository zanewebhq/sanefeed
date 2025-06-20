import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import catchAsync from '../../../utils/catch-async';
import { pool } from '../../../database';

import { StatusCodes } from 'http-status-codes';
import { User } from '../../../types';
import dayjs from 'dayjs';

export const recover = catchAsync(async (req: Request, res: Response) => {
  const { email, code, password } = req.body;

  const users = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  const user = users.rows.at(0) as User;

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Unable to recover password.',
    });
  }

  const currentTime = dayjs();
  const recoveryCodeExpiresAt = dayjs(user.recovery_code_expires_at);
  const hasExpired = currentTime.isAfter(recoveryCodeExpiresAt);
  const isMatching = code === user.recovery_code;

  if (hasExpired || !isMatching) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Unable to recover password.',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    'UPDATE users SET password = $1, recovery_code = NULL, recovery_code_expires_at = NULL WHERE email = $2 RETURNING *',
    [hashedPassword, user.email]
  );

  res.status(StatusCodes.OK).json({
    status: 'success',
  });
});

export default recover;
