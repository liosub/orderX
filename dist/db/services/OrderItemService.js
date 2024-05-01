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
exports.getById = exports.createMany = exports.create = void 0;
const OrderItems_1 = __importDefault(require("../models/OrderItems"));
function orderFormatter(items, order_id) {
    const orderItems = [];
    for (var i = 0; i < items.length; i++) {
        const orderItem = {
            order_id: order_id,
            item_id: items[i].item_id,
            quantity: items[i].counter,
            price: items[i].price,
        };
        orderItems.push(orderItem);
    }
    return orderItems;
}
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderitems = yield OrderItems_1.default.create(payload);
    return orderitems;
});
exports.create = create;
const createMany = (payload, order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrderItems = orderFormatter(payload, order_id);
    const orderitems = yield OrderItems_1.default.bulkCreate(newOrderItems);
    return orderitems;
});
exports.createMany = createMany;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderitems = yield OrderItems_1.default.findByPk(id);
    if (!orderitems) {
        //@todo throw custom error
        throw new Error('not found');
    }
    return orderitems;
});
exports.getById = getById;
