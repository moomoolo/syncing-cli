import chalk from "chalk";
import { DiffRes } from "../types/diffType";

const notDirectory = (dir: string) => {
  return `${dir} is not a directory`;
}

const cannotAccess = (path: string) => {
  return `cannot access ${path}`;
}

const setDirectories = (dirList: string[]) => {
  return dirList.reduce((prev, dir) => {
    return `${prev}\n   ${chalk.blueBright(dir)}`
  }, `📂 ${chalk.yellow('set directories: ')}`)
}

const showDirectories = (dirList: string[]) => {
  return dirList.reduce((prev, dir) => {
    return `${prev}\n   ${chalk.blueBright(dir)}` 
  }, `📂 ${chalk.yellow('directories: ')}`);
}

const compareDir = (oldDir: string, newDir: string) => {
  return `${chalk.yellow('Comparing: ')}${newDir}\n${chalk.yellow('       to: ')}${oldDir}`
}

const addedList = (diffList: DiffRes[]) => {
  return diffList.reduce((prev, diffRes) => {
    return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk.green(diffRes.diffPath)}`
  }, `${chalk.yellow('Added:')}`)
}

const deletedList = (diffList: DiffRes[]) => {
  return diffList.reduce((prev, diffRes) => {
    return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk.red(diffRes.diffPath)}`
  }, `${chalk.yellow('Deleted:')}`)
}

const changedList = (diffList: DiffRes[]) => {
  return diffList.reduce((prev, diffRes) => {
    return `${prev}\n  ${diffRes.type === 'file' ? '📃' : '📂'} ${chalk.blue(diffRes.diffPath)}`
  }, `${chalk.yellow('Changed:')}`)
}

const tips = {
  notDirectory,
  cannotAccess,
  setDirectories,
  showDirectories,
  compareDir,
  addedList,
  deletedList,
  changedList
}

export default tips;