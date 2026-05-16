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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbStatus = void 0;
const mongoose_1 = require("mongoose");
const env_1 = require("../config/env");
const DB_URL = env_1.envVars.DB_URL;
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to DB in background (non-blocking) to speed up restarts
        console.info('🔄 Database connection initiated...');
        yield (0, mongoose_1.connect)(DB_URL);
        console.info('✅ Database connection established successfully');
    }
    catch (error) {
        console.error('❌ Database connection failed');
        console.log(error);
        process.exit(1);
    }
});
const getDbStatus = () => {
    return mongoose_1.connection.readyState === 1;
};
exports.getDbStatus = getDbStatus;
exports.default = connectToDB;
