import { createServer, Server } from 'http';
import app from './app';
import connectToDB from './app/db/connectToDB';
import { envVars } from './app/config/env';

const server: Server = createServer(app);

const PORT = envVars.PORT;
const NODE_ENV = envVars.NODE_ENV;

const startServer = async () => {
  try {
    await connectToDB();

    server.listen(PORT, () => {
      console.info(`🚀 Server started successfully`);
      console.info(`📡 Listening on port: ${PORT}`);
      console.info(`🌍 Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server');
    console.error(error);
    process.exit(1);
  }
};

startServer();

// SIGTERM==>
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received...Server is shutting down');
  if (server) {
    server.close();
    process.exit(1);
  }
  process.exit(1);
});

// SIGINT==>
process.on('SIGINT', () => {
  console.log('SIGINT signal received...Server is shutting down');
  if (server) {
    server.close();
    process.exit(1);
  }
  process.exit(1);
});

// Unhandled Rejection==>
process.on('unhandledRejection', (err) => {
  console.log(
    'Unhandled rejection signal received...Server is shutting down',
    err
  );
  if (server) {
    server.close();
    process.exit(1);
  }
  process.exit(1);
});

// Uncaught Exection==>
process.on('uncaughtException', (err) => {
  console.log(
    'Uncaught excetpion signal received...Server is shutting down',
    err
  );

  if (server) {
    server.close();
    process.exit(1);
  }

  process.exit(1);
});
