import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes/router';
import sendResponse from './app/utils/sendResponse';
import httpStatusCode from 'http-status-codes';

const app: Application = express();

// middlewares==>
app.use(express.json());
app.use(cors());

// router=>
app.use('/api/v1', router);

// base route==>
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: 'Server is running successfully',
  });
});

// global error handler==>
app.use(globalErrorHandler);

// not found==>
app.use(notFound);

export default app;
