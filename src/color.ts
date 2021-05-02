/* eslint-disable import/order */
import FastAverageColor from 'fast-average-color'
const rgb2xyz = require('pure-color/convert/rgb2xyz')
const xyz2lab = require('pure-color/convert/xyz2lab')
const lab2lch = require('pure-color/convert/lab2lch')

interface Location {
  left: number
  top: number
  width: number
  height: number
}

export const getFontColor = (
  imgEl: HTMLImageElement,
  location: Location,
  threshold = 70
): string => {
  const fac = new FastAverageColor()
  const averageColor = fac.getColor(imgEl, location)
  const rgb = averageColor.rgb
  fac.destroy()

  const [luminance] = lab2lch(xyz2lab(rgb2xyz(rgb))) as [number]

  // 000-100 : black-white
  if (luminance >= threshold) {
    return 'hsl(0,0%,0%)'
  } else {
    return 'hsl(0,0%,100%)'
  }
}
