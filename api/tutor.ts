import { runTutorChat, type TutorMessage } from '../server/tutorProxy'

export async function POST(request: Request): Promise<Response> {
  let body: { messages?: TutorMessage[]; system?: string }
  try {
    body = (await request.json()) as { messages?: TutorMessage[]; system?: string }
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const result = await runTutorChat({
    apiKey: process.env.OPENAI_API_KEY ?? '',
    system: body.system,
    messages: body.messages ?? [],
  })

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status })
  }

  return Response.json({ reply: result.reply })
}
