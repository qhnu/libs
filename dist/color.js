"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFontColor = void 0;
const fast_average_color_1 = __importDefault(require("fast-average-color"));
const rgb2xyz = require('pure-color/convert/rgb2xyz');
const xyz2lab = require('pure-color/convert/xyz2lab');
const lab2lch = require('pure-color/convert/lab2lch');
const getFontColor = (imgEl, location, threshold = 70) => {
    const fac = new fast_average_color_1.default();
    const averageColor = fac.getColor(imgEl, location);
    const rgb = averageColor.rgb;
    fac.destroy();
    const [luminance] = lab2lch(xyz2lab(rgb2xyz(rgb)));
    if (luminance >= threshold) {
        return 'hsl(0,0%,0%)';
    }
    else {
        return 'hsl(0,0%,100%)';
    }
};
exports.getFontColor = getFontColor;
