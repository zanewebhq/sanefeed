import { Request, Response } from 'express';
import catchAsync from '../../../utils/catch-async';
import { pool } from '../../../database';

import { StatusCodes } from 'http-status-codes';

export const recover = catchAsync(async (req: Request, res: Response) => {
  const { email, code, password } = req.body;

  const users = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  const user = users.rows.at(0);

  console.log(user);

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'User is already verified.',
    });
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
  });
});

export default recover;
