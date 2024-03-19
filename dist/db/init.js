"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const dev = process.env.NODE_ENV === 'development';
const test = process.env.NODE_ENV !== 'test';
const dbInit = () => Promise.all([
// Profile.sync({ alter: dev || test }),
// // Items.sync({ alter: dev || test }),
// Menu.sync({ alter: dev || test }),
// // Order.sync({ alter: dev || test }),
// // OrderItems.sync({ alter: dev || test }),
// sequelizeServer.sequelize
]);
exports.default = dbInit;
