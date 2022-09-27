"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const appConfig_1 = __importDefault(require("../utils/appConfig"));
function configList() {
    console.log(`📂 ${chalk_1.default.yellow('directories: ')}`);
    const dirList = appConfig_1.default.getDirList();
    if (dirList) {
        dirList.forEach((dir) => {
            console.log(`   ${dir}`);
        });
    }
}
exports.default = configList;
