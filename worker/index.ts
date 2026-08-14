// Cloudflare Worker: serves the static site and the /api/name endpoint.
// The XAI_API_KEY secret is set in the Worker settings (Variables and Secrets)
// or with: npx wrangler secret put XAI_API_KEY

type Env = {
  XAI_API_KEY: string
  ASSETS: { fetch: (request: Request) => Promise<Response> }
}

const DEFAULTS: Record<string, number> = {
  like: 0.5,
  reply: 5,
  repost: 1,
  quote: 5,
  share: 2,
  copyLink: 20,
  follow: 4,
  click: 0.4,
  video: 0.05,
  notInterested: -43.2,
  block: -31.2,
  mute: -58.8,
  report: -234,
}

const LABELS: Record<string, string> = {
  like: 'like',
  reply: 'reply',
  repost: 'repost',
  quote: 'quote',
  share: 'share',
  copyLink: 'copy link',
  follow: 'follow author',
  click: 'open post',
  video: 'watch video',
  notInterested: 'not interested',
  block: 'block',
  mute: 'mute',
  report: 'report',
}

async function handleName(request: Request, env: Env): Promise<Response> {
  if (!env.XAI_API_KEY) {
    return Response.json({ error: 'XAI_API_KEY is not configured' }, { status: 500 })
  }

  let weights: Record<string, unknown>
  try {
    const body = (await request.json()) as { weights?: Record<string, unknown> }
    weights = body.weights ?? {}
  } catch {
    return Response.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  // Only accept the known knobs, as numbers, within sane bounds.
  const clean: Record<string, number> = {}
  for (const id of Object.keys(DEFAULTS)) {
    const v = weights[id]
    if (typeof v !== 'number' || !Number.isFinite(v) || v < -600 || v > 60) {
      return Response.json({ error: `invalid weight: ${id}` }, { status: 400 })
    }
    clean[id] = v
  }

  const description = Object.keys(DEFAULTS)
    .map((id) => `${LABELS[id]} ${clean[id]} (default ${DEFAULTS[id]})`)
    .join(', ')

  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
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
          content: `The user tuned these engagement weights for their feed ranking algorithm (defaults in parens): ${description}. Name the algorithm based on the personality a feed ranked with these weights has.`,
        },
      ],
    }),
  })

  if (!res.ok) {
    return Response.json({ error: `upstream error ${res.status}` }, { status: 502 })
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
  const name = data.choices?.[0]?.message?.content?.trim().replace(/^["']|["']$/g, '')
  if (!name) {
    return Response.json({ error: 'no name in response' }, { status: 502 })
  }

  return Response.json({ name })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/api/name' && request.method === 'POST') {
      return handleName(request, env)
    }
    return env.ASSETS.fetch(request)
  },
}
