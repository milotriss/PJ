"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const users_entity_1 = __importDefault(require("./users.entity"));
const products_entity_1 = __importDefault(require("./products.entity"));
const Rate = db_config_1.default.define('rates', {
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
    rateStar: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 4
    },
    review: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });
Rate.belongsTo(users_entity_1.default, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Rate.belongsTo(products_entity_1.default, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
users_entity_1.default.hasMany(Rate, { foreignKey: 'userId' });
products_entity_1.default.hasMany(Rate, { foreignKey: 'productId' });
exports.default = Rate;
