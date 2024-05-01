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
exports.deleteById = exports.qrCodeGenerator = exports.createNewProfile = exports.update = exports.getById = exports.getByEmail = exports.findOrCreate = exports.create = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const qrGenerator_1 = require("../../middleware/qrGenerator");
dotenv_1.default.config();
const URI = process.env.URI;
const QR_URI = process.env.QRCODE_URI;
const REACT_APP_STLLR_URL = process.env.REACT_APP_STLLR_URL;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedUserPassword = yield bcrypt_1.default.hash(payload.password, 10);
    payload.password = encryptedUserPassword;
    const profile = yield Profile_1.default.create(payload);
    return profile;
});
exports.create = create;
const findOrCreate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedUserPassword = yield bcrypt_1.default.hash(payload.password, 10);
    payload.password = encryptedUserPassword;
    const [profile] = yield Profile_1.default.findOrCreate({
        where: {
            email: payload.email
        },
        defaults: payload
    });
    return profile;
});
exports.findOrCreate = findOrCreate;
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield Profile_1.default.findOne({
        where: {
            email: email
        },
    });
    if (!profile) {
        throw new Error('not found');
    }
    return profile;
});
exports.getByEmail = getByEmail;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield Profile_1.default.findByPk(id);
    if (!profile) {
        // @todo throw custom error
        throw new Error('not found');
    }
    return profile;
});
exports.getById = getById;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield Profile_1.default.findByPk(id);
    if (!profile) {
        // @todo throw custom error
        throw new Error('not found');
    }
    const updateProfile = yield profile.update(payload);
    return updateProfile;
});
exports.update = update;
const createNewProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield Profile_1.default.findByPk(id);
    if (!profile) {
        throw new Error('not found');
    }
    payload.profile_id = profile.profile_id;
    yield (0, exports.qrCodeGenerator)(payload);
    payload.url = `${URI}/menu/${profile.profile_id}`;
    payload.QRCode = `${QR_URI}/${payload.QRCode}`;
    const updateProfile = yield profile.update(payload);
    return updateProfile;
});
exports.createNewProfile = createNewProfile;
const qrCodeGenerator = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const qrCodeName = payload.QRCode || payload.businessName + "QR";
    const url = `${REACT_APP_STLLR_URL}/menu/${payload.profile_id}`;
    var base64str = (0, qrGenerator_1.base64_encode)(payload.logo);
    if (payload.logo) {
        yield (0, qrGenerator_1.createQR)(qrCodeName, url, base64str, 150, 50);
    }
    else {
        throw new Error('missing parameters');
    }
});
exports.qrCodeGenerator = qrCodeGenerator;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProfileCount = yield Profile_1.default.destroy({
        where: { profile_id: id }
    });
    return !!deletedProfileCount;
});
exports.deleteById = deleteById;
