"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
class Interval {
    constructor(intervalSeconds) {
        this.setTimeoutId = null;
        this.intervalSeconds = intervalSeconds;
        this.intervalMs = intervalSeconds * 1000;
    }
    start(callback, endSeconds) {
        this.stop();
        let prev = Date.now() - this.intervalMs;
        let totalSeconds = 0;
        const callInterval = () => {
            callback(totalSeconds);
            if (endSeconds <= totalSeconds)
                return;
            totalSeconds += this.intervalSeconds;
            const diffMs = Date.now() - prev - this.intervalMs;
            const next = this.intervalMs - diffMs;
            prev = Date.now();
            this.setTimeoutId = setTimeout(() => callInterval(), next);
        };
        callInterval();
    }
    stop() {
        if (this.setTimeoutId)
            clearTimeout(this.setTimeoutId);
    }
}
exports.Interval = Interval;
