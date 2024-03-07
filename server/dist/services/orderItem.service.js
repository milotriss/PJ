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
const orderItem_repository_1 = __importDefault(require("../repositories/orderItem.repository"));
const products_service_1 = __importDefault(require("./products.service"));
const productService = new products_service_1.default();
class OrderItemService {
    constructor() {
        this._orderItemRepository = new orderItem_repository_1.default();
    }
    checkIsPayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._orderItemRepository.checkIsPayment(id);
        });
    }
    createOrderItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productService.getProductById(data.productId);
            if (products) {
                const orderItem = {
                    userId: data.userId,
                    productId: data.productId,
                    name: products[0].dataValues.name,
                    images: products[0].dataValues.images,
                    quantity: data.quantity,
                    price: products[0].dataValues.price,
                    totalPrice: data.quantity * products[0].dataValues.price,
                };
                yield this._orderItemRepository.createOrderItem(orderItem);
                return 1;
            }
            else {
                return 2;
            }
        });
    }
    getAllOrderItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._orderItemRepository.getAllOrderItems();
        });
    }
    deleteOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._orderItemRepository.deleteOrderItem(id);
        });
    }
    getDetailOrderItemByUserBefore(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._orderItemRepository.getDetailOrderItemByUserBefore(userId);
        });
    }
    getHistoryDetail(userId, codePayment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._orderItemRepository.getHistoryDetail(userId, codePayment);
        });
    }
    updateOrderItem(id, newQuantity, newTotalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._orderItemRepository.updateOrderItem(id, newQuantity, newTotalPrice);
        });
    }
}
exports.default = OrderItemService;
