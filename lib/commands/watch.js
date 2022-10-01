"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = void 0;
const appConfig_1 = __importDefault(require("../utils/appConfig"));
const checkDirList_1 = __importDefault(require("../utils/checkDirList"));
const chokidar_1 = __importDefault(require("chokidar"));
const syncChange_1 = __importDefault(require("../utils/syncChange"));
const diffDirectories_1 = __importDefault(require("../utils/diffDirectories"));
const tips_1 = __importDefault(require("../utils/tips"));
const path_1 = __importDefault(require("path"));
const counter_1 = __importDefault(require("../utils/counter"));
function watch() {
    (0, checkDirList_1.default)();
    const dirList = appConfig_1.default.getDirList();
    const counter = new counter_1.default();
    dirList.forEach((oldDir) => {
        dirList.forEach((newDir) => {
            if (oldDir === newDir) {
                return;
            }
            const diffRes = (0, diffDirectories_1.default)(oldDir, newDir);
            if (!diffRes.same) {
                console.log(tips_1.default.dirNotSame(oldDir, newDir));
                process.exit(1);
            }
        });
    });
    dirList.forEach((dir) => {
        chokidar_1.default.watch(dir, { ignoreInitial: true }).on('all', (event, name) => {
            const shouldExec = counter.increment(dir);
            if (!shouldExec) {
                return;
            }
            const relativePath = path_1.default.relative(dir, name);
            (0, syncChange_1.default)(event, relativePath, dirList, dir);
        });
    });
    console.log(tips_1.default.watchingDirList(dirList));
}
exports.watch = watch;
