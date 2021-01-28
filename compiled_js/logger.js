"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTimeStamp = function () {
    return new Date().toISOString();
};
var info = function (namespace, message, object) {
    console.info("[" + getTimeStamp() + "] [INFO] [" + namespace + "] [" + message + "]", object);
};
var warn = function (namespace, message, object) {
    console.warn("[" + getTimeStamp() + "] [WARN] [" + namespace + "] [" + message + "]", object);
};
var error = function (namespace, message, object) {
    console.error("[" + getTimeStamp() + "] [ERROR] [" + namespace + "] [" + message + "]", object);
};
var debug = function (namespace, message, object) {
    console.debug("[" + getTimeStamp() + "] [DEBUG] [" + namespace + "] [" + message + "]", object);
};
exports.default = {
    info: info,
    warn: warn,
    error: error,
    debug: debug
};
