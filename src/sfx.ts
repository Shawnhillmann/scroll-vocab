let muted = false
let audioUnlocked = false
let unlocking: Promise<void> | undefined

const correctSound = makeClip(renderCorrect())
const wrongSound = makeClip(renderWrong())
const scrollSound = makeClip(renderScroll())
const resultSound = makeClip(renderResult())
const clips = [correctSound, wrongSound, scrollSound, resultSound]

export function setSfxMuted(value: boolean): void {
  muted = value
}

export function unlockSfx(): Promise<void> {
  if (audioUnlocked) return Promise.resolve()
  if (unlocking) return unlocking

  unlocking = (async () => {
    try {
      await Promise.all(clips.map(primeClip))
      audioUnlocked = true
    } catch (err) {
      console.warn('Audio unlock failed', err)
      audioUnlocked = false
    } finally {
      unlocking = undefined
    }
  })()

  return unlocking
}

export function playScroll(): void {
  trigger(scrollSound)
}

export function playCorrect(): void {
  trigger(correctSound)
}

export function playWrong(): void {
  trigger(wrongSound)
}

export function playResult(): void {
  trigger(resultSound)
}

function primeClip(clip: HTMLAudioElement): Promise<void> {
  clip.volume = 0
  return clip
    .play()
    .then(() => {
      clip.pause()
      clip.currentTime = 0
      clip.volume = 1
    })
}

function trigger(clip: HTMLAudioElement): void {
  if (muted) return
  clip.pause()
  clip.currentTime = 0
  clip.volume = 1
  const attempt = clip.play()
  if (attempt) {
    void attempt.catch((err: unknown) => {
      const error = err as { name?: string; message?: string }
      console.error('Audio failed:', error.name, error.message)
      audioUnlocked = false
    })
  }
}

function makeClip(samples: Float32Array): HTMLAudioElement {
  const clip = new Audio(encodeWav(samples))
  clip.preload = 'auto'
  clip.setAttribute('playsinline', 'true')
  return clip
}

function renderCorrect(): Float32Array {
  return mix(
    tone(659, 0.12, 0.55),
    pad(tone(880, 0.18, 0.5), 0.1),
  )
}

function renderWrong(): Float32Array {
  return tone(240, 0.13, 0.6)
}

function renderScroll(): Float32Array {
  const seconds = 0.03
  const rate = 22050
  const samples = new Float32Array(Math.floor(seconds * rate))
  for (let i = 0; i < samples.length; i++) {
    const t = i / rate
    const freq = 920 + (360 * t) / seconds
    const env = 1 - t / seconds
    samples[i] = Math.sin(2 * Math.PI * freq * t) * 0.45 * env
  }
  return samples
}

function renderResult(): Float32Array {
  return mix(
    tone(523, 0.1, 0.4),
    pad(tone(659, 0.12, 0.4), 0.09),
    pad(tone(784, 0.2, 0.42), 0.18),
  )
}

function tone(freq: number, seconds: number, volume: number): Float32Array {
  const rate = 22050
  const samples = new Float32Array(Math.floor(seconds * rate))
  const attack = 0.008
  const release = Math.min(0.03, seconds / 3)
  for (let i = 0; i < samples.length; i++) {
    const t = i / rate
    let env = 1
    if (t < attack) env = t / attack
    else if (t > seconds - release) env = Math.max(0, (seconds - t) / release)
    samples[i] = Math.sin(2 * Math.PI * freq * t) * volume * env
  }
  return samples
}

function pad(input: Float32Array, delaySeconds: number): Float32Array {
  const offset = Math.floor(delaySeconds * 22050)
  const output = new Float32Array(offset + input.length)
  output.set(input, offset)
  return output
}

function mix(...parts: Float32Array[]): Float32Array {
  const length = Math.max(...parts.map((part) => part.length))
  const output = new Float32Array(length)
  for (const part of parts) {
    for (let i = 0; i < part.length; i++) {
      output[i] = (output[i] ?? 0) + (part[i] ?? 0)
    }
  }
  for (let i = 0; i < output.length; i++) {
    output[i] = Math.max(-1, Math.min(1, output[i] ?? 0))
  }
  return output
}

function encodeWav(samples: Float32Array, sampleRate = 22050): string {
  const dataSize = samples.length * 2
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)
  writeAscii(view, 0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeAscii(view, 8, 'WAVE')
  writeAscii(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeAscii(view, 36, 'data')
  view.setUint32(40, dataSize, true)
  let offset = 44
  for (let i = 0; i < samples.length; i++) {
    const value = Math.max(-1, Math.min(1, samples[i] ?? 0))
    view.setInt16(offset, value < 0 ? value * 0x8000 : value * 0x7fff, true)
    offset += 2
  }
  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }))
}

function writeAscii(view: DataView, offset: number, value: string): void {
  for (let i = 0; i < value.length; i++) {
    view.setUint8(offset + i, value.charCodeAt(i))
  }
}
