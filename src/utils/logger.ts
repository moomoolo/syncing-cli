import { red, blue, yellow, green } from './colors';
import { formatTime } from './formatter';

const log = console.log;

export function logError(msg: string) {
  log(`${formatTime(new Date())} |${red('ERROR  ')}| ${msg}`);
}

export function logChange(name: string, parent: string, type: 'file' | 'directory') {
  let res = `${formatTime(new Date())} |${blue('CHANGE ')}| `;
  res += `${type === 'file' ? '📃' : '📂'} ${name} in ${blue(parent)}`;
  log(res);
}

export function logAddDir(name: string, parent: string) {
  log(`${formatTime(new Date())} |${green('ADDDIR ')}| 📂 ${name} in ${blue(parent)}`);
}

export function logAddFile(name: string, parent: string) {
  log(`${formatTime(new Date())} |${green('ADDFILE')}| 📃 ${name} in ${blue(parent)}`);
}

export function logDeleteDir(name: string, parent: string) {
  log(`${formatTime(new Date())} |${red('DELDIR ')}| 📂 ${name} in ${blue(parent)}`);
}

export function logDeleteFile(name: string, parent: string) {
  log(`${formatTime(new Date())} |${red('DELFILE')}| 📃 ${name} in ${blue(parent)}`);
}

export function logSync(name: string, parent: string, type: 'file' | 'directory') {
  let res = `${formatTime(new Date())} |${yellow('SYNC   ')}| `;
  res += `${type === 'file' ? '📃' : '📂'} ${name} to ${blue(parent)}`;
  log(res);
}
