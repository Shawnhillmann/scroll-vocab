import { type LangCode, getLanguage } from './words.ts'

export type TutorRole = 'user' | 'assistant'

export type TutorChatMessage = {
  role: TutorRole
  content: string
}

export type TutorTopic = 'word' | 'conjugations'

export type TutorWordContext = {
  learning: string
  native: string
  emoji: string
  learningLang: string
  nativeLang: string
  nativeCode: LangCode
  learningCode: LangCode
  category?: string
  topic?: TutorTopic
}

export type TutorQuickStart = {
  label: string
  prompt: string
}

const TUTOR_QUICK_SECTION: Record<LangCode, string> = {
  en: 'Quick start',
  pl: 'Szybki start',
}

export function tutorQuickSectionLabel(lang: LangCode): string {
  return TUTOR_QUICK_SECTION[lang] ?? TUTOR_QUICK_SECTION.en
}

const QUICK_STARTS: Record<LangCode, Array<(word: string) => string>> = {
  en: [
    (w) => `What are common phrases with ${w}?`,
    (w) => `What are the common forms or conjugations of ${w}?`,
    (w) => `What words are similar to ${w}?`,
    (w) => `List out all forms or conjugations of ${w}?`,
  ],
  pl: [
    (w) => `Jakie są typowe zwroty z „${w}”?`,
    (w) => `Jakie są typowe formy lub odmiany „${w}”?`,
    (w) => `Jakie słowa są podobne do „${w}”?`,
    (w) => `Wypisz wszystkie formy lub odmiany „${w}”.`,
  ],
}

const CONJUGATION_QUICK_STARTS: Record<LangCode, string[]> = {
  en: [
    'Help me conjugate a word',
    'Explain conjugations to me further',
    'What else should I know about conjugations?',
  ],
  pl: [
    'Pomóż mi odmienić słowo',
    'Wytłumacz mi odmiany dokładniej',
    'Co jeszcze powinienem wiedzieć o odmianach?',
  ],
}

export function tutorQuickStarts(ctx: TutorWordContext): TutorQuickStart[] {
  if (ctx.topic === 'conjugations') {
    const items = CONJUGATION_QUICK_STARTS[ctx.nativeCode] ?? CONJUGATION_QUICK_STARTS.en
    return items.map((text) => ({ label: text, prompt: text }))
  }
  const w = ctx.learning
  const items = QUICK_STARTS[ctx.nativeCode] ?? QUICK_STARTS.en
  return items.map((prompt) => {
    const text = prompt(w)
    return { label: text, prompt: text }
  })
}

const FOLLOW_UPS: Record<LangCode, Array<(word: string) => string>> = {
  en: [
    (w) => `How do I use ${w} in a sentence?`,
    (w) => `Is ${w} formal or informal?`,
    (w) => `What's a common mistake with ${w}?`,
  ],
  pl: [
    (w) => `Jak użyć „${w}” w zdaniu?`,
    (w) => `Czy „${w}” jest formalne czy nieformalne?`,
    (w) => `Jaki jest częsty błąd z „${w}”?`,
  ],
}

const CONJUGATION_FOLLOW_UPS: Record<LangCode, string[]> = {
  en: [
    'Show me present tense endings',
    'What is a common conjugation mistake?',
    'How do I conjugate “być”?',
  ],
  pl: [
    'Pokaż końcówki czasu teraźniejszego',
    'Jaki jest częsty błąd przy odmianie?',
    'Jak odmienić „być”?',
  ],
}

export function tutorFollowUps(ctx: TutorWordContext): string[] {
  if (ctx.topic === 'conjugations') {
    return CONJUGATION_FOLLOW_UPS[ctx.nativeCode] ?? CONJUGATION_FOLLOW_UPS.en
  }
  const w = ctx.learning
  const items = FOLLOW_UPS[ctx.nativeCode] ?? FOLLOW_UPS.en
  return items.map((fn) => fn(w))
}

const POLISH_CHARS = /[ąćęłńóśźż]/i
const POLISH_WORDS =
  /\b(jak|co|czy|nie|jest|się|proszę|pomoc|pomóż|pomóżcie|lubię|chcę|mogę|mnie|mi|dla|tego|słowa|słowo|znaczy|użyj|użyć|formy|odmiany|odmienić|odmień|podobne|zwrot|zwroty|typowe|jaki|jaka|jakie|częsty|błąd|formalne|nieformalne|wytłumacz|dokładniej|powinienem|wiedzieć)\b/i
const ENGLISH_WORDS =
  /\b(what|how|help|me|with|the|is|are|can|please|word|phrase|similar|form|conjugat|else|know|about|mean|use|sentence|formal|informal|mistake|common|should|explain|further|list)\b/i

/** Guess which language the learner wrote in (en/pl). */
export function detectMessageLanguage(text: string): LangCode | null {
  const trimmed = text.trim()
  if (!trimmed) return null

  let polishScore = 0
  let englishScore = 0
  if (POLISH_CHARS.test(trimmed)) polishScore += 4
  if (POLISH_WORDS.test(trimmed)) polishScore += 3
  if (ENGLISH_WORDS.test(trimmed)) englishScore += 3
  // Latin-only Polish messages without diacritics still often match polish words above.
  if (/[a-z]/i.test(trimmed) && !POLISH_CHARS.test(trimmed) && ENGLISH_WORDS.test(trimmed)) {
    englishScore += 1
  }

  if (polishScore > englishScore) return 'pl'
  if (englishScore > polishScore) return 'en'
  return null
}

/** Language the tutor should reply in for this user message. */
export function tutorReplyLanguage(ctx: TutorWordContext, userMessage: string): LangCode {
  return detectMessageLanguage(userMessage) ?? ctx.nativeCode
}

export function tutorSystemPrompt(ctx: TutorWordContext, replyLang: LangCode): string {
  const replyLabel = getLanguage(replyLang).label
  const focus =
    ctx.topic === 'conjugations'
      ? `Focus on ${ctx.learningLang} conjugations / verb forms (${ctx.learning} · ${ctx.native})${ctx.emoji ? ` ${ctx.emoji}` : ''}.`
      : `Focus on this word: ${ctx.learning} (${ctx.native})${ctx.emoji ? ` ${ctx.emoji}` : ''}.`

  return [
    `You are the AI tutor inside Słowo, a mobile vocabulary app.`,
    `The learner's native language is ${ctx.nativeLang}; they are learning ${ctx.learningLang}.`,
    focus,
    ctx.category ? `Category: ${ctx.category}.` : '',
    `CRITICAL: Reply in the same language as the learner's latest message. That language is ${replyLabel}.`,
    `Write the full explanation in ${replyLabel} only. Do not answer in a different language.`,
    replyLang === ctx.learningCode
      ? `Add short ${ctx.nativeLang} glosses in parentheses only when helpful.`
      : `Include at most 1–2 brief example phrases in ${ctx.learningLang} with ${ctx.nativeLang} in parentheses when helpful.`,
    `Keep every reply under 300 characters total.`,
    `Keep answers short and practical (1–3 short sentences max).`,
    `Write plain text only. Use simple hyphen bullets for examples if needed.`,
    `Do not use markdown: no **, __, #, backticks, or code fences.`,
    `Do not change font emphasis with symbols — just write normally.`,
    `Be warm and clear. Do not mention that you are GPT or an AI model unless asked.`,
  ]
    .filter(Boolean)
    .join(' ')
}

export function tutorRepeatPrompt(ctx: TutorWordContext, targetLang: LangCode): string {
  const label = getLanguage(targetLang).label
  return [
    `You are the AI tutor inside Słowo, a mobile vocabulary app.`,
    `The learner's native language is ${ctx.nativeLang}; they are learning ${ctx.learningLang}.`,
    `Focus on this word: ${ctx.learning} (${ctx.native}).`,
    `Rewrite the tutor reply below entirely in ${label}.`,
    `Keep the same meaning and stay under 300 characters.`,
    `Plain text only, no markdown.`,
    `Do not add greetings or meta commentary—just the rewritten reply.`,
  ]
    .filter(Boolean)
    .join(' ')
}

export async function askTutorRepeat(
  ctx: TutorWordContext,
  originalReply: string,
  targetLang: LangCode,
): Promise<string> {
  return askTutor(tutorRepeatPrompt(ctx, targetLang), [{ role: 'user', content: originalReply }])
}

const TUTOR_LISTEN_LABEL: Record<LangCode, string> = {
  en: 'Listen',
  pl: 'Słuchaj',
}

export function tutorListenLabel(lang: LangCode): string {
  return TUTOR_LISTEN_LABEL[lang] ?? TUTOR_LISTEN_LABEL.en
}

export async function askTutor(
  system: string,
  messages: TutorChatMessage[],
): Promise<string> {
  let response: Response
  try {
    response = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system, messages }),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error'
    throw new Error(`Could not reach tutor (${message})`)
  }

  const raw = await response.text()
  let data: { reply?: string; error?: string } = {}
  if (raw) {
    try {
      data = JSON.parse(raw) as { reply?: string; error?: string }
    } catch {
      const snippet = raw.replace(/\s+/g, ' ').trim().slice(0, 160)
      throw new Error(
        snippet
          ? `Tutor server error: ${snippet}`
          : `Tutor request failed (${response.status})`,
      )
    }
  }

  if (!response.ok) {
    throw new Error(data.error ?? `Tutor request failed (${response.status})`)
  }
  if (!data.reply?.trim()) throw new Error('Empty reply from tutor')
  return data.reply.trim()
}

/** Render tutor reply: markdown → HTML, even body text size, accent highlight on target word. */
export function formatTutorHtml(text: string, highlight?: string): string {
  const lines = text.replace(/\r\n/g, '\n').trim().split('\n')
  const blocks: string[] = []
  let listItems: string[] = []

  const flushList = (): void => {
    if (!listItems.length) return
    blocks.push(
      `<ul class="tutor-list">${listItems.map((item) => `<li>${formatInline(item, highlight)}</li>`).join('')}</ul>`,
    )
    listItems = []
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      flushList()
      continue
    }

    const bullet = trimmed.match(/^[-*•]\s+(.+)$/)
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/)
    if (bullet?.[1] || numbered?.[1]) {
      listItems.push((bullet?.[1] ?? numbered?.[1] ?? '').trim())
      continue
    }

    flushList()
    blocks.push(`<p>${formatInline(trimmed, highlight)}</p>`)
  }
  flushList()

  return blocks.join('') || `<p>${formatInline(text.trim(), highlight)}</p>`
}

function formatInline(raw: string, highlight?: string): string {
  let s = escapeHtml(raw)

  // Bold / italic before leftover cleanup
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/__(.+?)__/g, '<strong>$1</strong>')
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
  s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>')
  s = s.replace(/(^|[^_])_([^_\n]+)_(?!_)/g, '$1<em>$2</em>')

  // Strip leftover markdown punctuation that models often leave behind
  s = s.replace(/\*\*/g, '')
  s = s.replace(/__/g, '')
  s = s.replace(/(^|[^a-zA-Z0-9>])\*+([^a-zA-Z0-9<]|$)/g, '$1$2')
  s = s.replace(/^#+\s*/g, '')

  if (highlight?.trim()) {
    try {
      const pattern = new RegExp(`(${escapeRegExp(highlight.trim())})`, 'gi')
      s = s.replace(pattern, (match) => `<mark class="tutor-hit">${match}</mark>`)
    } catch {
      // Ignore invalid highlight patterns (some mobile browsers are strict)
    }
  }

  return s
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
