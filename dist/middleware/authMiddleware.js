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
const models_1 = require("../db/models");
require('dotenv').config();
const ACCESS_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization');
        if (token == undefined || token == '') {
            return res.status(401).json({ error: 'Access denied' });
        }
        if (typeof token != undefined) {
            const bearer = token.split(' ');
            const bearerToken = bearer[1];
            const decoded = jsonwebtoken_1.default.verify(bearerToken, ACCESS_TOKEN_PRIVATE_KEY);
            req.token = decoded;
        }
        console.log(req.token._id);
        const validUser = yield models_1.Profile.findByPk(req.token._id);
        if ((validUser === null || validUser === void 0 ? void 0 : validUser.profile_id) == req.token._id) {
            next();
        }
        else {
            res.status(401).json({ error: 'aunthorized token' });
        }
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});
exports.default = verifyToken;
