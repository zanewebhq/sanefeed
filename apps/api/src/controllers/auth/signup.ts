import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { pool } from '../../database';
import catchAsync from '../../utils/catch-async';
import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
};

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
    .status(StatusCodes.CREATED)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({
      status: 'success',
    });
});

export default signup;
