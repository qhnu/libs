const rgb2hsl = require('pure-color/convert/rgb2hsl')

// HTMLVideoElementと同比率のContext2Dを作らないと、drawImage()で歪む
const CANVAS_WIDTH = 1920 / 10
const CANVAS_HEIGHT = 1080 / 10

const RGBA_LENGTH = 4

type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

export const getCanvasContextWithDebugDom = (): Context => {
  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  debugStyle(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error()
  return ctx
}

const debugStyle = (canvas: HTMLCanvasElement) => {
  canvas.style.position = 'fixed'
  canvas.style.zIndex = '9999'
  canvas.style.left = '10px'
  canvas.style.bottom = '10px'
  canvas.style.backgroundColor = 'red'
}

export const getCanvasContext = (): Context => {
  const canvas = new OffscreenCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error()
  return ctx
}

type CaptureRange = Pick<DOMRect, 'x' | 'y' | 'width' | 'height'>

const drawImage = (
  ctx: Context,
  video: HTMLVideoElement,
  captureRange: CaptureRange
): void => {
  ctx.drawImage(
    video,
    captureRange.x,
    captureRange.y,
    captureRange.width,
    captureRange.height,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  )
}

const getRgba = (ctx: Context): [number, number, number, number] => {
  const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  const pixels = imageData.data
  const [red, green, blue, alpha] = pixelsToRgba(pixels)
  return [red, green, blue, alpha]
}

const pixelsToRgba = (pixels: Uint8ClampedArray) => {
  let [red, green, blue, alpha] = [0, 0, 0, 0]

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

type Hsl = [number, number, number]

export const getBackgroundColor = (
  ctx: Context,
  videoEl: HTMLVideoElement,
  captureRange: Pick<DOMRect, 'x' | 'y' | 'width' | 'height'> = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  }
): string => {
  drawImage(ctx, videoEl, captureRange)
  const rgba = getRgba(ctx)

  let [h, s, l] = rgb2hsl([rgba[0], rgba[1], rgba[2]]) as Hsl
  h = Math.round(h)
  s = Math.round(s)
  l = Math.round(l)
  return `hsl(${h},${s}%,${l}%)`
}
