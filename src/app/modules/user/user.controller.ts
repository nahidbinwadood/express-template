import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatusCode from 'http-status-codes';
import { UserServices } from './user.service';

// get all user==>
const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await UserServices.getAllUser();
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Users data fetched successfully',
      data: response,
    });
  }
);

export const UserController = {
  getAllUser,
};
