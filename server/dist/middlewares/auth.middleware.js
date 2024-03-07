"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Authorization = (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        console.log(authorization);
        if (!authorization) {
            return res.status(401).json('Invalid authorization');
        }
        const tokenString = authorization.split(' ');
        if (tokenString.length !== 2 || tokenString[0] !== 'Bearer') {
            return res.status(401).json('Invalid authorization');
        }
        const token = tokenString[1];
        jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), (err, user) => {
            if (err) {
                return res.status(401).json('Invalid authorization');
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(500).json('Request failed');
    }
};
exports.Authorization = Authorization;
