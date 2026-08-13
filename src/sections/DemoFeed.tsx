import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, Section } from '../components/Reveal'
import realTweets from '../data/tweets.json'

type FeedPost = {
  id: string
  name: string
  handle: string
  time: string
  initials: string
  color: string
  body: string
  video?: boolean
  stats: [string, string, string, string]
  notes: [string, 'good' | 'bad' | 'info'][]
}

const FEED: FeedPost[] = [
  {
    id: 'sara',
    name: 'Sara Chen',
    handle: '@sarabuilds',
    time: '2h',
    initials: 'SC',
    color: '#6b5b95',
    body: 'Just shipped the new onboarding flow. Six months of work, live for everyone today.',
    stats: ['214', '186', '2.4K', '148K'],
    notes: [
      ['+12.4 · you two follow each other, so a likely reply is worth 20 instead of 5', 'good'],
      ['+0.9 · you liked 8 of her last 10 posts', 'good'],
      ['in-network · served instantly by Thunder', 'info'],
    ],
  },
  {
    id: 'priya',
    name: 'Priya Raman',
    handle: '@priyaraman',
    time: '5h',
    initials: 'PR',
    color: '#2a9d8f',
    body: 'The complete guide to pricing your SaaS product. Everything I learned from 40 launches (thread)',
    stats: ['96', '412', '3.1K', '512K'],
    notes: [
      ['+4.6 · people with your tastes copy this link, and copy-link is worth +20', 'good'],
      ['×0.75 · out-of-network discount applied, it ranked high anyway', 'bad'],
      ['discovery · found by Phoenix, this account is new to you', 'info'],
    ],
  },
  {
    id: 'octo',
    name: 'Deep Sea Daily',
    handle: '@deepseadaily',
    time: '7h',
    initials: 'DS',
    color: '#1d6fa3',
    body: 'An octopus solving a puzzle box in 90 seconds. Watch the arms work independently.',
    video: true,
    stats: ['1.1K', '8.7K', '54K', '2.1M'],
    notes: [
      ['+2.1 · you watched 3 animal videos to the end this week', 'good'],
      ['P(watch) = 0.81 · the model expects you to finish this one too', 'info'],
    ],
  },
  {
    id: 'sara2',
    name: 'Sara Chen',
    handle: '@sarabuilds',
    time: '1h',
    initials: 'SC',
    color: '#6b5b95',
    body: 'Follow-up: the 5 mistakes we made building it, so you don\u2019t have to.',
    stats: ['58', '44', '890', '61K'],
    notes: [
      ['×0.5 · second post from Sara this refresh, author diversity decay', 'bad'],
      ['it still outscored every post below it', 'info'],
    ],
  },
]

function ReplyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="tweet-icon" aria-hidden="true">
      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" />
    </svg>
  )
}

function RepostIcon() {
  return (
    <svg viewBox="0 0 24 24" className="tweet-icon" aria-hidden="true">
      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55v6.34c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v6.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
    </svg>
  )
}

function LikeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="tweet-icon" aria-hidden="true">
      <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
    </svg>
  )
}

function ViewsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="tweet-icon" aria-hidden="true">
      <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
    </svg>
  )
}

export function DemoFeed() {
  return (
    <Section id="feed" theme="dark">
      <Reveal>
        <h2 className="display">
          Why am I <span className="dim">seeing this?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          This is a mock For You feed with the algorithm's reasons pinned to each post. Each
          position comes from the math that you just learned.
        </p>
      </Reveal>
      <div style={{ marginTop: 48, maxWidth: 720 }}>
        {FEED.map((p, i) => (
          <motion.article
            key={p.id}
            className="feed-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className="tweet">
              <div className="tweet-avatar" style={{ background: p.color }}>
                {p.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="tweet-head">
                  <span className="tweet-name">{p.name}</span>
                  <span className="tweet-meta">
                    {p.handle} · {p.time}
                  </span>
                </div>
                <p className="tweet-body">{p.body}</p>
                {p.video && (
                  <div className="tweet-media">
                    <div className="tweet-play">
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff" aria-hidden="true">
                        <path d="M8 5.14v13.72L19 12 8 5.14z" />
                      </svg>
                    </div>
                    <span className="tweet-media-time">1:30</span>
                  </div>
                )}
                <div className="tweet-actions">
                  <span className="tweet-action reply">
                    <ReplyIcon /> {p.stats[0]}
                  </span>
                  <span className="tweet-action repost">
                    <RepostIcon /> {p.stats[1]}
                  </span>
                  <span className="tweet-action like">
                    <LikeIcon /> {p.stats[2]}
                  </span>
                  <span className="tweet-action views">
                    <ViewsIcon /> {p.stats[3]}
                  </span>
                </div>
              </div>
            </div>
            <div className="feed-notes">
              {p.notes.map(([text, kind]) => (
                <div key={text} className={`feed-note ${kind}`}>
                  <span className="feed-note-arrow">↳</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="small" style={{ marginTop: 24 }}>
          X does not show you these annotations, but the ranker computes something like them for
          each post on each refresh. Nothing in the feed is random.
        </p>
      </Reveal>
    </Section>
  )
}

type SimActionId = 'like' | 'reply' | 'copyLink' | 'notInterested' | 'mute' | 'report'

const SIM_ACTIONS: { id: SimActionId; label: string; weight: number; kind: 'good' | 'bad' }[] = [
  { id: 'like', label: 'Like', weight: 0.5, kind: 'good' },
  { id: 'reply', label: 'Reply', weight: 5, kind: 'good' },
  { id: 'copyLink', label: 'Copy link', weight: 20, kind: 'good' },
  { id: 'notInterested', label: 'Not interested', weight: -43.2, kind: 'bad' },
  { id: 'mute', label: 'Mute', weight: -58.8, kind: 'bad' },
  { id: 'report', label: 'Report', weight: -234, kind: 'bad' },
]

const TOPIC_RULES: [string, RegExp][] = [
  ['rust', /\brust\b|rustlang|cargo|borrow checker/i],
  ['ai', /\bai\b|vibe.?cod|agent|llm|prompt|grok|claude|chatgpt|copilot|inference|coding is solved/i],
  ['careers', /hiring|interview|junior|senior|resume|leetcode|faang|career|salary|recruiter|job/i],
  ['systems', /c\+\+|kernel|compiler|llvm|mojo|segfault|tcp|assembly|\bzig\b|\bgit\b|low.?level/i],
  ['infra', /kubernetes|k8s|vps|docker|devops|server|database|sql|redis|postgres|grpc|scalab|cloudflare/i],
  ['webdev', /react|javascript|typescript|css|frontend|next\.?js|tailwind|node\b|fullstack|full.?stack/i],
]

function topicOf(text: string): string {
  for (const [topic, re] of TOPIC_RULES) if (re.test(text)) return topic
  return 'hot takes'
}

function truncate(s: string, n: number): string {
  const flat = s.replace(/\s+/g, ' ').trim()
  return flat.length > n ? `${flat.slice(0, n - 1).trimEnd()}…` : flat
}

type RealTweet = {
  name: string
  handle: string
  text: string
  date: string
  likes: number
  replies: number
  reposts: number
  views: number
  url?: string
  avatar?: string
}

const FALLBACK_TWEET: RealTweet = {
  name: 'Tech Takes',
  handle: '@techtakes',
  text: 'Hot take: standups are just meetings where everyone lies for 15 minutes.',
  date: '',
  likes: 4200,
  replies: 310,
  reposts: 180,
  views: 291000,
  url: '',
}

const REAL_TWEETS: RealTweet[] =
  (realTweets as RealTweet[]).length > 0 ? (realTweets as RealTweet[]) : [FALLBACK_TWEET]

const AVATAR_COLORS = ['#6b5b95', '#2a9d8f', '#1d6fa3', '#b5651d', '#7d5ba6', '#3a7d44', '#a34a6f']

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function colorOf(handle: string): string {
  let h = 0
  for (const c of handle) h = (h * 31 + c.charCodeAt(0)) % 997
  return AVATAR_COLORS[h % AVATAR_COLORS.length]
}

function Avatar({
  name,
  handle,
  src,
  size = 40,
}: {
  name: string
  handle: string
  src?: string
  size?: number
}) {
  const [failed, setFailed] = useState(false)
  const dim = { width: size, height: size, fontSize: size * 0.36 }
  if (!src || failed) {
    return (
      <div className="tweet-avatar" style={{ background: colorOf(handle), ...dim }}>
        {initialsOf(name)}
      </div>
    )
  }
  return (
    <img
      className="tweet-avatar"
      src={src}
      alt={name}
      style={dim}
      width={size}
      height={size}
      onError={() => setFailed(true)}
    />
  )
}

type SimPost = RealTweet & { topic: string }

const CLASSIFIED: SimPost[] = REAL_TWEETS.map((t) => ({ ...t, topic: topicOf(t.text) }))

// Today: up to 4 posts with distinct topics and distinct authors.
const TODAY: SimPost[] = (() => {
  const picked: SimPost[] = []
  const topics = new Set<string>()
  const authors = new Set<string>()
  for (const t of CLASSIFIED) {
    if (picked.length >= 4) break
    if (topics.has(t.topic) || authors.has(t.handle)) continue
    topics.add(t.topic)
    authors.add(t.handle)
    picked.push(t)
  }
  return picked
})()

// Tomorrow's candidate pool: everything else, at most 3 posts per topic.
const POOL: SimPost[] = (() => {
  const todayKeys = new Set(TODAY.map((t) => t.url || t.text))
  const perTopic: Record<string, number> = {}
  const pool: SimPost[] = []
  for (const t of CLASSIFIED) {
    if (todayKeys.has(t.url || t.text)) continue
    perTopic[t.topic] = (perTopic[t.topic] ?? 0) + 1
    if (perTopic[t.topic] > 3) continue
    pool.push(t)
  }
  return pool
})()

function keyOf(p: SimPost): string {
  return p.url || `${p.handle}-${p.text.slice(0, 24)}`
}

export function ActionEffects() {
  const [acts, setActs] = useState<Record<string, SimActionId[]>>({})

  // Preload all avatars once so re-ranking is instant.
  useEffect(() => {
    for (const t of CLASSIFIED) {
      if (!t.avatar) continue
      const img = new Image()
      img.src = t.avatar
    }
  }, [])

  const toggle = (postKey: string, action: SimActionId) => {
    setActs((prev) => {
      const current = prev[postKey] ?? []
      const next = current.includes(action)
        ? current.filter((a) => a !== action)
        : [...current, action]
      return { ...prev, [postKey]: next }
    })
  }

  const sim = useMemo(() => {
    const topicSum: Record<string, number> = {}
    const topicChips: Record<string, { label: string; w: number }[]> = {}
    const mutedAuthors = new Set<string>()
    const dimTopics = new Set<string>()
    const reportedTopics = new Set<string>()

    for (const post of TODAY) {
      const taken = acts[keyOf(post)] ?? []
      for (const id of taken) {
        const def = SIM_ACTIONS.find((a) => a.id === id)!
        if (id === 'mute') {
          mutedAuthors.add(post.handle)
          dimTopics.add(post.topic)
        } else if (id === 'report') {
          reportedTopics.add(post.topic)
        } else {
          topicSum[post.topic] = (topicSum[post.topic] ?? 0) + def.weight
          topicChips[post.topic] = [
            ...(topicChips[post.topic] ?? []),
            { label: def.label.toLowerCase(), w: def.weight },
          ]
        }
      }
    }

    const ranked = POOL.filter(
      (p) => !mutedAuthors.has(p.handle) && !reportedTopics.has(p.topic)
    )
      .map((p) => ({
        ...p,
        dimmed: dimTopics.has(p.topic),
        chips: topicChips[p.topic] ?? [],
        score:
          Math.log10(p.likes + 1) +
          (topicSum[p.topic] ?? 0) +
          (dimTopics.has(p.topic) ? -5 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)

    const interests = Object.entries(topicSum)
      .filter(([t, s]) => s !== 0 && !reportedTopics.has(t))
      .map(([t, s]) =>
        s >= 20 ? `${t} ↑↑` : s > 0 ? `${t} ↑` : s <= -40 ? `${t} ↓↓` : `${t} ↓`
      )

    const parts: string[] = []
    if (interests.length > 0) parts.push(`interests: ${interests.join(', ')}`)
    if (mutedAuthors.size > 0)
      parts.push(`muted: ${mutedAuthors.size} author${mutedAuthors.size > 1 ? 's' : ''}`)
    if (reportedTopics.size > 0)
      parts.push(`report sent: ${[...reportedTopics].join(', ')} buried`)
    const summary =
      parts.join(' · ') || 'nothing yet. act on a post to start training it.'

    return { ranked, summary }
  }, [acts])

  return (
    <Section theme="light">
      <Reveal>
        <h2 className="display">
          Every interaction steers <span className="dim">tomorrow's feed.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          These are real posts from X. Act on today's feed and watch tomorrow's feed re-rank
          itself.
        </p>
      </Reveal>

      <div className="sim-grid" style={{ marginTop: 48 }}>
        <div>
          <span className="sim-heading mono">Today: act on these</span>
          {TODAY.map((post) => {
            const taken = acts[keyOf(post)] ?? []
            return (
              <div className="sim-card" key={keyOf(post)}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Avatar name={post.name} handle={post.handle} src={post.avatar} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a
                      className="tweet-link"
                      href={post.url || undefined}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{post.name}</span>
                        <span className="mono" style={{ fontSize: 11, opacity: 0.45 }}>
                          {post.handle}
                        </span>
                        <span className="sim-topic mono">{post.topic}</span>
                      </div>
                      <p style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.45 }}>
                        {truncate(post.text, 140)}
                      </p>
                    </a>
                  </div>
                </div>
                <div className="sim-actions">
                  {SIM_ACTIONS.map((a) => (
                    <button
                      key={a.id}
                      className={`fx-btn ${a.kind} ${taken.includes(a.id) ? 'active' : ''}`}
                      onClick={() => toggle(keyOf(post), a.id)}
                    >
                      {a.label}{' '}
                      <span style={{ opacity: 0.55 }}>
                        {a.weight > 0 ? `+${a.weight}` : a.weight}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div>
          <span className="sim-heading mono">Tomorrow: your next refresh</span>
          <div className="sim-feed">
            <AnimatePresence initial={false}>
              {sim.ranked.map((p, i) => (
                <motion.div
                  layout
                  key={keyOf(p)}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: p.dimmed ? 0.45 : 1, scale: 1 }}
                  exit={{ opacity: 0, x: 56, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  className="sim-row"
                >
                  <span className="mono" style={{ opacity: 0.35, fontSize: 11, width: 14 }}>
                    {i + 1}
                  </span>
                  <Avatar name={p.name} handle={p.handle} src={p.avatar} size={26} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a
                      className="tweet-link"
                      href={p.url || undefined}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, fontSize: 12.5 }}>{p.name}</span>
                        <span className="sim-topic mono">{p.topic}</span>
                      </div>
                      <p style={{ fontSize: 12.5, lineHeight: 1.4, opacity: 0.75, marginTop: 2 }}>
                        {truncate(p.text, 80)}
                      </p>
                    </a>
                    {(p.chips.length > 0 || p.dimmed) && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 5 }}>
                        {p.chips.map((c, ci) => (
                          <span key={ci} className={`sim-chip ${c.w > 0 ? 'good' : 'bad'}`}>
                            {c.w > 0 ? '+' : ''}
                            {c.w} {c.label}
                          </span>
                        ))}
                        {p.dimmed && <span className="sim-chip bad">−5 muted-adjacent</span>}
                      </div>
                    )}
                  </div>
                  <span
                    className="mono"
                    style={{ fontSize: 11.5, opacity: p.score >= 0 ? 0.8 : 0.5, whiteSpace: 'nowrap' }}
                  >
                    {p.score >= 0 ? '+' : ''}
                    {p.score.toFixed(1)}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {sim.ranked.length === 0 && (
              <p className="small mono" style={{ padding: 24, opacity: 0.5 }}>
                you buried everything. tomorrow's feed is empty.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="sim-summary">
        <span className="sim-heading mono" style={{ marginBottom: 0 }}>
          What the algorithm learned about you
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={sim.summary}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mono"
            style={{ fontSize: 13, marginTop: 8 }}
          >
            {sim.summary}
          </motion.p>
        </AnimatePresence>
      </div>

      <Reveal delay={0.2}>
        <p className="small" style={{ marginTop: 24 }}>
          Negative signals are much stronger than positive signals. A few "not interested" taps
          change your feed faster than one hundred likes.
        </p>
      </Reveal>
    </Section>
  )
}
