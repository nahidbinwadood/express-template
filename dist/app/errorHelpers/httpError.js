"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(statusCode, message, stack) {
        super(message);
        this.statusCode = statusCode;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.name = this.constructor.name;
    }
}
exports.HttpError = HttpError;
