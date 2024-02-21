import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./users.entity";

const UserInfo = sequelize.define('userInfos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    birthDay: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://www.google.com/url?sa=i&url=https%3A%2F%2Finkythuatso.com%2Fhinh-anh-dep%2Fanh-meo-den-trang-4828.html&psig=AOvVaw2klgH5T1EHzeGUJHraaCFh&ust=1706414566480000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC1h-nX_IMDFQAAAAAdAAAAABAR"
    }
},{timestamps:false})

UserInfo.belongsTo(User,{foreignKey:"userId",onDelete:"CASCADE",onUpdate:"CASCADE"})
User.hasOne(UserInfo,{foreignKey:"userId"})

export default UserInfo;