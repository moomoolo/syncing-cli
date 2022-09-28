import chalk from 'chalk';
import { DirDiff, DirDiffResult } from '../types/diffType';
import { toErrorStr } from './formatter';

const CMD = 'syncing';

const notDirectory = (dir: string) => {
  return `${dir} is not a directory`;
};

const cannotAccess = (path: string) => {
  return `cannot access ${path}`;
};

const setDirectories = (dirList: string[]) => {
  return dirList.reduce((prev, dir) => {
    return `${prev}\n   ${chalk.blueBright(dir)}`;
  }, `📂 ${chalk.yellow('set directories: ')}`);
};

const showDirectories = (dirList: string[]) => {
  return dirList.reduce((prev, dir) => {
    return `${prev}\n   ${chalk.blueBright(dir)}`;
  }, `📂 ${chalk.yellow('directories: ')}`);
};

const compareDir = (oldDir: string, newDir: string) => {
  let res = `${chalk.yellow('Comparing: ')}${newDir}\n`;
  res += `${chalk.yellow('       to: ')}${oldDir}`;
  return res;
};

const listAdded = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    let res = `${prev}\n`;
    res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
    res += `${chalk.green(diffRes.diffPath)}`;
    return res;
  }, `${chalk.yellow('Added:')}`);
};

const listDeleted = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    let res = `${prev}\n`;
    res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
    res += `${chalk.red(diffRes.diffPath)}`;
    return res;
  }, `${chalk.yellow('Deleted:')}`);
};

const listChanged = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    let res = `${prev}\n`;
    res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
    res += `${chalk.blue(diffRes.diffPath)}`;
    return res;
  }, `${chalk.yellow('Changed:')}`);
};

const configDirListFirst = toErrorStr(
  `Directories not configured, please config directories using '${CMD} config' first`
);

const dirDiffResult = (diffResult: DirDiffResult) => {
  const { same, addedList, deletedList, changedList } = diffResult;
  if (same) {
    return sameDir;
  }
  const lists = [addedList, deletedList, changedList];
  return [listAdded, listDeleted, listChanged].reduce((prev, listFunc, i) => {
    const list = lists[i];
    return list.length > 0 ? `${prev}${i === 0 ? '' : '\n'}${listFunc(list)}` : prev;
  }, '');
};

const syncDir = (oldDir: string, newDir: string) => {
  let res = `${chalk.yellow('Syncing: ')}${newDir}\n`;
  res += `${chalk.yellow('     to: ')}${oldDir}`;
  return res;
};

const sameDir = 'Two directories are same.';

const tips = {
  notDirectory,
  cannotAccess,
  setDirectories,
  showDirectories,
  compareDir,
  listAdded,
  listDeleted,
  listChanged,
  dirDiffResult,
  configDirListFirst,
  syncDir,
  sameDir
};

export default tips;
