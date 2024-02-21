import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./users.entity";

const Event = sequelize.define('events',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        unique: true,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:1
    },
    typePayment: {
        type: DataTypes.TINYINT,
        allowNull: false,
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
    price:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },
    receiveAt: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{timestamps:true})

Event.belongsTo(User,{foreignKey:'userId', onDelete:'CASCADE',onUpdate:'CASCADE'})
User.hasMany(Event,{foreignKey:'userId'});
export default Event;