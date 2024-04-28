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
exports.getBySection = exports.getAllForGuest = exports.getAll = exports.deleteById = exports.update = exports.getById = exports.create = void 0;
const Items_1 = __importDefault(require("../models/Items"));
const dotenv_1 = __importDefault(require("dotenv"));
const Menu_1 = __importDefault(require("../models/Menu"));
dotenv_1.default.config();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield Items_1.default.create(payload);
    return item;
});
exports.create = create;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield Items_1.default.findByPk(id);
    if (!item) {
        //@todo throw custom error
        throw new Error('not found');
    }
    return item;
});
exports.getById = getById;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield Items_1.default.findByPk(id);
    if (!item) {
        //@todo throw custom error
        throw new Error('not found');
    }
    return item.update(payload);
});
exports.update = update;
const deleteById = (menu_id, itemsIds) => __awaiter(void 0, void 0, void 0, function* () {
    itemsIds.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        yield Items_1.default.destroy({
            where: {
                menu_id: menu_id,
                item_id: item
            }
        });
    }));
    return;
});
exports.deleteById = deleteById;
const getAll = (menu_id) => __awaiter(void 0, void 0, void 0, function* () {
    return Items_1.default.findAll({
        where: {
            menu_id: menu_id
        }
    });
});
exports.getAll = getAll;
const getAllForGuest = (menu_id) => __awaiter(void 0, void 0, void 0, function* () {
    return Items_1.default.findAll({
        include: [{ model: Menu_1.default, attributes: ["menuTitle", "menuDetails"] }],
        attributes: ["sectionTitle", "sectionDescription", "item_id", "title", "description", "image", "price", "itemState", "additionalFields", "allergens"],
        where: {
            menu_id: menu_id
        },
    });
});
exports.getAllForGuest = getAllForGuest;
const getBySection = (section) => __awaiter(void 0, void 0, void 0, function* () {
    return Items_1.default.findAll({
        where: {
            sectionTitle: section
        },
    });
});
exports.getBySection = getBySection;
