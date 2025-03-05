import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { pool } from '../database';
import catchAsync from '../utils/catch-async';
import dayjs from 'dayjs';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
};

interface User {
  id: number;
  email: string;
  password: string;
  verification_code: string;
  verification_code_expires_at: string;
}

interface RequestWithUser extends Request {
  user: User;
}

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // TODO: Validate email and password

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
  const verificationCodeExpiresAt = dayjs().add(1, 'hour').toISOString();

  const result = await pool.query(
    'INSERT INTO users (email, password, verification_code, verification_code_expires_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, hashedPassword, verificationCode, verificationCodeExpiresAt]
  );

  const payload = { id: result.rows[0].id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  // TODO: Send verification code via email

  res
    .status(201)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({
      status: 'success',
    });
});

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

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  if (result.rows.length === 0) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password.',
    });
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password.',
    });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  res
    .status(200)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({
      status: 'success',
    });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({
      status: 'success',
    });
});
