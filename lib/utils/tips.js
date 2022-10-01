"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const formatter_1 = require("./formatter");
const CMD = 'syncing';
const version = '1.1.0';
const notDirectory = (dir) => {
    return `${dir} is not a directory`;
};
const cannotAccess = (path) => {
    return `cannot access ${path}`;
};
const setDirectories = (dirList) => {
    return dirList.reduce((prev, dir) => {
        return `${prev}\n   ${(0, colors_1.blue)(dir)}`;
    }, `📂 ${(0, colors_1.yellow)('set directories: ')}`);
};
const showDirectories = (dirList) => {
    return dirList.reduce((prev, dir) => {
        return `${prev}\n   ${(0, colors_1.blue)(dir)}`;
    }, `📂 ${(0, colors_1.yellow)('directories: ')}`);
};
const compareDir = (oldDir, newDir) => {
    let res = `${(0, colors_1.yellow)('Comparing: ')}${newDir}\n`;
    res += `${(0, colors_1.yellow)('       to: ')}${oldDir}`;
    return res;
};
const listAdded = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        let res = `${prev}\n`;
        res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
        res += `${(0, colors_1.green)(diffRes.diffPath)}`;
        return res;
    }, `${(0, colors_1.yellow)('Added:')}`);
};
const listDeleted = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        let res = `${prev}\n`;
        res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
        res += `${(0, colors_1.red)(diffRes.diffPath)}`;
        return res;
    }, `${(0, colors_1.yellow)('Deleted:')}`);
};
const listChanged = (diffList) => {
    return diffList.reduce((prev, diffRes) => {
        let res = `${prev}\n`;
        res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
        res += `${(0, colors_1.blue)(diffRes.diffPath)}`;
        return res;
    }, `${(0, colors_1.yellow)('Changed:')}`);
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
        return list.length > 0 ? `${prev}${!prev ? '' : '\n'}${listFunc(list)}` : prev;
    }, '');
};
const syncDir = (oldDir, newDir) => {
    let res = `${(0, colors_1.yellow)('Syncing: ')}${newDir}\n`;
    res += `${(0, colors_1.yellow)('     to: ')}${oldDir}`;
    return res;
};
const sameDir = '🥳 Two directories are same.';
const dirNotSame = (oldDir, newDir) => {
    let res = (0, formatter_1.toErrorStr)(`Difference exists between:\n`);
    res += `📂 ${oldDir}\n`;
    res += `📂 ${newDir}\n`;
    res += `😘 Sync them using '${CMD} sync' or manually first`;
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
const checkDirBeforeExit = '🔎 Checking directories before exit...';
const dirSameExit = '🥳 All directories are same, well done!';
const dirNotSameExit = (0, formatter_1.toErrorStr)('🤡 Directories are not same, sorry about that.');
const tips = {
    version,
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
    watchingDirList,
    checkDirBeforeExit,
    dirSameExit,
    dirNotSameExit
};
exports.default = tips;
