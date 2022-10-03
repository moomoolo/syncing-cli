#! /usr/bin/env node

import { program } from 'commander';
import config from './commands/config';
import configList from './commands/configList';
import diff from './commands/diff';
import sync from './commands/sync';
import { watch } from './commands/watch';
import tips from './utils/tips';

function main() {
  program.description('A command line tool for syncing between two folders.').version(tips.version);
  program
    .command('config')
    .description('config syncing')
    .action(config)
    .command('list')
    .description('list all config')
    .action(configList);
  program
    .command('diff')
    .description('compare two directories in default order')
    .option('-l, --latest', 'choose latest directory')
    .option('-v, --verbose', 'show file difference detail')
    .option('-r, --reverse', 'compare in reverse order')
    .action(diff);
  program.command('sync').description('sync directories').action(sync);
  program
    .command('watch')
    .description('watch and sync file changes between directories')
    .action(watch);
  program.parse();
}

main();
