import { red, yellow, green, cyan } from './colors';
import { formatTime } from './formatter';

const log = console.log;

export function logError(msg: string) {
  log(`${formatTime(new Date())} |${red('ERROR  ')}| ${msg}`);
}

export function logChange(name: string, parent: string, type: 'file' | 'directory') {
  let res = `${formatTime(new Date())} |${cyan('CHANGE ')}| `;
  res += `${type === 'file' ? '📃' : '📂'} ${name} in ${cyan(parent)}`;
  log(res);
}

export function logAddDir(name: string, parent: string) {
  log(`${formatTime(new Date())} |${green('ADDDIR ')}| 📂 ${name} in ${cyan(parent)}`);
}

export function logAddFile(name: string, parent: string) {
  log(`${formatTime(new Date())} |${green('ADDFILE')}| 📃 ${name} in ${cyan(parent)}`);
}

export function logDeleteDir(name: string, parent: string) {
  log(`${formatTime(new Date())} |${red('DELDIR ')}| 📂 ${name} in ${cyan(parent)}`);
}

export function logDeleteFile(name: string, parent: string) {
  log(`${formatTime(new Date())} |${red('DELFILE')}| 📃 ${name} in ${cyan(parent)}`);
}

export function logSync(name: string, parent: string, type: 'file' | 'directory') {
  let res = `${formatTime(new Date())} |${yellow('SYNC   ')}| `;
  res += `${type === 'file' ? '📃' : '📂'} ${name} to ${cyan(parent)}`;
  log(res);
}
