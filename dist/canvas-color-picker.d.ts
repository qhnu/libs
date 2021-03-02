declare type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
export declare const getCanvasContextWithDebugDom: () => Context;
export declare const getCanvasContext: () => Context;
export declare const getBackgroundColor: (ctx: Context, videoEl: HTMLVideoElement, captureRange?: Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>) => string;
export {};
//# sourceMappingURL=canvas-color-picker.d.ts.map