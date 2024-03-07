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
const payment_service_1 = __importDefault(require("../services/payment.service"));
const uuid_1 = require("uuid");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const paymentService = new payment_service_1.default();
const paymentController = express_1.default.Router();
paymentController
    // Create New Payment
    .post('/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const code = (0, uuid_1.v1)();
        const data = {
            userId,
            subTotal: req.body.subTotal,
            typePayment: Number(req.body.typePayment),
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            lastPrice: req.body.lastPrice,
            codePayment: code
        };
        const point = Number(req.body.point);
        yield paymentService.createPayment(data, code, point);
        res.status(201).json("Payment created");
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Payment: SERVER');
    }
}))
    // Update Status Payment
    .patch('/update/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const status = Number(req.body.status);
        const result = yield paymentService.updatePayment(id, status);
        if (result[0] === 0) {
            res.status(404).json('Not Found');
        }
        else {
            res.status(200).json('Updated Status Successfully');
        }
    }
    catch (error) {
        res.status(500).json('Payment update: SERVER');
    }
}))
    // Get All Payment
    .get('/', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield paymentService.getAllPayments();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json('Payment GetAll: SERVER');
    }
}))
    // Search Payments
    .get('/search/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchValue = String(req.query.search);
        const id = Number(req.params.id);
        const data = yield paymentService.searchPayments(searchValue, id);
        res.status(200).json(data[0]);
    }
    catch (error) {
        res.status(500).json('Payment search: SERVER');
    }
}))
    .get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchValue = String(req.query.search);
        const data = yield paymentService.searchPayments(searchValue);
        res.status(200).json(data[0]);
    }
    catch (error) {
        res.status(500).json('Payment search: SERVER');
    }
}));
exports.default = paymentController;
