import { useState } from 'react'
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

type ActionFx = {
  id: string
  label: string
  weight: string
  kind: 'good' | 'bad'
  effect: string
}

const ACTION_FX: ActionFx[] = [
  {
    id: 'like',
    label: 'Like',
    weight: '+0.5',
    kind: 'good',
    effect:
      'This is a whisper. You get slightly more hot takes and slightly more from this author. It takes 468 likes to equal the force of one report.',
  },
  {
    id: 'reply',
    label: 'Reply',
    weight: '+5.0',
    kind: 'good',
    effect:
      'This is a loud signal. The algorithm reads conversation as strong interest, so you get more posts that pull you into arguments. A reply to a mutual follow is worth +20.',
  },
  {
    id: 'repost',
    label: 'Repost',
    weight: '+1.0',
    kind: 'good',
    effect:
      'This is a moderate signal. You get more from this author, and the post also goes to the feeds of your followers.',
  },
  {
    id: 'copylink',
    label: 'Copy link',
    weight: '+20.0',
    kind: 'good',
    effect:
      'This is one of the loudest positive signals. If you copy links from two posts like this, the topic will follow you for days.',
  },
  {
    id: 'follow',
    label: 'Follow',
    weight: '+4.0',
    kind: 'good',
    effect:
      'Their posts move into your in-network pool. The 0.75 stranger discount goes away, and Thunder serves their posts directly. If they follow you back, mutual bonuses apply.',
  },
  {
    id: 'notint',
    label: 'Not interested',
    weight: '\u221243.2',
    kind: 'bad',
    effect:
      'One tap is worth approximately negative 86 likes. This type of post fades from your feed fast. It is the most efficient steering tool that you have.',
  },
  {
    id: 'mute',
    label: 'Mute',
    weight: '\u221258.8',
    kind: 'bad',
    effect:
      'The author vanishes silently. The model also learns what "annoying" means to you, so similar accounts get quieter.',
  },
  {
    id: 'block',
    label: 'Block',
    weight: '\u221231.2',
    kind: 'bad',
    effect:
      'This is a hard removal. The visibility gate removes their posts completely, and similar content gets a heavy negative signal.',
  },
  {
    id: 'report',
    label: 'Report',
    weight: '\u2212234.0',
    kind: 'bad',
    effect:
      'This is the strongest signal that you can send. One report outweighs 468 likes and teaches the model to bury this whole category of post.',
  },
]

type RealTweet = {
  name: string
  handle: string
  text: string
  date: string
  likes: number
  replies: number
  reposts: number
  views: number
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
}

const REAL_TWEETS: RealTweet[] =
  (realTweets as RealTweet[]).filter((t) => t.likes >= 100).length > 0
    ? (realTweets as RealTweet[]).filter((t) => t.likes >= 100)
    : [FALLBACK_TWEET]

const AVATAR_COLORS = ['#6b5b95', '#2a9d8f', '#1d6fa3', '#b5651d', '#7d5ba6', '#3a7d44', '#a34a6f']

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return String(n)
}

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

export function ActionEffects() {
  const [active, setActive] = useState<ActionFx | null>(null)
  const [tweetIndex, setTweetIndex] = useState(() => Math.floor(Math.random() * REAL_TWEETS.length))

  const shuffleTweet = () => {
    if (REAL_TWEETS.length < 2) return
    setTweetIndex((prev) => {
      let next = prev
      while (next === prev) next = Math.floor(Math.random() * REAL_TWEETS.length)
      return next
    })
  }

  const tweet = REAL_TWEETS[tweetIndex]

  return (
    <Section theme="light">
      <Reveal>
        <h2 className="display">
          Every interaction steers <span className="dim">tomorrow's feed.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          The real power is not to go viral. The real power is to control what you see. Hover over
          each action on this post to see its effect on your future feed.
        </p>
      </Reveal>

      <div style={{ marginTop: 48, maxWidth: 720 }}>
        <div className={`fx-card ${active ? active.kind : ''}`}>
          <div className="fx-post">
            <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tweetIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div className="tweet-avatar" style={{ background: colorOf(tweet.handle) }}>
                  {initialsOf(tweet.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{tweet.name}</span>
                    <span className="mono" style={{ fontSize: 12, opacity: 0.45 }}>
                      {tweet.handle}
                      {tweet.date ? ` · ${tweet.date}` : ''}
                    </span>
                  </div>
                  <p style={{ marginTop: 6, fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {tweet.text}
                  </p>
                  <p className="mono" style={{ marginTop: 12, fontSize: 12, opacity: 0.5 }}>
                    {fmt(tweet.replies)} replies · {fmt(tweet.reposts)} reposts · {fmt(tweet.likes)}{' '}
                    likes · {fmt(tweet.views)} views
                  </p>
                </div>
                {REAL_TWEETS.length > 1 && (
                  <button className="fx-btn" onClick={shuffleTweet} title="Show a different post">
                    ↻
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
            <div className="fx-actions" onMouseLeave={() => setActive(null)}>
              {ACTION_FX.map((a) => (
                <button
                  key={a.id}
                  className={`fx-btn ${a.kind} ${active?.id === a.id ? 'active' : ''}`}
                  onMouseEnter={() => setActive(a)}
                  onFocus={() => setActive(a)}
                  onClick={() => setActive(a)}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="fx-panel">
            <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {active.label}
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: 18, fontWeight: 500, color: active.kind === 'good' ? '#0f7b3e' : '#c22a2a' }}
                  >
                    {active.weight}
                  </span>
                </div>
                <p className="small" style={{ marginTop: 8, color: 'inherit', opacity: 0.8 }}>
                  {active.effect}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="small mono"
                style={{ opacity: 0.4 }}
              >
                hover over an action to see its effect
              </motion.p>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Reveal delay={0.2}>
        <p className="small" style={{ marginTop: 24 }}>
          The asymmetry is the lesson: positive signals are whispers, and negative signals are
          screams. A few deliberate "not interested" taps reshape your feed faster than one hundred
          likes.
        </p>
      </Reveal>
    </Section>
  )
}
