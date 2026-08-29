import { defineConfig, loadEnv, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { runTutorChat, type TutorMessage } from './lib/tutorProxy.ts'

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf8')
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function attachTutorApi(server: ViteDevServer | PreviewServer, apiKey: string): void {
  server.middlewares.use(async (req, res, next) => {
    if (req.url !== '/api/tutor' || req.method !== 'POST') {
      next()
      return
    }

    try {
      const raw = await readBody(req)
      const parsed = JSON.parse(raw) as {
        messages?: TutorMessage[]
        system?: string
      }

      const result = await runTutorChat({
        apiKey,
        system: parsed.system,
        messages: parsed.messages ?? [],
      })

      if (!result.ok) {
        sendJson(res, result.status, { error: result.error })
        return
      }

      sendJson(res, 200, { reply: result.reply })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Tutor request failed'
      sendJson(res, 500, { error: message })
    }
  })
}

function tutorApiPlugin(apiKey: string): Plugin {
  return {
    name: 'slowo-tutor-api',
    configureServer(server) {
      attachTutorApi(server, apiKey)
    },
    configurePreviewServer(server) {
      attachTutorApi(server, apiKey)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.OPENAI_API_KEY?.trim() ?? ''

  return {
    plugins: [tutorApiPlugin(apiKey)],
    server: {
      host: true,
    },
    preview: {
      host: true,
    },
  }
})
