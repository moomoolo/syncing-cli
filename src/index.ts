#! /usr/bin/env node

import { program } from 'commander';
import config from './commands/config';
import configList from './commands/configList';
import diff from './commands/diff';
import sync from './commands/sync';

function main() {
  program
    .command('config')
    .description('config syncing')
    .action(config)
    .command('list')
    .description('list all config')
    .action(configList);
  program
    .command('diff')
    .description('show diff between two directories')
    .option('-o, --order', 'choose compare order')
    .action(diff);
  program.command('sync').description('sync directories').action(sync);
  program.parse();
}

main();
