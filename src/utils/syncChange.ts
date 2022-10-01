import { copyFileSync, mkdirSync, rmdirSync, rmSync } from 'fs';
import path from 'path';
import {
  logAddDir,
  logAddFile,
  logChange,
  logDeleteDir,
  logDeleteFile,
  logError,
  logSync
} from './logger';

type EventType = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';

export default function syncChange(
  event: EventType,
  name: string,
  dirList: string[],
  currDir: string
) {
  const srcPath = path.join(currDir, name);
  try {
    if (event === 'add') {
      logAddFile(name, currDir);
      forOther(dirList, currDir, (dir) => {
        const destPath = path.join(dir, name);
        copyFileSync(srcPath, destPath);
        logSync(name, dir, 'file');
      });
    }
    if (event === 'addDir') {
      logAddDir(name, currDir);
      forOther(dirList, currDir, (dir) => {
        const destPath = path.join(dir, name);
        mkdirSync(destPath);
        logSync(name, dir, 'directory');
      });
    }
    if (event === 'unlink') {
      logDeleteFile(name, currDir);
      forOther(dirList, currDir, (dir) => {
        const destPath = path.join(dir, name);
        rmSync(destPath);
        logSync(name, dir, 'file');
      });
    }
    if (event === 'unlinkDir') {
      logDeleteDir(name, currDir);
      forOther(dirList, currDir, (dir) => {
        const destPath = path.join(dir, name);
        rmdirSync(destPath);
        logSync(name, dir, 'directory');
      });
    }
    if (event === 'change') {
      logChange(name, currDir, 'file');
      forOther(dirList, currDir, (dir) => {
        const destPath = path.join(dir, name);
        copyFileSync(srcPath, destPath);
        logSync(name, dir, 'file');
      });
    }
  } catch (err) {
    logError(err);
    process.exit(1);
  }
}

function forOther<T>(list: T[], exclusive: T, callback: (T) => void) {
  list.forEach((item) => {
    if (item === exclusive) {
      return;
    }
    callback && callback(item);
  });
}
