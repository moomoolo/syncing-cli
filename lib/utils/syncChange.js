"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const logger_1 = require("./logger");
function syncChange(event, name, dirList, currDir) {
    const srcPath = path_1.default.join(currDir, name);
    try {
        if (event === 'add') {
            (0, logger_1.logAddFile)(name, currDir);
            forOther(dirList, currDir, (dir) => {
                const destPath = path_1.default.join(dir, name);
                (0, fs_1.copyFileSync)(srcPath, destPath);
                (0, logger_1.logSync)(name, dir, 'file');
            });
        }
        if (event === 'addDir') {
            (0, logger_1.logAddDir)(name, currDir);
            forOther(dirList, currDir, (dir) => {
                const destPath = path_1.default.join(dir, name);
                (0, fs_1.mkdirSync)(destPath);
                (0, logger_1.logSync)(name, dir, 'directory');
            });
        }
        if (event === 'unlink') {
            (0, logger_1.logDeleteFile)(name, currDir);
            forOther(dirList, currDir, (dir) => {
                const destPath = path_1.default.join(dir, name);
                (0, fs_1.rmSync)(destPath);
                (0, logger_1.logSync)(name, dir, 'file');
            });
        }
        if (event === 'unlinkDir') {
            (0, logger_1.logDeleteDir)(name, currDir);
            forOther(dirList, currDir, (dir) => {
                const destPath = path_1.default.join(dir, name);
                (0, fs_1.rmdirSync)(destPath);
                (0, logger_1.logSync)(name, dir, 'directory');
            });
        }
        if (event === 'change') {
            (0, logger_1.logChange)(name, currDir, 'file');
            forOther(dirList, currDir, (dir) => {
                const destPath = path_1.default.join(dir, name);
                (0, fs_1.copyFileSync)(srcPath, destPath);
                (0, logger_1.logSync)(name, dir, 'file');
            });
        }
    }
    catch (err) {
        (0, logger_1.logError)(err);
        process.exit(1);
    }
}
exports.default = syncChange;
function forOther(list, exclusive, callback) {
    list.forEach((item) => {
        if (item === exclusive) {
            return;
        }
        callback && callback(item);
    });
}
