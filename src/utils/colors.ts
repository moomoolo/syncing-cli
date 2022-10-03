const ansiiColor = {
  reset: '\x1b[0m',
  font: {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
  },
  bg: {
    red: '\x1b[41m',
    green: '\x1b[42m'
  }
};

const insertColor = (str: string, color: string) => {
  // eslint-disable-next-line no-control-regex
  const reg = /\x1b\[0m/g;
  return color + str.replace(reg, ansiiColor.reset + color) + ansiiColor.reset;
};

export const blue = (str: string) => {
  return insertColor(str, ansiiColor.font.blue);
};

export const cyan = (str: string) => {
  return insertColor(str, ansiiColor.font.cyan);
};

export const yellow = (str: string) => {
  return insertColor(str, ansiiColor.font.yellow);
};

export const red = (str: string) => {
  return insertColor(str, ansiiColor.font.red);
};

export const green = (str: string) => {
  return insertColor(str, ansiiColor.font.green);
};

export const bgRed = (str: string) => {
  return insertColor(str, ansiiColor.bg.red);
};

export const bgGreen = (str: string) => {
  return insertColor(str, ansiiColor.bg.green);
};
