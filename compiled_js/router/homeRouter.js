"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var homeController_1 = __importDefault(require("../controller/homeController"));
var Router = express_1.default.Router();
Router.get('/', homeController_1.default.home);
Router.get('/test', homeController_1.default.test);
exports.default = Router;
