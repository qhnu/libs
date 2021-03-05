export declare class Interval {
    private callback;
    private intervalSeconds;
    private intervalMs;
    private endSeconds;
    private totalSeconds;
    private setTimeoutId;
    resetStart(callback: (totalSeconds: number) => void, intervalSeconds: number, endSeconds?: number): void;
    pause(): void;
    seek(seekSeconds: number): void;
    resume(): void;
}
//# sourceMappingURL=interval.d.ts.map