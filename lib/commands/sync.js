"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = __importDefault(require("path"));
const appConfig_1 = __importDefault(require("../utils/appConfig"));
const checkDirList_1 = __importDefault(require("../utils/checkDirList"));
const diffDirectories_1 = __importDefault(require("../utils/diffDirectories"));
const formatter_1 = require("../utils/formatter");
const tips_1 = __importDefault(require("../utils/tips"));
function sync() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, checkDirList_1.default)();
        const dirList = appConfig_1.default.getDirList();
        const questions = [
            {
                type: 'list',
                name: 'newDirWithTime',
                message: 'Select latest modified directory: ',
                choices: (0, formatter_1.appendModifyTime)(dirList)
            }
        ];
        const { newDirWithTime } = (yield inquirer_1.default.prompt(questions));
        const newDir = dirList.find((dir) => {
            return newDirWithTime.indexOf(dir) === 0;
        });
        const oldDir = dirList.find((dir) => dir !== newDir);
        syncDir(oldDir, newDir);
    });
}
exports.default = sync;
const syncDir = (oldDir, newDir) => {
    console.log(tips_1.default.syncDir(oldDir, newDir));
    const diffRes = (0, diffDirectories_1.default)(oldDir, newDir);
    const { same, addedList, deletedList, changedList } = diffRes;
    if (same) {
        console.log(tips_1.default.sameDir);
        return;
    }
    // copy added directories and files
    // sort so sub directory won't be created first
    addedList.sort();
    // create directories first
    addedList.forEach((diff) => {
        if (diff.type === 'directory') {
            const destPath = path_1.default.join(oldDir, diff.diffPath);
            (0, fs_1.mkdirSync)(destPath);
        }
    });
    // copy new files
    addedList.forEach((diff) => {
        if (diff.type === 'file') {
            const srcPath = path_1.default.join(newDir, diff.diffPath);
            const destPath = path_1.default.join(oldDir, diff.diffPath);
            (0, fs_1.copyFileSync)(srcPath, destPath);
        }
    });
    // delete directories and files
    // sort so parent directories won't be deleted first
    deletedList.sort().reverse();
    // delete file first
    deletedList.forEach((diff) => {
        if (diff.type === 'file') {
            const destPath = path_1.default.join(oldDir, diff.diffPath);
            (0, fs_1.rmSync)(destPath);
        }
    });
    // delete directories
    deletedList.forEach((diff) => {
        if (diff.type === 'directory') {
            const destPath = path_1.default.join(oldDir, diff.diffPath);
            (0, fs_1.rmdirSync)(destPath);
        }
    });
    // change files
    changedList.forEach((diff) => {
        const srcPath = path_1.default.join(newDir, diff.diffPath);
        const destPath = path_1.default.join(oldDir, diff.diffPath);
        (0, fs_1.copyFileSync)(srcPath, destPath);
    });
    console.log(tips_1.default.dirDiffResult(diffRes));
};
