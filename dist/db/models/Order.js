"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_MODEL = void 0;
const sequelize_1 = require("sequelize");
const Profile_1 = __importDefault(require("./Profile"));
const Menu_1 = __importDefault(require("./Menu"));
const Items_1 = __importDefault(require("./Items"));
const OrderItems_1 = __importDefault(require("./OrderItems"));
exports.ORDER_MODEL = {
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomNo: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    tableNo: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    customerName: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    orderDetails: {
        type: sequelize_1.DataTypes.STRING
    },
    revenue: {
        type: sequelize_1.DataTypes.BIGINT
    },
    status: {
        type: sequelize_1.DataTypes.STRING
    },
    notes: {
        type: sequelize_1.DataTypes.STRING
    },
    profile_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'profile', // name of Target model
            key: 'profile_id', // key in Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
    },
    menu_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'menu', // name of Target model
            key: 'menu_id', // key in Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
};
class Order extends sequelize_1.Model {
    static initModel(sequelize) {
        Order.init(exports.ORDER_MODEL, {
            tableName: 'order',
            sequelize, // passing the `sequelize` instance is required
        });
    }
    static associate(_models) {
        Order.hasOne(Profile_1.default, {
            foreignKey: 'profile_id'
        });
        Order.hasOne(Menu_1.default, {
            foreignKey: "menu_id"
        });
        Order.belongsToMany(Items_1.default, { through: OrderItems_1.default, as: 'items', foreignKey: "item_id" });
    }
}
exports.default = Order;
