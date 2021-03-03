const rgb2hsl = require('pure-color/convert/rgb2hsl')

type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
type CaptureRange = Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>
type Color = [number, number, number] | [number, number, number, number]

const pixelsToRgba = (pixels: Uint8ClampedArray): Color => {
  let [red, green, blue, alpha] = [0, 0, 0, 0]

  const RGBA_LENGTH = 4
  const pixelCount = pixels.length / RGBA_LENGTH

  for (const index of Array(pixelCount).keys()) {
    const r = pixels[index * RGBA_LENGTH + 0]
    const g = pixels[index * RGBA_LENGTH + 1]
    const b = pixels[index * RGBA_LENGTH + 2]
    const a = pixels[index * RGBA_LENGTH + 3]
    red += r
    green += g
    blue += b
    alpha += a
  }

  red /= pixelCount
  green /= pixelCount
  blue /= pixelCount
  alpha /= pixelCount

  const clamp = (value: number) => (value >= 255 ? 255 : Math.round(value))
  red = clamp(red)
  green = clamp(green)
  blue = clamp(blue)
  alpha = clamp(alpha) / 255
  alpha = Number(alpha.toFixed(2))
  return [red, green, blue, alpha]
}

const rgbToHsl = (rgb: Color): Color => {
  let [h, s, l] = rgb2hsl([rgb[0], rgb[1], rgb[2]]) as Color
  h = Math.round(h)
  s = Math.round(s)
  l = Math.round(l)
  return [h, s, l]
}

export const getCanvasHsl = (
  ctx: Context,
  captureRange: CaptureRange
): Color => {
  const imageData = ctx.getImageData(
    captureRange.x,
    captureRange.y,
    captureRange.width,
    captureRange.height
  )

  const pixels = imageData.data
  const rgb = pixelsToRgba(pixels)
  return rgbToHsl(rgb)
}

// HTMLVideoElementと同比率のContext2Dを作らないと、drawImage()で画素埋めできない
const VIDEO_CANVAS_WIDTH = 1920 / 10
const VIDEO_CANVAS_HEIGHT = 1080 / 10

let videoContext: Context | null = null

const getVideoContext = (): Context => {
  const canvas = new OffscreenCanvas(VIDEO_CANVAS_WIDTH, VIDEO_CANVAS_HEIGHT)

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error()
  return ctx
}

export const getVideoHsl = (
  videoEl: HTMLVideoElement,
  captureRange: CaptureRange
): Color => {
  if (!videoContext) videoContext = getVideoContext()

  videoContext.drawImage(
    videoEl,
    captureRange.x,
    captureRange.y,
    captureRange.width,
    captureRange.height,
    0,
    0,
    VIDEO_CANVAS_WIDTH,
    VIDEO_CANVAS_HEIGHT
  )

  const imageData = videoContext.getImageData(
    0,
    0,
    VIDEO_CANVAS_WIDTH,
    VIDEO_CANVAS_HEIGHT
  )

  const pixels = imageData.data
  const rgb = pixelsToRgba(pixels)
  return rgbToHsl(rgb)
}
