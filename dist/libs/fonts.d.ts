import type { BinaryData, FontFaceDescriptors } from 'css-font-loading-module';
export declare const downloadFontByStylesheet: (urls: string[]) => Promise<void>;
export interface Font {
    family: string;
    source: string | BinaryData;
    descriptors?: FontFaceDescriptors;
}
export declare const downloadFontByBin: (fonts: Font[]) => Promise<void>;
//# sourceMappingURL=fonts.d.ts.map