import appConfig from '../utils/appConfig';
import checkDirList from '../utils/checkDirList';
import chokidar from 'chokidar';
import syncChange from '../utils/syncChange';
import diffDirectories from '../utils/diffDirectories';
import tips from '../utils/tips';
import path from 'path';
import Counter from '../utils/counter';

export function watch() {
  checkDirList();
  const dirList = appConfig.getDirList();
  const counter = new Counter<string>();

  dirList.forEach((oldDir) => {
    dirList.forEach((newDir) => {
      if (oldDir === newDir) {
        return;
      }
      const diffRes = diffDirectories(oldDir, newDir);
      if (!diffRes.same) {
        console.log(tips.dirNotSame(oldDir, newDir));
        process.exit(1);
      }
    });
  });
  dirList.forEach((dir) => {
    chokidar.watch(dir, { ignoreInitial: true }).on('all', (event, name) => {
      const shouldExec = counter.increment(dir);
      if (!shouldExec) {
        return;
      }
      const relativePath = path.relative(dir, name);
      syncChange(event, relativePath, dirList, dir);
    });
  });
  console.log(tips.watchingDirList(dirList));
  // check if directories are same before exit
  process.on('SIGINT', () => {
    console.log();
    console.log(tips.checkDirBeforeExit);
    const [oldDir, newDir] = dirList;
    const { same } = diffDirectories(oldDir, newDir);
    if (same) {
      console.log(tips.dirSameExit);
    } else {
      console.log(tips.dirNotSameExit);
    }
    process.exit();
  });
}
