import path from 'path';
import * as dircompare from 'dir-compare';
import { DirDiff, DirDiffResult, DirDiffType } from '../types/diffType';
import { diffFiles } from './diffFiles';

interface Options {
  verbose?: boolean;
}

export default function diffDirectories(
  oldDir: string,
  newDir: string,
  options: Options = {}
): DirDiffResult {
  const { verbose } = options;
  const compOptions: dircompare.Options = {
    compareContent: true,
    compareFileSync: dircompare.fileCompareHandlers.lineBasedFileCompare.compareSync
  };
  const res: dircompare.Result = dircompare.compareSync(oldDir, newDir, compOptions);
  return {
    same: res.same,
    addedList: getAddedList(res, verbose),
    deletedList: getDeletedList(res, verbose),
    changedList: getChangedList(res, verbose)
  };
}

const getAddedList = (res: dircompare.Result, verbose = false): DirDiff[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'right';
    })
    .map((diff) => {
      const { relativePath, name2: newName, path2: newDir, type2: type } = diff;
      const dirDiff: DirDiff = {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, newName).substring(1),
        type: type as DirDiffType
      };
      if (type === 'file' && verbose) {
        const newFilePath = path.join(newDir, relativePath, newName);
        dirDiff.fileDiffList = diffFiles('', newFilePath).diffList;
      }
      return dirDiff;
    });
};

const getDeletedList = (res: dircompare.Result, verbose = false): DirDiff[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'left';
    })
    .map((diff) => {
      const { relativePath, name1: oldName, path1: oldDir, type1: type } = diff;
      const dirDiff: DirDiff = {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, oldName).substring(1),
        type: type as DirDiffType
      };

      if (type === 'file' && verbose) {
        const oldFilePath = path.join(oldDir, relativePath, oldName);
        dirDiff.fileDiffList = diffFiles(oldFilePath, '').diffList;
      }

      return dirDiff;
    });
};

const getChangedList = (res: dircompare.Result, verbose = false): DirDiff[] => {
  return res.diffSet
    .filter((diff) => {
      return diff.state === 'distinct';
    })
    .map((diff) => {
      const {
        relativePath,
        name1: oldName,
        name2: newName,
        path1: oldDir,
        path2: newDir,
        type1: type
      } = diff;
      const dirDiff: DirDiff = {
        // remove '/' at the beginning
        diffPath: path.join(relativePath, oldName).substring(1),
        type: type as DirDiffType
      };
      if (type === 'file' && verbose) {
        const oldFilePath = path.join(oldDir, relativePath, oldName);
        const newFilePath = path.join(newDir, relativePath, newName);
        dirDiff.fileDiffList = diffFiles(oldFilePath, newFilePath).diffList;
      }
      return dirDiff;
    });
};
