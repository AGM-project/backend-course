const { DataTypes } = require('sequelize')
const sequelize = require("../../config/database")

const Product = sequelize.define('Product',{
    ProductID : {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    Name : {type:DataTypes.STRING, allowNull: false},
    Description : {type:DataTypes.TEXT},
    Price : {type:DataTypes.FLOAT, allowNull: false},
    Stock : {type:DataTypes.INTEGER, allowNull: false},
    CreatedAt : {type:DataTypes.DATE, allowNull: true}, //Biarkan SQL Server menangani
    UpdatedAt : {type:DataTypes.DATE, allowNull: true}, //Biarkan SQL Server menangani
},{
    tableName: 'Products', //table SQL
    timestamps: false, //matikan timestamps otomatis
    freezeTableName: true, //nama table tidak akan diubah
})

module.exports = Product;