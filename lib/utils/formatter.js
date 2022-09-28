"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendModifyTime = exports.toErrorStr = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
function toErrorStr(msg) {
    return `${chalk_1.default.red('ERROR')} ${msg}`;
}
exports.toErrorStr = toErrorStr;
function appendModifyTime(dirList) {
    return dirList.map((dir) => {
        const modifyTime = new Date((0, fs_1.lstatSync)(dir).mtime);
        const coloredModifiTime = chalk_1.default.grey(`(last modify: ${modifyTime.toLocaleString()})`);
        return `${dir} ${coloredModifiTime}`;
    });
}
exports.appendModifyTime = appendModifyTime;
