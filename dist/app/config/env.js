"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = require("dotenv");
const httpError_1 = require("../errorHelpers/httpError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
(0, dotenv_1.config)();
const loadEnvVariables = () => {
    const requiredVariables = [
        'PORT',
        'NODE_ENV',
        'DB_URL',
    ];
    requiredVariables.forEach((key) => {
        // throw error if any environment key is missing==>
        if (!process.env[key]) {
            throw new httpError_1.HttpError(http_status_codes_1.default.INTERNAL_SERVER_ERROR, `Missing Env variable ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
    };
};
exports.envVars = loadEnvVariables();
