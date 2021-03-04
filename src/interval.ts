export class Interval {
  private totalSeconds = 0
  private setTimeoutId: NodeJS.Timeout | null = null

  start(
    callback: (totalSeconds: number) => void,
    intervalSeconds: number,
    endSeconds?: number
  ): void {
    this.stop()

    const intervalMs = intervalSeconds * 1000
    let prevCallMs = Date.now() - intervalMs

    const callInterval = () => {
      callback(this.totalSeconds)

      if (endSeconds != null && endSeconds <= this.totalSeconds) {
        return
      }

      this.totalSeconds += intervalSeconds

      const currMs = Date.now()
      const diffMs = currMs - prevCallMs - intervalMs
      const nextMs = intervalMs - diffMs
      prevCallMs = currMs

      this.setTimeoutId = setTimeout(() => callInterval(), nextMs)
    }

    callInterval()
  }

  stop(): void {
    if (this.setTimeoutId) clearTimeout(this.setTimeoutId)
  }

  seek(seekSeconds: number): void {
    this.totalSeconds = seekSeconds
  }
}
