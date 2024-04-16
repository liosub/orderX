"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersAnalyticsData = exports.getAll = exports.getAllOrderTable = exports.deleteById = exports.update = exports.getById = exports.create = void 0;
const sequelize_1 = require("sequelize");
const Items_1 = __importDefault(require("../models/Items"));
const Order_1 = __importDefault(require("../models/Order"));
const models_1 = require("../models");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.create(payload);
    return order;
});
exports.create = create;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findByPk(id);
    if (!order) {
        //@todo throw custom error
        throw new Error('not found');
    }
    return order;
});
exports.getById = getById;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findByPk(id);
    if (!order) {
        throw new Error('not found');
    }
    return order.update(payload);
});
exports.update = update;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const numDeleteditems = Order_1.default.destroy({
        where: { order_id: id }
    });
    return !!numDeleteditems;
});
exports.deleteById = deleteById;
const getAllOrderTable = () => __awaiter(void 0, void 0, void 0, function* () {
    return Order_1.default.findAll({
        attributes: ["order_id", "customerName", "roomNo", "tableNo", "revenue", "createdAt"]
    });
});
exports.getAllOrderTable = getAllOrderTable;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Order_1.default.findAll({
        attributes: ["order_id", "email", "roomNo", "tableNo", "revenue", "createdAt", "status", "notes", "profile_id",
            // [Sequelize.fn("COUNT", Sequelize.col("*")), "orderCount"],
            // [Sequelize.fn("SUM", Sequelize.col("revenue")), "orderSum"],
        ],
        include: [
            {
                model: models_1.Profile,
            },
            {
                model: Items_1.default,
                as: "items"
            },
        ],
        order: ['profile_id']
    });
});
exports.getAll = getAll;
const getOrdersAnalyticsData = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return Order_1.default.findAll({
        attributes: [
            [sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("*")), "orderCount"],
            [sequelize_1.Sequelize.fn("SUM", sequelize_1.Sequelize.col("revenue")), "orderSum"],
            [sequelize_1.Sequelize.fn("AVG", sequelize_1.Sequelize.col("revenue")), "orderAvg"],
        ],
        where: {
            order_id: orderId
        },
        // group: ['id']
    });
});
exports.getOrdersAnalyticsData = getOrdersAnalyticsData;
