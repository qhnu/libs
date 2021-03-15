"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForMacroTask = exports.waitForMicroTask = exports.waitForRender = exports.waitForFrame = void 0;
require('setimmediate');
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
const waitForMicroTask = async () => {
    await new Promise((resolve) => resolve());
};
exports.waitForMicroTask = waitForMicroTask;
const waitForMacroTask = async () => {
    await new Promise((resolve) => {
        setImmediate(resolve);
    });
};
exports.waitForMacroTask = waitForMacroTask;
