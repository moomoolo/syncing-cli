import appConfig from "../utils/appConfig";
import tips from "../utils/tips";

export default function configList() {
  const dirList= appConfig.getDirList()
  if (dirList) {
    console.log(tips.showDirectories(dirList))
  }
}