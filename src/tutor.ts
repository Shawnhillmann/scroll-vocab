export type TutorRole = 'user' | 'assistant'

export type TutorChatMessage = {
  role: TutorRole
  content: string
}

export type TutorWordContext = {
  learning: string
  native: string
  emoji: string
  learningLang: string
  nativeLang: string
  category?: string
}

export function tutorQuickStarts(ctx: TutorWordContext): string[] {
  const w = ctx.learning
  return [
    `What does ${w} mean?`,
    `How is ${w} used?`,
    `Show me examples with ${w}`,
    `Help me remember ${w}`,
  ]
}

export function tutorFollowUps(ctx: TutorWordContext): string[] {
  const w = ctx.learning
  return [
    `How do I use ${w} in a sentence?`,
    `Is ${w} formal or informal?`,
    `What's a common mistake with ${w}?`,
  ]
}

export function tutorSystemPrompt(ctx: TutorWordContext): string {
  return [
    `You are the AI tutor inside Słowo, a mobile vocabulary app.`,
    `The learner's native language is ${ctx.nativeLang}; they are learning ${ctx.learningLang}.`,
    `Focus on this word: ${ctx.learning} (${ctx.native})${ctx.emoji ? ` ${ctx.emoji}` : ''}.`,
    ctx.category ? `Category: ${ctx.category}.` : '',
    `Keep answers short and practical (about 2–5 sentences).`,
    `Include 1–3 short example sentences in ${ctx.learningLang} with ${ctx.nativeLang} translations in parentheses.`,
    `Write plain text only. Use simple hyphen bullets for examples if needed.`,
    `Do not use markdown: no **, __, #, backticks, or code fences.`,
    `Do not change font emphasis with symbols — just write normally.`,
    `Be warm and clear. Do not mention that you are GPT or an AI model unless asked.`,
  ]
    .filter(Boolean)
    .join(' ')
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
