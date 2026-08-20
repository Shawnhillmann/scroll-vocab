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
  words,
  wordsInCategory,
  type CategoryId,
  type LangCode,
  type ModeId,
  type Word,
} from './words.ts'
import { prefetchVoices, speak, stopSpeech, unlockSpeech } from './speech.ts'
import {
  applySoundPrefs,
  defaultSoundPrefs,
  isSoundAction,
  isSoundId,
  playCorrect,
  playDefeat,
  playResult,
  playVictory,
  playScroll,
  playWrong,
  previewSound,
  SOUND_ACTIONS,
  SOUND_CHOICES,
  unlockSfx,
  type SoundPrefs,
} from './sfx.ts'

const STORAGE_KEY = 'slowo-settings'

type Settings = {
  native: LangCode
  learning: LangCode
  category: CategoryId | null
  mode: ModeId
  started: boolean
  sounds: SoundPrefs
}

function defaultSettings(): Settings {
  return {
    native: 'en',
    learning: 'pl',
    category: null,
    mode: 'learn',
    started: false,
    sounds: defaultSoundPrefs(),
  }
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
    settings.sounds = readSoundPrefs(parsed.sounds)
  } catch {
    /* ignore corrupt storage */
  }
  if (settings.native === settings.learning) {
    settings.learning = otherLanguage(settings.native)
  }
  return settings
}

function readSoundPrefs(raw: unknown): SoundPrefs {
  const sounds = defaultSoundPrefs()
  if (!raw || typeof raw !== 'object') return sounds
  const parsed = raw as Partial<SoundPrefs> & {
    enabled?: Partial<SoundPrefs['enabled']>
    choice?: Partial<SoundPrefs['choice']>
  }
  sounds.voice = parsed.voice !== false
  sounds.reveal = parsed.reveal !== false
  sounds.ask = parsed.ask !== false
  for (const action of SOUND_ACTIONS) {
    sounds.enabled[action.id] = parsed.enabled?.[action.id] !== false
    const choice = parsed.choice?.[action.id]
    if (choice && isSoundId(action.id, choice)) sounds.choice[action.id] = choice
  }
  return sounds
}

function otherLanguage(code: LangCode): LangCode {
  return languages.find((language) => language.code !== code)?.code ?? 'en'
}

function saveSettings(): void {
  applySoundPrefs(settings.sounds)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

function activePool(): Word[] {
  if (!settings.category) return []
  return wordsInCategory(settings.category)
}

const settings = loadSettings()
applySoundPrefs(settings.sounds)
let feedWords: Word[] = []
let feedKey = ''
let activeIndex = 0
let speakTimer = 0
let revealTimer = 0
let learnGeneration = 0
let advanceTimer = 0
let observer: IntersectionObserver | undefined
let sessionCorrect = 0
let sessionAnswered = 0
let resultsTimer = 0
let learnSpokenTimer = 0
let learnSpokenGen = 0
let learnDoneShown = false
let nextExample = 0
let examplesDone = false
let exampleWaiting = false
let skipCurrentRing: (() => void) | null = null
let spellingReplayWordId = ''
let spellingReplayStep = 0
let payoffStep: 'none' | 'ask' | 'answer' | 'done' = 'none'
let payoffTimer = 0
let cardReplayTimer = 0

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
      <button class="icon-btn" type="button" id="open-sounds" aria-label="Sound settings">🔊</button>
    </div>

    <div class="feed" id="feed"></div>

    <section class="results" id="results" hidden>
      <div class="results-panel">
        <p class="results-kicker" id="results-kicker">Quiz complete</p>
        <p class="results-score" id="results-score"></p>
        <p class="results-sub" id="results-sub"></p>
        <button class="start" type="button" id="go-home">Home</button>
      </div>
    </section>

    <section class="results" id="learn-done" hidden>
      <div class="results-panel learn-done-panel">
        <p class="results-kicker" id="learn-done-kicker">Category complete</p>
        <p class="learn-done-title">Nice work</p>
        <p class="results-sub" id="learn-done-sub">Quiz these words, or go home to pick a new category.</p>
        <div class="learn-done-actions">
          <button class="start" type="button" id="learn-done-choice">Multiple choice</button>
          <button class="start start-alt" type="button" id="learn-done-type">Typing</button>
          <button class="ghost-link" type="button" id="learn-done-home">Home</button>
        </div>
      </div>
    </section>

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
          <div class="cat-grid" data-category-choices></div>
        </div>
        <div class="field">
          <label>Practice</label>
          <div class="category-grid" data-mode-choices></div>
        </div>
      </div>
      <button class="start" type="button" id="start" disabled>Choose a category</button>
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
          <div class="cat-grid" data-category-choices></div>
        </div>
        <div class="field">
          <label>Practice</label>
          <div class="category-grid" data-mode-choices></div>
        </div>
      </div>
      <button class="start" type="button" id="save-settings">Done</button>
    </section>

    <section class="sheet sound-sheet" id="sounds" hidden>
      <div class="gate-body">
        <button class="chip" type="button" id="close-sounds">Close</button>
        <h2>Sounds</h2>
        <p class="lede">Turn each one on or off, then pick a beep from the list to hear it.</p>
        <div class="field">
          <div class="sound-head">
            <div>
              <label>Word voice</label>
              <p class="field-note">Speaks the word you’re learning</p>
            </div>
            <button class="choice" type="button" id="toggle-voice">On</button>
          </div>
        </div>
        <div class="field">
          <div class="sound-head">
            <div>
              <label>Word reveal</label>
              <p class="field-note">Hook line first, then fade in the word you’re learning</p>
            </div>
            <button class="choice" type="button" id="toggle-reveal">On</button>
          </div>
        </div>
        <div class="field">
          <div class="sound-head">
            <div>
              <label>Learn hook</label>
              <p class="field-note">Says a short reel-style line before the word appears</p>
            </div>
            <button class="choice" type="button" id="toggle-ask">On</button>
          </div>
        </div>
        <div id="sound-fields"></div>
      </div>
      <button class="start" type="button" id="save-sounds">Done</button>
    </section>
  </div>
`

const feed = qs<HTMLElement>('#feed')
let swipeSoundIndex = 0
let swipeSoundTimer = 0

function currentCardIndex(): number {
  const height = feed.clientHeight
  if (!height) return 0
  return Math.round(Math.max(0, feed.scrollTop) / height)
}

function settleSwipeSound(): void {
  swipeSoundIndex = currentCardIndex()
}

feed.addEventListener(
  'scroll',
  () => {
    const height = feed.clientHeight
    if (!height) return
    const progress = Math.max(0, feed.scrollTop / height)
    const risingIndex = Math.floor(progress + 0.82)
    if (risingIndex > swipeSoundIndex) {
      playScroll()
      swipeSoundIndex = risingIndex
    }
    window.clearTimeout(swipeSoundTimer)
    swipeSoundTimer = window.setTimeout(settleSwipeSound, 220)
  },
  { passive: true },
)
feed.addEventListener('scrollend', settleSwipeSound)
const gate = qs<HTMLElement>('#gate')
const sheet = qs<HTMLElement>('#sheet')
const soundSheet = qs<HTMLElement>('#sounds')
const results = qs<HTMLElement>('#results')
const learnDone = qs<HTMLElement>('#learn-done')
const langLabel = qs<HTMLElement>('#lang-label')
const progress = qs<HTMLElement>('#progress')
const soundBtn = qs<HTMLButtonElement>('#open-sounds')
const startBtn = qs<HTMLButtonElement>('#start')
const soundFields = qs<HTMLElement>('#sound-fields')

soundFields.innerHTML = SOUND_ACTIONS.map(
  (action) => `
    <div class="field sound-field" data-sound-field="${action.id}">
      <div class="sound-head">
        <div>
          <label>${action.label}</label>
          <p class="field-note">${action.detail}</p>
        </div>
        <button class="choice" type="button" data-sound-on="${action.id}">On</button>
      </div>
      <select class="sound-select" data-sound-action="${action.id}" aria-label="${action.label} sound">
        ${SOUND_CHOICES[action.id]
          .map((choice) => `<option value="${choice.id}">${choice.label}</option>`)
          .join('')}
      </select>
    </div>
  `,
).join('')

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
    .map(
      (category) => `
        <button class="cat-chip" type="button" data-category="${category.id}">
          <span class="cat-chip-emoji">${category.emoji}</span>
          <span class="cat-chip-copy">
            <span class="cat-chip-label">${category.short}</span>
            <span class="cat-chip-count" data-learn-count></span>
          </span>
        </button>
      `,
    )
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
  void beginSession()
})
qs('#go-home').addEventListener('click', goHome)
qs('#learn-done-home').addEventListener('click', goHome)
qs('#learn-done-choice').addEventListener('click', () => {
  void continueAsQuiz('choice')
})
qs('#learn-done-type').addEventListener('click', () => {
  void continueAsQuiz('type')
})

qs('#open-settings').addEventListener('click', () => {
  sheet.hidden = false
})

qs('#close-settings').addEventListener('click', closeSettings)
qs('#save-settings').addEventListener('click', closeSettings)

soundBtn.addEventListener('click', () => {
  unlockSfx()
  soundSheet.hidden = false
  refreshSoundSheet()
})
qs('#close-sounds').addEventListener('click', closeSoundSheet)
qs('#save-sounds').addEventListener('click', closeSoundSheet)
qs('#toggle-voice').addEventListener('click', () => {
  settings.sounds.voice = !settings.sounds.voice
  if (!settings.sounds.voice) stopSpeech()
  saveSettings()
  refreshSoundSheet()
})
qs('#toggle-reveal').addEventListener('click', () => {
  settings.sounds.reveal = !settings.sounds.reveal
  saveSettings()
  refreshSoundSheet()
  if (settings.started && effectiveMode() === 'learn') {
    renderFeed(feedWords[activeIndex]?.id)
  }
})
qs('#toggle-ask').addEventListener('click', () => {
  settings.sounds.ask = !settings.sounds.ask
  saveSettings()
  refreshSoundSheet()
  if (settings.started && effectiveMode() === 'learn' && settings.sounds.reveal) {
    renderFeed(feedWords[activeIndex]?.id)
  }
})
soundFields.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-sound-on]')
  if (!target) return
  const toggle = target.dataset.soundOn
  if (!toggle || !isSoundAction(toggle)) return
  settings.sounds.enabled[toggle] = !settings.sounds.enabled[toggle]
  saveSettings()
  refreshSoundSheet()
})
soundFields.addEventListener('change', (event) => {
  const select = event.target
  if (!(select instanceof HTMLSelectElement)) return
  const action = select.dataset.soundAction
  const soundId = select.value
  if (!action || !isSoundAction(action) || !isSoundId(action, soundId)) return
  settings.sounds.choice[action] = soundId
  settings.sounds.enabled[action] = true
  saveSettings()
  refreshSoundSheet()
  previewSound(soundId)
})

function armAudio(): void {
  unlockSpeech()
  unlockSfx()
}

const stage = qs<HTMLElement>('.stage')
stage.addEventListener('pointerdown', armAudio)
stage.addEventListener('touchstart', armAudio, { passive: true })
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') unlockSfx()
})

window.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  if (event.target instanceof HTMLInputElement) return
  if (!results.hidden || !learnDone.hidden) return
  event.preventDefault()
  const next = event.key === 'ArrowDown' ? activeIndex + 1 : activeIndex - 1
  const card = feed.querySelector<HTMLElement>(`[data-index="${next}"]`)
  card?.scrollIntoView({ behavior: 'smooth' })
})

function effectiveMode(): ModeId {
  return settings.mode
}

async function beginSession(): Promise<void> {
  if (!settings.category || activePool().length === 0) return
  unlockSpeech()
  void unlockSfx()
  settings.started = true
  saveSettings()
  sessionCorrect = 0
  sessionAnswered = 0
  hideResults()
  hideLearnDone()
  renderFeed()
  gate.hidden = true
  sheet.hidden = true
  soundSheet.hidden = true
}

function goHome(): void {
  stopSpeech()
  window.clearTimeout(advanceTimer)
  window.clearTimeout(resultsTimer)
  window.clearTimeout(speakTimer)
  window.clearTimeout(revealTimer)
  window.clearTimeout(learnSpokenTimer)
  window.clearTimeout(payoffTimer)
  window.clearTimeout(cardReplayTimer)
  learnSpokenGen += 1
  learnGeneration += 1
  payoffStep = 'none'
  hideResults()
  hideLearnDone()
  observer?.disconnect()
  feedWords = []
  feed.innerHTML = ''
  settings.started = false
  saveSettings()
  sheet.hidden = true
  soundSheet.hidden = true
  gate.hidden = false
  refreshChrome()
}

function hideResults(): void {
  results.hidden = true
}

function hideLearnDone(): void {
  learnDone.hidden = true
}

function showLearnDone(): void {
  if (learnDoneShown || !settings.started || effectiveMode() !== 'learn') return
  const category = settings.category ? getCategory(settings.category) : null
  qs('#learn-done-kicker').textContent = category ? `${category.short} complete` : 'Category complete'
  qs('#learn-done-sub').textContent = category
    ? `${category.short} is done. Quiz these words, or go home to pick a new category.`
    : 'Quiz these words, or go home to pick a new category.'
  learnDoneShown = true
  learnDone.hidden = false
  playResult()
}

function scheduleLearnDone(index: number, generation: number): void {
  if (index < feedWords.length - 1) return
  window.setTimeout(() => {
    if (generation !== learnSpokenGen) return
    if (activeIndex !== index || effectiveMode() !== 'learn') return
    showLearnDone()
  }, 2800)
}

async function continueAsQuiz(mode: ModeId): Promise<void> {
  hideLearnDone()
  settings.mode = mode
  await beginSession()
}

function showResults(): void {
  const total = Math.max(sessionAnswered, feedWords.length)
  const ratio = total ? sessionCorrect / total : 0
  qs('#results-kicker').textContent = 'Quiz complete'
  qs('#results-score').textContent = `${sessionCorrect} / ${total}`
  qs('#results-sub').textContent =
    ratio === 1 ? 'Perfect round' : ratio >= 0.7 ? 'Really strong' : 'Keep scrolling — you’ll lock these in'
  results.hidden = false
  if (ratio >= 0.7) playVictory()
  else playDefeat()
}

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
  return `${settings.category}|${effectiveMode()}|${settings.learning}|${settings.native}`
}

function renderFeed(startId?: string): void {
  if (!settings.category) return

  observer?.disconnect()
  window.clearTimeout(advanceTimer)
  window.clearTimeout(speakTimer)
  window.clearTimeout(revealTimer)
  window.clearTimeout(learnSpokenTimer)
  learnSpokenGen += 1
  learnGeneration += 1
  learnDoneShown = false
  hideLearnDone()
  const pool = activePool()
  feedWords = effectiveMode() === 'learn' ? pool : shuffled(pool)
  feedKey = currentFeedKey()
  const startIndex = Math.max(
    0,
    startId ? feedWords.findIndex((item) => item.id === startId) : 0,
  )
  activeIndex = startIndex === -1 ? 0 : startIndex
  swipeSoundIndex = activeIndex
  window.clearTimeout(swipeSoundTimer)

  if (!feedWords.length) {
    feed.innerHTML = `
      <article class="card empty-card">
        <p class="learn">No words here</p>
        <p class="native">Pick another category to keep going.</p>
      </article>
    `
    refreshChrome()
    return
  }

  feed.innerHTML = feedWords.map((word, index) => cardMarkup(word, index, pool)).join('')
  bindFeed()
  feed.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.classList.add('is-active')
  feed.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView()
  refreshChrome()
  if (settings.started && effectiveMode() === 'learn') startLearnHook(activeIndex)
}

function bindFeed(): void {
  feed.querySelectorAll<HTMLElement>('.emoji-hit').forEach((button, index) => {
    button.addEventListener('click', () => {
      const card = button.closest('.card')
      if (effectiveMode() !== 'learn' && !card?.classList.contains('answered')) return
      unlockSpeech()
      if (effectiveMode() === 'learn') {
        cancelCardReplay()
        const revealed = card?.classList.contains('is-revealed')
        if (!revealed) {
          revealLearnCard(index, true)
        } else if (payoffStep === 'ask') {
          if (exampleWaiting) skipCurrentRing?.()
          else showPayoffAnswer(index)
        } else if (payoffStep === 'answer') {
          window.clearTimeout(payoffTimer)
          speakPayoffAnswer(index)
        } else if (!examplesDone) {
          if (exampleWaiting) skipCurrentRing?.()
          else skipToNextExample(index)
        } else {
          speakWord(index, true)
        }
        return
      }
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

  feed.querySelectorAll<HTMLElement>('.card-learn [data-learn]').forEach((learn, index) => {
    learn.addEventListener('click', (event) => {
      event.stopPropagation()
      const card = learn.closest<HTMLElement>('.card-learn')
      if (!card?.classList.contains('is-revealed')) return
      if (payoffStep === 'ask' || payoffStep === 'answer') return
      if (exampleWaiting || card.classList.contains('speaking')) return
      cancelCardReplay()
      replaySpelling(index)
    })
  })

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (!visible?.target) return

      const index = Number((visible.target as HTMLElement).dataset.index)
      if (Number.isNaN(index)) return

      feed.querySelectorAll('.card').forEach((card) => card.classList.remove('is-active'))
      visible.target.classList.add('is-active')

      if (index === activeIndex) return

      activeIndex = index
      refreshChrome()
      if (settings.started && effectiveMode() === 'learn') startLearnHook(index)
    },
    { root: feed, threshold: 0.72 },
  )

  feed.querySelectorAll('.card').forEach((card) => observer?.observe(card))
}

function cardMarkup(word: Word, index: number, pool: Word[]): string {
  const answer = escapeHtml(word.forms[settings.learning])
  const native = escapeHtml(word.forms[settings.native])
  const mode = effectiveMode()
  const quiz = mode !== 'learn'
  const hint =
    mode === 'learn'
      ? settings.sounds.reveal
        ? 'Watch · word coming'
        : 'Tap emoji to replay · swipe up'
      : mode === 'choice'
        ? 'Pick the word'
        : 'Type the word · accents optional'

  const quizUi =
    mode === 'choice'
      ? `<div class="quiz-options">
          ${choiceWords(word, pool)
            .map(
              (option) =>
                `<button class="quiz-option" type="button" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`,
            )
            .join('')}
        </div>`
      : mode === 'type'
        ? `<form class="type-form">
            <input class="type-input" type="text" enterkeyhint="done" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Type the word" />
            <button type="submit">Check</button>
            <p class="type-hint">Accents are optional</p>
          </form>
          <p class="type-feedback"></p>`
        : ''

  const prompt = quiz
    ? `<p class="native" data-native>${native}</p>
       <p class="learn" data-learn hidden></p>`
    : settings.sounds.reveal
      ? `<div class="hook">
           <p class="hook-line"${settings.sounds.ask ? '' : ' hidden'} data-hook>${escapeHtml(hookLine(index, word.forms[settings.native]))}</p>
         </div>
         <button class="emoji-hit" type="button" aria-label="Replay pronunciation">
           ${revealRingMarkup()}
           <span class="emoji">${word.emoji}</span>
         </button>
         <p class="learn is-blurred" data-learn aria-hidden="true">${highlightLearnWord(word.forms[settings.learning])}</p>
         <div class="examples" data-examples></div>`
      : `<button class="emoji-hit" type="button" aria-label="Replay pronunciation">
           ${revealRingMarkup()}
           <span class="emoji">${word.emoji}</span>
         </button>
         <p class="learn" data-learn>${highlightLearnWord(word.forms[settings.learning])}</p>
         <div class="examples" data-examples></div>
         <p class="native" data-native>${native}</p>`

  if (quiz) {
    return `
    <article class="card card-quiz" data-index="${index}" data-answer="${answer}" style="background:${word.tint}">
      <button class="emoji-hit" type="button" aria-label="Word prompt">
        <span class="emoji">${word.emoji}</span>
      </button>
      ${prompt}
      ${quizUi}
      <p class="hint">${hint}</p>
    </article>
  `
  }

  return `
    <article class="card card-learn${settings.sounds.reveal ? '' : ' is-revealed'}" data-index="${index}" data-answer="${answer}"${settings.sounds.reveal ? ' data-beat="hook"' : ' data-beat="reveal"'} style="background:${word.tint}">
      ${prompt}
      <p class="hint">${hint}</p>
    </article>
  `
}

function choiceWords(word: Word, pool: Word[]): string[] {
  const correct = word.forms[settings.learning]
  const takeDistractors = (source: Word[]): string[] =>
    shuffled(
      source.filter((item) => item.id !== word.id && item.forms[settings.learning] !== correct),
    )
      .slice(0, 2)
      .map((item) => item.forms[settings.learning])

  let distractors = takeDistractors(pool)
  if (distractors.length < 2) {
    distractors = takeDistractors(words.filter((item) => item.category === word.category))
  }

  return shuffled([correct, ...distractors])
}

function gradeCard(card: HTMLElement, given: string): void {
  const index = Number(card.dataset.index)
  const expected = card.dataset.answer ?? ''
  const correct = normalizeAnswer(given) === normalizeAnswer(expected)
  const word = feedWords[index]
  if (!word) return

  if (correct) playCorrect()
  else playWrong()

  card.classList.add('answered', correct ? 'is-correct' : 'is-wrong')
  sessionAnswered += 1
  if (correct) sessionCorrect += 1

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

  window.setTimeout(() => speakWord(index, true), correct ? 320 : 180)
  refreshChrome()
  const last = index >= feedWords.length - 1
  if (last) {
    window.clearTimeout(resultsTimer)
    resultsTimer = window.setTimeout(showResults, correct ? 1500 : 1300)
    return
  }
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

type HookLine = {
  format: (word: string) => string
}

const HOOKS: Record<LangCode, HookLine[]> = {
  en: [
    { format: (word) => `3 ways to remember “${word}”` },
    { format: (word) => `3 examples to help you remember “${word}”` },
    { format: (word) => `Here’s how to remember “${word}”` },
    { format: (word) => `Let’s make “${word}” easier to remember` },
    { format: (word) => `3 quick examples of “${word}”` },
    { format: (word) => `Learn “${word}” with 3 examples` },
    { format: (word) => `See “${word}” in 3 sentences` },
    { format: (word) => `Remember “${word}” with these 3 sentences` },
    { format: (word) => `Here are 3 ways to use “${word}”` },
  ],
  pl: [
    { format: (word) => `3 sposoby na zapamiętanie „${word}”` },
    { format: (word) => `3 przykłady, które pomogą zapamiętać „${word}”` },
    { format: (word) => `Oto jak zapamiętać „${word}”` },
    { format: (word) => `Ułatw sobie „${word}”` },
    { format: (word) => `3 szybkie przykłady „${word}”` },
    { format: (word) => `Naucz się „${word}” na 3 przykładach` },
    { format: (word) => `Zobacz „${word}” w 3 zdaniach` },
    { format: (word) => `Zapamiętaj „${word}” dzięki tym 3 zdaniom` },
    { format: (word) => `Oto 3 sposoby użycia „${word}”` },
  ],
}

function hookFor(index: number, code: LangCode): HookLine {
  const lines = HOOKS[code]
  const fallback: HookLine = {
    format: (word) => `3 ways to remember “${word}”`,
  }
  return lines[index % lines.length] ?? fallback
}

function hookLine(index: number, word: string): string {
  const text = word.trim()
  if (!text) return '3 ways to remember this word'
  const capped = text.charAt(0).toUpperCase() + text.slice(1)
  return hookFor(index, settings.native).format(capped)
}

function hookRingMs(text: string): number {
  return Math.min(3400, Math.max(1800, 1000 + text.length * 58))
}

function exampleRingMs(text: string, step: number): number {
  const floor = step === 0 ? 1250 : step === 1 ? 900 : 750
  const ceiling = step === 0 ? 1700 : step === 1 ? 1250 : 1000
  return Math.min(ceiling, Math.max(floor, floor - 80 + text.length * 16))
}

function recallRingMs(text: string): number {
  return Math.min(3400, Math.max(1900, 1050 + text.length * 58))
}

type LearnBeat = 'hook' | 'reveal' | 'example' | 'recall' | 'payoff' | 'explore'

function setLearnBeat(card: Element | null, beat: LearnBeat): void {
  if (!card) return
  card.setAttribute('data-beat', beat)
  card.classList.toggle('has-examples', beat === 'example' || beat === 'explore')
  card.classList.toggle('is-recall', beat === 'recall')
  card.classList.toggle('is-recall-revealed', beat === 'payoff')
}

function payoffQuestion(index: number, word: string): string {
  const text = word.trim()
  const capped = text ? text.charAt(0).toUpperCase() + text.slice(1) : ''
  const en: string[] = capped
    ? [
        `What was “${capped}”?`,
        `Can you remember “${capped}”?`,
        `Do you remember “${capped}”?`,
        `How would you say “${capped}”?`,
        `Still got “${capped}”?`,
        `Quick — what was “${capped}”?`,
        `How do you say “${capped}”?`,
        `Name this: “${capped}”`,
      ]
    : ['What was that?']
  const pl: string[] = capped
    ? [
        `Co to było „${capped}”?`,
        `Pamiętasz „${capped}”?`,
        `Potrafisz przypomnieć sobie „${capped}”?`,
        `Jak powiedzieć „${capped}”?`,
        `Pamiętasz jeszcze „${capped}”?`,
        `Szybko — co to było „${capped}”?`,
        `Jak jest „${capped}”?`,
        `Nazwij to: „${capped}”`,
      ]
    : ['Co to było?']
  const lines = settings.native === 'pl' ? pl : en
  return lines[index % lines.length] ?? lines[0] ?? 'What was that?'
}

function revealRingMarkup(): string {
  return `
    <svg class="reveal-ring" viewBox="0 0 100 100" aria-hidden="true">
      <circle class="reveal-ring-track" cx="50" cy="50" r="46"></circle>
      <circle class="reveal-ring-fill" cx="50" cy="50" r="46"></circle>
    </svg>
  `
}

const REVEAL_RING = 2 * Math.PI * 46

function resetRevealRings(): void {
  feed.querySelectorAll('.card-learn').forEach((card) => resetRevealRing(card))
}

function resetRevealRing(card: Element): void {
  card.classList.remove('is-waiting')
  const fill = card.querySelector<SVGCircleElement>('.reveal-ring-fill')
  if (!fill) return
  fill.style.transition = 'none'
  fill.style.strokeDashoffset = String(REVEAL_RING)
}

function startRevealRing(card: Element, durationMs: number, onDone: () => void): void {
  const fill = card.querySelector<SVGCircleElement>('.reveal-ring-fill')
  const duration = Math.max(400, durationMs)
  card.classList.add('is-waiting')

  let finished = false
  const finish = (): void => {
    if (finished) return
    finished = true
    if (skipCurrentRing === finish) skipCurrentRing = null
    fill?.removeEventListener('transitionend', onEnd)
    window.clearTimeout(revealTimer)
    onDone()
  }
  skipCurrentRing = finish
  const onEnd = (event: TransitionEvent): void => {
    if (!fill || event.target !== fill) return
    if (event.propertyName && event.propertyName !== 'stroke-dashoffset') return
    const left = Number.parseFloat(getComputedStyle(fill).strokeDashoffset)
    if (Number.isFinite(left) && Math.abs(left) > 3) return
    finish()
  }

  if (!fill) {
    revealTimer = window.setTimeout(finish, duration)
    return
  }

  fill.style.transition = 'none'
  fill.style.strokeDashoffset = String(REVEAL_RING)
  void fill.getBoundingClientRect()
  fill.addEventListener('transitionend', onEnd)
  revealTimer = window.setTimeout(finish, duration + 90)
  fill.style.transition = `stroke-dashoffset ${duration}ms linear`
  fill.style.strokeDashoffset = '0'
}

function finishRevealRing(card: Element): void {
  const fill = card.querySelector<SVGCircleElement>('.reveal-ring-fill')
  card.classList.remove('is-waiting')
  if (!fill) return
  fill.style.transition = 'stroke-dashoffset 180ms ease'
  fill.style.strokeDashoffset = '0'
}

function startLearnHook(index: number): void {
  const word = feedWords[index]
  if (!word || effectiveMode() !== 'learn') return

  learnGeneration += 1
  const generation = learnGeneration
  window.clearTimeout(speakTimer)
  window.clearTimeout(revealTimer)
  window.clearTimeout(learnSpokenTimer)
  learnSpokenGen += 1
  nextExample = 0
  examplesDone = false
  exampleWaiting = false
  payoffStep = 'none'
  skipCurrentRing = null
  window.clearTimeout(payoffTimer)
  window.clearTimeout(cardReplayTimer)
  stopSpeech()
  resetRevealRings()
  feed.querySelectorAll('.card-learn').forEach((card) => clearLearnExamples(card))

  if (!settings.sounds.reveal) {
    feed.querySelectorAll('.card-learn').forEach((card) => {
      card.classList.add('is-revealed')
      card.classList.remove('speaking', 'is-waiting')
      setLearnBeat(card, 'reveal')
      const learn = card.querySelector<HTMLElement>('[data-learn]')
      learn?.classList.remove('is-blurred')
      learn?.removeAttribute('aria-hidden')
      const hint = card.querySelector('.hint')
      if (hint) hint.textContent = 'Tap emoji to replay · swipe up'
    })
    speakWord(index, false, 'examples')
    return
  }

  feed.querySelectorAll('.card-learn').forEach((card) => {
    card.classList.remove('is-revealed', 'speaking', 'is-waiting')
    setLearnBeat(card, 'hook')
    const learn = card.querySelector<HTMLElement>('[data-learn]')
    if (learn) {
      learn.classList.add('is-blurred')
      learn.setAttribute('aria-hidden', 'true')
    }
    const hint = card.querySelector('.hint')
    if (hint) hint.textContent = 'Watch · word coming'
  })

  const card = feed.querySelector(`[data-index="${index}"]`)
  card?.classList.add('speaking')
  const nativeWord = word.forms[settings.native]
  const prompt = hookLine(index, nativeWord)
  const hookEl = card?.querySelector<HTMLElement>('[data-hook]')
  if (hookEl) {
    hookEl.hidden = !settings.sounds.ask
    hookEl.textContent = prompt
  }

  const revealWhenRingCompletes = (durationMs: number): void => {
    if (!card) {
      revealTimer = window.setTimeout(() => {
        if (generation !== learnGeneration || activeIndex !== index) return
        revealLearnCard(index)
      }, durationMs)
      return
    }
    startRevealRing(card, durationMs, () => {
      if (generation !== learnGeneration || activeIndex !== index) return
      revealLearnCard(index)
    })
  }

  if (!settings.sounds.voice) {
    revealWhenRingCompletes(1100)
    return
  }

  const native = getLanguage(settings.native)
  const spoken = settings.sounds.ask ? prompt : ''
  const waitMs = spoken ? hookRingMs(spoken) : 1200
  if (spoken) {
    speakTimer = window.setTimeout(() => {
      if (generation !== learnGeneration || activeIndex !== index) return
      speak(spoken, native.bcp47, native.voiceLangs)
    }, 40)
  }
  revealWhenRingCompletes(waitMs)
}

function revealLearnCard(index: number, force = false): void {
  const word = feedWords[index]
  const card = feed.querySelector<HTMLElement>(`[data-index="${index}"]`)
  if (!word || !card) return

  learnGeneration += 1
  window.clearTimeout(revealTimer)
  card.classList.add('is-revealed')
  card.classList.remove('speaking')
  setLearnBeat(card, 'reveal')
  finishRevealRing(card)
  stopSpeech()
  const learn = card.querySelector<HTMLElement>('[data-learn]')
  if (learn) {
    learn.classList.remove('is-blurred')
    learn.removeAttribute('aria-hidden')
  }
  const hint = card.querySelector('.hint')
  if (hint) {
    hint.textContent = word.examples.length
      ? 'Examples coming · tap word to spell'
      : 'Tap emoji to replay · tap word to spell'
  }
  window.clearTimeout(speakTimer)
  speakTimer = window.setTimeout(() => {
    if (activeIndex !== index) return
    speakWord(index, force, 'examples')
  }, 220)
}

function clearLearnExamples(card: Element): void {
  card.classList.remove('has-examples', 'is-recall', 'is-recall-revealed')
  card.removeAttribute('data-beat')
  const box = card.querySelector('[data-examples]')
  if (box) box.replaceChildren()
  const learn = card.querySelector<HTMLElement>('[data-learn]')
  if (learn) {
    learn.hidden = false
    learn.classList.remove('is-blurred')
    learn.removeAttribute('aria-hidden')
  }
}

function restoreLearnWord(learn: HTMLElement, text: string): void {
  learn.innerHTML = highlightLearnWord(text)
}

function showLearnCheckmark(learn: HTMLElement, text: string): void {
  learn.innerHTML = `${highlightLearnWord(text)} `
  const mark = document.createElement('span')
  mark.className = 'payoff-check'
  mark.textContent = '✓'
  learn.append(mark)
}

function replayExample(item: HTMLElement, text: string): void {
  unlockSpeech()
  if (!settings.sounds.voice || !text) return

  document.querySelectorAll('.example').forEach((el) => el.classList.remove('is-speaking'))
  item.classList.add('is-speaking')
  window.setTimeout(() => item.classList.remove('is-speaking'), 900)

  const polish = getLanguage('pl')
  speak(text, polish.bcp47, polish.voiceLangs)
}

function spellingText(text: string): string {
  const compact = text
    .normalize('NFC')
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[.,!?;:'"()[\]{}\-_/\\]/g, '')
  return [...compact].join(' ')
}

function replaySpelling(index: number): void {
  const word = feedWords[index]
  if (!word || !settings.sounds.voice) return
  const spelled = spellingText(word.forms[settings.learning])
  if (!spelled) return

  if (spellingReplayWordId !== word.id) {
    spellingReplayWordId = word.id
    spellingReplayStep = 0
  }

  const rateMultiplier = spellingReplayStep === 0 ? 1 : 0.7
  spellingReplayStep = spellingReplayStep >= 2 ? 0 : spellingReplayStep + 1

  unlockSpeech()
  feed.querySelectorAll('.card').forEach((card) => card.classList.remove('speaking'))
  const card = feed.querySelector<HTMLElement>(`[data-index="${index}"]`)
  card?.classList.add('speaking')
  window.setTimeout(() => card?.classList.remove('speaking'), 900)

  const learning = getLanguage(settings.learning)
  speak(spelled, learning.bcp47, learning.voiceLangs, undefined, rateMultiplier)
}

function skipToNextExample(index: number): void {
  learnSpokenGen += 1
  stopSpeech()
  window.clearTimeout(learnSpokenTimer)
  window.clearTimeout(speakTimer)
  queueExample(index, nextExample)
}

function queueExample(index: number, step: number): void {
  const word = feedWords[index]
  const card = feed.querySelector(`[data-index="${index}"]`)
  if (!word || effectiveMode() !== 'learn' || activeIndex !== index) return

  const examples = word.examples.slice(0, 3)
  if (step >= examples.length) {
    startPayoff(index)
    return
  }

  const example = examples[step]
  if (!example) return

  nextExample = step
  exampleWaiting = true
  examplesDone = false
  const generation = learnGeneration
  const durationMs = settings.sounds.voice ? exampleRingMs(example.pl, step) : step === 0 ? 850 : 620

  const hint = card?.querySelector('.hint')
  if (hint) hint.textContent = step === 0 ? 'First example · tap to skip' : 'Next example · tap to skip'

  setLearnBeat(card, 'example')

  if (!card) {
    revealTimer = window.setTimeout(() => {
      if (generation !== learnGeneration || activeIndex !== index) return
      showExample(index, step)
    }, durationMs)
    return
  }

  resetRevealRing(card)
  startRevealRing(card, durationMs, () => {
    if (generation !== learnGeneration || activeIndex !== index) return
    showExample(index, step)
  })
}

function showExample(index: number, step: number): void {
  const word = feedWords[index]
  const card = feed.querySelector<HTMLElement>(`[data-index="${index}"]`)
  const example = word?.examples[step]
  if (!word || !card || !example || activeIndex !== index) return

  exampleWaiting = false
  nextExample = step + 1
  finishRevealRing(card)
  card.classList.add('has-examples')
  const box = card.querySelector('[data-examples]')
  if (box) {
    const item = document.createElement('button')
    item.type = 'button'
    item.className = 'example'
    item.setAttribute('aria-label', 'Replay sentence')
    item.innerHTML = `<p class="example-pl">${highlightTerms(example.pl, [word.forms[settings.learning]])}</p><p class="example-en">${highlightTerms(example.en, [word.forms[settings.learning]])}</p>`
    item.addEventListener('click', (event) => {
      event.stopPropagation()
      cancelCardReplay()
      replayExample(item, example.pl)
    })
    box.append(item)
  }

  const generation = learnGeneration
  const offerGen = ++learnSpokenGen
  window.clearTimeout(learnSpokenTimer)
  const afterSpoken = (): void => {
    if (offerGen !== learnSpokenGen) return
    if (generation !== learnGeneration || activeIndex !== index) return
    window.clearTimeout(learnSpokenTimer)
    learnSpokenTimer = window.setTimeout(() => {
      if (offerGen !== learnSpokenGen) return
      if (generation !== learnGeneration || activeIndex !== index) return
      queueExample(index, step + 1)
    }, 180)
  }

  if (!settings.sounds.voice) {
    learnSpokenTimer = window.setTimeout(afterSpoken, step === 0 ? 520 : 380)
    return
  }

  feed.querySelectorAll('.card').forEach((item) => item.classList.remove('speaking'))
  card.classList.add('speaking')
  window.setTimeout(() => card.classList.remove('speaking'), 900)

  const polish = getLanguage('pl')
  const fallbackMs = Math.min(7200, Math.max(3200, 1600 + example.pl.length * 160))
  speak(example.pl, polish.bcp47, polish.voiceLangs, afterSpoken)
  learnSpokenTimer = window.setTimeout(afterSpoken, fallbackMs)
}

function startPayoff(index: number): void {
  const word = feedWords[index]
  const card = feed.querySelector<HTMLElement>(`[data-index="${index}"]`)
  if (!word || !card || effectiveMode() !== 'learn' || activeIndex !== index) return

  payoffStep = 'ask'
  exampleWaiting = true
  examplesDone = false
  stopSpeech()

  setLearnBeat(card, 'recall')

  const hook = card.querySelector<HTMLElement>('[data-hook]')
  const learn = card.querySelector<HTMLElement>('[data-learn]')
  const question = payoffQuestion(index, word.forms[settings.native])

  if (hook) {
    hook.hidden = false
    hook.textContent = question
  }
  if (learn) {
    learn.hidden = false
    learn.classList.add('is-blurred')
    learn.setAttribute('aria-hidden', 'true')
    restoreLearnWord(learn, word.forms[settings.learning])
  }

  const hint = card.querySelector('.hint')
  if (hint) hint.textContent = 'Quick recall · tap to skip'

  const generation = learnGeneration
  const durationMs = settings.sounds.voice ? recallRingMs(question) : 1400

  if (settings.sounds.voice) {
    const native = getLanguage(settings.native)
    speak(question, native.bcp47, native.voiceLangs)
  }

  resetRevealRing(card)
  startRevealRing(card, durationMs, () => {
    if (generation !== learnGeneration || activeIndex !== index) return
    showPayoffAnswer(index)
  })
}

function showPayoffAnswer(index: number): void {
  const word = feedWords[index]
  const card = feed.querySelector<HTMLElement>(`[data-index="${index}"]`)
  if (!word || !card || activeIndex !== index || payoffStep !== 'ask') return

  exampleWaiting = false
  payoffStep = 'answer'
  finishRevealRing(card)
  window.clearTimeout(payoffTimer)

  const learn = card.querySelector<HTMLElement>('[data-learn]')
  const answer = word.forms[settings.learning]
  if (learn) {
    learn.classList.remove('is-blurred')
    learn.removeAttribute('aria-hidden')
    showLearnCheckmark(learn, answer)
  }
  setLearnBeat(card, 'payoff')

  payoffTimer = window.setTimeout(() => {
    if (payoffStep !== 'answer' || activeIndex !== index) return
    speakPayoffAnswer(index)
  }, 480)
}

function completeRecall(index: number, offerGen: number): void {
  const word = feedWords[index]
  const card = feed.querySelector<HTMLElement>(`[data-index="${index}"]`)
  if (!word || !card || activeIndex !== index) return

  setLearnBeat(card, word.examples.length > 0 ? 'explore' : 'reveal')

  const learn = card.querySelector<HTMLElement>('[data-learn]')
  const hook = card.querySelector<HTMLElement>('[data-hook]')
  const answer = word.forms[settings.learning]

  if (learn) {
    learn.classList.remove('is-blurred')
    learn.removeAttribute('aria-hidden')
    showLearnCheckmark(learn, answer)
  }
  if (hook) {
    hook.hidden = true
  }

  payoffStep = 'done'
  examplesDone = true
  const hint = card.querySelector('.hint')
  if (hint) hint.textContent = 'Read the sentences · swipe up'
  scheduleCardReplay(index)
  scheduleLearnDone(index, offerGen)
}

function cancelCardReplay(): void {
  window.clearTimeout(cardReplayTimer)
}

function scheduleCardReplay(index: number): void {
  window.clearTimeout(cardReplayTimer)
  if (effectiveMode() !== 'learn') return
  const generation = learnGeneration
  const spokenGen = learnSpokenGen
  cardReplayTimer = window.setTimeout(() => {
    if (generation !== learnGeneration || spokenGen !== learnSpokenGen) return
    if (activeIndex !== index || payoffStep !== 'done') return
    if (learnDoneShown || !learnDone.hidden) return
    startLearnHook(index)
  }, 3000)
}

function speakPayoffAnswer(index: number): void {
  const word = feedWords[index]
  const card = feed.querySelector<HTMLElement>(`[data-index="${index}"]`)
  if (!word || !card || activeIndex !== index || payoffStep !== 'answer') return

  window.clearTimeout(payoffTimer)
  stopSpeech()
  const generation = learnGeneration
  const offerGen = ++learnSpokenGen
  window.clearTimeout(learnSpokenTimer)
  const answer = word.forms[settings.learning]

  let finished = false
  const finishPayoff = (): void => {
    if (finished || offerGen !== learnSpokenGen) return
    if (generation !== learnGeneration || activeIndex !== index) return
    finished = true
    window.clearTimeout(learnSpokenTimer)
    playVictory()
    completeRecall(index, offerGen)
  }

  if (!settings.sounds.voice) {
    finishPayoff()
    return
  }

  feed.querySelectorAll('.card').forEach((item) => item.classList.remove('speaking'))
  card.classList.add('speaking')
  window.setTimeout(() => card.classList.remove('speaking'), 900)

  const learning = getLanguage(settings.learning)
  const fallbackMs = Math.min(6500, Math.max(2500, 1200 + answer.length * 140))
  speak(answer, learning.bcp47, learning.voiceLangs, finishPayoff)
  learnSpokenTimer = window.setTimeout(finishPayoff, fallbackMs)
}

function speakWord(index: number, force = false, then: 'examples' | 'none' = 'none'): void {
  const word = feedWords[index]
  if (!word) return

  feed.querySelectorAll('.card').forEach((card) => card.classList.remove('speaking'))
  feed.querySelector(`[data-index="${index}"]`)?.classList.add('speaking')
  window.setTimeout(() => {
    feed.querySelector(`[data-index="${index}"]`)?.classList.remove('speaking')
  }, 900)

  const offerGen = ++learnSpokenGen
  window.clearTimeout(learnSpokenTimer)
  const afterSpoken = (): void => {
    if (offerGen !== learnSpokenGen) return
    window.clearTimeout(learnSpokenTimer)
    if (then === 'examples') queueExample(index, nextExample)
    else scheduleLearnDone(index, offerGen)
  }

  if (!force && !settings.sounds.voice) {
    const wait = then === 'examples' ? 220 : index >= feedWords.length - 1 ? 700 : 0
    if (wait) learnSpokenTimer = window.setTimeout(afterSpoken, wait)
    else afterSpoken()
    return
  }

  window.clearTimeout(speakTimer)
  const learning = getLanguage(settings.learning)
  const text = word.forms[settings.learning]
  const fallbackMs = Math.min(6500, Math.max(2500, 1200 + text.length * 140))
  speakTimer = window.setTimeout(() => {
    speak(text, learning.bcp47, learning.voiceLangs, afterSpoken)
    learnSpokenTimer = window.setTimeout(afterSpoken, fallbackMs)
  }, force ? 0 : 140)
}

function refreshWords(): void {
  if (effectiveMode() !== 'learn') return
  feed.querySelectorAll<HTMLElement>('.card').forEach((card, index) => {
    const word = feedWords[index]
    if (!word) return
    const learn = card.querySelector('[data-learn]')
    const hook = card.querySelector<HTMLElement>('[data-hook]')
    if (learn) learn.innerHTML = highlightLearnWord(word.forms[settings.learning])
    if (hook) {
      hook.hidden = !settings.sounds.ask
      hook.textContent = hookLine(index, word.forms[settings.native])
    }
  })
}

function refreshChrome(): void {
  const native = getLanguage(settings.native)
  const learning = getLanguage(settings.learning)
  langLabel.textContent = `${learning.nativeName} → ${native.label}`

  const pool = activePool()
  const count = pool.length
  const category = settings.category ? getCategory(settings.category) : null
  const score = feed.querySelectorAll('.card.is-correct').length
  progress.textContent = category
    ? effectiveMode() === 'learn'
      ? `${category.emoji} ${count ? Math.min(activeIndex + 1, count) : 0} / ${count}`
      : `${category.emoji} ${count ? Math.min(activeIndex + 1, count) : 0} / ${count} · ${score}✓`
    : '—'

  startBtn.disabled = !settings.category || count === 0
  startBtn.textContent = !settings.category
    ? 'Choose a category'
    : count === 0
      ? 'No words here'
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
    const id = (choice as HTMLElement).dataset.category
    choice.setAttribute('aria-pressed', String(id === settings.category))
    const countEl = choice.querySelector('[data-learn-count]')
    if (id && isCategoryId(id) && countEl) {
      countEl.textContent = `${wordsInCategory(id).length}`
    }
  })

  document.querySelectorAll('[data-mode]').forEach((choice) => {
    choice.setAttribute('aria-pressed', String((choice as HTMLElement).dataset.mode === settings.mode))
  })

  refreshSoundSheet()
  refreshWords()
}

function refreshSoundSheet(): void {
  const anyOn =
    settings.sounds.voice || SOUND_ACTIONS.some((action) => settings.sounds.enabled[action.id])
  soundBtn.textContent = anyOn ? '🔊' : '🔇'
  soundBtn.setAttribute('aria-label', 'Sound settings')

  const voiceBtn = qs<HTMLButtonElement>('#toggle-voice')
  voiceBtn.textContent = settings.sounds.voice ? 'On' : 'Off'
  voiceBtn.setAttribute('aria-pressed', String(settings.sounds.voice))
  const revealBtn = qs<HTMLButtonElement>('#toggle-reveal')
  revealBtn.textContent = settings.sounds.reveal ? 'On' : 'Off'
  revealBtn.setAttribute('aria-pressed', String(settings.sounds.reveal))
  const askBtn = qs<HTMLButtonElement>('#toggle-ask')
  askBtn.textContent = settings.sounds.ask ? 'On' : 'Off'
  askBtn.setAttribute('aria-pressed', String(settings.sounds.ask))
  askBtn.disabled = !settings.sounds.reveal

  SOUND_ACTIONS.forEach((action) => {
    const on = settings.sounds.enabled[action.id]
    const field = soundFields.querySelector(`[data-sound-field="${action.id}"]`)
    field?.classList.toggle('is-off', !on)
    const toggle = soundFields.querySelector<HTMLButtonElement>(`[data-sound-on="${action.id}"]`)
    if (toggle) {
      toggle.textContent = on ? 'On' : 'Off'
      toggle.setAttribute('aria-pressed', String(on))
    }
    const select = soundFields.querySelector<HTMLSelectElement>(`[data-sound-action="${action.id}"]`)
    if (select) select.value = settings.sounds.choice[action.id]
  })
}

function closeSoundSheet(): void {
  saveSettings()
  soundSheet.hidden = true
}

function closeSettings(): void {
  saveSettings()
  sheet.hidden = true
  if (settings.started && settings.category && feedKey !== currentFeedKey()) {
    renderFeed()
  } else {
    refreshChrome()
  }
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

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightLearnWord(text: string): string {
  return `<span class="word-hit">${escapeHtml(text)}</span>`
}

function stemsFor(term: string): string[] {
  const normalized = term.normalize('NFC').trim().toLowerCase()
  if (!normalized) return []
  const parts = normalized.split(/\s+/).filter(Boolean)
  const stems = [...parts]
  if (parts.length > 1) stems.unshift(normalized)
  for (const part of parts) {
    if (part.length >= 6) {
      stems.push(part.slice(0, -1), part.slice(0, -2))
    } else if (part.length >= 4) {
      stems.push(part.slice(0, -1))
    }
  }
  return [...new Set(stems)]
}

function highlightTerms(text: string, terms: string[]): string {
  const stems = [...new Set(terms.flatMap(stemsFor))]
    .filter((stem) => stem.length >= 3)
    .sort((a, b) => b.length - a.length)
  if (!stems.length) return escapeHtml(text)

  const letter = '[A-Za-zÀ-žĄąĆćĘęŁłŃńÓóŚśŹźŻż]'
  const body = stems
    .map((stem) => (stem.length <= 3 ? escapeRegex(stem) : `${escapeRegex(stem)}${letter}*`))
    .join('|')
  const pattern = new RegExp(`(?<!${letter})(?:${body})(?!${letter})`, 'gi')

  let cursor = 0
  let html = ''
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0
    html += escapeHtml(text.slice(cursor, start))
    html += `<span class="word-hit">${escapeHtml(match[0])}</span>`
    cursor = start + match[0].length
  }
  html += escapeHtml(text.slice(cursor))
  return html
}

function qs<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector)
  if (!el) throw new Error(`Missing ${selector}`)
  return el
}

if (settings.started && settings.category) renderFeed()
refreshChrome()

