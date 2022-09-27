#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const config_1 = require("./commands/config");
function main() {
    commander_1.program
        .command('config')
        .description('config syncing')
        .action(config_1.config)
        .command('list')
        .description('list all config')
        .action(config_1.configList);
    commander_1.program.parse();
}
main();
