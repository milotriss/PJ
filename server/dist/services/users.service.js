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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_repository_1 = __importDefault(require("../repositories/users.repository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const payment_repository_1 = __importDefault(require("../repositories/payment.repository"));
const feedback_repository_1 = __importDefault(require("../repositories/feedback.repository"));
dotenv_1.default.config();
class UserService {
    constructor() {
        this._userRepository = new users_repository_1.default();
        this._paymentRepository = new payment_repository_1.default();
        this._feedbackRepository = new feedback_repository_1.default();
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.getAllUsers();
        });
    }
    getUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.getUserEmail(email);
        });
    }
    searchUsers(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.searchUsers(searchValue);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.getUserById(id);
        });
    }
    register(registerForm) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcryptjs_1.default.genSaltSync(9);
            const hashedPassword = bcryptjs_1.default.hashSync(registerForm.password, salt);
            const data = Object.assign(Object.assign({}, registerForm), { password: hashedPassword });
            yield this._userRepository.register(data);
        });
    }
    login(loginForm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._userRepository.login(loginForm.email);
                const checkPassword = bcryptjs_1.default.compareSync(loginForm.password, result.dataValues.password);
                const _a = result.dataValues, { password, createAt, updateAt } = _a, rest = __rest(_a, ["password", "createAt", "updateAt"]);
                const accessToken = jsonwebtoken_1.default.sign(rest, String(process.env.JWT_SECRET));
                if (checkPassword) {
                    return {
                        user: rest,
                        accessToken,
                    };
                }
                else {
                    return 1;
                }
            }
            catch (error) {
                console.log("Logic login Failed");
            }
        });
    }
    updateUser(id, updateForm) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.updateUser(id, updateForm);
        });
    }
    updateUserPassword(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcryptjs_1.default.genSaltSync(9);
            const hashedPassword = bcryptjs_1.default.hashSync(data.password, salt);
            const password = { password: hashedPassword };
            return yield this._userRepository.updatePassword(id, password);
        });
    }
    changeStatusUser(id, statusUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.changeStatusUser(id, statusUser);
        });
    }
    getHistoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._paymentRepository.getPaymentsWithUser(id);
        });
    }
    createFeedback(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._feedbackRepository.createFeedback(data);
        });
    }
}
exports.default = UserService;
