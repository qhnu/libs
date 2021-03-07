"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForRender = exports.waitForFrame = void 0;
const waitForFrame = async () => {
    await new Promise((resolve) => {
        requestAnimationFrame(resolve);
    });
};
exports.waitForFrame = waitForFrame;
const waitForRender = async () => {
    await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
};
exports.waitForRender = waitForRender;
