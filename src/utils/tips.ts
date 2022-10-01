import { DirDiff, DirDiffResult } from '../types/diffType';
import { blue, green, red, yellow } from './colors';
import { toErrorStr } from './formatter';

const CMD = 'syncing';

const version = '1.1.0';

const notDirectory = (dir: string) => {
  return `${dir} is not a directory`;
};

const cannotAccess = (path: string) => {
  return `cannot access ${path}`;
};

const setDirectories = (dirList: string[]) => {
  return dirList.reduce((prev, dir) => {
    return `${prev}\n   ${blue(dir)}`;
  }, `📂 ${yellow('set directories: ')}`);
};

const showDirectories = (dirList: string[]) => {
  return dirList.reduce((prev, dir) => {
    return `${prev}\n   ${blue(dir)}`;
  }, `📂 ${yellow('directories: ')}`);
};

const compareDir = (oldDir: string, newDir: string) => {
  let res = `${yellow('Comparing: ')}${newDir}\n`;
  res += `${yellow('       to: ')}${oldDir}`;
  return res;
};

const listAdded = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    let res = `${prev}\n`;
    res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
    res += `${green(diffRes.diffPath)}`;
    return res;
  }, `${yellow('Added:')}`);
};

const listDeleted = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    let res = `${prev}\n`;
    res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
    res += `${red(diffRes.diffPath)}`;
    return res;
  }, `${yellow('Deleted:')}`);
};

const listChanged = (diffList: DirDiff[]) => {
  return diffList.reduce((prev, diffRes) => {
    let res = `${prev}\n`;
    res += `  ${diffRes.type === 'file' ? '📃' : '📂'} `;
    res += `${blue(diffRes.diffPath)}`;
    return res;
  }, `${yellow('Changed:')}`);
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
    return list.length > 0 ? `${prev}${!prev ? '' : '\n'}${listFunc(list)}` : prev;
  }, '');
};

const syncDir = (oldDir: string, newDir: string) => {
  let res = `${yellow('Syncing: ')}${newDir}\n`;
  res += `${yellow('     to: ')}${oldDir}`;
  return res;
};

const sameDir = '🥳 Two directories are same.';

const dirNotSame = (oldDir: string, newDir: string) => {
  let res = toErrorStr(`Difference exists between:\n`);
  res += `📂 ${oldDir}\n`;
  res += `📂 ${newDir}\n`;
  res += `😘 Sync them using '${CMD} sync' or manually first`;
  return res;
};

const watchingDirList = (dirList: string[]) => {
  if (!dirList || dirList.length === 0) {
    return '';
  }
  return dirList.reduce((prev, dir) => {
    return `${prev}\n  📂 ${dir}`;
  }, `👀 watching:`);
};

const checkDirBeforeExit = '🔎 Checking directories before exit...';

const dirSameExit = '🥳 All directories are same, well done!';
const dirNotSameExit = toErrorStr('🤡 Directories are not same, sorry about that.');

const tips = {
  version,
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
  sameDir,
  dirNotSame,
  watchingDirList,
  checkDirBeforeExit,
  dirSameExit,
  dirNotSameExit
};

export default tips;
