"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFontByBin = exports.downloadFontByStylesheet = void 0;
const downloadCss = (src) => {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.onload = () => resolve();
        link.rel = 'stylesheet';
        link.href = src;
        document.head.appendChild(link);
    });
};
const downloadFontByStylesheet = async (urls) => {
    const stylesheetPromises = urls.map((url) => downloadCss(url));
    await Promise.all(stylesheetPromises);
};
exports.downloadFontByStylesheet = downloadFontByStylesheet;
const downloadFontByBin = async (fonts) => {
    const promises = [];
    for (const font of fonts) {
        const fontFace = new FontFace(font.family, font.source, font.descriptors);
        promises.push(fontFace.load());
    }
    const fontFaceList = await Promise.all(promises);
    for (const fontFace of fontFaceList) {
        document.fonts.add(fontFace);
    }
};
exports.downloadFontByBin = downloadFontByBin;
