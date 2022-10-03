import chalk from 'chalk';
import inquirer, { QuestionCollection } from 'inquirer';
import appConfig from '../utils/appConfig';
import checkDirList from '../utils/checkDirList';
import diffDirectories from '../utils/diffDirectories';
import { appendModifyTime, findTrimTime } from '../utils/formatter';
import tips from '../utils/tips';

interface DiffOptions {
  latest?: boolean;
  verbose?: boolean;
  reverse?: boolean;
}

export default async function diff(options: DiffOptions) {
  const { latest, verbose, reverse } = options;
  checkDirList();
  if (latest) {
    await diffLatest(verbose);
  } else {
    diffNormal(verbose, reverse);
  }
}

function diffNormal(verbose = false, reverse = false) {
  let [oldDir, newDir] = appConfig.getDirList();
  reverse && ([newDir, oldDir] = [oldDir, newDir]);
  console.log(tips.compareDir(oldDir, newDir));
  console.log(tips.dirDiffResult(diffDirectories(oldDir, newDir, { verbose }), verbose));
}

async function diffLatest(verbose = false) {
  const dirList = appConfig.getDirList();
  const questions: QuestionCollection = [
    {
      name: 'newDirWithTime',
      type: 'list',
      message: `📂 ${chalk.yellow('Choose new directory: ')}`,
      choices: appendModifyTime(dirList)
    }
  ];
  const { newDirWithTime } = (await inquirer.prompt(questions)) as { newDirWithTime: string };
  const newDir = findTrimTime(dirList, newDirWithTime);
  const oldDir = dirList.find((dir) => dir !== newDir);
  console.log(tips.compareDir(oldDir, newDir));
  console.log(tips.dirDiffResult(diffDirectories(oldDir, newDir, { verbose }), verbose));
}
