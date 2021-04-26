/**
 * HTMLInputElement.filesは、ローカルのファイルパスを変更すると、fetchエラー（net::ERR_FILE_NOT_FOUND）を起こす
 * パス変更可の設計にするには、メモリ内にcloneする必要有り
 */
export const cloneBlob = async (blob: Blob): Promise<Blob> => {
  return new Promise<Blob>((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('loadend', () => {
      if (!reader.result) return
      const clone = new Blob([reader.result], { type: blob.type })
      resolve(clone)
    })
    reader.readAsArrayBuffer(blob)
  })
}

export const base64ToBlob = (base64Body: string, mime: 'audio/mpeg'): Blob => {
  const binaryString = atob(base64Body)
  const buffer = Uint8Array.from(binaryString.split(''), (char) =>
    char.charCodeAt(0)
  )
  return new Blob([buffer], { type: mime })
}
