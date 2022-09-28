"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = __importDefault(require("./appConfig"));
const tips_1 = __importDefault(require("./tips"));
const validateDir_1 = __importDefault(require("./validateDir"));
function checkDirList() {
    const dirList = appConfig_1.default.getDirList();
    if (!dirList || dirList.length === 0) {
        console.log(tips_1.default.configDirListFirst);
        process.exit(0);
    }
    dirList.forEach((dir) => {
        const res = (0, validateDir_1.default)(dir);
        if (res !== true) {
            console.log(res);
            process.exit(0);
        }
    });
}
exports.default = checkDirList;
