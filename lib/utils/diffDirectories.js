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
const path_1 = __importDefault(require("path"));
const dircompare = __importStar(require("dir-compare"));
const diffFiles_1 = require("./diffFiles");
function diffDirectories(oldDir, newDir, options = {}) {
    const { verbose } = options;
    const compOptions = {
        compareContent: true,
        compareFileSync: dircompare.fileCompareHandlers.lineBasedFileCompare.compareSync
    };
    const res = dircompare.compareSync(oldDir, newDir, compOptions);
    return {
        same: res.same,
        addedList: getAddedList(res, verbose),
        deletedList: getDeletedList(res, verbose),
        changedList: getChangedList(res, verbose)
    };
}
exports.default = diffDirectories;
const getAddedList = (res, verbose = false) => {
    return res.diffSet
        .filter((diff) => {
        return diff.state === 'right';
    })
        .map((diff) => {
        const { relativePath, name2: newName, path2: newPath, type2: type } = diff;
        const dirDiff = {
            // remove '/' at the beginning
            diffPath: path_1.default.join(relativePath, newName).substring(1),
            type: type
        };
        if (type === 'file' && verbose) {
            const newFilePath = path_1.default.join(newPath, newName);
            dirDiff.fileDiffList = (0, diffFiles_1.diffFiles)('', newFilePath).diffList;
        }
        return dirDiff;
    });
};
const getDeletedList = (res, verbose = false) => {
    return res.diffSet
        .filter((diff) => {
        return diff.state === 'left';
    })
        .map((diff) => {
        const { relativePath, name1: oldName, path1: oldPath, type1: type } = diff;
        const dirDiff = {
            // remove '/' at the beginning
            diffPath: path_1.default.join(relativePath, oldName).substring(1),
            type: type
        };
        if (type === 'file' && verbose) {
            const oldFilePath = path_1.default.join(oldPath, oldName);
            dirDiff.fileDiffList = (0, diffFiles_1.diffFiles)(oldFilePath, '').diffList;
        }
        return dirDiff;
    });
};
const getChangedList = (res, verbose = false) => {
    return res.diffSet
        .filter((diff) => {
        return diff.state === 'distinct';
    })
        .map((diff) => {
        const { relativePath, name1: oldName, name2: newName, path1: oldPath, path2: newPath, type1: type } = diff;
        const dirDiff = {
            // remove '/' at the beginning
            diffPath: path_1.default.join(relativePath, oldName).substring(1),
            type: type
        };
        if (type === 'file' && verbose) {
            const oldFilePath = path_1.default.join(oldPath, oldName);
            const newFilePath = path_1.default.join(newPath, newName);
            dirDiff.fileDiffList = (0, diffFiles_1.diffFiles)(oldFilePath, newFilePath).diffList;
        }
        return dirDiff;
    });
};
