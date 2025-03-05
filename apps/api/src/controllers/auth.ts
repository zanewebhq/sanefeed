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

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
  const verificationCodeExpiresAt = dayjs().add(1, 'hour').toISOString();

  const result = await pool.query(
    'INSERT INTO users (email, password, verification_code, verification_code_expires_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, hashedPassword, verificationCode, verificationCodeExpiresAt]
  );

  const payload = { id: result.rows[0].id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

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

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  if (result.rows.length === 0) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password',
    });
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password',
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
