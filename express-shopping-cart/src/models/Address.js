const { DataTypes } = require('sequelize')
const sequelize = require("../../config/database")

const Address = sequelize.define(
    'Address',
    {
        AddressID : {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        CartID : {type:DataTypes.INTEGER, allowNull: false},
        AddressLine1 : {type:DataTypes.TEXT, allowNull: false},
        AddressLine2 : {type:DataTypes.TEXT, allowNull: true},
        City : {type:DataTypes.STRING, allowNull: false},
        State : {type:DataTypes.STRING, allowNull: false},
        ZipCode : {type:DataTypes.STRING, allowNull: false},
        // CreatedAt : {type:DataTypes.DATE, allowNull: true}, //Biarkan SQL Server menangani
        // UpdatedAt : {type:DataTypes.DATE, allowNull: true}, //Biarkan SQL Server menangani
    },{
        tableName: 'Addresses', //table SQL
        timestamps: false, //matikan timestamps otomatis
        freezeTableName: true, //nama table tidak akan diubah
    }
)

module.exports = Address;