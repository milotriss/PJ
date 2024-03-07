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
const rates_repository_1 = __importDefault(require("../repositories/rates.repository"));
class RateService {
    constructor() {
        this._rateRepository = new rates_repository_1.default();
    }
    createRate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._rateRepository.createRate(data);
        });
    }
    deleteRate(rateId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._rateRepository.deleteRate(rateId);
        });
    }
    getAllRates() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._rateRepository.getAllRates();
        });
    }
    getRateById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._rateRepository.getRateById(productId);
        });
    }
}
exports.default = RateService;
