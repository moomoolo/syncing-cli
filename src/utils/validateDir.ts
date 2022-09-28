import * as fs from 'node:fs';
import path from 'node:path';
import { toErrorStr } from './formatter';
import tips from './tips';

export default function validateDir(dirPath: string) {
  const dir = path.resolve(dirPath);
  try {
    if (!fs.lstatSync(dir).isDirectory()) {
      return toErrorStr(tips.notDirectory(dir));
    }
  } catch {
    return toErrorStr(tips.notDirectory(dir));
  }
  try {
    fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK);
  } catch {
    return toErrorStr(tips.cannotAccess(dir));
  }
  return true;
}
