const { Sequelize } = require ('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            useUTC: true, //yang penting ini untuk zona waktu berbeda
        }
    },
    timezone: "+07:00",  //Untuk Jakarta , jika default +00:00
    loggin: console.log(),
})

module.exports = sequelize