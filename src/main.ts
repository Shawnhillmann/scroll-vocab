import './style.css'
import {
  categories,
  getCategory,
  getLanguage,
  isCategoryId,
  isLangCode,
  languages,
  wordsInCategory,
  type CategoryId,
  type LangCode,
  type Word,
} from './words.ts'
import { prefetchVoices, speak, stopSpeech, unlockSpeech } from './speech.ts'

const STORAGE_KEY = 'slowo-settings'

type Settings = {
  native: LangCode
  learning: LangCode
  category: CategoryId | null
  started: boolean
}

function defaultSettings(): Settings {
  return { native: 'en', learning: 'pl', category: null, started: false }
}

function loadSettings(): Settings {
  const settings = defaultSettings()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return settings
    const parsed = JSON.parse(raw) as Partial<Settings>
    if (parsed.native && isLangCode(parsed.native)) settings.native = parsed.native
    if (parsed.learning && isLangCode(parsed.learning)) settings.learning = parsed.learning
    if (parsed.category && isCategoryId(parsed.category)) settings.category = parsed.category
    settings.started = Boolean(parsed.started && settings.category)
  } catch {
    /* ignore corrupt storage */
  }
  if (settings.native === settings.learning) {
    settings.learning = otherLanguage(settings.native)
  }
  return settings
}

function otherLanguage(code: LangCode): LangCode {
  return languages.find((language) => language.code !== code)?.code ?? 'en'
}

function saveSettings(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

const settings = loadSettings()
let feedWords: Word[] = []
let activeIndex = 0
let autoplay = true
let speakTimer = 0
let observer: IntersectionObserver | undefined

prefetchVoices()

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')

app.innerHTML = `
  <div class="stage">
    <div class="topbar">
      <button class="chip" type="button" id="open-settings" aria-label="Settings">
        <span id="lang-label"></span>
      </button>
      <span class="chip progress" id="progress"></span>
      <button class="icon-btn" type="button" id="mute" aria-label="Mute autoplay">🔊</button>
    </div>

    <div class="feed" id="feed"></div>

    <section class="gate" id="gate" ${settings.started ? 'hidden' : ''}>
      <div class="gate-body">
        <p class="brand">Słowo</p>
        <p class="lede">Pick the language you know, the one you want to learn, then a category. Scroll one word at a time.</p>
        <div class="field">
          <label>I speak</label>
          <div class="choices" data-lang-role="native"></div>
        </div>
        <div class="field">
          <label>I want to learn</label>
          <div class="choices" data-lang-role="learning"></div>
        </div>
        <div class="field">
          <label>Start with</label>
          <div class="category-grid" data-category-choices></div>
        </div>
      </div>
      <button class="start" type="button" id="start">Start scrolling</button>
    </section>

    <section class="sheet" id="sheet" hidden>
      <div class="gate-body">
        <button class="chip" type="button" id="close-settings">Close</button>
        <h2>Settings</h2>
        <div class="field">
          <label>I speak</label>
          <div class="choices" data-lang-role="native"></div>
        </div>
        <div class="field">
          <label>I want to learn</label>
          <div class="choices" data-lang-role="learning"></div>
        </div>
        <div class="field">
          <label>Category</label>
          <div class="category-grid" data-category-choices></div>
        </div>
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
const startBtn = qs<HTMLButtonElement>('#start')

document.querySelectorAll('[data-lang-role]').forEach((root) => {
  root.innerHTML = languages
    .map(
      (language) => `
      <button class="choice" type="button" data-code="${language.code}">
        ${language.label}
      </button>
    `,
    )
    .join('')
})

document.querySelectorAll('[data-category-choices]').forEach((root) => {
  root.innerHTML = categories
    .map((category) => {
      const count = wordsInCategory(category.id).length
      return `
        <button class="category-card" type="button" data-category="${category.id}">
          <span class="category-emoji">${category.emoji}</span>
          <span class="category-meta">
            <span>${category.label}</span>
            <span class="category-count">${count} words</span>
          </span>
        </button>
      `
    })
    .join('')
})

document.querySelectorAll('[data-lang-role]').forEach((root) => {
  root.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-code]')
    if (!button || !isLangCode(button.dataset.code ?? '')) return
    const role = (root as HTMLElement).dataset.langRole
    if (role === 'native') setNative(button.dataset.code as LangCode)
    if (role === 'learning') setLearning(button.dataset.code as LangCode)
  })
})

document.querySelectorAll('[data-category-choices]').forEach((root) => {
  root.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-category]')
    if (!button || !isCategoryId(button.dataset.category ?? '')) return
    settings.category = button.dataset.category as CategoryId
    refreshChrome()
  })
})

qs('#start').addEventListener('click', () => {
  if (!settings.category) return
  unlockSpeech()
  settings.started = true
  saveSettings()
  renderFeed()
  gate.hidden = true
  speakWord(0, true)
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

feed.addEventListener('pointerdown', () => unlockSpeech(), { once: true })

window.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  event.preventDefault()
  const next = event.key === 'ArrowDown' ? activeIndex + 1 : activeIndex - 1
  const card = feed.querySelector<HTMLElement>(`[data-index="${next}"]`)
  card?.scrollIntoView({ behavior: 'smooth' })
})

if (settings.started && settings.category) renderFeed()
refreshChrome()

function setNative(code: LangCode): void {
  settings.native = code
  if (settings.learning === code) settings.learning = otherLanguage(code)
  refreshChrome()
}

function setLearning(code: LangCode): void {
  settings.learning = code
  if (settings.native === code) settings.native = otherLanguage(code)
  refreshChrome()
}

function renderFeed(): void {
  if (!settings.category) return

  observer?.disconnect()
  feedWords = wordsInCategory(settings.category)
  activeIndex = 0
  feed.innerHTML = feedWords
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

  feed.querySelectorAll<HTMLElement>('.emoji-hit').forEach((button, index) => {
    button.addEventListener('click', () => {
      unlockSpeech()
      speakWord(index, true)
    })
  })

  observer = new IntersectionObserver(
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

  feed.querySelectorAll('.card').forEach((card) => observer?.observe(card))
  feed.scrollTop = 0
  refreshChrome()
}

function speakWord(index: number, force = false): void {
  const word = feedWords[index]
  if (!word) return

  feed.querySelectorAll('.card').forEach((card) => card.classList.remove('speaking'))
  feed.querySelector(`[data-index="${index}"]`)?.classList.add('speaking')
  window.setTimeout(() => {
    feed.querySelector(`[data-index="${index}"]`)?.classList.remove('speaking')
  }, 900)

  if (!force && !autoplay) return

  window.clearTimeout(speakTimer)
  speakTimer = window.setTimeout(() => {
    const learning = getLanguage(settings.learning)
    speak(word.forms[settings.learning], learning.bcp47, learning.voiceLangs)
  }, force ? 0 : 140)
}

function refreshWords(): void {
  feed.querySelectorAll<HTMLElement>('.card').forEach((card, index) => {
    const word = feedWords[index]
    if (!word) return
    const learn = card.querySelector('[data-learn]')
    const native = card.querySelector('[data-native]')
    if (learn) learn.textContent = word.forms[settings.learning]
    if (native) native.textContent = word.forms[settings.native]
  })
}

function refreshChrome(): void {
  const native = getLanguage(settings.native)
  const learning = getLanguage(settings.learning)
  langLabel.textContent = `${learning.nativeName} → ${native.label}`

  const count = settings.category ? wordsInCategory(settings.category).length : 0
  const category = settings.category ? getCategory(settings.category) : null
  progress.textContent = category
    ? `${category.emoji} ${Math.min(activeIndex + 1, count)} / ${count}`
    : '—'

  startBtn.disabled = !settings.category
  startBtn.textContent = settings.category ? 'Start scrolling' : 'Choose a category'

  document.querySelectorAll('[data-lang-role]').forEach((root) => {
    const role = (root as HTMLElement).dataset.langRole
    const current = role === 'native' ? settings.native : settings.learning
    root.querySelectorAll<HTMLElement>('[data-code]').forEach((choice) => {
      choice.setAttribute('aria-pressed', String(choice.dataset.code === current))
    })
  })

  document.querySelectorAll('[data-category]').forEach((choice) => {
    choice.setAttribute(
      'aria-pressed',
      String((choice as HTMLElement).dataset.category === settings.category),
    )
  })

  refreshWords()
}

function closeSettings(): void {
  const previousCategory = feedWords[0]?.category ?? null
  saveSettings()
  sheet.hidden = true
  if (settings.category && settings.category !== previousCategory) {
    renderFeed()
  } else {
    refreshChrome()
  }
  if (settings.started && autoplay) speakWord(activeIndex, true)
}

function qs<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector)
  if (!el) throw new Error(`Missing ${selector}`)
  return el
}
