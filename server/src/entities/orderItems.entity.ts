import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./users.entity";

const OrderItem = sequelize.define('orderItem',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        unique: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    images:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isPayment:{
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:1
    },
    codePayment:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    }
},{timestamps:false})

OrderItem.belongsTo(User,{foreignKey:"userId", onDelete:"CASCADE", onUpdate:"CASCADE"})
User.hasMany(OrderItem,{foreignKey:"userId"});
export default OrderItem;