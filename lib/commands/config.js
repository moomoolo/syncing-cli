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
const path_1 = __importDefault(require("path"));
const appConfig_1 = __importDefault(require("../utils/appConfig"));
const validateDir_1 = __importDefault(require("../utils/validateDir"));
function config() {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = [
            {
                name: 'dirOne',
                type: 'input',
                message: '📂 Input directory one: ',
                validate: (input) => { return (0, validateDir_1.default)(input); },
                filter: (input) => { return path_1.default.resolve(input); },
            },
            {
                name: 'dirTwo',
                type: 'input',
                message: '📂 Input directory two: ',
                validate: (input) => { return (0, validateDir_1.default)(input); },
                filter: (input) => { return path_1.default.resolve(input); },
            }
        ];
        const { dirOne, dirTwo } = yield inquirer_1.default.prompt(questions);
        appConfig_1.default.setDirList([dirOne, dirTwo]);
        console.log(`📂 ${chalk_1.default.yellow('set directories: ')}`);
        console.log(`   ${chalk_1.default.blueBright(dirOne)}`);
        console.log(`   ${chalk_1.default.blueBright(dirTwo)}`);
    });
}
exports.default = config;
