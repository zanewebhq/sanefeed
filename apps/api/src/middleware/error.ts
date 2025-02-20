import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app-error';

interface AppDatabaseError extends AppError {
  code: string;
}

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const handleDatabaseError = (err: AppDatabaseError) => {
  switch (err.code) {
    case '23505':
      return new AppError('Duplicate field value entered', 400);
    case '23503':
      return new AppError('Foreign key violation', 400);
    case '23502':
      return new AppError('Not null violation', 400);
    default:
      return err;
  }
};

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  let error = { ...err, statusCode, status, message: err.message };

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    error = handleDatabaseError(error as AppDatabaseError);

    sendErrorProd(error, res);
  }
};

export default errorHandler;
