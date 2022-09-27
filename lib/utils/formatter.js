"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toErrorStr = void 0;
const chalk_1 = __importDefault(require("chalk"));
function toErrorStr(msg) {
    return `${chalk_1.default.red('ERROR')} ${msg}`;
}
exports.toErrorStr = toErrorStr;
