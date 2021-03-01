/// <reference types="node" />
export declare class Interval {
    intervalSeconds: number;
    intervalMs: number;
    setTimeoutId: NodeJS.Timeout | null;
    constructor(intervalSeconds: number);
    start(callback: (totalSeconds: number) => void, endSeconds: number): void;
    stop(): void;
}
//# sourceMappingURL=interval.d.ts.map