"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITEM_MODEL = exports.ItemState = void 0;
const sequelize_1 = require("sequelize");
const Order_1 = __importDefault(require("./Order"));
const Menu_1 = __importDefault(require("./Menu"));
const OrderItems_1 = __importDefault(require("./OrderItems"));
var ItemState;
(function (ItemState) {
    ItemState[ItemState["SOLD_OUT"] = 0] = "SOLD_OUT";
    ItemState[ItemState["AVAILABLE"] = 1] = "AVAILABLE";
})(ItemState || (exports.ItemState = ItemState = {}));
exports.ITEM_MODEL = {
    item_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    sectionTitle: {
        type: sequelize_1.DataTypes.STRING,
    },
    sectionDescription: {
        type: sequelize_1.DataTypes.STRING,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    allergens: {
        type: sequelize_1.DataTypes.STRING,
    },
    specialOffer: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    itemState: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    additionalFields: {
        type: sequelize_1.DataTypes.STRING,
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
class Items extends sequelize_1.Model {
    static initModel(sequelize) {
        Items.init(exports.ITEM_MODEL, {
            tableName: 'items',
            sequelize, // passing the `sequelize` instance is required
        });
    }
    static associate(_models) {
        Items.belongsToMany(Order_1.default, { through: OrderItems_1.default, as: 'order', foreignKey: "order_id" });
        Items.belongsTo(Menu_1.default, { foreignKey: "menu_id" });
    }
}
exports.default = Items;
