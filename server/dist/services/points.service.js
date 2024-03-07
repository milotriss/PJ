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
const points_repository_1 = __importDefault(require("../repositories/points.repository"));
class PointService {
    constructor() {
        this._pointRepository = new points_repository_1.default();
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._pointRepository.getByUserId(userId);
        });
    }
    updateNewPoint(userId, point) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldPoint = yield this.getByUserId(userId);
            const newPoint = Number(point) + Number(oldPoint.point);
            yield this._pointRepository.updateNewPoint(userId, newPoint);
        });
    }
}
exports.default = PointService;
