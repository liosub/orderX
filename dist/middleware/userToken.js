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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const ACCESS_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY;
const generateTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = { _id: user.profile_id, businessName: user.businessName };
        const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "2d" });
        return Promise.resolve({ accessToken });
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.default = generateTokens;