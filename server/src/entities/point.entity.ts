import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./users.entity";

const Point = sequelize.define('points', {
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
    point:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{timestamps: false})

Point.belongsTo(User,{foreignKey:'userId', onDelete:'CASCADE',onUpdate:'CASCADE'})
User.hasOne(Point,{foreignKey:'userId'});
export default Point;