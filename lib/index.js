#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const config_1 = __importDefault(require("./commands/config"));
const configList_1 = __importDefault(require("./commands/configList"));
const diff_1 = __importDefault(require("./commands/diff"));
function main() {
    commander_1.program
        .command('config')
        .description('config syncing')
        .action(config_1.default)
        .command('list')
        .description('list all config')
        .action(configList_1.default);
    commander_1.program
        .command('diff')
        .description('show diff between two directories')
        .option("-o, --order", 'choose compare order')
        .action(diff_1.default);
    commander_1.program.parse();
}
main();
