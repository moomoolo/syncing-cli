"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const formatter_1 = require("./formatter");
function validateDir(dirPath) {
    const dir = node_path_1.default.resolve(dirPath);
    try {
        if (!fs.lstatSync(dir).isDirectory()) {
            return (0, formatter_1.toErrorStr)(`${dir} is not a directory`);
        }
    }
    catch (_a) {
        return (0, formatter_1.toErrorStr)(`${dir} is not a directory`);
    }
    try {
        fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK);
    }
    catch (_b) {
        return (0, formatter_1.toErrorStr)(`cannot access ${dir}`);
    }
    return true;
}
exports.default = validateDir;
