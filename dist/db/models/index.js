"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItems = exports.Order = exports.Items = exports.Menu = exports.Profile = exports.sequelizeServer = void 0;
/* eslint-disable quotes */
const sequelize_1 = require("sequelize");
const Profile_1 = __importDefault(require("./Profile"));
exports.Profile = Profile_1.default;
const Menu_1 = __importDefault(require("./Menu"));
exports.Menu = Menu_1.default;
const Items_1 = __importDefault(require("./Items"));
exports.Items = Items_1.default;
const Order_1 = __importDefault(require("./Order"));
exports.Order = Order_1.default;
const OrderItems_1 = __importDefault(require("./OrderItems"));
exports.OrderItems = OrderItems_1.default;
const dbConfig = require('../config');
const config = dbConfig.development;
class SequelizeServer {
    constructor(options) {
        this.sequelize = new sequelize_1.Sequelize(options);
        this.initModels();
        this.setupRelations();
        // this.syncSequelize();
    }
    // Add created models here for initialization
    initModels() {
        Profile_1.default.initModel(this.sequelize);
        Menu_1.default.initModel(this.sequelize);
        Items_1.default.initModel(this.sequelize);
        Order_1.default.initModel(this.sequelize);
        OrderItems_1.default.initModel(this.sequelize);
    }
    // Set up data relationships
    setupRelations() {
        const models = this.sequelize.models;
        Object.keys(models).forEach(name => {
            if ('associate' in models[name]) {
                models[name].associate(models);
            }
        });
    }
    // Sync to the database
    syncSequelize() {
        this.sequelize
            .sync()
            .then(() => console.info('sequelize sync database'))
            .catch((err) => {
            console.error(JSON.stringify(err));
        });
    }
}
const sequelizeServer = new SequelizeServer(Object.assign(Object.assign({}, config), { logging: false }));
exports.sequelizeServer = sequelizeServer;
