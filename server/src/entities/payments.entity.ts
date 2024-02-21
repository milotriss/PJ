import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./users.entity";


const Payment = sequelize.define('payments', {
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
    subTotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:1
    },
    typePayment: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:1
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lastPrice:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codePayment:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    }
},{timestamps:true})


Payment.belongsTo(User,{foreignKey:"userId", onDelete:"CASCADE", onUpdate:"CASCADE"})
User.hasMany(Payment,{foreignKey:"userId"});

export default Payment;