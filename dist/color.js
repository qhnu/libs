"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFontColor = exports.modifyHslUseLch = void 0;
const parseHsl = require('pure-color/parse/hsl');
const hsl2rgb = require('pure-color/convert/hsl2rgb');
const rgb2xyz = require('pure-color/convert/rgb2xyz');
const xyz2lab = require('pure-color/convert/xyz2lab');
const lab2lch = require('pure-color/convert/lab2lch');
const lch2lab = require('pure-color/convert/lch2lab');
const lab2xyz = require('pure-color/convert/lab2xyz');
const xyz2rgb = require('pure-color/convert/xyz2rgb');
const rgb2hsl = require('pure-color/convert/rgb2hsl');
const hslToLch = (hsl) => {
    return lab2lch(xyz2lab(rgb2xyz(hsl2rgb(hsl))));
};
const lchToHsl = (lch) => {
    return rgb2hsl(xyz2rgb(lab2xyz(lch2lab(lch))));
};
const omitNumber = (num) => {
    if (num > 100)
        return 100;
    if (num < 0)
        return 0;
    return num;
};
const modifyHslUseLch = (cssHsl, modH = 0, modS = 0, modL = 0) => {
    const hsl = parseHsl(cssHsl);
    const [l, c, h] = hslToLch(hsl);
    let hue = h + modH;
    if (hue >= 360)
        hue -= 360;
    if (hue <= -1)
        hue += 360;
    const chroma = omitNumber(c + modS);
    const luminance = omitNumber(l + modL);
    const modHsl = lchToHsl([luminance, chroma, hue]);
    const [_h, _s, _l] = modHsl.map((sng) => Math.round(sng));
    return `hsl(${_h},${_s}%,${_l}%)`;
};
exports.modifyHslUseLch = modifyHslUseLch;
const generateFontColor = (cssHsl) => {
    const hsl = parseHsl(cssHsl);
    const [luminance] = hslToLch(hsl);
    if (luminance >= 70) {
        return 'hsl(0,0%,0%)';
    }
    else {
        return 'hsl(0,0%,100%)';
    }
};
exports.generateFontColor = generateFontColor;
