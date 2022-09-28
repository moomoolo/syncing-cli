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
  return `${chalk.yellow('Comparing: ')}${newDir}\n${chalk.yellow(
    '       to: '
  )}${oldDir}`;
};

const listAdded = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk.green(
      diffRes.diffPath
    )}`;
  }, `${chalk.yellow('Added:')}`);
};

const listDeleted = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk.red(
      diffRes.diffPath
    )}`;
  }, `${chalk.yellow('Deleted:')}`);
};

const listChanged = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk.blue(
      diffRes.diffPath
    )}`;
  }, `${chalk.yellow('Changed:')}`);
};

const configDirListFirst = toErrorStr(
  `Directories not configured, please config directories using '${CMD} config' first`
);

const dirDiffResult = (diffResult: DirDiffResult) => {
  const { addedList, deletedList, changedList } = diffResult;
  const lists = [addedList, deletedList, changedList];
  return [listAdded, listDeleted, listChanged].reduce((prev, listFunc, i) => {
    const list = lists[i];
    return list.length > 0 ? `${prev}\n${listFunc(list)}` : prev;
  }, '');
};

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
  configDirListFirst
};

export default tips;
