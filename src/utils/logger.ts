import chalk from 'chalk';

const log = console.log;

export function logError(msg: string) {
  log(`${new Date().toLocaleString()} |${chalk.red('ERROR  ')}| ${msg}`);
}

export function logChange(name: string, parent: string, type: 'file' | 'directory') {
  let res = `${new Date().toLocaleString()} |${chalk.blue('CHANGE ')}| `;
  res += `${type === 'file' ? '📃' : '📂'} ${name} in ${chalk.blue(parent)}`;
  log(res);
}

export function logAddDir(name: string, parent: string) {
  log(
    `${new Date().toLocaleString()} |${chalk.green('ADDDIR ')}| 📂 ${name} in ${chalk.blue(parent)}`
  );
}

export function logAddFile(name: string, parent: string) {
  log(
    `${new Date().toLocaleString()} |${chalk.green('ADDFILE')}| 📃 ${name} in ${chalk.blue(parent)}`
  );
}

export function logDeleteDir(name: string, parent: string) {
  log(
    `${new Date().toLocaleString()} |${chalk.red('DELDIR ')}| 📂 ${name} in ${chalk.blue(parent)}`
  );
}

export function logDeleteFile(name: string, parent: string) {
  log(
    `${new Date().toLocaleString()} |${chalk.red('DELFILE')}| 📃 ${name} in ${chalk.blue(parent)}`
  );
}

export function logSync(name: string, parent: string, type: 'file' | 'directory') {
  let res = `${new Date().toLocaleString()} |${chalk.yellow('SYNC   ')}| `;
  res += `${type === 'file' ? '📃' : '📂'} ${name} to ${chalk.blue(parent)}`;
  log(res);
}
