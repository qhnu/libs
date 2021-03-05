"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
class Interval {
    constructor() {
        this.callback = () => undefined;
        this.intervalSeconds = 0;
        this.intervalMs = 0;
        this.endSeconds = 0;
        this.totalSeconds = 0;
        this.setTimeoutId = null;
    }
    resetStart(callback, intervalSeconds, endSeconds) {
        this.pause();
        this.callback = callback;
        this.intervalSeconds = intervalSeconds;
        this.intervalMs = intervalSeconds * 1000;
        if (endSeconds)
            this.endSeconds = endSeconds;
        this.totalSeconds = 0;
        this.setTimeoutId = null;
        this.resume();
    }
    pause() {
        if (this.setTimeoutId)
            clearTimeout(this.setTimeoutId);
    }
    seek(seekSeconds) {
        this.pause();
        this.totalSeconds = seekSeconds;
    }
    resume() {
        if (this.intervalSeconds <= 0)
            return;
        let prevCallMs = Date.now() - this.intervalMs;
        const callInterval = () => {
            this.callback(this.totalSeconds);
            if (this.endSeconds <= this.totalSeconds) {
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
}
exports.Interval = Interval;
