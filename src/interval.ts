export class Interval {
  intervalSeconds: number
  intervalMs: number
  setTimeoutId: NodeJS.Timeout | null = null

  constructor(intervalSeconds: number) {
    this.intervalSeconds = intervalSeconds
    this.intervalMs = intervalSeconds * 1000
  }

  start(callback: (totalSeconds: number) => void, endSeconds: number): void {
    this.stop()
    let prev = Date.now() - this.intervalMs
    let totalSeconds = 0

    const callInterval = () => {
      callback(totalSeconds)

      if (endSeconds <= totalSeconds) return

      totalSeconds += this.intervalSeconds

      const diffMs = Date.now() - prev - this.intervalMs
      const next = this.intervalMs - diffMs
      prev = Date.now()

      this.setTimeoutId = setTimeout(() => callInterval(), next)
    }

    callInterval()
  }

  stop(): void {
    if (this.setTimeoutId) clearTimeout(this.setTimeoutId)
  }
}
