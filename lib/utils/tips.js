"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const formatter_1 = require("./formatter");
const CMD = 'syncing';
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
const listAdded = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk_1.default.green(diffRes.diffPath)}`;
    }, `${chalk_1.default.yellow('Added:')}`);
};
const listDeleted = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk_1.default.red(diffRes.diffPath)}`;
    }, `${chalk_1.default.yellow('Deleted:')}`);
};
const listChanged = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk_1.default.blue(diffRes.diffPath)}`;
    }, `${chalk_1.default.yellow('Changed:')}`);
};
const configDirListFirst = (0, formatter_1.toErrorStr)(`Directories not configured, please config directories using '${CMD} config' first`);
const dirDiffResult = (diffResult) => {
    const { addedList, deletedList, changedList } = diffResult;
    const lists = [addedList, deletedList, changedList];
    return [listAdded, listDeleted, listChanged].reduce((prev, listFunc, i) => {
        const list = lists[i];
        return list.length > 0 ? `${prev}\n${listFunc(list)}` : prev;
    }, '');
};
const tips = {
    notDirectory,
    cannotAccess,
    setDirectories,
    showDirectories,
    compareDir,
    listAdded,
    listDeleted,
    listChanged,
    dirDiffResult,
    configDirListFirst
};
exports.default = tips;
