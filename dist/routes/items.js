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
const itemsServiceImpl = __importStar(require("../db/services/ItemsServiceImpl"));
const upload_1 = require("../middleware/upload");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const itemsRouter = (0, express_1.Router)();
itemsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield itemsServiceImpl.getById(id);
    return res.status(200).send(result);
}));
itemsRouter.get('/bySection/:section', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const section = (req.params.section);
    const result = yield itemsServiceImpl.getBySection(section);
    return res.status(200).send(result);
}));
itemsRouter.get('/menu/:menu_id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.menu_id);
    const result = yield itemsServiceImpl.getAllByMenuId(id);
    return res.status(200).send(result);
}));
itemsRouter.post('/', authMiddleware_1.default, upload_1.uploadItmes, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    payload.image = ((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename) || "n/a";
    const result = yield itemsServiceImpl.create(payload);
    return res.status(200).send(result);
}));
itemsRouter.post('/section/:id', authMiddleware_1.default, upload_1.uploadItmes, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const payload = req.body;
    const files = req.files;
    payload.image = files["image"][0].filename;
    const result = yield itemsServiceImpl.update(id, payload);
    return res.status(200).send(result);
}));
itemsRouter.put('/:id', authMiddleware_1.default, upload_1.uploadItmes, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const payload = req.body;
    const result = yield itemsServiceImpl.update(id, payload);
    return res.status(200).send(result);
}));
itemsRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield itemsServiceImpl.deleteById(id);
    return res.status(200).send({
        success: result
    });
}));
exports.default = itemsRouter;
