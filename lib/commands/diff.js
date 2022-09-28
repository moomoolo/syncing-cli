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
const diffDirectories_1 = __importDefault(require("../utils/diffDirectories"));
function diff(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options.order) {
            yield diffOrder();
        }
        else {
            diffDefault();
        }
    });
}
exports.default = diff;
function diffDefault() {
    const [dirOne, dirTwo] = appConfig_1.default.getDirList();
    (0, diffDirectories_1.default)(dirOne, dirTwo, { log: true });
}
function diffOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const dirList = appConfig_1.default.getDirList();
        const questions = [
            {
                name: 'newDir',
                type: 'list',
                message: `📂 ${chalk_1.default.yellow('Choose new directory: ')}`,
                choices: dirList
            }
        ];
        const { newDir } = yield inquirer_1.default.prompt(questions);
        const oldDir = dirList.find((dir) => dir !== newDir);
        (0, diffDirectories_1.default)(oldDir, newDir, { log: true });
    });
}
