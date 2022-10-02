"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffFiles = void 0;
const diff_1 = require("diff");
const fs_1 = require("fs");
function diffFiles(oldFile, newFile) {
    const oldContent = oldFile ? (0, fs_1.readFileSync)(oldFile, 'utf-8') : '';
    const newContent = newFile ? (0, fs_1.readFileSync)(newFile, 'utf-8') : '';
    const diffList = (0, diff_1.diffLines)(oldContent, newContent);
    let same = true;
    for (const diff of diffList) {
        if (diff.added || diff.removed) {
            same = false;
            break;
        }
    }
    return {
        same,
        diffList
    };
}
exports.diffFiles = diffFiles;
