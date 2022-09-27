import * as fs from "node:fs";
import path from "node:path";
import { toErrorStr } from "./formatter";

export default function validateDir(dirPath: string) {
  const dir = path.resolve(dirPath)
  try {
    if (!fs.lstatSync(dir).isDirectory()) {
      return toErrorStr(`${dir} is not a directory`)
    }
  } catch {
    return toErrorStr(`${dir} is not a directory`)
  }
  try {
    fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK );
  } catch {
    return toErrorStr(`cannot access ${dir}`)
  }
  return true
}