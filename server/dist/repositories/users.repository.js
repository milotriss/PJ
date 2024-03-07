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
const users_entity_1 = __importDefault(require("../entities/users.entity"));
const userInfo_entity_1 = __importDefault(require("../entities/userInfo.entity"));
const point_entity_1 = __importDefault(require("../entities/point.entity"));
const sequelize_1 = require("sequelize");
class UserRepository {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_entity_1.default.findAll({
                include: { model: userInfo_entity_1.default },
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_entity_1.default.findAll({
                include: [
                    { model: userInfo_entity_1.default, where: { userId: id } },
                    { model: point_entity_1.default, where: { userId: id } },
                ],
            });
            return result;
        });
    }
    getUserEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_entity_1.default.findOne({ where: { email: data } });
            return result;
        });
    }
    searchUsers(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_entity_1.default.findAll({
                include: { model: userInfo_entity_1.default },
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            firstName: {
                                [sequelize_1.Op.like]: `%${searchValue}%`,
                            },
                        },
                        {
                            lastName: {
                                [sequelize_1.Op.like]: `%${searchValue}%`,
                            },
                        },
                    ],
                },
            });
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield users_entity_1.default.create(user);
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userInfo_entity_1.default.update(user, { where: { userId: id } });
        });
    }
    updatePassword(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_entity_1.default.update(data, { where: { id } });
        });
    }
    changeStatusUser(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_entity_1.default.update({ status: status }, { where: { id } });
        });
    }
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_entity_1.default.findOne({ where: { email: email } });
        });
    }
}
exports.default = UserRepository;
