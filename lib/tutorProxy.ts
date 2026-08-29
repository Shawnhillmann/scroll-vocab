export const TUTOR_MODEL = 'gpt-5.4-nano'

export type TutorMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type TutorProxyResult =
  | { ok: true; reply: string }
  | { ok: false; status: number; error: string }

export async function runTutorChat(input: {
  apiKey: string
  system?: string
  messages: TutorMessage[]
}): Promise<TutorProxyResult> {
  const apiKey = input.apiKey.trim()
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: 'Missing OPENAI_API_KEY. Add it in Vercel env vars (or local .env) and redeploy.',
    }
  }

  const messages = Array.isArray(input.messages) ? input.messages : []
  if (!messages.length) {
    return { ok: false, status: 400, error: 'messages required' }
  }

  const system =
    typeof input.system === 'string' && input.system.trim()
      ? input.system.trim()
      : 'You are a concise, friendly language tutor.'

  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: TUTOR_MODEL,
        messages: [{ role: 'system', content: system }, ...messages.slice(-16)],
      }),
    })

    const raw = await upstream.text()
    let data: {
      error?: { message?: string }
      choices?: Array<{ message?: { content?: string } }>
    } = {}
    try {
      data = raw ? (JSON.parse(raw) as typeof data) : {}
    } catch {
      return {
        ok: false,
        status: 502,
        error: raw.slice(0, 180) || `OpenAI returned non-JSON (${upstream.status})`,
      }
    }

    if (!upstream.ok) {
      return {
        ok: false,
        status: upstream.status,
        error: data.error?.message ?? `OpenAI error ${upstream.status}`,
      }
    }

    const reply = data.choices?.[0]?.message?.content?.trim() ?? ''
    if (!reply) {
      return { ok: false, status: 502, error: 'Empty reply from model' }
    }

    return { ok: true, reply }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Tutor request failed'
    return { ok: false, status: 500, error: message }
  }
}
