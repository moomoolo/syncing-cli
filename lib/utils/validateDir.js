"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const formatter_1 = require("./formatter");
const tips_1 = __importDefault(require("./tips"));
function validateDir(dirPath) {
    const dir = path_1.default.resolve(dirPath);
    try {
        if (!(0, fs_1.lstatSync)(dir).isDirectory()) {
            return (0, formatter_1.toErrorStr)(tips_1.default.notDirectory(dir));
        }
    }
    catch (_a) {
        return (0, formatter_1.toErrorStr)(tips_1.default.notDirectory(dir));
    }
    try {
        (0, fs_1.accessSync)(dir, fs_1.constants.R_OK | fs_1.constants.W_OK);
    }
    catch (_b) {
        return (0, formatter_1.toErrorStr)(tips_1.default.cannotAccess(dir));
    }
    return true;
}
exports.default = validateDir;
