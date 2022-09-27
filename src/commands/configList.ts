import chalk from "chalk";
import appConfig from "../utils/appConfig";

export default function configList() {
  console.log(`📂 ${chalk.yellow('directories: ')}`);
  const dirList= appConfig.getDirList()
  if (dirList) {
    dirList.forEach((dir) => {
      console.log(`   ${dir}`)
    })
  }
}