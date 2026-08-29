const MODEL = 'gpt-5.4-nano'

type TutorMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

/**
 * Web Handler (no Node req/res helpers, no relative imports).
 * Avoids ESM/CJS FUNCTION_INVOCATION_FAILED crashes on Vercel + "type": "module".
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const apiKey = process.env.OPENAI_API_KEY?.trim() ?? ''
    if (!apiKey) {
      return Response.json(
        {
          error:
            'Missing OPENAI_API_KEY. Add it in Vercel → Settings → Environment Variables, then redeploy.',
        },
        { status: 503 },
      )
    }

    let body: { messages?: TutorMessage[]; system?: string }
    try {
      body = (await request.json()) as { messages?: TutorMessage[]; system?: string }
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const messages = Array.isArray(body.messages) ? body.messages : []
    if (!messages.length) {
      return Response.json({ error: 'messages required' }, { status: 400 })
    }

    const system =
      typeof body.system === 'string' && body.system.trim()
        ? body.system.trim()
        : 'You are a concise, friendly language tutor.'

    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
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
      return Response.json(
        { error: raw.slice(0, 180) || `OpenAI returned non-JSON (${upstream.status})` },
        { status: 502 },
      )
    }

    if (!upstream.ok) {
      return Response.json(
        { error: data.error?.message ?? `OpenAI error ${upstream.status}` },
        { status: upstream.status },
      )
    }

    const reply = data.choices?.[0]?.message?.content?.trim() ?? ''
    if (!reply) {
      return Response.json({ error: 'Empty reply from model' }, { status: 502 })
    }

    return Response.json({ reply })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Tutor request failed'
    return Response.json({ error: message }, { status: 500 })
  }
}

export async function GET(): Promise<Response> {
  return Response.json({
    ok: true,
    hasKey: Boolean(process.env.OPENAI_API_KEY?.trim()),
  })
}
