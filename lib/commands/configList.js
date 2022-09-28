"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = __importDefault(require("../utils/appConfig"));
const tips_1 = __importDefault(require("../utils/tips"));
function configList() {
    const dirList = appConfig_1.default.getDirList();
    if (dirList) {
        console.log(tips_1.default.showDirectories(dirList));
    }
}
exports.default = configList;
