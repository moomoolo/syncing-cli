#! /usr/bin/env node

import { program } from 'commander'
import { config, configList } from './commands/config';

function main() {
  program
    .command('config')
    .description('config syncing')
    .action(config)
    .command('list')
    .description('list all config')
    .action(configList)
  program.parse()
}

main();