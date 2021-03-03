declare type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
declare type CaptureRange = Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>;
declare type Color = [number, number, number] | [number, number, number, number];
export declare const getCanvasHsl: (ctx: Context, captureRange: CaptureRange) => Color;
export declare const getVideoHsl: (videoEl: HTMLVideoElement, captureRange: CaptureRange) => Color;
export {};
//# sourceMappingURL=canvas-color-picker.d.ts.map