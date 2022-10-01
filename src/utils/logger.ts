import { red, blue, yellow, green } from './colors';

const log = console.log;

export function logError(msg: string) {
  log(`${new Date().toLocaleString()} |${red('ERROR  ')}| ${msg}`);
}

export function logChange(name: string, parent: string, type: 'file' | 'directory') {
  let res = `${new Date().toLocaleString()} |${blue('CHANGE ')}| `;
  res += `${type === 'file' ? '📃' : '📂'} ${name} in ${blue(parent)}`;
  log(res);
}

export function logAddDir(name: string, parent: string) {
  log(`${new Date().toLocaleString()} |${green('ADDDIR ')}| 📂 ${name} in ${blue(parent)}`);
}

export function logAddFile(name: string, parent: string) {
  log(`${new Date().toLocaleString()} |${green('ADDFILE')}| 📃 ${name} in ${blue(parent)}`);
}

export function logDeleteDir(name: string, parent: string) {
  log(`${new Date().toLocaleString()} |${red('DELDIR ')}| 📂 ${name} in ${blue(parent)}`);
}

export function logDeleteFile(name: string, parent: string) {
  log(`${new Date().toLocaleString()} |${red('DELFILE')}| 📃 ${name} in ${blue(parent)}`);
}

export function logSync(name: string, parent: string, type: 'file' | 'directory') {
  let res = `${new Date().toLocaleString()} |${yellow('SYNC   ')}| `;
  res += `${type === 'file' ? '📃' : '📂'} ${name} to ${blue(parent)}`;
  log(res);
}
