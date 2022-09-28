import path from 'path';
import * as dircompare from 'dir-compare';
import tips from './tips';
import { DirDiff, DirDiffResult, DirDiffType } from '../types/diffType';

export default function diffDirectories(
  oldDir: string,
  newDir: string
): DirDiffResult {
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
  return {
    same: res.same,
    addedList: getAddedList(res),
    deletedList: getDeletedList(res),
    changedList: getChangedList(res)
  };
}

const getAddedList = (res: dircompare.Result): DirDiff[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'right';
    })
    .map((diff) => {
      const { relativePath, name2, type2 } = diff;
      return {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, name2).substring(1),
        type: type2 as DirDiffType
      };
    });
};

const getDeletedList = (res: dircompare.Result): DirDiff[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'left';
    })
    .map((diff) => {
      const { relativePath, name1, type1 } = diff;
      return {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, name1).substring(1),
        type: type1 as DirDiffType
      };
    });
};

const getChangedList = (res: dircompare.Result): DirDiff[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'distinct';
    })
    .map((diff) => {
      const { relativePath, name1, type1 } = diff;
      return {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, name1).substring(1),
        type: type1 as DirDiffType
      };
    });
};
