import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app-error';

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    data: null,
    message: err.message,
  });
};

export default errorHandler;
