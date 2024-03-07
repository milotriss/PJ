"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const users_entity_1 = __importDefault(require("./users.entity"));
const Feedback = db_config_1.default.define('feedbacks', {
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
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    emotion: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 4
    }
}, { timestamps: true });
Feedback.belongsTo(users_entity_1.default, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
users_entity_1.default.hasMany(Feedback, { foreignKey: 'userId' });
exports.default = Feedback;
