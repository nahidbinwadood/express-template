"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const connectToDB_1 = __importDefault(require("./app/db/connectToDB"));
const env_1 = require("./app/config/env");
const server = (0, http_1.createServer)(app_1.default);
const PORT = env_1.envVars.PORT;
const NODE_ENV = env_1.envVars.NODE_ENV;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectToDB_1.default)();
        server.listen(PORT, () => {
            console.info(`🚀 Server started successfully`);
            console.info(`📡 Listening on port: ${PORT}`);
            console.info(`🌍 Environment: ${NODE_ENV}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start the server');
        console.error(error);
        process.exit(1);
    }
});
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
    console.log('Unhandled rejection signal received...Server is shutting down', err);
    if (server) {
        server.close();
        process.exit(1);
    }
    process.exit(1);
});
// Uncaught Exection==>
process.on('uncaughtException', (err) => {
    console.log('Uncaught excetpion signal received...Server is shutting down', err);
    if (server) {
        server.close();
        process.exit(1);
    }
    process.exit(1);
});
