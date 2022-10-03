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
const sync_1 = __importDefault(require("./commands/sync"));
const watch_1 = require("./commands/watch");
const tips_1 = __importDefault(require("./utils/tips"));
function main() {
    commander_1.program.description('A command line tool for syncing between two folders.').version(tips_1.default.version);
    commander_1.program
        .command('config')
        .description('config syncing')
        .action(config_1.default)
        .command('list')
        .description('list all config')
        .action(configList_1.default);
    commander_1.program
        .command('diff')
        .description('compare two directories in default order')
        .option('-l, --latest', 'choose latest directory')
        .option('-v, --verbose', 'show file difference detail')
        .option('-r, --reverse', 'compare in reverse order')
        .action(diff_1.default);
    commander_1.program.command('sync').description('sync directories').action(sync_1.default);
    commander_1.program
        .command('watch')
        .description('watch and sync file changes between directories')
        .action(watch_1.watch);
    commander_1.program.parse();
}
main();
