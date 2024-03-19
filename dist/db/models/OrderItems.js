"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_ITEM_MODEL = void 0;
const sequelize_1 = require("sequelize");
exports.ORDER_ITEM_MODEL = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    item_id: {
        type: sequelize_1.DataTypes.INTEGER,
    }
};
class OrderItems extends sequelize_1.Model {
    static initModel(sequelize) {
        OrderItems.init(exports.ORDER_ITEM_MODEL, {
            tableName: 'order_items',
            sequelize, // passing the `sequelize` instance is required
        });
    }
    static associate(_models) { }
}
exports.default = OrderItems;
