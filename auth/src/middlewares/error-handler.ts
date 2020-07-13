import { Request, Response, NextFunction } from 'express';
// Send back a consistent error message
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.error(err);
  res.status(400).send({
    message: err.message
  });
};
