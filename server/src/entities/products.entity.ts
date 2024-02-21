import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import Catalog from "./catalog.entity";


const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        unique: true,
        autoIncrement: true
    },
    catalogId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc:{
        type: DataTypes.STRING,
        allowNull:false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingredients :{
        type: DataTypes.STRING,
        allowNull: false
    },
    allergens:{
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue:1
    }
},{timestamps:false})



Product.belongsTo(Catalog,{foreignKey:'catalogId', onDelete:'CASCADE',onUpdate:'CASCADE'})
Catalog.hasMany(Product,{foreignKey:'catalogId'});
export default Product;