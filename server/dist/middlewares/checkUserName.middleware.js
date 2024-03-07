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
const admins_service_1 = __importDefault(require("../services/admins.service"));
const adminService = new admins_service_1.default();
const checkUserName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.body.userName;
        const result = yield adminService.getAdminUserName(userName);
        if (!result) {
            res.status(404).json('Your UserName is not exist. Please!');
        }
        else {
            req.user = result;
            next();
        }
    }
    catch (error) {
        res.status(500).json('Error: Check UserName failed');
    }
});
exports.default = checkUserName;
