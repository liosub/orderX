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
exports.deleteById = exports.update = exports.getByProfileId = exports.getById = exports.create = exports.createOrUpdateManyItems = void 0;
const Items_1 = __importStar(require("../models/Items"));
const dotenv_1 = __importDefault(require("dotenv"));
const Menu_1 = __importDefault(require("../models/Menu"));
dotenv_1.default.config();
function menuItemsFormatter(payload, images, menu_id) {
    var _a;
    const itemsX = [];
    for (var i = 0; i < payload.sections.length; i++) {
        let section = JSON.parse(payload.sections[i]);
        var j = 0;
        section === null || section === void 0 ? void 0 : section.items.forEach((it) => {
            const item = {
                menu_id: menu_id,
                sectionTitle: section.title,
                sectionDescription: section.details,
                title: "",
                description: "",
                price: 0,
                allergens: "",
                specialOffer: 0.0,
                itemState: Items_1.ItemState.AVAILABLE,
                image: "",
                additionalFields: ""
            };
            if (it.item_id) {
                item.item_id = it.item_id;
            }
            item.title = it.title;
            item.description = it.description;
            item.price = it.price || 0.0;
            item.additionalFields = JSON.stringify(it.additionalFields);
            item.image = (it.item_image != null) ? it.item_image : "none";
            item.allergens = it.allergens || "";
            item.itemState = (it.itemState == 0) ? Items_1.ItemState.SOLD_OUT : Items_1.ItemState.AVAILABLE;
            itemsX.push(item);
        });
    }
    var i = 0;
    for (var j = 0; j < itemsX.length; j++) {
        if (itemsX[j].image == "none") {
            itemsX[j].image = (_a = images["images"][i]) === null || _a === void 0 ? void 0 : _a.path;
            i++;
        }
    }
    return itemsX;
}
const createOrUpdateManyItems = (payload, images, menu_id) => __awaiter(void 0, void 0, void 0, function* () {
    const newItems = menuItemsFormatter(payload, images, menu_id);
    if (newItems.length > 0) {
        const item = yield Items_1.default.bulkCreate(newItems, { updateOnDuplicate: ["item_id"] });
        return item;
    }
    return [];
});
exports.createOrUpdateManyItems = createOrUpdateManyItems;
const create = (payload, profile_id) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = {
        menuTitle: "",
        menuDetails: "",
        accent: "",
        font: "",
        profile_id: 0
    };
    menu.menuTitle = payload === null || payload === void 0 ? void 0 : payload.menu_title;
    menu.menuDetails = payload === null || payload === void 0 ? void 0 : payload.menu_details;
    menu.accent = payload === null || payload === void 0 ? void 0 : payload.accent;
    menu.font = payload === null || payload === void 0 ? void 0 : payload.font;
    menu.profile_id = profile_id;
    if ((payload === null || payload === void 0 ? void 0 : payload.menu_id) > 0) {
        const existMenu = yield Menu_1.default.findByPk(payload.menu_id);
        const updatedMenu = (yield (existMenu === null || existMenu === void 0 ? void 0 : existMenu.update(menu))) || {};
        return updatedMenu;
    }
    else {
        const newMenu = yield Menu_1.default.create(menu);
        return newMenu;
    }
});
exports.create = create;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield Menu_1.default.findByPk(id);
    if (!menu) {
        throw new Error('not found');
    }
    return menu;
});
exports.getById = getById;
const getByProfileId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield Menu_1.default.findOne({
        where: { profile_id: id },
    });
    if (!menu) {
        //@todo throw custom error
        throw new Error('not found');
    }
    return menu;
});
exports.getByProfileId = getByProfileId;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield Menu_1.default.findByPk(id);
    if (!menu) {
        //@todo throw custom error
        throw new Error('not found');
    }
    return menu.update(payload);
});
exports.update = update;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const numDeletedMenus = yield Menu_1.default.destroy({
        where: { menu_id: id }
    });
    return !!numDeletedMenus;
});
exports.deleteById = deleteById;
