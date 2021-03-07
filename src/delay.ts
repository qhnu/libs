export const waitForFrame = async (): Promise<void> => {
  await new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}

export const waitForRender = async (): Promise<void> => {
  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })
}
