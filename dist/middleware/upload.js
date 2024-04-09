"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadItmes = exports.uploadLogo = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `any-${file.originalname}`);
    },
});
const storageX = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/items");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-any-${file.originalname}`);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).fields([
    {
        name: 'logo',
        maxCount: 1
    },
    {
        name: 'bannerImage',
        maxCount: 1
    }
]);
exports.uploadLogo = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).fields([
    {
        name: 'logo',
        maxCount: 1
    }
]);
exports.uploadItmes = (0, multer_1.default)({ storage: storageX, fileFilter: fileFilter }).fields([
    {
        name: 'images',
        maxCount: 5
    }
]);
