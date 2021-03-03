"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoHsl = exports.getCanvasHsl = void 0;
const rgb2hsl = require('pure-color/convert/rgb2hsl');
const pixelsToRgba = (pixels) => {
    let [red, green, blue, alpha] = [0, 0, 0, 0];
    const RGBA_LENGTH = 4;
    const pixelCount = pixels.length / RGBA_LENGTH;
    for (const index of Array(pixelCount).keys()) {
        const r = pixels[index * RGBA_LENGTH + 0];
        const g = pixels[index * RGBA_LENGTH + 1];
        const b = pixels[index * RGBA_LENGTH + 2];
        const a = pixels[index * RGBA_LENGTH + 3];
        red += r;
        green += g;
        blue += b;
        alpha += a;
    }
    red /= pixelCount;
    green /= pixelCount;
    blue /= pixelCount;
    alpha /= pixelCount;
    const clamp = (value) => (value >= 255 ? 255 : Math.round(value));
    red = clamp(red);
    green = clamp(green);
    blue = clamp(blue);
    alpha = clamp(alpha) / 255;
    alpha = Number(alpha.toFixed(2));
    return [red, green, blue, alpha];
};
const rgbToHsl = (rgb) => {
    let [h, s, l] = rgb2hsl([rgb[0], rgb[1], rgb[2]]);
    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);
    return [h, s, l];
};
const getCanvasHsl = (ctx, captureRange) => {
    const imageData = ctx.getImageData(captureRange.x, captureRange.y, captureRange.width, captureRange.height);
    const pixels = imageData.data;
    const rgb = pixelsToRgba(pixels);
    return rgbToHsl(rgb);
};
exports.getCanvasHsl = getCanvasHsl;
const VIDEO_CANVAS_WIDTH = 1920 / 10;
const VIDEO_CANVAS_HEIGHT = 1080 / 10;
let videoContext = null;
const getVideoContext = () => {
    const canvas = new OffscreenCanvas(VIDEO_CANVAS_WIDTH, VIDEO_CANVAS_HEIGHT);
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error();
    return ctx;
};
const getVideoHsl = (videoEl, captureRange) => {
    if (!videoContext)
        videoContext = getVideoContext();
    videoContext.drawImage(videoEl, captureRange.x, captureRange.y, captureRange.width, captureRange.height, 0, 0, VIDEO_CANVAS_WIDTH, VIDEO_CANVAS_HEIGHT);
    const imageData = videoContext.getImageData(0, 0, VIDEO_CANVAS_WIDTH, VIDEO_CANVAS_HEIGHT);
    const pixels = imageData.data;
    const rgb = pixelsToRgba(pixels);
    return rgbToHsl(rgb);
};
exports.getVideoHsl = getVideoHsl;
