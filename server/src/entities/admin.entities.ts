import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

const Admin = sequelize.define('Admins', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
        unique: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:1
    },
    avatar:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"
    }
},{timestamps: true})
export default Admin;