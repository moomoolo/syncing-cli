import inquirer, { QuestionCollection } from 'inquirer';
import path from 'path';
import appConfig from '../utils/appConfig';
import tips from '../utils/tips';
import validateDir from '../utils/validateDir';

export default async function config() {
  const questions: QuestionCollection = [
    {
      name: 'dirOne',
      type: 'input',
      message: '📂 Input directory one (default old): ',
      validate: (input) => {
        return validateDir(input);
      },
      filter: (input) => {
        return path.resolve(input);
      }
    },
    {
      name: 'dirTwo',
      type: 'input',
      message: '📂 Input directory two (default new): ',
      validate: (input) => {
        return validateDir(input);
      },
      filter: (input) => {
        return path.resolve(input);
      }
    }
  ];
  const { dirOne, dirTwo } = await inquirer.prompt(questions);
  appConfig.setDirList([dirOne, dirTwo]);
  console.log(tips.setDirectories([dirOne, dirTwo]));
}
