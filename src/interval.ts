export class Interval {
  private callback: (totalSeconds: number) => void = () => undefined
  private intervalSeconds = 0
  private intervalMs = 0
  private endSeconds = 0

  private totalSeconds = 0
  private setTimeoutId: NodeJS.Timeout | null = null

  start(
    callback: (totalSeconds: number) => void,
    intervalSeconds: number,
    endSeconds?: number
  ): void {
    this.stop()

    this.callback = callback
    this.intervalSeconds = intervalSeconds
    this.intervalMs = intervalSeconds * 1000
    if (endSeconds) this.endSeconds = endSeconds

    this.resume()
  }

  seek(seekSeconds: number): void {
    this.stop()
    this.totalSeconds = seekSeconds
    this.resume()
  }

  stop(): void {
    if (this.setTimeoutId) clearTimeout(this.setTimeoutId)
  }

  resume(): void {
    if (this.intervalSeconds <= 0) return

    let prevCallMs = Date.now() - this.intervalMs

    const callInterval = () => {
      this.callback(this.totalSeconds)

      if (this.endSeconds <= this.totalSeconds) {
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
