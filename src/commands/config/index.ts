import chalk from 'chalk';
import path from 'path';
import  * as readlineSync from 'readline-sync';
import appConfig from '../../utils/appConfig';
import checkDir from '../../utils/checkDir';

export function config() {
  const dirList = [];
  const dirOne = path.resolve(readlineSync.question('📂 Input directory one: '));
  if (!checkDir(dirOne)) {
    return;
  }
  dirList.push(dirOne)
  console.log(`   added directory ${path.resolve(dirOne)}`);

  const dirTwo = path.resolve(readlineSync.question('📂 Input directory two: '));
  if (!checkDir(dirTwo)) {
    return;
  }
  dirList.push(dirTwo);
  console.log(`   added directory ${path.resolve(dirTwo)}`);
  appConfig.setDirList(dirList)
}

export function configList() {
  console.log(`📂 ${chalk.yellow('directories: ')}`);
  const dirList= appConfig.getDirList()
  if (dirList) {
    dirList.forEach((dir) => {
      console.log(`   ${dir}`)
    })
  }
}