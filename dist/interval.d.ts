export declare class Interval {
    private totalSeconds;
    private setTimeoutId;
    start(callback: (totalSeconds: number) => void, intervalSeconds: number, endSeconds?: number): void;
    stop(): void;
    seek(seekSeconds: number): void;
}
//# sourceMappingURL=interval.d.ts.map