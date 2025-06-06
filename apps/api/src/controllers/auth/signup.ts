import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { pool } from '../../database';
import catchAsync from '../../utils/catch-async';
import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../../utils/send-email';
import sanitizeUser from '../../utils/sanitize-user';

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

  const user = result.rows.at(0);
  const sanitizedUser = sanitizeUser(user);

  const payload = { id: user.id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  await sendEmail({
    email,
    subject: 'Verification code',
    text: `Your verification code is: ${verificationCode}.`,
  });

  res
    .status(StatusCodes.CREATED)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({
      status: 'success',
      data: {
        user: sanitizedUser,
      },
    });
});

export default signup;
