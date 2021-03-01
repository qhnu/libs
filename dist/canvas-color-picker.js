"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBackgroundColor = exports.getCanvasContext = exports.getCanvasContextWithDebugDom = void 0;
const rgb2hsl = require('pure-color/convert/rgb2hsl');
const CANVAS_WIDTH = 1920 / 10;
const CANVAS_HEIGHT = 1080 / 10;
const RGBA_LENGTH = 4;
const getCanvasContextWithDebugDom = () => {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    debugStyle(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error();
    return ctx;
};
exports.getCanvasContextWithDebugDom = getCanvasContextWithDebugDom;
const debugStyle = (canvas) => {
    canvas.style.position = 'fixed';
    canvas.style.zIndex = '9999';
    canvas.style.left = '10px';
    canvas.style.bottom = '10px';
    canvas.style.backgroundColor = 'red';
};
const getCanvasContext = () => {
    const canvas = new OffscreenCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error();
    return ctx;
};
exports.getCanvasContext = getCanvasContext;
const drawImage = (ctx, video, captureRange) => {
    ctx.drawImage(video, captureRange.x, captureRange.y, captureRange.width, captureRange.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};
const getRgba = (ctx) => {
    const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const pixels = imageData.data;
    const [red, green, blue, alpha] = pixelsToRgba(pixels);
    return [red, green, blue, alpha];
};
const pixelsToRgba = (pixels) => {
    let [red, green, blue, alpha] = [0, 0, 0, 0];
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
const captureRange = { x: 0, y: 0, width: 50, height: Math.round(1080 / 5) };
const getBackgroundColor = (ctx, videoEl) => {
    drawImage(ctx, videoEl, captureRange);
    const rgba = getRgba(ctx);
    let [h, s, l] = rgb2hsl([rgba[0], rgba[1], rgba[2]]);
    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);
    return `hsl(${h},${s - 0.5}%,${l}%)`;
};
exports.getBackgroundColor = getBackgroundColor;
