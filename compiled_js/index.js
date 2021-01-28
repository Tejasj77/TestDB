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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {Db} from './models/db'
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logger_1 = __importDefault(require("./logger"));
var config_1 = __importDefault(require("./config/config"));
var homeRouter_1 = __importDefault(require("./router/homeRouter"));
var NAMESPACE = 'SERVER';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var app;
        return __generator(this, function (_a) {
            app = express_1.default()
                /** Logging the request */
                .use(function (req, res, next) {
                logger_1.default.info("" + NAMESPACE, " [METHOD]: " + req.method + " using " + req.url + " on " + req.socket.remoteAddress);
                res.on('finish', function () {
                    logger_1.default.info("" + NAMESPACE, " [METHOD]: " + req.method + " using             " + req.url + " on " + req.socket.remoteAddress + ",[STATUS]:" + res.statusCode);
                });
                next();
            })
                /** Body Parsing */
                .use(body_parser_1.default.urlencoded({ extended: false }))
                .use(body_parser_1.default.json())
                /** Roules of API */
                .use(function (req, res, next) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
                if (req.method == 'OPTIONS') {
                    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
                    return res.status(200).json({});
                }
                next();
            })
                /** Routes */
                .use('/', homeRouter_1.default)
                /** Error Handling */
                .use(function (req, res, next) {
                var err = new Error('Not Found');
                return res.status(404).json({
                    message: err.message
                });
            })
                /** Creating a server */
                .listen(config_1.default.server.port, function () {
                logger_1.default.info(NAMESPACE, "Server is running on " + config_1.default.server.host + ":" + config_1.default.server.port);
            });
            return [2 /*return*/];
        });
    });
}
main().then(function () { return logger_1.default.info("" + NAMESPACE, 'Starting'); })
    .catch(function () { return logger_1.default.error("" + NAMESPACE, 'App Crashed'); });
