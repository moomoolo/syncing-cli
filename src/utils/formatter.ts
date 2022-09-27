import chalk from "chalk";

export function toErrorStr(msg: string) {
  return `${chalk.red('ERROR')} ${msg}`
}