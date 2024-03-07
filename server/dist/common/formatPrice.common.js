"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatPrice = (price) => {
    return price.toLocaleString() + ' VND';
};
exports.default = formatPrice;
