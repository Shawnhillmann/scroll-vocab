let muted = false
let audioUnlocked = false
let unlocking: Promise<void> | undefined
let ctx: AudioContext | undefined
let keepAlive: OscillatorNode | undefined

const SAMPLE_RATE = 22050

const pcm = {
  correct: renderCorrect(),
  wrong: renderWrong(),
  scroll: renderScroll(),
  result: renderResult(),
  silence: renderSilence(),
}

type ClipName = 'correct' | 'wrong' | 'scroll' | 'result'
const names: ClipName[] = ['correct', 'wrong', 'scroll', 'result']

const clips: Record<ClipName, HTMLAudioElement> = {
  correct: makeClip(pcm.correct),
  wrong: makeClip(pcm.wrong),
  scroll: makeClip(pcm.scroll),
  result: makeClip(pcm.result),
}
const silenceClip = makeClip(pcm.silence)
const buffers: Partial<Record<ClipName, AudioBuffer>> = {}

type WindowWithWebkit = Window & {
  webkitAudioContext?: typeof AudioContext
}

export function setSfxMuted(value: boolean): void {
  muted = value
}

export function unlockSfx(): Promise<void> {
  if (audioUnlocked) {
    void ctx?.resume()
    return Promise.resolve()
  }
  if (unlocking) return unlocking

  const audio = getCtx()

  unlocking = (async () => {
    try {
      if (audio) {
        await audio.resume()
        tickUnlock(audio)
        startKeepAlive(audio)
        for (const name of names) {
          buffers[name] = toBuffer(audio, pcm[name])
        }
      }

      await Promise.all([...names.map((name) => clips[name]), silenceClip].map(primeClip))
      silenceClip.loop = true
      silenceClip.volume = 0.001
      await silenceClip.play()
      audioUnlocked = true
    } catch (err) {
      console.warn('Audio unlock failed', err)
      audioUnlocked = Boolean(audio && buffers.correct)
    } finally {
      unlocking = undefined
    }
  })()

  return unlocking
}

export function playScroll(): void {
  fire('scroll')
}

export function playCorrect(): void {
  fire('correct')
}

export function playWrong(): void {
  fire('wrong')
}

export function playResult(): void {
  fire('result')
}

function fire(name: ClipName): void {
  if (muted) return

  const audio = ctx
  const buffer = buffers[name]
  if (audio?.state === 'running' && buffer) {
    startBuffer(audio, buffer)
    return
  }

  if (audio?.state === 'suspended') void audio.resume()
  trigger(clips[name])
}

function startBuffer(audio: AudioContext, buffer: AudioBuffer): void {
  const source = audio.createBufferSource()
  source.buffer = buffer
  source.connect(audio.destination)
  source.start()
}

function trigger(clip: HTMLAudioElement): void {
  if (muted) return
  clip.pause()
  clip.currentTime = 0
  clip.volume = 1
  const attempt = clip.play()
  if (!attempt) return
  void attempt.catch((err: unknown) => {
    const error = err as { name?: string; message?: string }
    console.error('Audio failed:', error.name, error.message)
    audioUnlocked = false
  })
}

function primeClip(clip: HTMLAudioElement): Promise<void> {
  clip.volume = 0
  return clip.play().then(() => {
    if (clip === silenceClip) return
    clip.pause()
    clip.currentTime = 0
    clip.volume = 1
  })
}

function getCtx(): AudioContext | undefined {
  const Ctor = window.AudioContext ?? (window as WindowWithWebkit).webkitAudioContext
  if (!Ctor) return undefined
  if (!ctx) {
    try {
      ctx = new Ctor({ latencyHint: 'interactive' })
    } catch {
      ctx = new Ctor()
    }
  }
  return ctx
}

function tickUnlock(audio: AudioContext): void {
  const buffer = audio.createBuffer(1, 1, audio.sampleRate)
  const source = audio.createBufferSource()
  source.buffer = buffer
  source.connect(audio.destination)
  source.start(0)
}

function startKeepAlive(audio: AudioContext): void {
  if (keepAlive) return
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  gain.gain.value = 0.00008
  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start()
  keepAlive = osc
}

function toBuffer(audio: AudioContext, samples: Float32Array): AudioBuffer {
  const buffer = audio.createBuffer(1, samples.length, SAMPLE_RATE)
  buffer.getChannelData(0).set(samples)
  return buffer
}

function makeClip(samples: Float32Array): HTMLAudioElement {
  const clip = new Audio(encodeWav(samples))
  clip.preload = 'auto'
  clip.setAttribute('playsinline', 'true')
  return clip
}

function renderCorrect(): Float32Array {
  return mix(tone(784, 0.07, 0.55), tone(1175, 0.09, 0.42))
}

function renderWrong(): Float32Array {
  return tone(270, 0.07, 0.55)
}

function renderScroll(): Float32Array {
  const seconds = 0.028
  const samples = new Float32Array(Math.floor(seconds * SAMPLE_RATE))
  for (let i = 0; i < samples.length; i++) {
    const t = i / SAMPLE_RATE
    const freq = 980 + (420 * t) / seconds
    const env = Math.max(0, 1 - t / seconds)
    samples[i] = Math.sin(2 * Math.PI * freq * t) * 0.5 * env
  }
  return samples
}

function renderResult(): Float32Array {
  return mix(tone(659, 0.08, 0.4), pad(tone(880, 0.12, 0.38), 0.07))
}

function renderSilence(): Float32Array {
  return new Float32Array(Math.floor(0.25 * SAMPLE_RATE))
}

function tone(freq: number, seconds: number, volume: number): Float32Array {
  const samples = new Float32Array(Math.floor(seconds * SAMPLE_RATE))
  const fade = Math.min(24, Math.floor(samples.length / 6))
  for (let i = 0; i < samples.length; i++) {
    const t = i / SAMPLE_RATE
    let env = 1
    if (i < fade) env = i / fade
    else if (i > samples.length - fade) env = (samples.length - i) / fade
    samples[i] = Math.sin(2 * Math.PI * freq * t) * volume * env
  }
  return samples
}

function pad(input: Float32Array, delaySeconds: number): Float32Array {
  const offset = Math.floor(delaySeconds * SAMPLE_RATE)
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

function encodeWav(samples: Float32Array): string {
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
  view.setUint32(24, SAMPLE_RATE, true)
  view.setUint32(28, SAMPLE_RATE * 2, true)
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
