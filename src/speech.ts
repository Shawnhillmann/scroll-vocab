let unlocked = false

export function unlockSpeech(): void {
  unlocked = true
}

function pickVoice(bcp47: string): SpeechSynthesisVoice | undefined {
  const voices = speechSynthesis.getVoices()
  const wanted = bcp47.toLowerCase().replace('_', '-')
  const prefix = wanted.slice(0, 2)

  return (
    voices.find((voice) => voice.lang.toLowerCase().replace('_', '-') === wanted) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith(prefix))
  )
}

export function speak(text: string, bcp47: string): void {
  if (!unlocked || !text) return

  speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = bcp47
  utterance.rate = 0.86
  utterance.pitch = 1

  const voice = pickVoice(bcp47)
  if (voice) utterance.voice = voice

  speechSynthesis.speak(utterance)
}

export function stopSpeech(): void {
  speechSynthesis.cancel()
}

export function prefetchVoices(): void {
  speechSynthesis.getVoices()
  speechSynthesis.addEventListener('voiceschanged', () => {
    speechSynthesis.getVoices()
  })
}
