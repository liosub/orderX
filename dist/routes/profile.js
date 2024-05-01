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
const dotenv_1 = __importDefault(require("dotenv"));
const profileServiceImpl = __importStar(require("../db/services/ProfileServiceImpl"));
const userToken_1 = __importDefault(require("../middleware/userToken"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const upload_1 = require("../middleware/upload");
dotenv_1.default.config();
const IMG_URI = process.env.UPLOADS_IMG_URI;
const QR_URI = process.env.QRCODE_URI;
const profileRouter = (0, express_1.Router)();
profileRouter.get('/me', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.token._id);
    const result = yield profileServiceImpl.getById(id);
    return res.status(200).send(result);
}));
profileRouter.get('/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield profileServiceImpl.getById(id);
    return res.status(200).send(result);
}));
profileRouter.post('/guest/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield profileServiceImpl.getByIdGuest(id);
        return res.status(200).send(result);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}));
profileRouter.post('/createM', authMiddleware_1.default, upload_1.upload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const files = req.files;
    try {
        payload.logo = `${IMG_URI}/${files["logo"][0].filename}`;
        payload.QRCode = `${QR_URI}/${payload.businessName}-QR.png`;
        const result = yield profileServiceImpl.createNewProfile(req.token._id, payload);
        res.status(201).json({
            result,
            token: yield (0, userToken_1.default)(result),
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}));
profileRouter.post('/create', authMiddleware_1.default, upload_1.uploadLogo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const files = req.files;
    try {
        payload.logo = `${files["logo"][0].path}`;
        payload.QRCode = `${payload.businessName}-QR.png`;
        const result = yield profileServiceImpl.createNewProfile(req.token._id, payload);
        res.status(201).json({
            result,
            token: yield (0, userToken_1.default)(result),
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}));
profileRouter.put('/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const payload = req.body;
    const result = yield profileServiceImpl.update(id, payload);
    return res.status(201).send(result);
}));
profileRouter.delete('/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const result = yield profileServiceImpl.deleteById(id);
    return res.status(204).send({
        success: result
    });
}));
exports.default = profileRouter;
