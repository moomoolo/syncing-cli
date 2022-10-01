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
    let res = `${chalk_1.default.yellow('Comparing: ')}${newDir}\n`;
    res += `${chalk_1.default.yellow('       to: ')}${oldDir}`;
    return res;
};
const listAdded = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        let res = `${prev}\n`;
        res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
        res += `${chalk_1.default.green(diffRes.diffPath)}`;
        return res;
    }, `${chalk_1.default.yellow('Added:')}`);
};
const listDeleted = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        let res = `${prev}\n`;
        res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
        res += `${chalk_1.default.red(diffRes.diffPath)}`;
        return res;
    }, `${chalk_1.default.yellow('Deleted:')}`);
};
const listChanged = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        let res = `${prev}\n`;
        res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
        res += `${chalk_1.default.blue(diffRes.diffPath)}`;
        return res;
    }, `${chalk_1.default.yellow('Changed:')}`);
};
const configDirListFirst = (0, formatter_1.toErrorStr)(`Directories not configured, please config directories using '${CMD} config' first`);
const dirDiffResult = (diffResult) => {
    const { same, addedList, deletedList, changedList } = diffResult;
    if (same) {
        return sameDir;
    }
    const lists = [addedList, deletedList, changedList];
    return [listAdded, listDeleted, listChanged].reduce((prev, listFunc, i) => {
        const list = lists[i];
        return list.length > 0 ? `${prev}${i === 0 ? '' : '\n'}${listFunc(list)}` : prev;
    }, '');
};
const syncDir = (oldDir, newDir) => {
    let res = `${chalk_1.default.yellow('Syncing: ')}${newDir}\n`;
    res += `${chalk_1.default.yellow('     to: ')}${oldDir}`;
    return res;
};
const sameDir = 'Two directories are same.';
const dirNotSame = (oldDir, newDir) => {
    let res = (0, formatter_1.toErrorStr)(`Difference exists between:\n`);
    res += `📂 ${oldDir}\n`;
    res += `📂 ${newDir}\n`;
    res += `Sync them using '${CMD} sync' first`;
    return res;
};
const watchingDirList = (dirList) => {
    if (!dirList || dirList.length === 0) {
        return '';
    }
    return dirList.reduce((prev, dir) => {
        return `${prev}\n  📂 ${dir}`;
    }, `👀 watching:`);
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
    configDirListFirst,
    syncDir,
    sameDir,
    dirNotSame,
    watchingDirList
};
exports.default = tips;
