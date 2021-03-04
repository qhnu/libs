"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
class Interval {
    constructor() {
        this.totalSeconds = 0;
        this.setTimeoutId = null;
    }
    start(callback, intervalSeconds, endSeconds) {
        this.stop();
        const intervalMs = intervalSeconds * 1000;
        let prevCallMs = Date.now() - intervalMs;
        const callInterval = () => {
            callback(this.totalSeconds);
            if (endSeconds != null && endSeconds <= this.totalSeconds) {
                return;
            }
            this.totalSeconds += intervalSeconds;
            const currMs = Date.now();
            const diffMs = currMs - prevCallMs - intervalMs;
            const nextMs = intervalMs - diffMs;
            prevCallMs = currMs;
            this.setTimeoutId = setTimeout(() => callInterval(), nextMs);
        };
        callInterval();
    }
    stop() {
        if (this.setTimeoutId)
            clearTimeout(this.setTimeoutId);
    }
    seek(seekSeconds) {
        this.totalSeconds = seekSeconds;
    }
}
exports.Interval = Interval;
