"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
function error(msg) {
    log(`${chalk_1.default.red('ERROR')} ${msg}`);
}
exports.error = error;
