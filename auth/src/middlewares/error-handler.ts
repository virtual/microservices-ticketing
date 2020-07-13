import e, { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

// Send back a consistent error message
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Middleware checks for type of error
  // { errors: { message: string, field?: string }[] }
  // 400 means Bad Request, usually meaning the user sent bad data
  if (err instanceof RequestValidationError) {
    console.log('RequestValidationError');
    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    return res.status(400).send({ errors: formattedErrors });
  }
  // 500 Error for internal service error
  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({
      errors: [
        {
          message: err.reason
        }
      ]
    });
  }

  res.status(400).send({
    message: err.message
  });
};
