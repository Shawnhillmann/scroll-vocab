import { runTutorChat, type TutorMessage } from '../lib/tutorProxy'

type VercelReq = {
  method?: string
  body?: { messages?: TutorMessage[]; system?: string }
}

type VercelRes = {
  status: (code: number) => VercelRes
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
  end: (body?: string) => void
}

/** Classic Vercel Node handler — most reliable for Vite + /api on Vercel. */
export default async function handler(req: VercelReq, res: VercelRes): Promise<void> {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body ?? {}
  const result = await runTutorChat({
    apiKey: process.env.OPENAI_API_KEY ?? '',
    system: typeof body.system === 'string' ? body.system : undefined,
    messages: Array.isArray(body.messages) ? body.messages : [],
  })

  if (!result.ok) {
    res.status(result.status).json({ error: result.error })
    return
  }

  res.status(200).json({ reply: result.reply })
}
