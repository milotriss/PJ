"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const users_entity_1 = __importDefault(require("./users.entity"));
const OrderItem = db_config_1.default.define('orderItem', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    images: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    isPayment: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    codePayment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    }
}, { timestamps: false });
OrderItem.belongsTo(users_entity_1.default, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
users_entity_1.default.hasMany(OrderItem, { foreignKey: "userId" });
exports.default = OrderItem;
