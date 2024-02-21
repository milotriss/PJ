import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

const Voucher = sequelize.define('vouchers',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        unique: true,
        autoIncrement: true
    },
    voucher:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{timestamps:false})

export default Voucher;