"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkDirList_1 = __importDefault(require("../utils/checkDirList"));
function sync() {
    (0, checkDirList_1.default)();
}
exports.default = sync;
