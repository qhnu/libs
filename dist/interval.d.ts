export declare class Interval {
    private intervalMs;
    private callback;
    private endMs;
    private totalMs;
    private setTimeoutId;
    resetStart(intervalMs: number, options?: {
        callback?: (totalSeconds: number) => void;
        endMs?: number;
    }): void;
    private start;
    revoke(): void;
}
//# sourceMappingURL=interval.d.ts.map