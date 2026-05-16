"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/', user_controller_1.UserController.getAllUser);
exports.default = userRoutes;
