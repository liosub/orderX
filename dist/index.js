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
exports.start = exports.get = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const init_1 = __importDefault(require("./db/init"));
dotenv_1.default.config();
const port = process.env.PORT;
(0, init_1.default)();
const get = () => {
    const app = (0, express_1.default)();
    // Body parsing Middleware
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.options('*', (0, cors_1.default)());
    app.use((0, morgan_1.default)('tiny'));
    app.use('/public/', express_1.default.static('public'));
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api` });
    }));
    app.use('/api', routes_1.default);
    return app;
};
exports.get = get;
const start = () => {
    const app = (0, exports.get)();
    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(`Error occurred: ${error.message}`);
    }
};
exports.start = start;
(0, exports.start)();
