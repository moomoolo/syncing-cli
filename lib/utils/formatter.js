"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTrimTime = exports.appendModifyTime = exports.formatTime = exports.toErrorStr = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
function toErrorStr(msg) {
    return `${chalk_1.default.red('ERROR')} ${msg}`;
}
exports.toErrorStr = toErrorStr;
function formatTime(date) {
    let res = `${date.toLocaleString('en-US', { year: 'numeric' })}-`;
    res += `${date.toLocaleString('en-US', { month: '2-digit' })}-`;
    res += `${date.toLocaleString('en-US', { day: '2-digit' })} `;
    res += `${date.toLocaleString('en-US', { hour: '2-digit', hourCycle: 'h24' })}:`;
    res += `${date.toLocaleString('en-US', { minute: '2-digit' })}:`;
    res += date.toLocaleString('en-US', { second: '2-digit' });
    return res;
}
exports.formatTime = formatTime;
function appendModifyTime(dirList) {
    return dirList.map((dir) => {
        const modifyTime = new Date((0, fs_1.lstatSync)(dir).mtime);
        const coloredModifiTime = chalk_1.default.grey(`(last modify: ${formatTime(modifyTime)})`);
        return `${dir} ${coloredModifiTime}`;
    });
}
exports.appendModifyTime = appendModifyTime;
function findTrimTime(dirList, dirWithTime) {
    return dirList.find((dir) => {
        return dirWithTime.indexOf(dir) === 0;
    });
}
exports.findTrimTime = findTrimTime;
