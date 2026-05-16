"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const httpError_1 = require("../errorHelpers/httpError");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    let message = error === null || error === void 0 ? void 0 : error.message;
    if (error instanceof httpError_1.HttpError) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
    }
    (0, sendResponse_1.default)(res, {
        success: false,
        statusCode,
        message,
    });
};
exports.default = globalErrorHandler;
