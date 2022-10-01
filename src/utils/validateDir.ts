import { accessSync, constants, lstatSync } from 'fs';
import path from 'path';
import { toErrorStr } from './formatter';
import tips from './tips';

export default function validateDir(dirPath: string) {
  const dir = path.resolve(dirPath);
  try {
    if (!lstatSync(dir).isDirectory()) {
      return toErrorStr(tips.notDirectory(dir));
    }
  } catch {
    return toErrorStr(tips.notDirectory(dir));
  }
  try {
    accessSync(dir, constants.R_OK | constants.W_OK);
  } catch {
    return toErrorStr(tips.cannotAccess(dir));
  }
  return true;
}
