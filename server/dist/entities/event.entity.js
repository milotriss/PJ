"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const users_entity_1 = __importDefault(require("./users.entity"));
const Event = db_config_1.default.define('events', {
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
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    typePayment: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    receiveAt: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    }
}, { timestamps: true });
Event.belongsTo(users_entity_1.default, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
users_entity_1.default.hasMany(Event, { foreignKey: 'userId' });
exports.default = Event;
