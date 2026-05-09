import { config } from 'dotenv';
import { HttpError } from '../errorHelpers/httpError';
import httpStatusCode from 'http-status-codes';

interface IEnvItems {
  PORT: string;
  DB_URL: string;
  NODE_ENV: 'development' | 'production';
}

config();

const loadEnv = (): IEnvItems => {
  const requiredVariables: Array<keyof IEnvItems> = [
    'PORT',
    'NODE_ENV',
    'DB_URL',
  ];

  requiredVariables.forEach((key) => {
    // throw error if any environment key is missing==>
    if (!process.env[key]) {
      throw new HttpError(
        httpStatusCode.INTERNAL_SERVER_ERROR,
        `Missing Env variable ${key}`
      );
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
  };
};

const envVars = loadEnv();
export default envVars;
