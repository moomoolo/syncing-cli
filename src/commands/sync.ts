import { copyFileSync, mkdirSync, rmdirSync, unlinkSync } from 'fs';
import inquirer, { QuestionCollection } from 'inquirer';
import path from 'path';
import appConfig from '../utils/appConfig';
import checkDirList from '../utils/checkDirList';
import diffDirectories from '../utils/diffDirectories';
import { appendModifyTime } from '../utils/formatter';
import tips from '../utils/tips';

export default async function sync() {
  checkDirList();
  const dirList = appConfig.getDirList();
  const questions: QuestionCollection = [
    {
      type: 'list',
      name: 'newDirWithTime',
      message: 'Select latest modified directory: ',
      choices: appendModifyTime(dirList)
    }
  ];
  const { newDirWithTime } = (await inquirer.prompt(questions)) as {
    newDirWithTime: string;
  };
  const newDir = dirList.find((dir) => {
    return newDirWithTime.indexOf(dir) === 0;
  });
  const oldDir = dirList.find((dir) => dir !== newDir);
  syncDir(oldDir, newDir);
}

const syncDir = (oldDir: string, newDir: string) => {
  console.log(tips.syncDir(oldDir, newDir));
  const diffRes = diffDirectories(oldDir, newDir);
  const { same, addedList, deletedList, changedList } = diffRes;
  if (same) {
    console.log(tips.sameDir);
    return;
  }
  // copy added directories and files
  // sort so sub directory won't be created first
  addedList.sort();
  // create directories first
  addedList.forEach((diff) => {
    if (diff.type === 'directory') {
      const destPath = path.join(oldDir, diff.diffPath);
      mkdirSync(destPath);
    }
  });
  // copy new files
  addedList.forEach((diff) => {
    if (diff.type === 'file') {
      const srcPath = path.join(newDir, diff.diffPath);
      const destPath = path.join(oldDir, diff.diffPath);
      copyFileSync(srcPath, destPath);
    }
  });
  // delete directories and files
  // sort so parent directories won't be deleted first
  deletedList.sort().reverse();
  // delete file first
  deletedList.forEach((diff) => {
    if (diff.type === 'file') {
      const destPath = path.join(oldDir, diff.diffPath);
      unlinkSync(destPath);
    }
  });
  // delete directories
  deletedList.forEach((diff) => {
    if (diff.type === 'directory') {
      const destPath = path.join(oldDir, diff.diffPath);
      rmdirSync(destPath);
    }
  });
  // change files
  changedList.forEach((diff) => {
    const srcPath = path.join(newDir, diff.diffPath);
    const destPath = path.join(oldDir, diff.diffPath);
    copyFileSync(srcPath, destPath);
  });
  console.log(tips.dirDiffResult(diffRes));
};
