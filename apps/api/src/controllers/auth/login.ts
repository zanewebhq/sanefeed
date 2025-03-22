import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../../database';
import catchAsync from '../../utils/catch-async';
import { StatusCodes } from 'http-status-codes';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
};

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await pool.query(
    'SELECT id, email, password FROM users WHERE email = $1',
    [email]
  );
  if (result.rows.length === 0) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message: 'Invalid email or password.',
    });
  }

  const { password: userPassword, ...sanitizedUser } = result.rows[0];
  const isMatch = await bcrypt.compare(password, userPassword);
  if (!isMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message: 'Invalid email or password.',
    });
  }

  const payload = { id: sanitizedUser.id };
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
