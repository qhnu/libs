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

export const waitForMicroTask = Promise.resolve()

export const waitForMacroTask = new Promise<void>((resolve) =>
  setImmediate(resolve)
)
