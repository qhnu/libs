"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepCeil = exports.stepFloor = exports.stepRound = void 0;
const stepRound = (value, step) => {
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
};
exports.stepRound = stepRound;
const stepFloor = (value, step) => {
    const inv = 1.0 / step;
    return Math.floor(value * inv) / inv;
};
exports.stepFloor = stepFloor;
const stepCeil = (value, step) => {
    const inv = 1.0 / step;
    return Math.ceil(value * inv) / inv;
};
exports.stepCeil = stepCeil;
