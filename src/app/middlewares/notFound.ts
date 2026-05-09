import { NextFunction, Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import httpStatusCode from 'http-status-codes';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, {
    success: false,
    statusCode: httpStatusCode.NOT_FOUND,
    message: 'Route not found',
  });
};

export default notFound;
