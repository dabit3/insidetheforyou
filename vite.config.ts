import { readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// In production, the Cloudflare Worker (worker/index.ts) serves /api/name.
// This plugin emulates that endpoint during `npm run dev` with the local .env key.
function devNameApi(): Plugin {
  return {
    name: 'dev-name-api',
    configureServer(server) {
      server.middlewares.use('/api/name', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        let apiKey = process.env.XAI_API_KEY
        if (!apiKey) {
          try {
            const env = readFileSync('.env', 'utf8')
            apiKey = env.match(/^XAI_API_KEY\s*=\s*"?([^"\n]+)"?\s*$/m)?.[1]?.trim()
          } catch {
            /* no .env file */
          }
        }
        if (!apiKey) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'XAI_API_KEY not found' }))
          return
        }

        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)

        try {
          const { weights } = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          const description = Object.entries(weights as Record<string, number>)
            .map(([id, v]) => `${id} ${v}`)
            .join(', ')
          const upstream = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'grok-4.20-0309-non-reasoning',
              temperature: 1.0,
              max_tokens: 20,
              messages: [
                {
                  role: 'system',
                  content:
                    'You name custom social feed ranking algorithms based on their engagement weights. Respond with ONLY a short, funny, memorable name of 2 to 4 words. No quotes, no punctuation at the end, no explanation.',
                },
                {
                  role: 'user',
                  content: `The user tuned these engagement weights for their feed ranking algorithm (defaults: like 0.5, reply 5, repost 1, quote 5, copy link 20, share 2, follow 4, click 0.4, video 0.05, not interested -43.2, block -31.2, mute -58.8, report -234): ${description}. Name the algorithm based on the personality a feed ranked with these weights has.`,
                },
              ],
            }),
          })
          const data = (await upstream.json()) as {
            choices?: { message?: { content?: string } }[]
          }
          const name = data.choices?.[0]?.message?.content?.trim().replace(/^["']|["']$/g, '')
          res.statusCode = name ? 200 : 502
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(name ? { name } : { error: 'no name in response' }))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(err) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devNameApi()],
})
