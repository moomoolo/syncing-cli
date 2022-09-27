import chalk from 'chalk'
import * as dircompare from 'dir-compare'

export default function diffDirectories(oldDir: string, newDir: string) {
  console.log(`${chalk.yellow('Comparing: ')}${newDir}`)
  console.log(`${chalk.yellow('       to: ')}${oldDir}`)
  const options: dircompare.Options = {
    compareContent: true,
    compareFileSync: dircompare.fileCompareHandlers.lineBasedFileCompare.compareSync
  }
  const res = dircompare.compareSync(oldDir, newDir, options)
  console.log(res)
}