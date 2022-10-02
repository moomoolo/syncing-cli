"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bgGreen = exports.bgRed = exports.green = exports.red = exports.yellow = exports.cyan = exports.blue = void 0;
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
const trimReset = (str) => {
    // eslint-disable-next-line no-control-regex
    const reg = /(\x1b\[0m)+$/g;
    return str.replace(reg, '');
};
const insertColor = (str, color) => {
    // eslint-disable-next-line no-control-regex
    const reg = /\x1b\[0m/g;
    return color + str.replace(reg, ansiiColor.reset + color) + ansiiColor.reset;
};
const blue = (str) => {
    return insertColor(str, ansiiColor.font.blue);
};
exports.blue = blue;
const cyan = (str) => {
    return insertColor(str, ansiiColor.font.cyan);
};
exports.cyan = cyan;
const yellow = (str) => {
    return insertColor(str, ansiiColor.font.yellow);
};
exports.yellow = yellow;
const red = (str) => {
    return insertColor(str, ansiiColor.font.red);
};
exports.red = red;
const green = (str) => {
    return insertColor(str, ansiiColor.font.green);
};
exports.green = green;
const bgRed = (str) => {
    return insertColor(str, ansiiColor.bg.red);
};
exports.bgRed = bgRed;
const bgGreen = (str) => {
    return insertColor(str, ansiiColor.bg.green);
};
exports.bgGreen = bgGreen;
