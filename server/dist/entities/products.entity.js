"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const catalog_entity_1 = __importDefault(require("./catalog.entity"));
const Product = db_config_1.default.define('products', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    catalogId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ingredients: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    allergens: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    }
}, { timestamps: false });
Product.belongsTo(catalog_entity_1.default, { foreignKey: 'catalogId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
catalog_entity_1.default.hasMany(Product, { foreignKey: 'catalogId' });
exports.default = Product;
