export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string, stack?: any) {
    super(message);
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = this.constructor.name;
  }
}
