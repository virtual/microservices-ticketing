import e, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

// Send back a consistent error message
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Middleware checks for type of error
  // { errors: { message: string, field?: string }[] }
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    message: err.message
  });
};
