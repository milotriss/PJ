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
const points_service_1 = __importDefault(require("../services/points.service"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const pointController = express_1.default.Router();
const pointService = new points_service_1.default();
pointController
    // Get Point By UserId
    .get('/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const data = yield pointService.getByUserId(userId);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json('Get Point: SERVER');
    }
}))
    .patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const point = Number(req.body.point);
        yield pointService.updateNewPoint(userId, point);
        res.status(200).json('Update Point Success');
    }
    catch (error) {
        res.status(500).json('Update Point: SERVER');
    }
}));
exports.default = pointController;
