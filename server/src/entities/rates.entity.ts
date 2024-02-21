import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./users.entity";
import Product from "./products.entity";

const Rate = sequelize.define('rates', {
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
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rateStar: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:4
    },
    review:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{timestamps:true})

Rate.belongsTo(User,{foreignKey:'userId', onDelete:'CASCADE',onUpdate:'CASCADE'})
Rate.belongsTo(Product,{foreignKey:'productId', onDelete:'CASCADE',onUpdate:'CASCADE'})
User.hasMany(Rate,{foreignKey:'userId'});
Product.hasMany(Rate,{foreignKey:'productId'});

export default Rate;