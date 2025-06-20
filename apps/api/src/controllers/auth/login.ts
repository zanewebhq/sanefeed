import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';
import sanitizeUser from '../../utils/sanitize-user';
import { getUserByEmail } from '../../models/user';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
};

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message: 'Invalid email or password.',
    });
  }

  const sanitizedUser = sanitizeUser(user);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message: 'Invalid email or password.',
    });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);

  res
    .status(StatusCodes.OK)
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

export default login;
