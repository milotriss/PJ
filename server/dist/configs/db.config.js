"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(String(process.env.DB_NAME), String(process.env.DB_USER), String(process.env.DB_PASS), {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
exports.default = sequelize;
