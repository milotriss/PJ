"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const users_entity_1 = __importDefault(require("./users.entity"));
const UserInfo = db_config_1.default.define('userInfos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://www.google.com/url?sa=i&url=https%3A%2F%2Finkythuatso.com%2Fhinh-anh-dep%2Fanh-meo-den-trang-4828.html&psig=AOvVaw2klgH5T1EHzeGUJHraaCFh&ust=1706414566480000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC1h-nX_IMDFQAAAAAdAAAAABAR"
    }
}, { timestamps: false });
UserInfo.belongsTo(users_entity_1.default, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
users_entity_1.default.hasOne(UserInfo, { foreignKey: "userId" });
exports.default = UserInfo;
