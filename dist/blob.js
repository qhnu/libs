"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToBlob = exports.cloneBlob = void 0;
const cloneBlob = async (blob) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            if (!reader.result)
                return;
            const clone = new Blob([reader.result], { type: blob.type });
            resolve(clone);
        });
        reader.readAsArrayBuffer(blob);
    });
};
exports.cloneBlob = cloneBlob;
const base64ToBlob = (base64, mime) => {
    const binaryString = atob(base64);
    const buffer = Uint8Array.from(binaryString.split(''), (char) => char.charCodeAt(0));
    return new Blob([buffer], { type: mime });
};
exports.base64ToBlob = base64ToBlob;
