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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const logger_1 = require("./logger");
function checkDir(dir) {
    try {
        if (!fs.lstatSync(dir).isDirectory()) {
            (0, logger_1.error)(`${dir} is not a directory`);
            return false;
        }
    }
    catch (_a) {
        (0, logger_1.error)(`${dir} is not a directory`);
        return false;
    }
    try {
        fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK);
    }
    catch (_b) {
        (0, logger_1.error)(`cannot access ${dir}`);
        return false;
    }
    return true;
}
exports.default = checkDir;
