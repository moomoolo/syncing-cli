import chalk from 'chalk';
import { lstatSync } from 'fs';

export function toErrorStr(msg: string) {
  return `${chalk.red('ERROR')} ${msg}`;
}

export function appendModifyTime(dirList: string[]) {
  return dirList.map((dir) => {
    const modifyTime = new Date(lstatSync(dir).mtime);
    const coloredModifiTime = chalk.grey(`(last modify: ${modifyTime.toLocaleString()})`);
    return `${dir} ${coloredModifiTime}`;
  });
}

export function findTrimTime(dirList: string[], dirWithTime: string) {
  return dirList.find((dir) => {
    return dirWithTime.indexOf(dir) === 0;
  });
}
