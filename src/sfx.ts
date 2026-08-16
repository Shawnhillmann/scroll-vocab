let ctx: AudioContext | undefined
let dummy: HTMLAudioElement | undefined
let muted = false

type WindowWithWebkit = Window & {
  webkitAudioContext?: typeof AudioContext
}

export function setSfxMuted(value: boolean): void {
  muted = value
}

export function unlockSfx(): void {
  const audio = getCtx()
  if (!audio) return
  void audio.resume()
  prime(audio)
  unlockHtmlAudio()
}

export function playScroll(): void {
  withAudio((audio, t) => {
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(920, t)
    osc.frequency.exponentialRampToValueAtTime(1280, t + 0.03)
    gain.gain.setValueAtTime(0.16, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
    osc.connect(gain).connect(audio.destination)
    osc.start(t)
    osc.stop(t + 0.032)
  })
}

export function playCorrect(): void {
  ping(659, 0.12, 0.26, 0)
  ping(880, 0.18, 0.24, 0.1)
}

export function playWrong(): void {
  ping(240, 0.13, 0.24)
}

export function playResult(): void {
  ping(523, 0.1, 0.16, 0)
  ping(659, 0.12, 0.16, 0.09)
  ping(784, 0.2, 0.18, 0.18)
}

function ping(freq: number, duration: number, volume: number, delay = 0): void {
  withAudio((audio, t) => {
    const start = t + delay
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, start)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    osc.connect(gain).connect(audio.destination)
    osc.start(start)
    osc.stop(start + duration + 0.03)
  })
}

function withAudio(play: (audio: AudioContext, time: number) => void): void {
  if (muted) return
  const audio = getCtx()
  if (!audio) return

  const run = (): void => {
    if (muted || audio.state !== 'running') return
    play(audio, audio.currentTime)
  }

  if (audio.state === 'running') {
    run()
    return
  }

  void audio.resume().then(run)
}

function getCtx(): AudioContext | undefined {
  const Ctor = window.AudioContext ?? (window as WindowWithWebkit).webkitAudioContext
  if (!Ctor) return undefined
  ctx ??= new Ctor()
  return ctx
}

function prime(audio: AudioContext): void {
  try {
    const buffer = audio.createBuffer(1, 1, audio.sampleRate)
    const source = audio.createBufferSource()
    source.buffer = buffer
    source.connect(audio.destination)
    source.start(0)
  } catch {
    /* ignore */
  }
}

function unlockHtmlAudio(): void {
  dummy ??= new Audio(
    'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=',
  )
  dummy.setAttribute('playsinline', 'true')
  dummy.volume = 0.01
  void dummy.play().catch(() => {
    /* first gesture may still be required */
  })
}
