"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
class Interval {
    constructor() {
        this.intervalSeconds = 0;
        this.intervalMs = 0;
        this.callback = null;
        this.endSeconds = -1;
        this.totalSeconds = 0;
        this.setTimeoutId = null;
    }
    resetStart(intervalSeconds, options) {
        var _a, _b;
        if (intervalSeconds <= 0)
            return;
        this.intervalSeconds = intervalSeconds;
        this.intervalMs = intervalSeconds * 1000;
        this.callback = (_a = options === null || options === void 0 ? void 0 : options.callback) !== null && _a !== void 0 ? _a : null;
        this.endSeconds = (_b = options === null || options === void 0 ? void 0 : options.endSeconds) !== null && _b !== void 0 ? _b : -1;
        this.totalSeconds = 0;
        if (this.setTimeoutId)
            clearTimeout(this.setTimeoutId);
        this.setTimeoutId = null;
        this.start();
    }
    start() {
        let prevCallMs = Date.now() - this.intervalMs;
        const callInterval = () => {
            if (this.callback)
                this.callback(this.totalSeconds);
            if (this.endSeconds !== -1 && this.endSeconds <= this.totalSeconds) {
                return;
            }
            this.totalSeconds += this.intervalSeconds;
            const currMs = Date.now();
            const diffMs = currMs - prevCallMs - this.intervalMs;
            const nextMs = this.intervalMs - diffMs;
            prevCallMs = currMs;
            this.setTimeoutId = setTimeout(() => callInterval(), nextMs);
        };
        callInterval();
    }
    getTotalSeconds() {
        return this.totalSeconds;
    }
}
exports.Interval = Interval;
