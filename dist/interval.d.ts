export declare class Interval {
    private callback;
    private intervalSeconds;
    private intervalMs;
    private endSeconds;
    private totalSeconds;
    private setTimeoutId;
    start(callback: (totalSeconds: number) => void, intervalSeconds: number, endSeconds?: number): void;
    stop(): void;
    seek(seekSeconds: number): void;
    resume(): void;
}
//# sourceMappingURL=interval.d.ts.map