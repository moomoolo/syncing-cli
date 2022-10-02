import { Change } from 'diff';

export type FileDiff = Change[];
export interface FileDiffResult {
  same: boolean;
  diffList: FileDiff;
}

export type DirDiffType = 'file' | 'directory';
export interface DirDiff {
  diffPath: string;
  type: DirDiffType;
  fileDiffList?: FileDiff;
}

export interface DirDiffResult {
  same: boolean;
  addedList: DirDiff[];
  deletedList: DirDiff[];
  changedList: DirDiff[];
}
