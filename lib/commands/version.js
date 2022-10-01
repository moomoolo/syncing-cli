"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
const tips_1 = __importDefault(require("../utils/tips"));
function version() {
    console.log(tips_1.default.version);
}
exports.version = version;
