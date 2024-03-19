"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER;
const dbPassword = process.env.DB_PASSWORD;
const sequelizeConnection = {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: dbDriver
};
module.exports = {
    development: sequelizeConnection,
    test: sequelizeConnection,
    production: sequelizeConnection,
};
