import chalk from 'chalk';

const log = console.log;

export function logError(msg: string) {
  log(`${new Date().toISOString()} |${chalk.red('ERROR')}| ${msg}`);
}
