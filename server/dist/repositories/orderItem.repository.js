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
const db_config_1 = __importDefault(require("../configs/db.config"));
const orderItems_entity_1 = __importDefault(require("../entities/orderItems.entity"));
class OrderItemRepository {
    createOrderItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield orderItems_entity_1.default.create(data);
        });
    }
    getAllOrderItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItems_entity_1.default.findAll();
        });
    }
    getDetailOrderItemByUserBefore(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db_config_1.default.query(`select * from orderItems where userId = ${userId} and orderItems.isPayment = 1`);
            return data;
        });
    }
    checkIsPayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItems_entity_1.default.findOne({
                where: {
                    id,
                    isPayment: 1,
                }
            });
        });
    }
    deleteOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield orderItems_entity_1.default.destroy({ where: { id } });
        });
    }
    getHistoryDetail(userId, codePayment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderItems_entity_1.default.findAll({
                where: {
                    userId,
                    codePayment,
                },
                attributes: ['images', 'name', 'quantity', 'price', 'totalPrice']
            });
        });
    }
    updateOrderItem(id, newQuantity, newTotalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            yield orderItems_entity_1.default.update({ quantity: newQuantity, totalPrice: newTotalPrice }, { where: { id } });
        });
    }
}
exports.default = OrderItemRepository;
