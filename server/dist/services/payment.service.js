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
const payment_repository_1 = __importDefault(require("../repositories/payment.repository"));
const orderItem_service_1 = __importDefault(require("./orderItem.service"));
const products_service_1 = __importDefault(require("./products.service"));
const points_repository_1 = __importDefault(require("../repositories/points.repository"));
const nodeMailer_config_1 = __importDefault(require("../configs/nodeMailer.config"));
const mailPayment_common_1 = __importDefault(require("../common/mailPayment.common"));
const orderItemService = new orderItem_service_1.default();
const productService = new products_service_1.default();
class PaymentService {
    constructor() {
        this._paymentRepository = new payment_repository_1.default();
        this._pointRepository = new points_repository_1.default();
    }
    createPayment(payment, code, pointBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lấy tất cả OrderItem chưa thanh toán theo UserId
                const orderData = yield orderItemService.getDetailOrderItemByUserBefore(payment.userId);
                const quantity = orderData[0].map((item) => {
                    return {
                        id: item.productId,
                        quantity: item.quantity,
                    };
                });
                //  Lấy tất cả Products theo productId để trừ stock 
                const arrId = [];
                orderData[0].forEach((item) => {
                    arrId.push(item.productId);
                });
                const needProducts = yield productService.getProductByManyId(arrId);
                const newStock = [];
                needProducts.forEach((item) => {
                    quantity.forEach((element) => {
                        if (item.id === element.id) {
                            newStock.push({
                                id: item.id,
                                stock: item.stock - element.quantity,
                            });
                        }
                    });
                });
                // Lấy point theo userId
                const point = yield this._pointRepository.getByUserId(payment.userId);
                const newPoint = Number(point.dataValues.point) - Number(pointBody);
                //   Đổi trạng thái OrderItems sang đã thanh toán và thêm codePayment để toạn dữ liệu cho bảng Payment
                const newOrderData = orderData[0].map((item) => {
                    return Object.assign(Object.assign({}, item), { codePayment: code, isPayment: 2 });
                });
                // Gởi thông tin thanh toán về mail người dùng
                const htmlElement = yield (0, mailPayment_common_1.default)(payment, pointBody, orderData[0]);
                yield nodeMailer_config_1.default.sendMail({
                    bcc: payment.email,
                    subject: "OTP Authentication",
                    html: htmlElement,
                });
                yield this._paymentRepository.createPayment(payment, newOrderData, newStock, newPoint);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updatePayment(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._paymentRepository.updatePayment(id, status);
        });
    }
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._paymentRepository.getAllPayments();
        });
    }
    searchPayments(searchValue, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._paymentRepository.searchPayments(searchValue, id);
        });
    }
}
exports.default = PaymentService;
