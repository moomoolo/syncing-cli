"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const notDirectory = (dir) => {
    return `${dir} is not a directory`;
};
const cannotAccess = (path) => {
    return `cannot access ${path}`;
};
const setDirectories = (dirList) => {
    return dirList.reduce((prev, dir) => {
        return `${prev}\n   ${chalk_1.default.blueBright(dir)}`;
    }, `📂 ${chalk_1.default.yellow('set directories: ')}`);
};
const showDirectories = (dirList) => {
    return dirList.reduce((prev, dir) => {
        return `${prev}\n   ${chalk_1.default.blueBright(dir)}`;
    }, `📂 ${chalk_1.default.yellow('directories: ')}`);
};
const compareDir = (oldDir, newDir) => {
    return `${chalk_1.default.yellow('Comparing: ')}${newDir}\n${chalk_1.default.yellow('       to: ')}${oldDir}`;
};
const addedList = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk_1.default.green(diffRes.diffPath)}`;
    }, `${chalk_1.default.yellow('Added:')}`);
};
const deletedList = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk_1.default.red(diffRes.diffPath)}`;
    }, `${chalk_1.default.yellow('Deleted:')}`);
};
const changedList = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk_1.default.blue(diffRes.diffPath)}`;
    }, `${chalk_1.default.yellow('Changed:')}`);
};
const tips = {
    notDirectory,
    cannotAccess,
    setDirectories,
    showDirectories,
    compareDir,
    addedList,
    deletedList,
    changedList
};
exports.default = tips;
