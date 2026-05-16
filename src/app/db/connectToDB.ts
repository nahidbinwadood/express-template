import { connect, connection } from 'mongoose';
import { envVars } from '../config/env';

const DB_URL = envVars.DB_URL;

const connectToDB = async () => {
  try {
    // Connect to DB in background (non-blocking) to speed up restarts
    console.info('🔄 Database connection initiated...');
    await connect(DB_URL);
    console.info('✅ Database connection established successfully');
  } catch (error) {
    console.error('❌ Database connection failed');
    console.log(error);
    process.exit(1);
  }
};

export const getDbStatus = () => {
  return connection.readyState === 1;
};

export default connectToDB;
