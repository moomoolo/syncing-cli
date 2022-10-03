"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSync = exports.logDeleteFile = exports.logDeleteDir = exports.logAddFile = exports.logAddDir = exports.logChange = exports.logError = void 0;
const colors_1 = require("./colors");
const formatter_1 = require("./formatter");
const log = console.log;
function logError(msg) {
    log(`${(0, formatter_1.formatTime)(new Date())} |${(0, colors_1.red)('ERROR  ')}| ${msg}`);
}
exports.logError = logError;
function logChange(name, parent, type) {
    let res = `${(0, formatter_1.formatTime)(new Date())} |${(0, colors_1.cyan)('CHANGE ')}| `;
    res += `${type === 'file' ? '📃' : '📂'} ${name} in ${(0, colors_1.cyan)(parent)}`;
    log(res);
}
exports.logChange = logChange;
function logAddDir(name, parent) {
    log(`${(0, formatter_1.formatTime)(new Date())} |${(0, colors_1.green)('ADDDIR ')}| 📂 ${name} in ${(0, colors_1.cyan)(parent)}`);
}
exports.logAddDir = logAddDir;
function logAddFile(name, parent) {
    log(`${(0, formatter_1.formatTime)(new Date())} |${(0, colors_1.green)('ADDFILE')}| 📃 ${name} in ${(0, colors_1.cyan)(parent)}`);
}
exports.logAddFile = logAddFile;
function logDeleteDir(name, parent) {
    log(`${(0, formatter_1.formatTime)(new Date())} |${(0, colors_1.red)('DELDIR ')}| 📂 ${name} in ${(0, colors_1.cyan)(parent)}`);
}
exports.logDeleteDir = logDeleteDir;
function logDeleteFile(name, parent) {
    log(`${(0, formatter_1.formatTime)(new Date())} |${(0, colors_1.red)('DELFILE')}| 📃 ${name} in ${(0, colors_1.cyan)(parent)}`);
}
exports.logDeleteFile = logDeleteFile;
function logSync(name, parent, type) {
    let res = `${(0, formatter_1.formatTime)(new Date())} |${(0, colors_1.yellow)('SYNC   ')}| `;
    res += `${type === 'file' ? '📃' : '📂'} ${name} to ${(0, colors_1.cyan)(parent)}`;
    log(res);
}
exports.logSync = logSync;
