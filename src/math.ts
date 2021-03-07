export const stepRound = (value: number, step: number): number => {
  const inv = 1.0 / step
  return Math.round(value * inv) / inv
}

export const stepFloor = (value: number, step: number): number => {
  const inv = 1.0 / step
  return Math.floor(value * inv) / inv
}

export const stepCeil = (value: number, step: number): number => {
  const inv = 1.0 / step
  return Math.ceil(value * inv) / inv
}
