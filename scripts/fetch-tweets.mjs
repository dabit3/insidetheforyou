// Fetches popular programming posts from X via the xAI API (x_search tool)
// and writes them to src/data/tweets.json for the ActionEffects section.
//
// Usage: npm run fetch:tweets  (requires XAI_API_KEY in .env)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function loadApiKey() {
  if (process.env.XAI_API_KEY) return process.env.XAI_API_KEY
  const env = readFileSync(join(root, '.env'), 'utf8')
  const match = env.match(/^XAI_API_KEY\s*=\s*"?([^"\n]+)"?\s*$/m)
  if (!match) throw new Error('XAI_API_KEY not found in .env')
  return match[1].trim()
}

const PROMPT = `Use X search to find 30 popular recent X posts about programming and software engineering. Run several different searches to cover a DIVERSE set of topics, for example:
- AI and coding agents
- web development, JavaScript, TypeScript, React
- systems programming, Rust, Go, C, Zig
- databases, networking, and infrastructure
- open source and developer tools
- career advice and interviews in tech
- debugging and production incident stories
- programming languages and compilers
- indie hacking and building products
- developer humor and hot takes

Requirements for each post:
- at least 100 likes
- written in English
- a standalone TEXT post, not a reply and not an image or video meme (the text must stand on its own)
- text between 40 and 280 characters
- interesting, insightful, or funny to a developer audience
- each post must come from a DIFFERENT author (30 different accounts), and include a mix of well-known and smaller accounts
- no meme aggregator accounts (for example, no ProgrammerHumor accounts)
- no offensive content

Output ONLY a JSON array, no markdown fences, no commentary. Each element must have these keys:
- "name": author display name
- "handle": author handle with @
- "text": the exact post text
- "date": short date like "Aug 12"
- "likes": number
- "replies": number
- "reposts": number
- "views": number
- "url": the direct link to the post, like "https://x.com/handle/status/123456789"

Use the real engagement numbers and the real status URLs from the posts. Do not invent URLs.`

async function main() {
  const apiKey = loadApiKey()
  console.log('Asking Grok to search X for popular programming posts...')

  const res = await fetch('https://api.x.ai/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'grok-4.6',
      input: [{ role: 'user', content: PROMPT }],
      tools: [{ type: 'x_search' }],
    }),
  })

  if (!res.ok) {
    throw new Error(`xAI API error ${res.status}: ${await res.text()}`)
  }

  const data = await res.json()

  // Collect all output_text fragments from the Responses API output items.
  const texts = []
  for (const item of data.output ?? []) {
    for (const part of item.content ?? []) {
      if (part.type === 'output_text' && part.text) texts.push(part.text)
    }
  }
  const raw = texts.at(-1)
  if (!raw) throw new Error(`No text output in response: ${JSON.stringify(data).slice(0, 500)}`)

  // Strip possible code fences and parse.
  const jsonText = raw.replace(/^```(?:json)?/m, '').replace(/```\s*$/m, '').trim()
  const start = jsonText.indexOf('[')
  const end = jsonText.lastIndexOf(']')
  if (start === -1 || end === -1) throw new Error(`No JSON array in output:\n${raw}`)

  const posts = JSON.parse(jsonText.slice(start, end + 1))
    .filter(
      (p) =>
        p && typeof p.text === 'string' && p.text.length > 0 && p.text.length <= 300 &&
        typeof p.likes === 'number' && p.likes >= 100 &&
        typeof p.name === 'string' && typeof p.handle === 'string'
    )
    .map((p) => ({
      name: p.name,
      handle: p.handle.startsWith('@') ? p.handle : `@${p.handle}`,
      text: p.text,
      date: typeof p.date === 'string' ? p.date : '',
      likes: p.likes,
      replies: typeof p.replies === 'number' ? p.replies : 0,
      reposts: typeof p.reposts === 'number' ? p.reposts : 0,
      views: typeof p.views === 'number' ? p.views : 0,
      url:
        typeof p.url === 'string' && /^https:\/\/(x|twitter)\.com\/[^/]+\/status\/\d+/.test(p.url)
          ? p.url
          : '',
    }))
    .slice(0, 30)

  if (posts.length === 0) throw new Error(`No valid posts parsed from output:\n${raw}`)

  const outPath = join(root, 'src', 'data', 'tweets.json')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, JSON.stringify(posts, null, 2) + '\n')
  console.log(`Wrote ${posts.length} posts to src/data/tweets.json`)
  for (const p of posts) console.log(`  ${p.handle} (${p.likes} likes): ${p.text.slice(0, 60)}...`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
