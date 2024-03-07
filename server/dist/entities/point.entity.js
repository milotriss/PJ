"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const users_entity_1 = __importDefault(require("./users.entity"));
const Point = db_config_1.default.define('points', {
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
    point: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, { timestamps: false });
Point.belongsTo(users_entity_1.default, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
users_entity_1.default.hasOne(Point, { foreignKey: 'userId' });
exports.default = Point;
