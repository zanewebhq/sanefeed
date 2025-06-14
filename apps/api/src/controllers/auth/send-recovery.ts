import { Request, Response } from 'express';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../database';
import sendEmail from '../../utils/send-email';
import crypto from 'crypto';
import dayjs from 'dayjs';

export const sendRecovery = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const findResult = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  const user = findResult.rows.at(0);

  if (!user) {
    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  }

  const recoveryCode = crypto.randomBytes(3).toString('hex').toUpperCase();
  const recoveryCodeExpiresAt = dayjs().add(1, 'hour').toISOString();

  const updateResult = await pool.query(
    'UPDATE users SET recovery_code = $1, recovery_code_expires_at = $2 WHERE id = $3 RETURNING *',
    [recoveryCode, recoveryCodeExpiresAt, user.id]
  );

  const updatedUser = updateResult.rows.at(0);

  await sendEmail({
    email,
    subject: 'Password recovery code',
    text: `Your password recovery code is: ${updatedUser.recovery_code}.`,
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
  });
});

export default sendRecovery;
