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
  chirp(520, 340, 0.07, 0.035)
}

export function playCorrect(): void {
  chirp(784, 784, 0.09, 0.07, 0)
  chirp(1046, 1046, 0.16, 0.08, 0.07)
}

export function playWrong(): void {
  chirp(620, 620, 0.09, 0.055)
}

export function playResult(): void {
  chirp(392, 392, 0.1, 0.07, 0)
  chirp(523.25, 523.25, 0.12, 0.08, 0.1)
  chirp(659.25, 659.25, 0.14, 0.08, 0.2)
  chirp(783.99, 1046, 0.28, 0.1, 0.32)
}

function chirp(
  from: number,
  to: number,
  duration: number,
  volume: number,
  delay = 0,
): void {
  if (muted || !ctx) return
  const now = ctx.currentTime + delay
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(from, now)
  osc.frequency.exponentialRampToValueAtTime(Math.max(to, 40), now + duration)
  gain.gain.setValueAtTime(volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
  osc.connect(gain).connect(ctx.destination)
  osc.start(now)
  osc.stop(now + duration + 0.04)
}
