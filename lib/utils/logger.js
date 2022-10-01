"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSync = exports.logDeleteFile = exports.logDeleteDir = exports.logAddFile = exports.logAddDir = exports.logChange = exports.logError = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
function logError(msg) {
    log(`${new Date().toLocaleString()} |${chalk_1.default.red('ERROR  ')}| ${msg}`);
}
exports.logError = logError;
function logChange(name, parent, type) {
    let res = `${new Date().toLocaleString()} |${chalk_1.default.blue('CHANGE ')}| `;
    res += `${type === 'file' ? '📃' : '📂'} ${name} in ${chalk_1.default.blue(parent)}`;
    log(res);
}
exports.logChange = logChange;
function logAddDir(name, parent) {
    log(`${new Date().toLocaleString()} |${chalk_1.default.green('ADDDIR ')}| 📂 ${name} in ${chalk_1.default.blue(parent)}`);
}
exports.logAddDir = logAddDir;
function logAddFile(name, parent) {
    log(`${new Date().toLocaleString()} |${chalk_1.default.green('ADDFILE')}| 📃 ${name} in ${chalk_1.default.blue(parent)}`);
}
exports.logAddFile = logAddFile;
function logDeleteDir(name, parent) {
    log(`${new Date().toLocaleString()} |${chalk_1.default.red('DELDIR ')}| 📂 ${name} in ${chalk_1.default.blue(parent)}`);
}
exports.logDeleteDir = logDeleteDir;
function logDeleteFile(name, parent) {
    log(`${new Date().toLocaleString()} |${chalk_1.default.red('DELFILE')}| 📃 ${name} in ${chalk_1.default.blue(parent)}`);
}
exports.logDeleteFile = logDeleteFile;
function logSync(name, parent, type) {
    let res = `${new Date().toLocaleString()} |${chalk_1.default.yellow('SYNC   ')}| `;
    res += `${type === 'file' ? '📃' : '📂'} ${name} to ${chalk_1.default.blue(parent)}`;
    log(res);
}
exports.logSync = logSync;
