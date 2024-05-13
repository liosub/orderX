"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const orderServiceImpl = __importStar(require("../db/services/OrderServiceImpl"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const orderItemServiceImpl = __importStar(require("../db/services/OrderItemService"));
const payment_1 = require("./payment");
const orderRouter = (0, express_1.Router)();
// orderRouter.get('/:id', async (req: Request, res: Response) => {
//     const id = Number(req.params.id)
//     const result = await orderServiceImpl.getById(id)
//     return res.status(200).send(result)
// })
// orderRouter.get('/', verifyToken,async (req: Request, res: Response) => {    
//     const result = await orderServiceImpl.getAll()
//     // getAllOrderTable()
//     return res.status(200).send(result)
// })
/**/ // const priceId =await createProducts(result.order_id,payload.total_price);
// const customerId =await createStripeCustomer("lol@mail.com","lol");
orderRouter.post("/analysis/total", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.token._id);
        const result = yield orderServiceImpl.getOrdersAnalyticsData(id);
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}));
orderRouter.post("/analysis/customerInfo", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.token._id);
        const result = yield orderServiceImpl.getAllCustomerOrders(id);
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}));
orderRouter.post("/analysis/profileInfo", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.token._id);
        const result = yield orderServiceImpl.getAllOrdersByProfile(id);
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}));
orderRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const session = yield (0, payment_1.createSessions)(payload.cart, payload.profileId, payload.profilemail);
        if (session.id && session.url) {
            payload.orderDetails = session.id;
            const result = yield orderServiceImpl.create(payload);
            const oderItems = yield orderItemServiceImpl.createMany(payload.cart, result.order_id);
            return res.status(200).send(session.url);
        }
        res.status(400).json({ error: "failed process" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
}));
orderRouter.put('/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const payload = req.body;
    const result = yield orderServiceImpl.update(id, payload);
    return res.status(200).send(result);
}));
orderRouter.delete('/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield orderServiceImpl.deleteById(id);
    return res.status(200).send({
        success: result
    });
}));
exports.default = orderRouter;
