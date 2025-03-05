import { Request, Response } from 'express';
import { pool } from '../../database';
import catchAsync from '../../utils/catch-async';
import dayjs from 'dayjs';

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

export const verify = catchAsync(
  async (req: RequestWithUser, res: Response) => {
    const currentTime = dayjs();
    const verificationCodeExpiresAt = dayjs(
      req.user.verification_code_expires_at
    );
    const hasExpired = currentTime.isAfter(verificationCodeExpiresAt);
    const isMatching = req.body.code === req.user.verification_code;

    if (hasExpired || !isMatching) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid verification code.',
      });
    }

    const result = await pool.query(
      'UPDATE users SET verified = true, verification_code = NULL, verification_code_expires_at = NULL WHERE id = $1 RETURNING *',
      [req.user.id]
    );

    const user = result.rows[0];

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }
);

export default verify;
