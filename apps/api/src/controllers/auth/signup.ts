import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as z from 'zod/v4';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../../utils/send-email';
import sanitizeUser from '../../utils/sanitize-user';
import { createUser } from '../../models/user';
import hashPassword from '../../utils/hash-password';
import generateCode from '../../utils/generate-code';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
};

const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});

export const signup = catchAsync(async (req: Request, res: Response) => {
  const validation = signupSchema.safeParse(req.body);

  if (validation.error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Invalid email or password.',
    });
  }

  const { email, password } = validation.data;

  const hashedPassword = await hashPassword(password);
  const { code, expiresAt } = generateCode();

  const user = await createUser({
    email,
    password: hashedPassword,
    verification_code: code,
    verification_code_expires_at: expiresAt,
  });

  const sanitizedUser = sanitizeUser(user);

  const payload = { id: user.id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  await sendEmail({
    email,
    subject: 'Verification code',
    text: `Your verification code is: ${code}.`,
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
