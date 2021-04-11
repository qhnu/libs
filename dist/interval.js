"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
class Interval {
    constructor() {
        this.intervalMs = -1;
        this.callback = null;
        this.endMs = -1;
        this.totalMs = 0;
        this.setTimeoutId = null;
    }
    resetStart(intervalMs, options) {
        var _a, _b;
        if (intervalMs <= 0)
            throw new Error();
        this.intervalMs = intervalMs;
        this.callback = (_a = options === null || options === void 0 ? void 0 : options.callback) !== null && _a !== void 0 ? _a : null;
        this.endMs = (_b = options === null || options === void 0 ? void 0 : options.endMs) !== null && _b !== void 0 ? _b : -1;
        this.totalMs = 0;
        if (this.setTimeoutId)
            clearTimeout(this.setTimeoutId);
        this.setTimeoutId = null;
        this.start();
    }
    start() {
        let prevCallMs = Date.now() - this.intervalMs;
        const callInterval = () => {
            if (this.callback)
                this.callback(this.totalMs);
            if (this.endMs !== -1 && this.endMs <= this.totalMs) {
                return;
            }
            this.totalMs += this.intervalMs;
            const currMs = Date.now();
            const diffMs = currMs - prevCallMs - this.intervalMs;
            prevCallMs = currMs;
            const nextMs = this.intervalMs - diffMs;
            this.setTimeoutId = setTimeout(() => callInterval(), nextMs);
        };
        callInterval();
    }
    revoke() {
        if (this.setTimeoutId)
            clearTimeout(this.setTimeoutId);
        this.setTimeoutId = null;
    }
}
exports.Interval = Interval;
