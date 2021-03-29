export declare class Interval {
    private intervalSeconds;
    private intervalMs;
    private callback;
    private endSeconds;
    private totalSeconds;
    private setTimeoutId;
    resetStart(intervalSeconds: number, options?: {
        callback?: (totalSeconds: number) => void;
        endSeconds?: number;
    }): void;
    private start;
}
//# sourceMappingURL=interval.d.ts.map