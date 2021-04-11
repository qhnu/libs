export class Interval {
  private intervalMs = -1
  private callback: ((totalMs: number) => void) | null = null
  private endMs = -1

  private totalMs = 0
  private setTimeoutId: NodeJS.Timeout | null = null

  resetStart(
    intervalMs: number,
    options?: {
      callback?: (totalSeconds: number) => void
      endMs?: number
    }
  ): void {
    if (intervalMs <= 0) throw new Error()
    this.intervalMs = intervalMs

    this.callback = options?.callback ?? null
    this.endMs = options?.endMs ?? -1

    this.totalMs = 0
    if (this.setTimeoutId) clearTimeout(this.setTimeoutId)
    this.setTimeoutId = null

    this.start()
  }

  private start(): void {
    let prevCallMs = Date.now() - this.intervalMs

    const callInterval = () => {
      if (this.callback) this.callback(this.totalMs)

      if (this.endMs !== -1 && this.endMs <= this.totalMs) {
        return
      }

      this.totalMs += this.intervalMs

      const currMs = Date.now()
      const diffMs = currMs - prevCallMs - this.intervalMs
      prevCallMs = currMs

      const nextMs = this.intervalMs - diffMs
      this.setTimeoutId = setTimeout(() => callInterval(), nextMs)
    }

    callInterval()
  }

  revoke(): void {
    if (this.setTimeoutId) clearTimeout(this.setTimeoutId)
    this.setTimeoutId = null
  }
}
