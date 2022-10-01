import chalk from 'chalk';

export const blue = (str: string) => {
  return chalk.hex('#1196f5')(str);
};

export const yellow = (str: string) => {
  return chalk.hex('#f5ea11')(str);
};

export const red = (str: string) => {
  return chalk.hex('#fa0505')(str);
};

export const green = (str: string) => {
  return chalk.hex('#09eb20')(str);
};
