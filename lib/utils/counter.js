"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Counter {
    constructor() {
        this.counterMap = new Map();
        this.maximun = 0;
    }
    resize() {
        let min = Number.MAX_SAFE_INTEGER;
        const keyValList = [];
        for (const [key, val] of this.counterMap) {
            min = Math.min(min, val);
            keyValList.push({ key, val });
        }
        if (min === 0) {
            throw new Error('counter out of range!');
        }
        this.maximun -= min;
        keyValList.forEach(({ key, val }) => {
            this.counterMap.set(key, val - min);
        });
    }
    increment(item) {
        var _a;
        const currCnt = (_a = this.counterMap.get(item)) !== null && _a !== void 0 ? _a : 0;
        if (currCnt >= Number.MAX_SAFE_INTEGER - 1) {
            this.resize();
        }
        this.counterMap.set(item, currCnt + 1);
        if (currCnt + 1 > this.maximun) {
            this.maximun = currCnt + 1;
            return true;
        }
        return false;
    }
}
exports.default = Counter;
