import './style.css'
import {
  learningLanguages,
  nativeLanguages,
  words,
  type LangCode,
} from './words.ts'
import { prefetchVoices, speak, stopSpeech, unlockSpeech } from './speech.ts'

const STORAGE_KEY = 'slowo-settings'

type Settings = {
  native: LangCode
  learning: LangCode
  started: boolean
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultSettings(), ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return defaultSettings()
}

function defaultSettings(): Settings {
  return { native: 'en', learning: 'pl', started: false }
}

function saveSettings(settings: Settings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

const settings = loadSettings()
let activeIndex = 0
let autoplay = true
let speakTimer = 0

prefetchVoices()

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')

app.innerHTML = `
  <div class="stage">
    <div class="topbar">
      <button class="chip" type="button" id="open-settings" aria-label="Language settings">
        <span id="lang-label"></span>
      </button>
      <span class="chip progress" id="progress"></span>
      <button class="icon-btn" type="button" id="mute" aria-label="Mute autoplay">🔊</button>
    </div>

    <div class="feed" id="feed"></div>

    <section class="gate" id="gate" ${settings.started ? 'hidden' : ''}>
      <p class="brand">Słowo</p>
      <p class="lede">Scroll one word at a time. Hear it spoken, tap the emoji to hear it again.</p>
      <div class="field">
        <label>I speak</label>
        <div class="choices" id="native-choices"></div>
      </div>
      <div class="field">
        <label>I want to learn</label>
        <div class="choices" id="learning-choices"></div>
      </div>
      <button class="start" type="button" id="start">Start scrolling</button>
    </section>

    <section class="sheet" id="sheet" hidden>
      <button class="chip" type="button" id="close-settings">Close</button>
      <h2>Languages</h2>
      <div class="field">
        <label>I speak</label>
        <div class="choices" id="native-choices-sheet"></div>
      </div>
      <div class="field">
        <label>I want to learn</label>
        <div class="choices" id="learning-choices-sheet"></div>
      </div>
      <button class="start" type="button" id="save-settings">Done</button>
    </section>
  </div>
`

const feed = qs<HTMLElement>('#feed')
const gate = qs<HTMLElement>('#gate')
const sheet = qs<HTMLElement>('#sheet')
const langLabel = qs<HTMLElement>('#lang-label')
const progress = qs<HTMLElement>('#progress')
const muteBtn = qs<HTMLButtonElement>('#mute')

renderChoices('#native-choices', nativeLanguages, () => settings.native, (code) => {
  settings.native = code
  refreshChrome()
})
renderChoices('#learning-choices', learningLanguages, () => settings.learning, (code) => {
  settings.learning = code
  refreshChrome()
})
renderChoices('#native-choices-sheet', nativeLanguages, () => settings.native, (code) => {
  settings.native = code
  refreshChrome()
})
renderChoices('#learning-choices-sheet', learningLanguages, () => settings.learning, (code) => {
  settings.learning = code
  refreshChrome()
})

feed.innerHTML = words
  .map(
    (word, index) => `
    <article class="card" data-index="${index}" style="background:${word.tint}">
      <button class="emoji-hit" type="button" aria-label="Replay pronunciation">
        <span class="emoji">${word.emoji}</span>
      </button>
      <p class="learn" data-learn></p>
      <p class="native" data-native></p>
      <p class="hint">${index === 0 ? 'Tap emoji to replay · swipe up' : 'Tap to replay'}</p>
    </article>
  `,
  )
  .join('')

refreshWords()
refreshChrome()

qs('#start').addEventListener('click', () => {
  unlockSpeech()
  settings.started = true
  saveSettings(settings)
  gate.hidden = true
  speakWord(activeIndex, true)
})

qs('#open-settings').addEventListener('click', () => {
  sheet.hidden = false
})

qs('#close-settings').addEventListener('click', closeSettings)
qs('#save-settings').addEventListener('click', closeSettings)

muteBtn.addEventListener('click', () => {
  autoplay = !autoplay
  muteBtn.textContent = autoplay ? '🔊' : '🔇'
  muteBtn.setAttribute('aria-label', autoplay ? 'Mute autoplay' : 'Unmute autoplay')
  if (!autoplay) stopSpeech()
})

feed.querySelectorAll<HTMLElement>('.emoji-hit').forEach((button, index) => {
  button.addEventListener('click', () => {
    unlockSpeech()
    speakWord(index, true)
  })
})

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

    if (!visible?.target) return

    const index = Number((visible.target as HTMLElement).dataset.index)
    if (Number.isNaN(index) || index === activeIndex) return

    activeIndex = index
    refreshChrome()
    if (settings.started && autoplay) speakWord(index)
  },
  { root: feed, threshold: 0.72 },
)

feed.querySelectorAll('.card').forEach((card) => observer.observe(card))
feed.addEventListener('pointerdown', () => unlockSpeech(), { once: true })

window.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  event.preventDefault()
  const next = event.key === 'ArrowDown' ? activeIndex + 1 : activeIndex - 1
  const card = feed.querySelector<HTMLElement>(`[data-index="${next}"]`)
  card?.scrollIntoView({ behavior: 'smooth' })
})

function speakWord(index: number, force = false): void {
  const word = words[index]
  if (!word) return

  feed.querySelectorAll('.card').forEach((card) => card.classList.remove('speaking'))
  feed.querySelector(`[data-index="${index}"]`)?.classList.add('speaking')
  window.setTimeout(() => {
    feed.querySelector(`[data-index="${index}"]`)?.classList.remove('speaking')
  }, 900)

  if (!force && !autoplay) return

  window.clearTimeout(speakTimer)
  speakTimer = window.setTimeout(() => {
    const learning = learningLanguages.find((lang) => lang.code === settings.learning)
    speak(word.forms[settings.learning], learning?.bcp47 ?? 'pl-PL')
  }, force ? 0 : 140)
}

function refreshWords(): void {
  feed.querySelectorAll<HTMLElement>('.card').forEach((card, index) => {
    const word = words[index]
    if (!word) return
    const learn = card.querySelector('[data-learn]')
    const native = card.querySelector('[data-native]')
    if (learn) learn.textContent = word.forms[settings.learning]
    if (native) native.textContent = word.forms[settings.native]
  })
}

function refreshChrome(): void {
  const native = nativeLanguages.find((lang) => lang.code === settings.native)
  const learning = learningLanguages.find((lang) => lang.code === settings.learning)
  langLabel.textContent = `${learning?.nativeName ?? 'PL'} → ${native?.label ?? 'EN'}`
  progress.textContent = `${activeIndex + 1} / ${words.length}`
  refreshWords()
}

function closeSettings(): void {
  saveSettings(settings)
  sheet.hidden = true
  refreshChrome()
  if (settings.started && autoplay) speakWord(activeIndex, true)
}

function renderChoices(
  selector: string,
  options: typeof nativeLanguages,
  current: () => LangCode,
  onPick: (code: LangCode) => void,
): void {
  const root = qs(selector)
  root.innerHTML = options
    .map(
      (option) => `
      <button class="choice" type="button" data-code="${option.code}" aria-pressed="${current() === option.code}">
        ${option.label}
      </button>
    `,
    )
    .join('')

  root.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-code]')
    if (!button) return
    onPick(button.dataset.code as LangCode)
    root.querySelectorAll('[data-code]').forEach((choice) => {
      choice.setAttribute(
        'aria-pressed',
        String((choice as HTMLElement).dataset.code === current()),
      )
    })
  })
}

function qs<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector)
  if (!el) throw new Error(`Missing ${selector}`)
  return el
}
