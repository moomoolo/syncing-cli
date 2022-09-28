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
const tips_1 = __importDefault(require("./tips"));
function diffDirectories(oldDir, newDir) {
    console.log(tips_1.default.compareDir(oldDir, newDir));
    const compOptions = {
        compareContent: true,
        compareFileSync: dircompare.fileCompareHandlers.lineBasedFileCompare.compareSync
    };
    const res = dircompare.compareSync(oldDir, newDir, compOptions);
    return {
        same: res.same,
        addedList: getAddedList(res),
        deletedList: getDeletedList(res),
        changedList: getChangedList(res)
    };
}
exports.default = diffDirectories;
const getAddedList = (res) => {
    return res.diffSet
        .filter((diff) => {
        return diff.state === 'right';
    })
        .map((diff) => {
        const { relativePath, name2, type2 } = diff;
        return {
            // remove '/' at the beginning
            diffPath: path_1.default.join(relativePath, name2).substring(1),
            type: type2
        };
    });
};
const getDeletedList = (res) => {
    return res.diffSet
        .filter((diff) => {
        return diff.state === 'left';
    })
        .map((diff) => {
        const { relativePath, name1, type1 } = diff;
        return {
            // remove '/' at the beginning
            diffPath: path_1.default.join(relativePath, name1).substring(1),
            type: type1
        };
    });
};
const getChangedList = (res) => {
    return res.diffSet
        .filter((diff) => {
        return diff.state === 'distinct';
    })
        .map((diff) => {
        const { relativePath, name1, type1 } = diff;
        return {
            // remove '/' at the beginning
            diffPath: path_1.default.join(relativePath, name1).substring(1),
            type: type1
        };
    });
};
