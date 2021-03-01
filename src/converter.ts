export const base64ToBlob = (base64: string, mime: 'audio/mpeg'): Blob => {
  const binaryString = atob(base64)
  const buffer = Uint8Array.from(binaryString.split(''), (char) =>
    char.charCodeAt(0)
  )
  return new Blob([buffer], { type: mime })
}
