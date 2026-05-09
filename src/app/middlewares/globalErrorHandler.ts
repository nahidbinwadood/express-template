import { NextFunction, Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
import { HttpError } from '../errorHelpers/httpError';
import sendResponse from '../utils/sendResponse';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatusCode.INTERNAL_SERVER_ERROR;
  let message = error?.message;

  if (error instanceof HttpError) {
    statusCode = error?.statusCode;
    message = error?.message;
  }
  sendResponse(res, {
    success: false,
    statusCode,
    message,
  });
};

export default globalErrorHandler;
