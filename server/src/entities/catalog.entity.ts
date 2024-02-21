import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";

const Catalog = sequelize.define('catalogs', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        unique: true,
        autoIncrement: true
    },
    catalogName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{timestamps:false})
export default Catalog;