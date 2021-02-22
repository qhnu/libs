import type { BinaryData, FontFaceDescriptors } from 'css-font-loading-module'

const downloadCss = (src: string) => {
  return new Promise<void>((resolve) => {
    const link = document.createElement('link')
    link.onload = () => resolve()
    link.rel = 'stylesheet'
    link.href = src
    document.head.appendChild(link)
  })
}

export const downloadFontByStylesheet: (
  urls: string[]
) => Promise<void> = async (urls) => {
  const stylesheetPromises = urls.map((url) => downloadCss(url))
  await Promise.all(stylesheetPromises)
}

/**
 * @see
 * https://google-webfonts-helper.herokuapp.com/fonts
 * https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API
 */

export interface Font<T extends string> {
  family: T
  source: string | BinaryData
  descriptors?: FontFaceDescriptors
}

export const downloadFontByBin: <T extends string>(
  fonts: Font<T>[]
) => Promise<void> = async (fonts) => {
  const promises = []
  for (const font of fonts) {
    const fontFace = new FontFace(font.family, font.source, font.descriptors)
    promises.push(fontFace.load())
  }

  const fontFaceList = await Promise.all(promises)

  for (const fontFace of fontFaceList) {
    document.fonts.add(fontFace)
  }
}
