/* eslint-disable import/order */
const parseHsl = require('pure-color/parse/hsl')
const hsl2rgb = require('pure-color/convert/hsl2rgb')
const rgb2xyz = require('pure-color/convert/rgb2xyz')
const xyz2lab = require('pure-color/convert/xyz2lab')
const lab2lch = require('pure-color/convert/lab2lch')
const lch2lab = require('pure-color/convert/lch2lab')
const lab2xyz = require('pure-color/convert/lab2xyz')
const xyz2rgb = require('pure-color/convert/xyz2rgb')
const rgb2hsl = require('pure-color/convert/rgb2hsl')

/**
 * @see
 * https://fujiharuka.github.io/color-rotation/
 * https://luncheon.github.io/lch-color-wheel/
 *
 * @特徴
 * lchは、色相の移動、明度の閾値判定、に有効
 * lchは、彩度コントロールは苦手で、彩度が下がらず、単純に明度が上がってしまう
 *
 * lch vs hsl
 * 彩度で泣く（lchを使用） vs 明度で泣く（hslを使用）
 *
 * L == 明度 == 0-100 == 黒-白
 * C == 彩度 == 0-100 == 中心軸からの距離
 * H == 色相 == 0-360 == 角度
 */

const hslToLch = (hsl: [number, number, number]): [number, number, number] => {
  return lab2lch(xyz2lab(rgb2xyz(hsl2rgb(hsl))))
}

const lchToHsl = (lch: [number, number, number]): [number, number, number] => {
  return rgb2hsl(xyz2rgb(lab2xyz(lch2lab(lch))))
}

const omitNumber = (num: number) => {
  if (num > 100) return 100
  if (num < 0) return 0
  return num
}

export const modifyHslUseLch: (
  cssHsl: string,
  modH: number,
  modS: number,
  modL: number
) => string = (cssHsl, modH = 0, modS = 0, modL = 0) => {
  const hsl = parseHsl(cssHsl) as [number, number, number]
  const [l, c, h] = hslToLch(hsl)
  let hue = h + modH
  if (hue >= 360) hue -= 360
  if (hue <= -1) hue += 360
  const chroma = omitNumber(c + modS)
  const luminance = omitNumber(l + modL)
  const modHsl = lchToHsl([luminance, chroma, hue])
  const [_h, _s, _l] = modHsl.map((sng: number) => Math.round(sng))
  return `hsl(${_h},${_s}%,${_l}%)`
}

export const generateFontColor: (cssHsl: string) => string = (cssHsl) => {
  const hsl = parseHsl(cssHsl) as [number, number, number]
  const [luminance] = hslToLch(hsl)

  if (luminance >= 70) {
    return 'hsl(0,0%,0%)'
  } else {
    return 'hsl(0,0%,100%)'
  }
}
