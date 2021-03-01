"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToBlob = void 0;
const base64ToBlob = (base64, mime) => {
    const binaryString = atob(base64);
    const buffer = Uint8Array.from(binaryString.split(''), (char) => char.charCodeAt(0));
    return new Blob([buffer], { type: mime });
};
exports.base64ToBlob = base64ToBlob;
