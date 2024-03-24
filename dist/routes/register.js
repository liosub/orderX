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
const profileServiceImpl = __importStar(require("../db/services/ProfileServiceImpl"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userToken_1 = __importDefault(require("../middleware/userToken"));
const registerRouter = (0, express_1.Router)();
registerRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield profileServiceImpl.create(payload);
    if (result) {
        res.status(201).json({
            result,
            token: yield (0, userToken_1.default)(result),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
registerRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield profileServiceImpl.getByEmail(payload.email);
    const passwordMatch = (yield bcrypt_1.default.compare(payload.password, result.password));
    if (result && passwordMatch) {
        res.json({
            businessName: result.businessName,
            email: result.email,
            token: yield (0, userToken_1.default)(result),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
}));
exports.default = registerRouter;
