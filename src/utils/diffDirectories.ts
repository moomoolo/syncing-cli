import path from 'path';
import * as dircompare from 'dir-compare';
import tips from './tips';
import { DiffRes, DiffType } from '../types/diffType';

interface DiffOptions {
  log?: boolean;
  verbose?: boolean;
}

export default function diffDirectories(
  oldDir: string,
  newDir: string,
  options: DiffOptions = {}
) {
  console.log(tips.compareDir(oldDir, newDir));
  const compOptions: dircompare.Options = {
    compareContent: true,
    compareFileSync:
      dircompare.fileCompareHandlers.lineBasedFileCompare.compareSync
  };
  const res: dircompare.Result = dircompare.compareSync(
    oldDir,
    newDir,
    compOptions
  );
  const addedList = getAddedList(res);
  const deletedList = getDeletedList(res);
  const changedList = getChangedList(res);
  if (options.log) {
    addedList.length > 0 && console.log(tips.addedList(addedList));
    deletedList.length > 0 && console.log(tips.deletedList(deletedList));
    changedList.length > 0 && console.log(tips.changedList(changedList));
  }
  return {
    same: res.same,
    addedList,
    deletedList,
    changedList
  };
}

const getAddedList = (res: dircompare.Result): DiffRes[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'right';
    })
    .map((diff) => {
      const { relativePath, name2, type2 } = diff;
      return {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, name2).substring(1),
        type: type2 as DiffType
      };
    });
};

const getDeletedList = (res: dircompare.Result): DiffRes[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'left';
    })
    .map((diff) => {
      const { relativePath, name1, type1 } = diff;
      return {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, name1).substring(1),
        type: type1 as DiffType
      };
    });
};

const getChangedList = (res: dircompare.Result): DiffRes[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'distinct';
    })
    .map((diff) => {
      const { relativePath, name1, type1 } = diff;
      return {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, name1).substring(1),
        type: type1 as DiffType
      };
    });
};
