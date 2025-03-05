import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../../database';
import catchAsync from '../../utils/catch-async';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
};

const login = catchAsync(async (req: Request, res: Response) => {
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

export default login;
