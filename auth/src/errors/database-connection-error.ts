import { CustomError } from './custom-error';
export class DatabaseConnectionError extends CustomError {
  // 500 Error for internal service error
  statusCode = 500;
  reason = 'failed to connect to database';
  constructor() {
    super('Failed to connect to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason
      }
    ];
  }
}
