export type SoundAction = 'scroll' | 'correct' | 'wrong' | 'result'

export type SoundChoice = {
  id: string
  label: string
}

export type SoundPrefs = {
  voice: boolean
  reveal: boolean
  ask: boolean
  enabled: Record<SoundAction, boolean>
  choice: Record<SoundAction, string>
}

export const SOUND_ACTIONS: { id: SoundAction; label: string; detail: string }[] = [
  { id: 'scroll', label: 'Scroll', detail: 'When you swipe to the next card' },
  { id: 'correct', label: 'Correct', detail: 'When an answer is right' },
  { id: 'wrong', label: 'Incorrect', detail: 'When an answer is wrong' },
  { id: 'result', label: 'Quiz end', detail: 'When a quiz finishes' },
]

export const SOUND_CHOICES: Record<SoundAction, SoundChoice[]> = {
  scroll: [
    { id: 'pop', label: 'Soft pop' },
    { id: 'thud', label: 'Low thud' },
    { id: 'click', label: 'Quiet click' },
    { id: 'drip', label: 'Drip' },
    { id: 'puff', label: 'Air puff' },
  ],
  correct: [
    { id: 'up', label: 'Up beep' },
    { id: 'ping', label: 'Ping' },
    { id: 'chime', label: 'Chime' },
    { id: 'boops', label: 'Boops' },
    { id: 'glass', label: 'Glass' },
  ],
  wrong: [
    { id: 'boop', label: 'Boop' },
    { id: 'down', label: 'Down beep' },
    { id: 'thump', label: 'Thump' },
    { id: 'dull', label: 'Dull tap' },
    { id: 'drop', label: 'Drop' },
  ],
  result: [
    { id: 'rise', label: 'Rise' },
    { id: 'sparkle', label: 'Sparkle' },
    { id: 'ding', label: 'Ding' },
    { id: 'glow', label: 'Glow' },
    { id: 'finish', label: 'Finish' },
  ],
}

export function defaultSoundPrefs(): SoundPrefs {
  return {
    voice: true,
    reveal: true,
    ask: true,
    enabled: {
      scroll: true,
      correct: true,
      wrong: true,
      result: true,
    },
    choice: {
      scroll: 'pop',
      correct: 'up',
      wrong: 'boop',
      result: 'rise',
    },
  }
}

export function isSoundAction(value: string): value is SoundAction {
  return SOUND_ACTIONS.some((action) => action.id === value)
}

export function isSoundId(action: SoundAction, value: string): boolean {
  return SOUND_CHOICES[action].some((choice) => choice.id === value)
}

let prefs = defaultSoundPrefs()
let audioUnlocked = false
let unlocking: Promise<void> | undefined
let ctx: AudioContext | undefined
let keepAlive: OscillatorNode | undefined

const SAMPLE_RATE = 22050
const catalog = buildCatalog()
const buffers: Record<string, AudioBuffer> = {}
const clips: Record<string, HTMLAudioElement> = {}
const silenceClip = makeClip(renderSilence())

type WindowWithWebkit = Window & {
  webkitAudioContext?: typeof AudioContext
}

export function applySoundPrefs(next: SoundPrefs): void {
  prefs = next
}

function waitUpTo(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
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
        await Promise.race([audio.resume(), waitUpTo(400)])
        tickUnlock(audio)
        startKeepAlive(audio)
        for (const [id, samples] of Object.entries(catalog)) {
          buffers[id] = toBuffer(audio, samples)
        }
      }

      const selected = SOUND_ACTIONS.map((action) => clipFor(prefs.choice[action.id]))
      await Promise.race([
        (async () => {
          await Promise.all([...selected, silenceClip].map(primeClip))
          silenceClip.loop = true
          silenceClip.volume = 0.001
          await silenceClip.play()
        })(),
        waitUpTo(800),
      ])
      audioUnlocked = true
    } catch (err) {
      console.warn('Audio unlock failed', err)
      audioUnlocked = Boolean(audio && Object.keys(buffers).length)
    } finally {
      unlocking = undefined
    }
  })()

  return unlocking
}

let lastScrollPlay = 0

export function playScroll(): void {
  const now = performance.now()
  if (now - lastScrollPlay < 160) return
  lastScrollPlay = now
  playAction('scroll')
}

export function playCorrect(): void {
  playAction('correct')
}

export function playVictory(): void {
  if (!prefs.enabled.correct && !prefs.enabled.result) return
  fire('victory')
}

export function playDefeat(): void {
  if (!prefs.enabled.wrong && !prefs.enabled.result) return
  fire('defeat')
}

export function playWrong(): void {
  playAction('wrong')
}

export function playResult(): void {
  playAction('result')
}

export function playTutorSend(): void {
  void unlockSfx()
  fire('tutor-send')
}

export function playTutorReceive(): void {
  void unlockSfx()
  fire('tutor-in')
}

export function playTutorTyping(): void {
  void unlockSfx()
  fire('tutor-type')
}

export function previewSound(id: string): void {
  void unlockSfx()
  fire(id)
}

function playAction(action: SoundAction): void {
  if (!prefs.enabled[action]) return
  fire(prefs.choice[action])
}

function fire(id: string): void {
  const audio = ctx
  const buffer = buffers[id]
  if (audio?.state === 'running' && buffer) {
    startBuffer(audio, buffer)
    return
  }

  if (audio?.state === 'suspended') void audio.resume()
  trigger(clipFor(id))
}

function startBuffer(audio: AudioContext, buffer: AudioBuffer): void {
  const source = audio.createBufferSource()
  source.buffer = buffer
  source.connect(audio.destination)
  source.start()
}

function trigger(clip: HTMLAudioElement): void {
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
  const attempt = clip.play()
  if (!attempt) return Promise.resolve()
  return attempt
    .then(() => {
      if (clip === silenceClip) return
      clip.pause()
      clip.currentTime = 0
      clip.volume = 1
    })
    .catch(() => {
      /* iPhone autoplay can reject; the session should still start */
    })
}

function clipFor(id: string): HTMLAudioElement {
  const existing = clips[id]
  if (existing) return existing
  const clip = makeClip(catalog[id] ?? catalog.pop ?? new Float32Array(1))
  clips[id] = clip
  return clip
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

function buildCatalog(): Record<string, Float32Array> {
  return {
    pop: pluck(480, 0.03, 0.16),
    thud: pluck(168, 0.045, 0.18),
    click: mix(noise(0.012, 0.09), pluck(1480, 0.012, 0.1)),
    drip: pluck(760, 0.04, 0.13),
    puff: noise(0.028, 0.1),
    up: mix(tone(784, 0.05, 0.22), pad(tone(988, 0.07, 0.2), 0.06)),
    ping: tone(1047, 0.07, 0.2),
    chime: mix(tone(523, 0.09, 0.16), tone(784, 0.1, 0.14)),
    boops: mix(tone(659, 0.05, 0.2), pad(tone(784, 0.07, 0.18), 0.07)),
    glass: pluck(1397, 0.05, 0.16),
    boop: tone(392, 0.09, 0.2),
    down: mix(tone(440, 0.06, 0.2), pad(tone(330, 0.09, 0.18), 0.07)),
    thump: pluck(210, 0.07, 0.2),
    dull: tone(311, 0.07, 0.18),
    drop: mix(tone(370, 0.05, 0.18), pad(tone(277, 0.09, 0.16), 0.06)),
    rise: mix(tone(659, 0.05, 0.18), pad(tone(784, 0.06, 0.17), 0.07), pad(tone(988, 0.08, 0.16), 0.14)),
    sparkle: mix(tone(784, 0.05, 0.16), tone(1175, 0.07, 0.12)),
    ding: tone(880, 0.08, 0.18),
    glow: mix(tone(523, 0.07, 0.16), pad(tone(659, 0.1, 0.15), 0.08)),
    finish: mix(tone(659, 0.06, 0.16), pad(tone(988, 0.1, 0.15), 0.09)),
    'tutor-send': mix(pluck(640, 0.035, 0.11), pad(pluck(920, 0.028, 0.07), 0.018)),
    'tutor-in': mix(tone(587, 0.045, 0.1), pad(tone(740, 0.055, 0.09), 0.04)),
    'tutor-type': mix(pluck(920, 0.018, 0.05), noise(0.008, 0.035)),
    victory: mix(
      bell(523, 0.22, 0.24),
      pad(bell(659, 0.22, 0.26), 0.12),
      pad(bell(784, 0.24, 0.28), 0.24),
      pad(bell(1047, 0.42, 0.3), 0.38),
    ),
    defeat: mix(
      bell(784, 0.2, 0.24),
      pad(bell(659, 0.22, 0.24), 0.12),
      pad(bell(523, 0.24, 0.26), 0.24),
      pad(bell(392, 0.4, 0.28), 0.38),
    ),
  }
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

function bell(freq: number, seconds: number, volume: number): Float32Array {
  const samples = new Float32Array(Math.floor(seconds * SAMPLE_RATE))
  const attack = Math.min(48, Math.floor(samples.length / 10))
  for (let i = 0; i < samples.length; i++) {
    const t = i / SAMPLE_RATE
    const attackEnv = i < attack ? i / attack : 1
    const decay = Math.exp(-t / (seconds * 0.42)) * Math.max(0, 1 - t / seconds)
    const env = attackEnv * decay
    const wave =
      Math.sin(2 * Math.PI * freq * t) +
      Math.sin(2 * Math.PI * freq * 2 * t) * 0.18 +
      Math.sin(2 * Math.PI * freq * 3 * t) * 0.06
    samples[i] = wave * volume * env
  }
  return samples
}

function pluck(freq: number, seconds: number, volume: number): Float32Array {
  const samples = new Float32Array(Math.floor(seconds * SAMPLE_RATE))
  for (let i = 0; i < samples.length; i++) {
    const t = i / SAMPLE_RATE
    const env = Math.exp(-t / (seconds * 0.26)) * Math.max(0, 1 - t / seconds)
    samples[i] = Math.sin(2 * Math.PI * freq * t) * volume * env
  }
  return samples
}

function noise(seconds: number, volume: number): Float32Array {
  const samples = new Float32Array(Math.floor(seconds * SAMPLE_RATE))
  let prev = 0
  for (let i = 0; i < samples.length; i++) {
    const t = i / SAMPLE_RATE
    const env = Math.exp(-t / (seconds * 0.2)) * Math.max(0, 1 - t / seconds)
    const white = Math.random() * 2 - 1
    prev = prev * 0.55 + white * 0.45
    samples[i] = prev * volume * env
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
