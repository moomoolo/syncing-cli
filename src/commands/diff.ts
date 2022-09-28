import chalk from 'chalk';
import inquirer, { QuestionCollection } from 'inquirer';
import appConfig from '../utils/appConfig';
import checkDirList from '../utils/checkDirList';
import diffDirectories from '../utils/diffDirectories';
import tips from '../utils/tips';

interface DiffOptions {
  order?: boolean;
}

export default async function diff(options: DiffOptions) {
  checkDirList();
  if (options.order) {
    await diffOrder();
  } else {
    diffDefault();
  }
}

function diffDefault() {
  const [oldDir, newDir] = appConfig.getDirList();
  console.log(tips.compareDir(oldDir, newDir));
  console.log(tips.dirDiffResult(diffDirectories(oldDir, newDir)));
}

async function diffOrder() {
  const dirList = appConfig.getDirList();
  const questions: QuestionCollection = [
    {
      name: 'newDir',
      type: 'list',
      message: `📂 ${chalk.yellow('Choose new directory: ')}`,
      choices: dirList
    }
  ];
  const { newDir } = await inquirer.prompt(questions);
  const oldDir = dirList.find((dir) => dir !== newDir);
  console.log(tips.compareDir(oldDir, newDir));
  console.log(tips.dirDiffResult(diffDirectories(oldDir, newDir)));
}
