"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MENU_MODEL = void 0;
const sequelize_1 = require("sequelize");
const Profile_1 = __importDefault(require("./Profile"));
const Order_1 = __importDefault(require("./Order"));
exports.MENU_MODEL = {
    menu_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    menuTitle: {
        type: sequelize_1.DataTypes.STRING,
    },
    menuDetails: {
        type: sequelize_1.DataTypes.STRING,
    },
    font: {
        type: sequelize_1.DataTypes.STRING,
    },
    accent: {
        type: sequelize_1.DataTypes.STRING,
    },
    profile_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'profile', // name of Target model
            key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
};
class Menu extends sequelize_1.Model {
    static initModel(sequelize) {
        Menu.init(exports.MENU_MODEL, {
            tableName: 'menu',
            sequelize,
            paranoid: true,
            timestamps: false
        });
    }
    static associate(_models) {
        Menu.hasOne(Profile_1.default, {
            foreignKey: 'profile_id'
        });
        Menu.hasMany(Order_1.default, {
            foreignKey: 'menu_id'
        });
    }
}
exports.default = Menu;
