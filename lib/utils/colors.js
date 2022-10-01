"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.green = exports.red = exports.yellow = exports.blue = void 0;
const chalk_1 = __importDefault(require("chalk"));
const blue = (str) => {
    return chalk_1.default.hex('#1196f5')(str);
};
exports.blue = blue;
const yellow = (str) => {
    return chalk_1.default.hex('#f5ea11')(str);
};
exports.yellow = yellow;
const red = (str) => {
    return chalk_1.default.hex('#fa0505')(str);
};
exports.red = red;
const green = (str) => {
    return chalk_1.default.hex('#09eb20')(str);
};
exports.green = green;
