"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, responseData) => {
    const { success, statusCode, message, data, token, meta } = responseData;
    res.status(statusCode).json({
        success,
        statusCode,
        message,
        data,
        token,
        meta,
    });
};
exports.default = sendResponse;
