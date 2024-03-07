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
const users_service_1 = __importDefault(require("../services/users.service"));
const multerCloudinary_config_1 = require("../configs/multerCloudinary.config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const checkEmail_middleware_1 = __importDefault(require("../middlewares/checkEmail.middleware"));
const nodeMailer_config_1 = __importDefault(require("../configs/nodeMailer.config"));
const random_js_1 = require("random-js");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const random = new random_js_1.Random();
const userController = express_1.default.Router();
const userService = new users_service_1.default();
userController
    // GetAllUsers
    .get("/", auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userService.getAllUsers();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Get all users failed: SERVER");
    }
}))
    .get('/search', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchValue = String(req.query.search);
        const data = yield userService.searchUsers(searchValue);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Get all users failed: SERVER");
    }
}))
    // RegisterUser
    .post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerForm = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
        yield userService.register(registerForm);
        res.status(201).json("Register user success");
    }
    catch (error) {
        res.status(500).json("Register user failed: SERVER");
    }
}))
    // UpdateStatusUser ADMIN
    .patch("/admin/:id", auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const statusUser = Number(req.body.status);
        console.log(statusUser);
        console.log(id);
        const data = yield userService.changeStatusUser(id, statusUser);
        if (data[0] === 0) {
            res.status(404).json("Not found");
        }
        else {
            res.status(200).json("Updated successfully");
        }
    }
    catch (error) {
        res.status(500).json("Update user failed: SERVER");
    }
}))
    // Login
    .post("/login", checkEmail_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginForm = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = yield userService.login(loginForm);
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
    // Logout
    .get("/logout", auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((error) => {
            if (error) {
                res.send("Error logging out");
            }
            else {
                res.status(200).json("Logout successfully");
            }
        });
    }
    catch (error) {
        res.status(500).json("Logout failed: SERVER");
    }
}))
    // ForgotPassword
    // GetOTP
    .post("/create-otp", checkEmail_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.user;
        req.session.user = userInfo.dataValues;
        const randomNumber = random.integer(10000, 99999);
        const salt = bcryptjs_1.default.genSaltSync(9);
        const hashedOtp = bcryptjs_1.default.hashSync(String(randomNumber), salt);
        yield nodeMailer_config_1.default.sendMail({
            bcc: userInfo.email,
            subject: "OTP Authentication",
            html: `
          <p>OTP: ${randomNumber}</p>
          <p>OTP only lasts for 5 minutes, Tks!</p>
        `
        });
        res.cookie("otp", hashedOtp, {
            expires: new Date(Date.now() + 30000000),
            httpOnly: true,
        });
        res
            .status(201)
            .json({ msg: "OTP has been sent to your email", randomNumber });
    }
    catch (error) {
        res.status(500).json("Create OTP failed: SERVER");
    }
}))
    // ConfirmOTP
    .post("/confirm-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otpCookie = req.cookies.otp;
        console.log(otpCookie);
        const bodyOtp = req.body.otp;
        console.log(bodyOtp);
        const checkOTP = bcryptjs_1.default.compareSync(String(bodyOtp), otpCookie);
        if (checkOTP) {
            res.status(200).json("Confirm OTP successfully");
        }
        else {
            res.status(400).json("Confirm OTP failed");
        }
    }
    catch (error) {
        res.status(500).json("Confirm OTP failed: SERVER");
    }
}))
    // Change password
    .patch("/change-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.session.user;
        const id = user.id;
        const password = String(req.body.password);
        const data = { password: password };
        const result = yield userService.updateUserPassword(id, data);
        if (result[0] === 0) {
            res.status(404).json("Not found");
        }
        else {
            req.session.destroy((error) => {
                if (error) {
                    res.json("Error logging out");
                }
                else {
                    res.status(200).json("Updated successfully");
                }
            });
        }
    }
    catch (error) {
        res.status(500).json("Error updating: SERVER");
    }
}))
    // GetUserById
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const data = yield userService.getUserById(id);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Get user failed: SERVER");
    }
}))
    // UpdateUserInfo
    .patch("/:id", auth_middleware_1.Authorization, multerCloudinary_config_1.uploadAvatar.single("avatar"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const id = Number(req.params.id);
        let updateForm;
        if (file) {
            updateForm = Object.assign(Object.assign({}, req.body), { avatar: file.path });
        }
        else {
            updateForm = Object.assign({}, req.body);
        }
        const data = yield userService.updateUser(id, updateForm);
        if (data[0] === 0) {
            res.status(404).json("Not found");
        }
        else {
            res.status(200).json("Updated successfully");
        }
    }
    catch (error) {
        res.status(500).json("Update user failed: SERVER");
    }
}))
    .get("/history/:id", auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const data = yield userService.getHistoryById(id);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Get history User: SERVER");
    }
}))
    .post("/feedback/:id", auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            userId: Number(req.params.id),
            content: req.body.content,
            emotion: Number(req.body.emotion),
        };
        yield userService.createFeedback(data);
        res.status(201).json("Create Feedback Successfully");
    }
    catch (error) {
        res.status(500).json("Create Feedback: SERVER");
    }
}));
exports.default = userController;
