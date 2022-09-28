"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("conf"));
const keyMap = {
    dirList: 'dirList'
};
const config = new conf_1.default();
const setDirList = (dirList) => {
    config.set(keyMap.dirList, dirList);
};
const getDirList = () => {
    return config.get(keyMap.dirList);
};
const appConfig = {
    setDirList,
    getDirList
};
exports.default = appConfig;
