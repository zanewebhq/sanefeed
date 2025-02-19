import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../database';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    const payload = { id: result.rows[0].id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);

    res.status(201).json({
      status: 'success',
      data: { token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'An error occurred while signing up',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'Invalid email or password',
      });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        data: null,
        message: 'Invalid email or password',
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({
      status: 'success',
      data: { token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'An error occurred while logging in',
    });
  }
};

