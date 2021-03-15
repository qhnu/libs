require('setimmediate')

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

export const waitForMicroTask = async (): Promise<void> => {
  await new Promise<void>((resolve) => resolve())
}

export const waitForMacroTask = async (): Promise<void> => {
  await new Promise((resolve) => {
    setImmediate(resolve)
  })
}
