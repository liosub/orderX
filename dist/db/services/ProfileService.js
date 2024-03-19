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
exports.deleteById = exports.update = exports.getById = exports.getByEmail = exports.findOrCreate = exports.create = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProfileCount = yield Profile_1.default.destroy({
        where: { profile_id: id }
    });
    return !!deletedProfileCount;
});
exports.deleteById = deleteById;
