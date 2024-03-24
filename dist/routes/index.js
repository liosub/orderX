"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_1 = __importDefault(require("./profile"));
const menu_1 = __importDefault(require("./menu"));
const items_1 = __importDefault(require("./items"));
const order_1 = __importDefault(require("./order"));
const register_1 = __importDefault(require("./register"));
const router = (0, express_1.Router)();
router.use('/', register_1.default);
router.use('/profile', profile_1.default);
router.use('/menu', menu_1.default);
router.use('/items', items_1.default);
router.use('/orders', order_1.default);
router.use('/orderItems', order_1.default);
exports.default = router;
