"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const colors_1 = require("./colors");
const formatter_1 = require("./formatter");
const CMD = 'syncing';
const version = '1.2.0';
const notDirectory = (dir) => {
    return `${dir} is not a directory`;
};
const cannotAccess = (path) => {
    return `cannot access ${path}`;
};
const setDirectories = (dirList) => {
    return dirList.reduce((prev, dir) => {
        return `${prev}\n   ${(0, colors_1.cyan)(dir)}`;
    }, `📂 ${(0, colors_1.yellow)('set directories: ')}`);
};
const showDirectories = (dirList) => {
    return dirList.reduce((prev, dir) => {
        return `${prev}\n   ${(0, colors_1.cyan)(dir)}`;
    }, `📂 ${(0, colors_1.yellow)('directories: ')}`);
};
const compareDir = (oldDir, newDir) => {
    let res = `${(0, colors_1.yellow)('Comparing: ')}${newDir}\n`;
    res += `${(0, colors_1.yellow)('       to: ')}${oldDir}`;
    return res;
};
const ellipsis = '...';
const padStartWithChalk = (str, maxLen, chalk, fillString = ' ') => {
    const restLen = maxLen - str.length;
    const repeat = Math.ceil(restLen / fillString.length);
    const restStr = new Array(repeat).fill(fillString).join().substring(0, restLen);
    return `${restStr}${chalk(str)}`;
};
const fileDiff = (diff, paddingStart = '') => {
    const VISIBLE_OFFSET = 3;
    let oldLineCnt = 0;
    let newLineCnt = 0;
    const lineDiffList = diff.reduce((prev, change) => {
        const lines = change.value.split(os_1.EOL);
        // diff keep EOL of every line, and split may cause trailing ''
        if (lines.length !== change.count && lines.length !== change.count + 1) {
            throw new Error(`something wrong with ${JSON.stringify(change)}`);
        }
        if (lines.length === change.count + 1) {
            lines.pop();
        }
        const lineDiffs = lines.map((line) => {
            const res = {
                value: line,
                added: change.added,
                removed: change.removed
            };
            // line number in old file and new file
            if (change.added) {
                newLineCnt++;
                res.newLineNum = newLineCnt;
            }
            else if (change.removed) {
                oldLineCnt++;
                res.oldLineNum = oldLineCnt;
            }
            else {
                newLineCnt++;
                oldLineCnt++;
                res.newLineNum = newLineCnt;
                res.oldLineNum = oldLineCnt;
            }
            return res;
        });
        return [...prev, ...lineDiffs];
    }, []);
    const lineVisible = new Array(lineDiffList.length).fill(false);
    for (let i = 0; i < lineDiffList.length; i++) {
        const lineDiff = lineDiffList[i];
        if (lineDiff.added || lineDiff.removed) {
            for (let j = Math.max(0, i - VISIBLE_OFFSET); j < Math.min(lineDiffList.length, i + VISIBLE_OFFSET + 1); j++) {
                lineVisible[j] = true;
            }
        }
    }
    const diffBlockList = [];
    let maxVisibleOldLine = 0;
    let maxVisibleNewLine = 0;
    for (let i = 0; i < lineVisible.length;) {
        if (lineVisible[i]) {
            const diffList = [];
            while (i < lineVisible.length && lineVisible[i]) {
                const lineDiff = lineDiffList[i];
                diffList.push(lineDiff);
                lineDiff.oldLineNum && (maxVisibleOldLine = lineDiff.oldLineNum);
                lineDiff.newLineNum && (maxVisibleNewLine = lineDiff.newLineNum);
                i++;
            }
            diffBlockList.push({
                omit: false,
                diffList
            });
        }
        else {
            while (i < lineVisible.length && !lineVisible[i]) {
                i++;
            }
            diffBlockList.push({ omit: true, diffList: [] });
        }
    }
    const oldLineNumLen = maxVisibleOldLine > 0 ? maxVisibleOldLine.toString().length : 0;
    const newLineNumLen = maxVisibleNewLine > 0 ? maxVisibleNewLine.toString().length : 0;
    return diffBlockList.reduce((prev, { omit, diffList }) => {
        if (omit) {
            let res = `${prev}${prev ? '\n' : ''}${paddingStart}`;
            oldLineNumLen > 0 && (res += `${''.padStart(oldLineNumLen)} `);
            newLineNumLen > 0 && (res += `${''.padStart(newLineNumLen)} `);
            res += ellipsis;
            return res;
        }
        // get lines to show
        const content = diffList.reduce((prevContent, { oldLineNum, newLineNum, added, removed, value }) => {
            let line = paddingStart;
            if (added) {
                oldLineNumLen > 0 && (line += ''.padStart(oldLineNumLen + 1));
                line += `${padStartWithChalk(newLineNum.toString(), newLineNumLen, colors_1.yellow)} `;
                line += (0, colors_1.green)(value);
            }
            else if (removed) {
                line += `${padStartWithChalk(oldLineNum.toString(), oldLineNumLen, colors_1.yellow)} `;
                newLineNumLen > 0 && (line += ''.padStart(newLineNumLen + 1));
                line += (0, colors_1.red)(value);
            }
            else {
                line += `${padStartWithChalk(oldLineNum.toString(), oldLineNumLen, colors_1.yellow)} `;
                line += `${padStartWithChalk(newLineNum.toString(), newLineNumLen, colors_1.yellow)} ${value}`;
            }
            return `${prevContent}${prevContent ? '\n' : ''}${line}`;
        }, '');
        return `${prev}${prev ? '\n' : ''}${content}`;
    }, '');
};
const listAdded = (diffList, verbose = false) => {
    return diffList.reduce((prev, diffRes) => {
        const { type, diffPath } = diffRes;
        let res = `${prev}\n`;
        res += `  ${type === 'file' ? '📃' : '📂'} `;
        res += `${(0, colors_1.green)(diffPath)}`;
        verbose && type === 'file' && (res += `\n${fileDiff(diffRes.fileDiffList, '  ')}`);
        return res;
    }, `${(0, colors_1.yellow)('Added:')}`);
};
const listDeleted = (diffList, verbose = false) => {
    return diffList.reduce((prev, diffRes) => {
        const { type, diffPath } = diffRes;
        let res = `${prev}\n`;
        res += `  ${type === 'file' ? '📃' : '📂'} `;
        res += `${(0, colors_1.red)(diffPath)}`;
        verbose && type === 'file' && (res += `\n${fileDiff(diffRes.fileDiffList, '  ')}`);
        return res;
    }, `${(0, colors_1.yellow)('Deleted:')}`);
};
const listChanged = (diffList, verbose = false) => {
    return diffList.reduce((prev, diffRes) => {
        const { type, diffPath } = diffRes;
        let res = `${prev}\n`;
        res += `  ${type === 'file' ? '📃' : '📂'} `;
        res += `${(0, colors_1.cyan)(diffPath)}`;
        verbose && type === 'file' && (res += `\n${fileDiff(diffRes.fileDiffList, '  ')}`);
        return res;
    }, `${(0, colors_1.yellow)('Changed:')}`);
};
const configDirListFirst = (0, formatter_1.toErrorStr)(`Directories not configured, please config directories using '${CMD} config' first`);
const dirDiffResult = (diffResult, verbose = false) => {
    const { same, addedList, deletedList, changedList } = diffResult;
    if (same) {
        return sameDir;
    }
    const lists = [addedList, deletedList, changedList];
    return [listAdded, listDeleted, listChanged].reduce((prev, listFunc, i) => {
        const list = lists[i];
        return list.length > 0 ? `${prev}${!prev ? '' : '\n'}${listFunc(list, verbose)}` : prev;
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
    fileDiff,
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
