let ctx: AudioContext | undefined
let muted = false

export function setSfxMuted(value: boolean): void {
  muted = value
}

export function unlockSfx(): void {
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
}

export function playScroll(): void {
  ping(640, 0.05, 0.05)
}

export function playCorrect(): void {
  ping(659, 0.12, 0.22, 0)
  ping(880, 0.18, 0.2, 0.1)
}

export function playWrong(): void {
  ping(240, 0.13, 0.2)
}

export function playResult(): void {
  ping(523, 0.1, 0.12, 0)
  ping(659, 0.12, 0.12, 0.09)
  ping(784, 0.2, 0.14, 0.18)
}

function ping(freq: number, duration: number, volume: number, delay = 0): void {
  if (muted) return
  unlockSfx()
  if (!ctx) return

  const start = ctx.currentTime + delay
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(gain).connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.03)
}
