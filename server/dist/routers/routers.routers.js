"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const orderItem_controller_1 = __importDefault(require("../controllers/orderItem.controller"));
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
const feedback_controller_1 = __importDefault(require("../controllers/feedback.controller"));
const events_controller_1 = __importDefault(require("../controllers/events.controller"));
const points_controller_1 = __importDefault(require("../controllers/points.controller"));
const rates_controller_1 = __importDefault(require("../controllers/rates.controller"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const routers = (server) => {
    server.use('/users', users_controller_1.default);
    server.use('/products', products_controller_1.default);
    server.use('/order-items', orderItem_controller_1.default);
    server.use('/payments', payment_controller_1.default);
    server.use('/feedbacks', feedback_controller_1.default);
    server.use('/events', events_controller_1.default);
    server.use('/points', points_controller_1.default);
    server.use('/rates', rates_controller_1.default);
    server.use('/admin', admin_controller_1.default);
};
exports.default = routers;
