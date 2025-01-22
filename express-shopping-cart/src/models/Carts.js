const { DataTypes } = require('sequelize')
const sequelize = require("../../config/database")

const Carts = sequelize.define(
    'Carts',
    {
        CartID : {type:DataTypes.INTEGER,primaryKey:true, allowNull: false},
        // CreatedAt : {type:DataTypes.DATE, allowNull: true}, //Biarkan SQL Server menangani
        // UpdatedAt : {type:DataTypes.DATE, allowNull: true}, //Biarkan SQL Server menangani
    },{
        tableName: 'Carts', //table SQL
        timestamps: false, //matikan timestamps otomatis
        freezeTableName: true, //nama table tidak akan diubah
    }
)

// Carts.hasMany(CartItems, { foreignKey: 'CartID' });
// CartItems.belongsTo(Carts, { foreignKey: 'CartID' });

module.exports = Carts;