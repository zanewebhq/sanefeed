import { Request, Response } from 'express';
import crypto from 'crypto';
import { pool } from '../../database';
import catchAsync from '../../utils/catch-async';
import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';

interface User {
  id: number;
  email: string;
  password: string;
  verified: boolean;
  verification_code: string;
  verification_code_expires_at: string;
}

interface RequestWithUser extends Request {
  user: User;
}

const resendVerification = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    if (req.user.verified) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'User is already verified.',
      });
    }

    const verificationCode = crypto
      .randomBytes(3)
      .toString('hex')
      .toUpperCase();
    const verificationCodeExpiresAt = dayjs().add(1, 'hour').toISOString();

    const result = await pool.query(
      'UPDATE users SET verification_code = $1, verification_code_expires_at = $2 WHERE id = $3 RETURNING *',
      [verificationCode, verificationCodeExpiresAt, req.user.id]
    );

    // TODO: Send verification code via email

    const user = result.rows[0];

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        user,
      },
    });
  }
);

export default resendVerification;
