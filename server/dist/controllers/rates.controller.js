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
const rates_service_1 = __importDefault(require("../services/rates.service"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rateController = express_1.default.Router();
const rateService = new rates_service_1.default();
rateController
    // Create new Rate
    .post('/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const data = {
            userId,
            productId: req.body.productId,
            rateStar: Number(req.body.rateStar),
            review: req.body.review,
        };
        yield rateService.createRate(data);
        res.status(201).json("Rate created");
    }
    catch (error) {
        res.status(500).json('Create Rate: SERVER');
    }
}))
    // Delete Rate
    .delete('/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rateId = Number(req.params.id);
        const result = yield rateService.deleteRate(rateId);
        if (result) {
            res.status(204).json("Rate deleted");
        }
        else {
            res.status(404).json("Rate not found");
        }
    }
    catch (error) {
        res.status(500).json('Delete Rate: SERVER');
    }
}))
    // Get All Rate
    .get('/all/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rateService.getAllRates();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json('Get Rate: SERVER');
    }
}))
    // Get rate by product
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number(req.params.id);
        const result = yield rateService.getRateById(productId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json('Get Rate: SERVER');
    }
}));
exports.default = rateController;
