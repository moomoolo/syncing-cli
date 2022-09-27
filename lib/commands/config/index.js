"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configList = exports.config = void 0;
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const readlineSync = __importStar(require("readline-sync"));
const appConfig_1 = __importDefault(require("../../utils/appConfig"));
const checkDir_1 = __importDefault(require("../../utils/checkDir"));
function config() {
    const dirList = [];
    const dirOne = path_1.default.resolve(readlineSync.question('📂 Input directory one: '));
    if (!(0, checkDir_1.default)(dirOne)) {
        return;
    }
    dirList.push(dirOne);
    console.log(`   added directory ${path_1.default.resolve(dirOne)}`);
    const dirTwo = path_1.default.resolve(readlineSync.question('📂 Input directory two: '));
    if (!(0, checkDir_1.default)(dirTwo)) {
        return;
    }
    dirList.push(dirTwo);
    console.log(`   added directory ${path_1.default.resolve(dirTwo)}`);
    appConfig_1.default.setDirList(dirList);
}
exports.config = config;
function configList() {
    console.log(`📂 ${chalk_1.default.yellow('directories: ')}`);
    const dirList = appConfig_1.default.getDirList();
    if (dirList) {
        dirList.forEach((dir) => {
            console.log(`   ${dir}`);
        });
    }
}
exports.configList = configList;
