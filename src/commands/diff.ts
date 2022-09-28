import chalk from 'chalk';
import inquirer, { QuestionCollection } from 'inquirer';
import appConfig from '../utils/appConfig';
import diffDirectories from '../utils/diffDirectories';

interface DiffOptions {
  order?: boolean;
}

export default async function diff(options: DiffOptions) {
  if (options.order) {
    await diffOrder();
  } else {
    diffDefault();
  }
}

function diffDefault() {
  const [dirOne, dirTwo] = appConfig.getDirList();
  diffDirectories(dirOne, dirTwo, { log: true });
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
  diffDirectories(oldDir, newDir, { log: true });
}
