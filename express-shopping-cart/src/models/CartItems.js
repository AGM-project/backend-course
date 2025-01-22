const { DataTypes } = require('sequelize')
const sequelize = require("../../config/database")
const Product = require("../models/Product");
const Cart = require("../models/Carts");


const CartItems = sequelize.define(
    'CartItems',
    {
        CartItemID : {type:DataTypes.INTEGER,primaryKey:true, allowNull: false},
        CartID : {type:DataTypes.INTEGER, allowNull: false},
        ProductID : {type:DataTypes.INTEGER, allowNull: false},
        Quantity : {type:DataTypes.INTEGER, allowNull: false},
        // CreatedAt : {type:DataTypes.DATE, allowNull: true}, //Biarkan SQL Server menangani
        // UpdatedAt : {type:DataTypes.DATE, allowNull: true}, //Biarkan SQL Server menangani
    },{
        tableName: 'CartItems', //table SQL
        timestamps: false, //matikan timestamps otomatis
        freezeTableName: true, //nama table tidak akan diubah
    }
)
CartItems.belongsTo(Product, { foreignKey: 'ProductID',});
CartItems.belongsTo(Cart, { foreignKey: 'CartID', });


module.exports = CartItems;