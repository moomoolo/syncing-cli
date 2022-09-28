import appConfig from './appConfig';
import tips from './tips';
import validateDir from './validateDir';

export default function checkDirList() {
  const dirList = appConfig.getDirList();
  if (!dirList || dirList.length === 0) {
    console.log(tips.configDirListFirst);
    process.exit(0);
  }
  dirList.forEach((dir) => {
    const res = validateDir(dir);
    if (res !== true) {
      console.log(res);
      process.exit(0);
    }
  });
}
