export class Interval {
  private callback: (totalSeconds: number) => void = () => undefined
  private intervalSeconds = 0
  private intervalMs = 0
  private endSeconds = 0

  private totalSeconds = 0
  private setTimeoutId: NodeJS.Timeout | null = null

  resetStart(
    callback: (totalSeconds: number) => void,
    intervalSeconds: number,
    endSeconds?: number
  ): void {
    this.pause()

    this.callback = callback
    this.intervalSeconds = intervalSeconds
    this.intervalMs = intervalSeconds * 1000
    this.endSeconds = endSeconds ?? 0

    this.totalSeconds = 0
    this.setTimeoutId = null

    this.resume()
  }

  pause(): void {
    if (this.setTimeoutId) clearTimeout(this.setTimeoutId)
  }

  seek(seekSeconds: number): void {
    this.pause()
    this.totalSeconds = seekSeconds
  }

  resume(): void {
    if (this.intervalSeconds <= 0) return

    let prevCallMs = Date.now() - this.intervalMs

    const callInterval = () => {
      this.callback(this.totalSeconds)

      if (this.endSeconds > 0 && this.endSeconds <= this.totalSeconds) {
        return
      }

      this.totalSeconds += this.intervalSeconds

      const currMs = Date.now()
      const diffMs = currMs - prevCallMs - this.intervalMs
      const nextMs = this.intervalMs - diffMs
      prevCallMs = currMs

      this.setTimeoutId = setTimeout(() => callInterval(), nextMs)
    }

    callInterval()
  }
}
