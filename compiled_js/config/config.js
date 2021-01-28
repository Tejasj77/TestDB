"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MYSQL_DB_PORT = process.env.MYSQL_DB_PORT || 3306;
var MYSQL_DB_DATABASE = process.env.MYSQL_DB_DATABASE || 'mydb';
var MYSQL_DB_HOSTNAME = process.env.MYSQL_DB_HOSTNAME || 'root';
var MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD || 'tejasjoshi';
var MYSQL = {
    host: MYSQL_DB_HOSTNAME,
    db: MYSQL_DB_DATABASE,
    port: MYSQL_DB_PORT,
    password: MYSQL_DB_PASSWORD
};
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER_PORT = process.env.SERVER_PORT || 8000;
var SERVER = {
    host: SERVER_HOSTNAME,
    port: SERVER_PORT
};
var config = {
    mysql: MYSQL,
    server: SERVER
};
exports.default = config;
