import './style.css'
import {
  categories,
  getCategory,
  getLanguage,
  isCategoryId,
  isLangCode,
  isModeId,
  languages,
  modes,
  wordsInCategory,
  type CategoryId,
  type LangCode,
  type ModeId,
  type Word,
} from './words.ts'
import { prefetchVoices, speak, stopSpeech, unlockSpeech } from './speech.ts'

const STORAGE_KEY = 'slowo-settings'

type Settings = {
  native: LangCode
  learning: LangCode
  category: CategoryId | null
  mode: ModeId
  started: boolean
}

function defaultSettings(): Settings {
  return { native: 'en', learning: 'pl', category: null, mode: 'learn', started: false }
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
    const hasMode = Boolean(parsed.mode && isModeId(parsed.mode))
    if (hasMode && parsed.mode) settings.mode = parsed.mode
    settings.started = Boolean(parsed.started && settings.category && hasMode)
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
let feedKey = ''
let activeIndex = 0
let autoplay = true
let speakTimer = 0
let advanceTimer = 0
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
        <p class="lede">Pick your languages, a category, then how you want to practice.</p>
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
        <div class="field">
          <label>Practice</label>
          <div class="category-grid" data-mode-choices></div>
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
        <div class="field">
          <label>Practice</label>
          <div class="category-grid" data-mode-choices></div>
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

document.querySelectorAll('[data-mode-choices]').forEach((root) => {
  root.innerHTML = modes
    .map(
      (mode) => `
        <button class="category-card" type="button" data-mode="${mode.id}">
          <span class="category-emoji">${mode.emoji}</span>
          <span class="category-meta">
            <span>${mode.label}</span>
            <span class="category-count">${mode.detail}</span>
          </span>
        </button>
      `,
    )
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

document.querySelectorAll('[data-mode-choices]').forEach((root) => {
  root.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-mode]')
    if (!button || !isModeId(button.dataset.mode ?? '')) return
    settings.mode = button.dataset.mode as ModeId
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
  if (settings.mode === 'learn') speakWord(0, true)
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
  if (event.target instanceof HTMLInputElement) return
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

function currentFeedKey(): string {
  return `${settings.category}|${settings.mode}|${settings.learning}|${settings.native}`
}

function renderFeed(): void {
  if (!settings.category) return

  observer?.disconnect()
  window.clearTimeout(advanceTimer)
  const pool = wordsInCategory(settings.category)
  feedWords = settings.mode === 'learn' ? pool : shuffled(pool)
  feedKey = currentFeedKey()
  activeIndex = 0
  feed.innerHTML = feedWords.map((word, index) => cardMarkup(word, index, pool)).join('')

  feed.querySelectorAll<HTMLElement>('.emoji-hit').forEach((button, index) => {
    button.addEventListener('click', () => {
      const card = button.closest('.card')
      if (settings.mode !== 'learn' && !card?.classList.contains('answered')) return
      unlockSpeech()
      speakWord(index, true)
    })
  })

  feed.querySelectorAll<HTMLButtonElement>('.quiz-option').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest<HTMLElement>('.card')
      if (!card || card.classList.contains('answered')) return
      unlockSpeech()
      gradeCard(card, button.dataset.value ?? '')
    })
  })

  feed.querySelectorAll<HTMLFormElement>('.type-form').forEach((form) => {
    const input = form.querySelector('input')
    input?.addEventListener('focus', () => {
      window.setTimeout(() => {
        input.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 280)
    })
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const card = form.closest<HTMLElement>('.card')
      if (!card || card.classList.contains('answered')) return
      unlockSpeech()
      gradeCard(card, input?.value ?? '')
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
      if (settings.started && settings.mode === 'learn' && autoplay) speakWord(index)
    },
    { root: feed, threshold: 0.72 },
  )

  feed.querySelectorAll('.card').forEach((card) => observer?.observe(card))
  feed.scrollTop = 0
  refreshChrome()
}

function cardMarkup(word: Word, index: number, pool: Word[]): string {
  const answer = escapeHtml(word.forms[settings.learning])
  const native = escapeHtml(word.forms[settings.native])
  const quiz = settings.mode !== 'learn'
  const hint =
    settings.mode === 'learn'
      ? index === 0
        ? 'Tap emoji to replay · swipe up'
        : 'Tap to replay'
      : settings.mode === 'choice'
        ? 'Pick the word'
        : 'Type the word'

  const quizUi =
    settings.mode === 'choice'
      ? `<div class="quiz-options">
          ${choiceWords(word, pool)
            .map(
              (option) =>
                `<button class="quiz-option" type="button" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`,
            )
            .join('')}
        </div>`
      : settings.mode === 'type'
        ? `<form class="type-form">
            <input class="type-input" type="text" enterkeyhint="done" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Type the word" />
            <button type="submit">Check</button>
          </form>
          <p class="type-feedback"></p>`
        : ''

  const prompt = quiz
    ? `<p class="native" data-native>${native}</p>
       <p class="learn" data-learn hidden></p>`
    : `<p class="learn" data-learn></p>
       <p class="native" data-native>${native}</p>`

  return `
    <article class="card ${quiz ? 'card-quiz' : ''}" data-index="${index}" data-answer="${answer}" style="background:${word.tint}">
      <button class="emoji-hit" type="button" aria-label="${quiz ? 'Word prompt' : 'Replay pronunciation'}">
        <span class="emoji">${word.emoji}</span>
      </button>
      ${prompt}
      ${quizUi}
      <p class="hint">${hint}</p>
    </article>
  `
}

function choiceWords(word: Word, pool: Word[]): string[] {
  const correct = word.forms[settings.learning]
  const distractors = shuffled(
    pool.filter((item) => item.id !== word.id && item.forms[settings.learning] !== correct),
  )
    .slice(0, 2)
    .map((item) => item.forms[settings.learning])

  return shuffled([correct, ...distractors])
}

function gradeCard(card: HTMLElement, given: string): void {
  const index = Number(card.dataset.index)
  const expected = card.dataset.answer ?? ''
  const correct = normalizeAnswer(given) === normalizeAnswer(expected)
  const word = feedWords[index]
  if (!word) return

  card.classList.add('answered', correct ? 'is-correct' : 'is-wrong')

  const learn = card.querySelector<HTMLElement>('[data-learn]')
  if (learn) {
    learn.hidden = false
    learn.textContent = expected
  }

  const hint = card.querySelector('.hint')
  if (hint) hint.textContent = correct ? 'Nice · swipe up' : 'Swipe up for the next word'

  card.querySelectorAll<HTMLButtonElement>('.quiz-option').forEach((option) => {
    option.disabled = true
    if (normalizeAnswer(option.dataset.value ?? '') === normalizeAnswer(expected)) {
      option.classList.add('is-correct')
    }
    if (option.dataset.value === given && !correct) option.classList.add('is-wrong')
  })

  const input = card.querySelector<HTMLInputElement>('.type-input')
  if (input) {
    input.disabled = true
    input.value = given
  }
  const submit = card.querySelector<HTMLButtonElement>('.type-form button')
  if (submit) submit.disabled = true

  const feedback = card.querySelector('.type-feedback')
  if (feedback) {
    feedback.textContent = correct ? 'Correct' : `It’s ${expected}`
  }

  speakWord(index, true)
  refreshChrome()
  if (correct) scheduleAdvance(index)
}

function scheduleAdvance(index: number): void {
  window.clearTimeout(advanceTimer)
  advanceTimer = window.setTimeout(() => {
    if (activeIndex !== index) return
    feed.querySelector<HTMLElement>(`[data-index="${index + 1}"]`)?.scrollIntoView({
      behavior: 'smooth',
    })
  }, 1100)
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
  if (settings.mode !== 'learn') return
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
  const score = feed.querySelectorAll('.card.is-correct').length
  progress.textContent = category
    ? settings.mode === 'learn'
      ? `${category.emoji} ${Math.min(activeIndex + 1, count)} / ${count}`
      : `${category.emoji} ${Math.min(activeIndex + 1, count)} / ${count} · ${score}✓`
    : '—'

  startBtn.disabled = !settings.category
  startBtn.textContent = !settings.category
    ? 'Choose a category'
    : settings.mode === 'learn'
      ? 'Start scrolling'
      : 'Start quiz'

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

  document.querySelectorAll('[data-mode]').forEach((choice) => {
    choice.setAttribute('aria-pressed', String((choice as HTMLElement).dataset.mode === settings.mode))
  })

  refreshWords()
}

function closeSettings(): void {
  saveSettings()
  sheet.hidden = true
  if (settings.started && settings.category && feedKey !== currentFeedKey()) {
    renderFeed()
  } else {
    refreshChrome()
  }
  if (settings.started && settings.mode === 'learn' && autoplay) speakWord(activeIndex, true)
}

function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '')
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = copy[i]
    const swap = copy[j]
    if (current === undefined || swap === undefined) continue
    copy[i] = swap
    copy[j] = current
  }
  return copy
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function qs<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector)
  if (!el) throw new Error(`Missing ${selector}`)
  return el
}
