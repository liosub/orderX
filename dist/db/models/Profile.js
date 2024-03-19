"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFILE_MODEL = void 0;
const sequelize_1 = require("sequelize");
const Order_1 = __importDefault(require("./Order"));
exports.PROFILE_MODEL = {
    profile_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    businessName: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    tag: {
        type: sequelize_1.DataTypes.TEXT
    },
    logo: {
        type: sequelize_1.DataTypes.STRING,
    },
    bannerImage: {
        type: sequelize_1.DataTypes.STRING,
    },
    QRCode: {
        type: sequelize_1.DataTypes.STRING,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
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
class Profile extends sequelize_1.Model {
    static initModel(sequelize) {
        Profile.init(exports.PROFILE_MODEL, {
            tableName: 'profile',
            sequelize,
            paranoid: true,
            timestamps: false
        });
    }
    static associate(_models) {
        Profile.hasMany(Order_1.default, {
            foreignKey: 'profile_id'
        });
    }
}
exports.default = Profile;
