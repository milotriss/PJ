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
const orderItem_service_1 = __importDefault(require("../services/orderItem.service"));
const checkIsPayment_middleware_1 = __importDefault(require("../middlewares/checkIsPayment.middleware"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const orderItemService = new orderItem_service_1.default();
const orderItemController = express_1.default.Router();
orderItemController
    // CreateOrderItem
    .post("/create", auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            userId: Number(req.body.userId),
            productId: Number(req.body.productId),
            quantity: Number(req.body.quantity),
        };
        const result = yield orderItemService.createOrderItem(data);
        if (result === 1) {
            res.status(201).json("Created OrderItem successfully");
        }
        else if (result === 2) {
            res.status(404).json("Product not found");
        }
    }
    catch (error) {
        res.status(500).json("Create OrderItem: SERVER");
    }
}))
    //   GetAllOrderItem
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield orderItemService.getAllOrderItems();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Get all OrderItem: SERVER");
    }
}))
    .get('/cart/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const data = yield orderItemService.getDetailOrderItemByUserBefore(userId);
        res.status(200).json(data[0]);
    }
    catch (error) {
        res.status(500).json("Get Cart: SERVER");
    }
}))
    //   GetDetail with User
    .get("/history/detail/:id", auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const codePayment = String(req.query.code);
        const data = yield orderItemService.getHistoryDetail(userId, codePayment);
        console.log(data);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Get HistoryDetail: SERVER");
    }
}))
    //   DeleteOrderItem
    .delete("/:id", auth_middleware_1.Authorization, checkIsPayment_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield orderItemService.deleteOrderItem(id);
        res.status(204).json("Delete OrderItem Success");
    }
    catch (error) {
        res.status(500).json("Delete OrderItem: SERVER");
    }
}))
    // Update OrderItem
    .patch("/:id", auth_middleware_1.Authorization, checkIsPayment_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const newQuantity = Number(req.body.quantity);
        const newTotalPrice = Number(req.body.newTotalPrice);
        yield orderItemService.updateOrderItem(id, newQuantity, newTotalPrice);
        res.status(204).json("Update OrderItem Success");
    }
    catch (error) {
        res.status(500).json("Update OrderItem: SERVER");
    }
}));
exports.default = orderItemController;
