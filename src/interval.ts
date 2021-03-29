export class Interval {
  private intervalSeconds = 0
  private intervalMs = 0

  private callback: ((totalSeconds: number) => void) | null = null
  private endSeconds = -1

  private totalSeconds = 0
  private setTimeoutId: NodeJS.Timeout | null = null

  resetStart(
    intervalSeconds: number,
    options?: {
      callback?: (totalSeconds: number) => void
      endSeconds?: number
    }
  ): void {
    if (intervalSeconds <= 0) return

    this.intervalSeconds = intervalSeconds
    this.intervalMs = intervalSeconds * 1000

    this.callback = options?.callback ?? null
    this.endSeconds = options?.endSeconds ?? -1

    this.totalSeconds = 0
    if (this.setTimeoutId) clearTimeout(this.setTimeoutId)
    this.setTimeoutId = null

    this.start()
  }

  private start(): void {
    let prevCallMs = Date.now() - this.intervalMs

    const callInterval = () => {
      if (this.callback) this.callback(this.totalSeconds)

      if (this.endSeconds !== -1 && this.endSeconds <= this.totalSeconds) {
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
