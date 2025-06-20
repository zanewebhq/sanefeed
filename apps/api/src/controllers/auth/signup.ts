import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import catchAsync from '../../utils/catch-async';
import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../../utils/send-email';
import sanitizeUser from '../../utils/sanitize-user';
import { createUser } from '../../models/user';
import hashPassword from '../../utils/hash-password';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
};

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await hashPassword(password);
  const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
  const verificationCodeExpiresAt = dayjs().add(1, 'hour').toDate();

  const user = await createUser({
    email,
    password: hashedPassword,
    verification_code: verificationCode,
    verification_code_expires_at: verificationCodeExpiresAt,
  });

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
