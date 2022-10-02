"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function getLastModify(root) {
    const queue = [];
    queue.push(root);
    let latestTime = 0;
    while (queue.length > 0) {
        const curr = queue.shift();
        const stat = (0, fs_1.lstatSync)(curr);
        latestTime = Math.max(latestTime, stat.mtime.getTime());
        if (stat.isDirectory()) {
            const children = (0, fs_1.readdirSync)(curr).map((child) => {
                return path_1.default.join(curr, child);
            });
            queue.push(...children);
        }
    }
    return new Date(latestTime);
}
exports.default = getLastModify;
