import { lstatSync, readdirSync } from 'fs';
import path from 'path';

export default function getLastModify(root: string) {
  const queue: string[] = [];
  queue.push(root);
  let latestTime = 0;
  while (queue.length > 0) {
    const curr = queue.shift();
    const stat = lstatSync(curr);
    latestTime = Math.max(latestTime, stat.mtime.getTime());
    if (stat.isDirectory()) {
      const children = readdirSync(curr).map((child) => {
        return path.join(curr, child);
      });
      queue.push(...children);
    }
  }
  return new Date(latestTime);
}
