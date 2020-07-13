import { RequestValidationError } from './request-validation-error';

export abstract class CustomError extends Error {
  // list out all the properties that must be defined
  // by any class that extends this
  abstract statusCode: number;

  // Need a constructor so we can use the object.setPrototypeOf method to override built-in Error
  constructor(message: string) {
    super(message); // equivalent to calling new Error, this is for server logs
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
