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
exports.base64_decode = exports.base64_encode = exports.createQR = void 0;
const QRCode = __importStar(require("qrcode"));
const canvas_1 = require("canvas");
const fs_1 = __importDefault(require("fs"));
function createQR(dataForQRcode, center_image, width, cwidth) {
    return __awaiter(this, void 0, void 0, function* () {
        const canvas = (0, canvas_1.createCanvas)(width, width);
        center_image = "data:image/png;base64," + center_image;
        QRCode.toCanvas(canvas, dataForQRcode, {
            errorCorrectionLevel: "H",
            margin: 1,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        });
        const ctx = canvas.getContext("2d");
        const img = yield (0, canvas_1.loadImage)(center_image);
        const center = (width - cwidth * 1.40) / 2;
        ctx.drawImage(img, center, center, cwidth, cwidth);
        const buffer = canvas.toBuffer("image/png");
        yield fs_1.default.writeFileSync("./public/images/QRcodes/image.png", buffer);
    });
}
exports.createQR = createQR;
function base64_encode(file) {
    var bitmap = fs_1.default.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}
exports.base64_encode = base64_encode;
function base64_decode(imageData) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = imageData.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(data, "base64");
        yield fs_1.default.writeFileSync("image.png", buffer);
    });
}
exports.base64_decode = base64_decode;
