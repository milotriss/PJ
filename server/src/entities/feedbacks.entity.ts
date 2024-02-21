import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./users.entity";

const Feedback = sequelize.define('feedbacks', {
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
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emotion: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue:4
    }
},{timestamps:true})

Feedback.belongsTo(User,{foreignKey:'userId', onDelete:'CASCADE',onUpdate:'CASCADE'})
User.hasMany(Feedback,{foreignKey:'userId'});

export default Feedback;