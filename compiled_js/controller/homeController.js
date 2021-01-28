"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home = function (req, res, next) {
    res.send('Hello');
};
var test = function (req, res, next) {
    res.send('Testing');
};
exports.default = {
    home: home,
    test: test
};
