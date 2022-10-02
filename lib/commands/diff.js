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
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const appConfig_1 = __importDefault(require("../utils/appConfig"));
const checkDirList_1 = __importDefault(require("../utils/checkDirList"));
const diffDirectories_1 = __importDefault(require("../utils/diffDirectories"));
const formatter_1 = require("../utils/formatter");
const tips_1 = __importDefault(require("../utils/tips"));
function diff(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { latest, verbose } = options;
        (0, checkDirList_1.default)();
        if (latest) {
            yield diffLatest(verbose);
        }
        else {
            diffDefault(verbose);
        }
    });
}
exports.default = diff;
function diffDefault(verbose = false) {
    const [oldDir, newDir] = appConfig_1.default.getDirList();
    console.log(tips_1.default.compareDir(oldDir, newDir));
    console.log(tips_1.default.dirDiffResult((0, diffDirectories_1.default)(oldDir, newDir, { verbose }), verbose));
}
function diffLatest(verbose = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirList = appConfig_1.default.getDirList();
        const questions = [
            {
                name: 'newDirWithTime',
                type: 'list',
                message: `📂 ${chalk_1.default.yellow('Choose new directory: ')}`,
                choices: (0, formatter_1.appendModifyTime)(dirList)
            }
        ];
        const { newDirWithTime } = (yield inquirer_1.default.prompt(questions));
        const newDir = (0, formatter_1.findTrimTime)(dirList, newDirWithTime);
        const oldDir = dirList.find((dir) => dir !== newDir);
        console.log(tips_1.default.compareDir(oldDir, newDir));
        console.log(tips_1.default.dirDiffResult((0, diffDirectories_1.default)(oldDir, newDir, { verbose }), verbose));
    });
}
