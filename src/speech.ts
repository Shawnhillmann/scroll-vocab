let unlocked = false
let primed = false
let speakSeq = 0
let queuedSpeak = 0
let lastCancel = 0
const heldUtterances: SpeechSynthesisUtterance[] = []

const qualityBoost: Array<[RegExp, number]> = [
  [/neural/i, 90],
  [/natural/i, 80],
  [/premium|enhanced|wavenet|studio/i, 70],
  [/online \(natural\)|online natural/i, 70],
  [/google/i, 30],
  [/microsoft/i, 18],
  [/siri|samantha|daniel|karen|moira|zoe|ava/i, 36],
  [/zosia|paulina|zira|mark|thomas|amelie|amélie|jorge|monica|pablo/i, 28],
]

const qualityPenalty: Array<[RegExp, number]> = [
  [/compact/i, -90],
  [/eloquence|espeak|pico|robot|dummy/i, -120],
  [/fred|whisper/i, -40],
]

function isIos(): boolean {
  const ua = navigator.userAgent
  if (/iP(hone|ad|od)/i.test(ua)) return true
  return /Macintosh/i.test(ua) && 'ontouchend' in document
}

function cancelEngine(): void {
  lastCancel = performance.now()
  try {
    speechSynthesis.cancel()
  } catch {
    /* Safari can throw if the engine is not ready */
  }
}

function waitAfterCancel(): number {
  if (!isIos()) return 40
  return Math.max(0, 220 - (performance.now() - lastCancel))
}

function kickIos(): void {
  if (!isIos()) return
  try {
    speechSynthesis.pause()
    speechSynthesis.resume()
  } catch {
    /* older WebKit */
  }
}

export function unlockSpeech(): void {
  unlocked = true
  if (typeof speechSynthesis === 'undefined') return
  try {
    speechSynthesis.getVoices()
    if (primed) {
      kickIos()
      return
    }
    primed = true
    const prime = new SpeechSynthesisUtterance('.')
    prime.volume = 0
    prime.rate = 1
    prime.pitch = 1
    heldUtterances.push(prime)
    speechSynthesis.speak(prime)
    kickIos()
  } catch {
    primed = false
  }
}

export function prefetchVoices(): void {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.getVoices()
  speechSynthesis.addEventListener('voiceschanged', () => {
    speechSynthesis.getVoices()
  })
}

export function speak(
  text: string,
  bcp47: string,
  voiceLangs: string[],
  onEnd?: () => void,
  rateMultiplier = 1,
): void {
  if (!unlocked || !text) {
    onEnd?.()
    return
  }

  const seq = ++speakSeq
  window.clearTimeout(queuedSpeak)

  const run = (): void => {
    if (seq !== speakSeq) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = bcp47
    const nextRate = 0.94 * Math.max(0.4, Math.min(1.4, rateMultiplier))
    utterance.rate = nextRate
    utterance.pitch = 1
    utterance.volume = 1

    const voice = pickVoice(voiceLangs, bcp47)
    if (voice) {
      utterance.voice = voice
      utterance.lang = voice.lang || bcp47
    }

    const done = (): void => {
      if (seq !== speakSeq) return
      onEnd?.()
    }
    utterance.onend = done
    utterance.onerror = done

    heldUtterances.push(utterance)
    if (heldUtterances.length > 3) heldUtterances.shift()
    try {
      speechSynthesis.speak(utterance)
      kickIos()
    } catch {
      done()
    }
  }

  if (speechSynthesis.speaking || speechSynthesis.pending) {
    cancelEngine()
  }
  const delay = waitAfterCancel()
  if (delay > 0) queuedSpeak = window.setTimeout(run, delay)
  else run()
}

export function stopSpeech(): void {
  speakSeq += 1
  window.clearTimeout(queuedSpeak)
  cancelEngine()
}

function pickVoice(voiceLangs: string[], bcp47: string): SpeechSynthesisVoice | undefined {
  const voices = speechSynthesis.getVoices()
  if (!voices.length) return undefined

  const wanted = voiceLangs.map((tag) => tag.toLowerCase().replace('_', '-'))
  const prefix = bcp47.slice(0, 2).toLowerCase()

  let best: SpeechSynthesisVoice | undefined
  let bestScore = -Infinity

  for (const voice of voices) {
    const score = scoreVoice(voice, wanted, prefix)
    if (score > bestScore) {
      best = voice
      bestScore = score
    }
  }

  return bestScore > -500 ? best : undefined
}

function scoreVoice(
  voice: SpeechSynthesisVoice,
  wanted: string[],
  prefix: string,
): number {
  const lang = voice.lang.toLowerCase().replace('_', '-')
  if (!lang.startsWith(prefix)) return -1000

  let score = 0
  const exactIndex = wanted.indexOf(lang)
  if (exactIndex === 0) score += 50
  else if (exactIndex > 0) score += 36
  else score += 10

  for (const [pattern, points] of qualityBoost) {
    if (pattern.test(voice.name)) score += points
  }
  for (const [pattern, points] of qualityPenalty) {
    if (pattern.test(voice.name)) score += points
  }

  // Full downloaded voices usually sound clearer on phones than compact fallbacks.
  if (voice.localService) score += 16
  if (voice.default) score += 4

  return score
}
