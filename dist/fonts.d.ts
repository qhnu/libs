import type { BinaryData, FontFaceDescriptors } from 'css-font-loading-module';
export declare const downloadFontByStylesheet: (urls: string[]) => Promise<void>;
export interface Font<T extends string> {
    family: T;
    source: string | BinaryData;
    descriptors?: FontFaceDescriptors;
}
export declare const downloadFontByBin: <T extends string>(fonts: Font<T>[]) => Promise<void>;
//# sourceMappingURL=fonts.d.ts.map