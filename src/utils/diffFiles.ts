import { FileDiffResult } from '../types/diffType';
import { diffLines } from 'diff';
import { readFileSync } from 'fs';

export function diffFiles(oldFile: string, newFile: string): FileDiffResult {
  const oldContent = oldFile ? readFileSync(oldFile, 'utf-8') : '';
  const newContent = newFile ? readFileSync(newFile, 'utf-8') : '';
  const diffList = diffLines(oldContent, newContent);
  let same = true;
  for (const diff of diffList) {
    if (diff.added || diff.removed) {
      same = false;
      break;
    }
  }
  return {
    same,
    diffList
  };
}
