// Fetches popular programming posts from X via the xAI API (x_search tool)
// and writes them to src/data/tweets.json for the ActionEffects section.
//
// Two requests run in parallel:
//   1. A pinned request that always fetches one post from each REQUIRED_HANDLES account.
//   2. A general request for a diverse set of popular programming posts.
//
// Usage: npm run fetch:tweets  (requires XAI_API_KEY in .env)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Agent, fetch as undiciFetch } from 'undici'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Agentic X searches can take a long time before the first byte arrives, so
// raise undici's default 5-minute header timeout to 20 minutes.
const slowAgent = new Agent({ headersTimeout: 20 * 60_000, bodyTimeout: 20 * 60_000 })

// These accounts appear in every refresh.
const REQUIRED_HANDLES = [
  'theo',
  'ThePrimeagen',
  'maria_rcks',
  'jaredpalmer',
  'markfenner',
  'ryancarson',
  'ScottWu46',
  'bcherny',
  'dabit3',
  'kentcdodds',
  'jeffwang',
  'imjaredz',
  'devinai',
]

function loadApiKey() {
  if (process.env.XAI_API_KEY) return process.env.XAI_API_KEY
  const env = readFileSync(join(root, '.env'), 'utf8')
  const match = env.match(/^XAI_API_KEY\s*=\s*"?([^"\n]+)"?\s*$/m)
  if (!match) throw new Error('XAI_API_KEY not found in .env')
  return match[1].trim()
}

const JSON_SPEC = `Output ONLY a JSON array, no markdown fences, no commentary. Each element must have these keys:
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

function generalPrompt(topics) {
  return `Use X search to find 15 popular recent X posts about programming and software engineering. Run several different searches to cover a DIVERSE set of topics, for example:
${topics.map((t) => `- ${t}`).join('\n')}

Requirements for each post:
- at least 100 likes
- written in English
- a standalone TEXT post, not a reply and not an image or video meme (the text must stand on its own)
- text between 40 and 280 characters
- interesting, insightful, or funny to a developer audience
- clearly about software, programming, or the tech industry; no politics, no general news, no sports
- each post must come from a DIFFERENT author (15 different accounts), and include a mix of well-known and smaller accounts
- no meme aggregator accounts (for example, no ProgrammerHumor accounts)
- no offensive content

${JSON_SPEC}`
}

const GENERAL_PROMPTS = [
  generalPrompt([
    'AI and coding agents',
    'web development, JavaScript, TypeScript, React',
    'career advice and interviews in tech',
    'indie hacking and building products',
    'developer humor and hot takes',
  ]),
  generalPrompt([
    'systems programming, Rust, Go, C, Zig',
    'databases, networking, and infrastructure',
    'open source and developer tools',
    'programming languages and compilers',
    'debugging and production incident stories',
  ]),
  generalPrompt([
    'launches of developer tools and frameworks',
    'performance and optimization war stories',
    'game development',
    'mobile development',
    'defensive security and vulnerability write-ups',
  ]),
  generalPrompt([
    'tech industry news',
    'startups and venture capital in tech',
    'data science and machine learning',
    'developer productivity and tooling',
    'text-only programming jokes',
  ]),
]

const REQUIRED_PROMPT = `Use X search to find the single most popular RECENT post from each of these X accounts: ${REQUIRED_HANDLES.map((h) => `@${h}`).join(', ')}.

Requirements for each post:
- a standalone TEXT post from that account, not a reply and not a repost
- written in English
- text under 280 characters
- pick the post with the most likes from roughly the last two weeks
- exactly one post per account

${JSON_SPEC}`

async function askGrok(apiKey, prompt, tool) {
  const res = await undiciFetch('https://api.x.ai/v1/responses', {
    method: 'POST',
    dispatcher: slowAgent,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'grok-4.6',
      input: [{ role: 'user', content: prompt }],
      tools: [tool],
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
  return JSON.parse(jsonText.slice(start, end + 1))
}

function normalize(items, minLikes) {
  return items
    .filter(
      (p) =>
        p && typeof p.text === 'string' && p.text.length > 0 && p.text.length <= 300 &&
        typeof p.likes === 'number' && p.likes >= minLikes &&
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
}

// Verify each post against X's public syndication API. This confirms that the
// tweet exists and returns the author's real profile picture. Posts without a
// working tweet URL or a profile picture are dropped.
function tweetIdFromUrl(url) {
  const m = url.match(/status\/(\d+)/)
  return m ? m[1] : null
}

function syndicationToken(id) {
  return ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, '')
}

async function enrich(post) {
  const id = post.url ? tweetIdFromUrl(post.url) : null
  if (!id) return null
  try {
    const res = await fetch(
      `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${syndicationToken(id)}`
    )
    if (!res.ok) return null
    const t = await res.json()
    if (t?.__typename === 'TweetTombstone' || !t?.user?.profile_image_url_https) return null
    return {
      ...post,
      name: t.user.name || post.name,
      handle: `@${t.user.screen_name || post.handle.replace(/^@/, '')}`,
      avatar: t.user.profile_image_url_https.replace('_normal', '_400x400'),
      likes: typeof t.favorite_count === 'number' ? t.favorite_count : post.likes,
      replies: typeof t.conversation_count === 'number' ? t.conversation_count : post.replies,
    }
  } catch {
    return null
  }
}

async function verifyPosts(posts) {
  const enriched = await Promise.all(posts.map(enrich))
  const kept = enriched.filter(Boolean)
  posts.forEach((p, i) => {
    if (!enriched[i]) console.warn(`Dropped ${p.handle}: tweet or profile picture not found`)
  })
  return kept
}

async function main() {
  const apiKey = loadApiKey()
  console.log('Asking Grok to search X for pinned accounts and popular programming posts...')

  const [requiredRaw, ...generalRaws] = await Promise.all([
    askGrok(apiKey, REQUIRED_PROMPT, { type: 'x_search', allowed_x_handles: REQUIRED_HANDLES }),
    ...GENERAL_PROMPTS.map((p) => askGrok(apiKey, p, { type: 'x_search' })),
  ])

  // Pinned posts keep any like count; general posts need at least 100 likes.
  // Duplicate authors are fine; duplicate tweets are not, so dedupe by URL.
  const required = normalize(requiredRaw, 1)
  const requiredHandles = new Set(required.map((p) => p.handle.toLowerCase()))
  const seenUrls = new Set(required.map((p) => p.url))
  const general = normalize(generalRaws.flat(), 100).filter((p) => {
    if (!p.url || seenUrls.has(p.url)) return false
    seenUrls.add(p.url)
    return true
  })

  const posts = await verifyPosts([...required, ...general].slice(0, 60))
  if (posts.length === 0) throw new Error('No valid posts parsed from either request')

  const missing = REQUIRED_HANDLES.filter(
    (h) => !requiredHandles.has(`@${h.toLowerCase()}`)
  )
  if (missing.length > 0) {
    console.warn(`Warning: no post found for: ${missing.map((h) => `@${h}`).join(', ')}`)
  }

  const outPath = join(root, 'src', 'data', 'tweets.json')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, JSON.stringify(posts, null, 2) + '\n')
  console.log(`Wrote ${posts.length} posts (${required.length} pinned) to src/data/tweets.json`)
  for (const p of posts) console.log(`  ${p.handle} (${p.likes} likes): ${p.text.slice(0, 60)}...`)
}

main().catch((err) => {
  console.error(err.message, err.cause ?? '')
  process.exit(1)
})
