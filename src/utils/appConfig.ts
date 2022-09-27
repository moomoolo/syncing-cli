import Conf from 'conf';
const keyMap = {
  dirList: "dirList",
}
const config = new Conf()

const setDirList = (dirList: string[]) => {
  config.set(keyMap.dirList, dirList);
}

const getDirList = () => {
  return config.get(keyMap.dirList) as string[]
}

const appConfig =  {
  setDirList,
  getDirList
}

export default appConfig;