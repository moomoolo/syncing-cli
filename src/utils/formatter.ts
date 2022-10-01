import chalk from 'chalk';
import { lstatSync } from 'fs';

export function toErrorStr(msg: string) {
  return `${chalk.red('ERROR')} ${msg}`;
}

export function formatTime(date: Date) {
  let res = `${date.toLocaleString('en-US', { year: 'numeric' })}-`;
  res += `${date.toLocaleString('en-US', { month: '2-digit' })}-`;
  res += `${date.toLocaleString('en-US', { day: '2-digit' })} `;
  res += `${date.toLocaleString('en-US', { hour: '2-digit', hourCycle: 'h24' })}:`;
  res += `${date.toLocaleString('en-US', { minute: '2-digit' })}:`;
  res += date.toLocaleString('en-US', { second: '2-digit' });
  return res;
}

export function appendModifyTime(dirList: string[]) {
  return dirList.map((dir) => {
    const modifyTime = new Date(lstatSync(dir).mtime);
    const coloredModifiTime = chalk.grey(`(last modify: ${formatTime(modifyTime)})`);
    return `${dir} ${coloredModifiTime}`;
  });
}

export function findTrimTime(dirList: string[], dirWithTime: string) {
  return dirList.find((dir) => {
    return dirWithTime.indexOf(dir) === 0;
  });
}
