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
const admin_entities_1 = __importDefault(require("../entities/admin.entities"));
class AdminRepository {
    login(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield admin_entities_1.default.findOne({ where: { userName } });
        });
    }
    createAdmin(createForm) {
        return __awaiter(this, void 0, void 0, function* () {
            yield admin_entities_1.default.create(createForm);
        });
    }
    getAdminUserName(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield admin_entities_1.default.findOne({ where: { userName: data } });
            return result;
        });
    }
    getAllAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield admin_entities_1.default.findAll();
        });
    }
    deleteAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield admin_entities_1.default.destroy({ where: { id } });
        });
    }
}
exports.default = AdminRepository;
