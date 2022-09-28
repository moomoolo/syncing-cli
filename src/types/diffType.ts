export type DirDiffType = 'file' | 'directory';

export interface DirDiff {
  diffPath: string;
  type: DirDiffType;
}

export interface DirDiffResult {
  same: boolean;
  addedList: DirDiff[];
  deletedList: DirDiff[];
  changedList: DirDiff[];
}
