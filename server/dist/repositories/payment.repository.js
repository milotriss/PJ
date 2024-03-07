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
const orderItems_entity_1 = __importDefault(require("../entities/orderItems.entity"));
const payments_entity_1 = __importDefault(require("../entities/payments.entity"));
const point_entity_1 = __importDefault(require("../entities/point.entity"));
const products_entity_1 = __importDefault(require("../entities/products.entity"));
const db_config_1 = __importDefault(require("../configs/db.config"));
class PaymentRepository {
    createPayment(payment, newOrderData, newStock, newPoint) {
        return __awaiter(this, void 0, void 0, function* () {
            // Thêm dữ liệu vào bảng payment
            yield payments_entity_1.default.create(payment);
            // Đổi trạng thái OrderItems sang đã thanh toán
            newOrderData.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                yield orderItems_entity_1.default.update(element, { where: { id: element.id } });
            }));
            // Cập nhật lại products khi đã trừ stock
            newStock.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                yield products_entity_1.default.update({ stock: item.stock }, { where: { id: item.id } });
            }));
            // Cập nhật lại point
            yield point_entity_1.default.update({ point: newPoint + 2 }, { where: { userId: payment.userId } });
        });
    }
    updatePayment(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payments_entity_1.default.update({ status: status }, { where: { id: id } });
        });
    }
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payments_entity_1.default.findAll({
                order: [
                    ['status', 'ASC'],
                    ['createdAt', 'DESC'],
                ]
            });
        });
    }
    getPaymentsWithUser(userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (status) {
                return yield payments_entity_1.default.findAll({
                    where: { userId: userId, status: status }
                });
            }
            else {
                return yield payments_entity_1.default.findAll({ where: { userId: userId } });
            }
        });
    }
    searchPayments(searchValue, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const data = yield db_config_1.default.query(`select * from PJ.payments where substring(payments.createdAt,1) like '%${searchValue}%' and payments.userId = ${id}`);
                return data;
            }
            else {
                const data = yield db_config_1.default.query(`select * from PJ.payments where substring(payments.createdAt,1) like '%${searchValue}%'`);
                return data;
            }
        });
    }
}
exports.default = PaymentRepository;
