#! /usr/bin/env node

import { program } from 'commander';
import config from './commands/config';
import configList from './commands/configList';
import diff from './commands/diff';
import sync from './commands/sync';
import { version } from './commands/version';
import { watch } from './commands/watch';

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
    .option('-l, --latest', 'choose latest directory')
    .action(diff);
  program.command('sync').description('sync directories').action(sync);
  program
    .command('watch')
    .description('watch and sync file changes between directories')
    .action(watch);
  program.option('-v, --version').action(version);
  program.parse();
}

main();
