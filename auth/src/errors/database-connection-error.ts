export class DatabaseConnectionError extends Error {
  reason = 'failed to connect to database';
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
