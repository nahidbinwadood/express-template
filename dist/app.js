"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const router_1 = __importDefault(require("./app/routes/router"));
const sendResponse_1 = __importDefault(require("./app/utils/sendResponse"));
const connectToDB_1 = require("./app/db/connectToDB");
const app = (0, express_1.default)();
// middlewares==>
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// router=>
app.use('/api/v1', router_1.default);
// base route==>
app.get('/', (req, res, next) => {
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Server is running successfully',
    });
});
// health checker==>
app.get('/health', (req, res, next) => {
    const isDbConnected = (0, connectToDB_1.getDbStatus)();
    (0, sendResponse_1.default)(res, {
        success: isDbConnected,
        statusCode: isDbConnected
            ? http_status_codes_1.default.OK
            : http_status_codes_1.default.SERVICE_UNAVAILABLE,
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
app.use(notFound_1.default);
// global error handler==>
app.use(globalErrorHandler_1.default);
exports.default = app;
