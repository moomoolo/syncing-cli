import { EOL } from 'os';
import { DirDiff, DirDiffResult, FileDiff } from '../types/diffType';
import { cyan, green, grey, red, yellow } from './colors';
import { toErrorStr } from './formatter';

const CMD = 'syncing';

const version = '1.2.0';

const notDirectory = (dir: string) => {
  return `${dir} is not a directory`;
};

const cannotAccess = (path: string) => {
  return `cannot access ${path}`;
};

const setDirectories = (dirList: string[]) => {
  let res = `📂 ${yellow('set directories: ')}`;
  const [oldDir, newDir] = dirList;
  res += `\n   ${cyan(oldDir)} ${grey('(default old)')}`;
  res += `\n   ${cyan(newDir)} ${grey('(default new)')}`;
  return res;
};

const showDirectories = (dirList: string[]) => {
  let res = `📂 ${yellow('directories: ')}`;
  const [oldDir, newDir] = dirList;
  res += `\n   ${cyan(oldDir)} ${grey('(default old)')}`;
  res += `\n   ${cyan(newDir)} ${grey('(default new)')}`;
  return res;
};

const compareDir = (oldDir: string, newDir: string) => {
  let res = `${yellow('Comparing: ')}${newDir}\n`;
  res += `${yellow('       to: ')}${oldDir}`;
  return res;
};

const ellipsis = '...';

interface LineDiff {
  value: string;
  added?: boolean;
  removed?: boolean;
  oldLineNum?: number;
  newLineNum?: number;
}

interface FillDiffBlock {
  omit: boolean;
  diffList: LineDiff[];
}

const padStartWithChalk = (
  str: string,
  maxLen: number,
  chalk: (str: string) => string,
  fillString = ' '
) => {
  const restLen = maxLen - str.length;
  const repeat = Math.ceil(restLen / fillString.length);
  const restStr = new Array(repeat).fill(fillString).join().substring(0, restLen);
  return `${restStr}${chalk(str)}`;
};

const fileDiff = (diff: FileDiff, paddingStart = ''): string => {
  const VISIBLE_OFFSET = 3;

  let oldLineCnt = 0;
  let newLineCnt = 0;
  const lineDiffList: LineDiff[] = diff.reduce((prev, change) => {
    const lines = change.value.split(EOL);
    // diff keep EOL of every line, and split may cause trailing ''
    if (lines.length !== change.count && lines.length !== change.count + 1) {
      throw new Error(`something wrong with ${JSON.stringify(change)}`);
    }
    if (lines.length === change.count + 1) {
      lines.pop();
    }

    const lineDiffs: LineDiff[] = lines.map((line) => {
      const res: LineDiff = {
        value: line,
        added: change.added,
        removed: change.removed
      };
      // line number in old file and new file
      if (change.added) {
        newLineCnt++;
        res.newLineNum = newLineCnt;
      } else if (change.removed) {
        oldLineCnt++;
        res.oldLineNum = oldLineCnt;
      } else {
        newLineCnt++;
        oldLineCnt++;
        res.newLineNum = newLineCnt;
        res.oldLineNum = oldLineCnt;
      }
      return res;
    });
    return [...prev, ...lineDiffs];
  }, [] as LineDiff[]);

  const lineVisible = new Array<boolean>(lineDiffList.length).fill(false);
  for (let i = 0; i < lineDiffList.length; i++) {
    const lineDiff = lineDiffList[i];
    if (lineDiff.added || lineDiff.removed) {
      for (
        let j = Math.max(0, i - VISIBLE_OFFSET);
        j < Math.min(lineDiffList.length, i + VISIBLE_OFFSET + 1);
        j++
      ) {
        lineVisible[j] = true;
      }
    }
  }

  const diffBlockList: FillDiffBlock[] = [];
  let maxVisibleOldLine = 0;
  let maxVisibleNewLine = 0;
  for (let i = 0; i < lineVisible.length; ) {
    if (lineVisible[i]) {
      const diffList: LineDiff[] = [];
      while (i < lineVisible.length && lineVisible[i]) {
        const lineDiff = lineDiffList[i];
        diffList.push(lineDiff);
        lineDiff.oldLineNum && (maxVisibleOldLine = lineDiff.oldLineNum);
        lineDiff.newLineNum && (maxVisibleNewLine = lineDiff.newLineNum);
        i++;
      }
      diffBlockList.push({
        omit: false,
        diffList
      });
    } else {
      while (i < lineVisible.length && !lineVisible[i]) {
        i++;
      }
      diffBlockList.push({ omit: true, diffList: [] });
    }
  }

  const oldLineNumLen = maxVisibleOldLine > 0 ? maxVisibleOldLine.toString().length : 0;
  const newLineNumLen = maxVisibleNewLine > 0 ? maxVisibleNewLine.toString().length : 0;
  return diffBlockList.reduce((prev: string, { omit, diffList }) => {
    if (omit) {
      let res = `${prev}${prev ? '\n' : ''}${paddingStart}`;
      oldLineNumLen > 0 && (res += `${''.padStart(oldLineNumLen)} `);
      newLineNumLen > 0 && (res += `${''.padStart(newLineNumLen)} `);
      res += ellipsis;
      return res;
    }
    // get lines to show
    const content = diffList.reduce(
      (prevContent, { oldLineNum, newLineNum, added, removed, value }) => {
        let line = paddingStart;
        if (added) {
          oldLineNumLen > 0 && (line += ''.padStart(oldLineNumLen + 1));
          line += `${padStartWithChalk(newLineNum.toString(), newLineNumLen, yellow)} `;
          line += green(value);
        } else if (removed) {
          line += `${padStartWithChalk(oldLineNum.toString(), oldLineNumLen, yellow)} `;
          newLineNumLen > 0 && (line += ''.padStart(newLineNumLen + 1));
          line += red(value);
        } else {
          line += `${padStartWithChalk(oldLineNum.toString(), oldLineNumLen, yellow)} `;
          line += `${padStartWithChalk(newLineNum.toString(), newLineNumLen, yellow)} ${value}`;
        }
        return `${prevContent}${prevContent ? '\n' : ''}${line}`;
      },
      ''
    );
    return `${prev}${prev ? '\n' : ''}${content}`;
  }, '');
};

const listAdded = (diffList: DirDiff[], verbose = false) => {
  return diffList.reduce((prev, diffRes) => {
    const { type, diffPath } = diffRes;
    let res = `${prev}\n`;
    res += `  ${type === 'file' ? '📃' : '📂'} `;
    res += `${green(diffPath)}`;
    verbose && type === 'file' && (res += `\n${fileDiff(diffRes.fileDiffList, '  ')}`);
    return res;
  }, `${yellow('Added:')}`);
};

const listDeleted = (diffList: DirDiff[], verbose = false) => {
  return diffList.reduce((prev, diffRes) => {
    const { type, diffPath } = diffRes;
    let res = `${prev}\n`;
    res += `  ${type === 'file' ? '📃' : '📂'} `;
    res += `${red(diffPath)}`;
    verbose && type === 'file' && (res += `\n${fileDiff(diffRes.fileDiffList, '  ')}`);
    return res;
  }, `${yellow('Deleted:')}`);
};

const listChanged = (diffList: DirDiff[], verbose = false) => {
  return diffList.reduce((prev, diffRes) => {
    const { type, diffPath } = diffRes;
    let res = `${prev}\n`;
    res += `  ${type === 'file' ? '📃' : '📂'} `;
    res += `${cyan(diffPath)}`;
    verbose && type === 'file' && (res += `\n${fileDiff(diffRes.fileDiffList, '  ')}`);
    return res;
  }, `${yellow('Changed:')}`);
};

const configDirListFirst = toErrorStr(
  `Directories not configured, please config directories using '${CMD} config' first`
);

const dirDiffResult = (diffResult: DirDiffResult, verbose = false) => {
  const { same, addedList, deletedList, changedList } = diffResult;
  if (same) {
    return sameDir;
  }
  const lists = [addedList, deletedList, changedList];
  return [listAdded, listDeleted, listChanged].reduce((prev, listFunc, i) => {
    const list = lists[i];
    return list.length > 0 ? `${prev}${!prev ? '' : '\n'}${listFunc(list, verbose)}` : prev;
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
  fileDiff,
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
