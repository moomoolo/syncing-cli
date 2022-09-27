import * as fs from "node:fs";
import { error } from "./logger";

export default function checkDir(dir: string) {
  try {
    if (!fs.lstatSync(dir).isDirectory()) {
      error(`${dir} is not a directory`)
      return false
    }
  } catch {
    error(`${dir} is not a directory`)
    return false
  }
  try {
    fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK );
  } catch {
    error(`cannot access ${dir}`)
    return false
  }
  return true
}