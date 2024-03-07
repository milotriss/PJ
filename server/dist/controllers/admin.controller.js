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
const express_1 = __importDefault(require("express"));
const admins_service_1 = __importDefault(require("../services/admins.service"));
const checkUserName_middleware_1 = __importDefault(require("../middlewares/checkUserName.middleware"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const adminController = express_1.default.Router();
const adminService = new admins_service_1.default();
adminController
    // Login
    .post("/login", checkUserName_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginForm = {
            userName: req.body.userName,
            password: req.body.password,
        };
        const result = yield adminService.login(loginForm);
        if (result === 1) {
            res.status(400).json("Password incorrect");
        }
        else {
            res.status(200).json({ mgs: "login success", data: result });
        }
    }
    catch (error) {
        res.status(500).json("Login failed: server");
    }
}))
    // Create Admin
    .post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerForm = {
            fullName: req.body.fullName,
            userName: req.body.userName,
            password: req.body.password,
        };
        yield adminService.createAdmin(registerForm);
        res.status(201).json("Register user success");
    }
    catch (error) {
        res.status(500).json("Register user failed: SERVER");
    }
}))
    .get('/', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield adminService.getAllAdmins();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json("Get All admins: SERVER");
    }
}))
    .delete('/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield adminService.deleteAdmin(id);
        res.status(204).json("Delete Admin Success");
    }
    catch (error) {
        res.status(500).json("Delete Admin: SERVER");
    }
}));
exports.default = adminController;
