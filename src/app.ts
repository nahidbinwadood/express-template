import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes/router';
import sendResponse from './app/utils/sendResponse';
import { getDbStatus } from './app/db/connectToDB';

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

// health checker==>
app.get('/health', (req: Request, res: Response, next: NextFunction) => {
  const isDbConnected = getDbStatus();

  sendResponse(res, {
    success: isDbConnected,
    statusCode: isDbConnected
      ? httpStatusCode.OK
      : httpStatusCode.SERVICE_UNAVAILABLE,
    message: isDbConnected
      ? 'Server is healthy and database is connected'
      : 'Server is running but database connection failed',
    data: {
      server: 'running',
      database: isDbConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    },
  });
});

// not found==>
app.use(notFound);

// global error handler==>
app.use(globalErrorHandler);

export default app;
