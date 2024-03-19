import { Dialect,Sequelize } from "sequelize";
require('dotenv').config();

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as string
const dbPassword = process.env.DB_PASSWORD



const sequelizeConnection = {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: dbDriver
}


module.exports = {
    development: sequelizeConnection,
    test: sequelizeConnection,
    production: sequelizeConnection,
  };