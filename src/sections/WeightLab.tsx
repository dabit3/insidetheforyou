import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, Section } from '../components/Reveal'

type WeightDef = {
  id: string
  label: string
  def: number
  min: number
  max: number
  step: number
}

// Defaults are the real production values from home-mixer/params/param.rs (Aug 2026 snapshot)
const WEIGHT_DEFS: WeightDef[] = [
  { id: 'like', label: 'Like', def: 0.5, min: 0, max: 10, step: 0.1 },
  { id: 'reply', label: 'Reply', def: 5, min: 0, max: 30, step: 0.5 },
  { id: 'repost', label: 'Repost', def: 1, min: 0, max: 10, step: 0.5 },
  { id: 'quote', label: 'Quote', def: 5, min: 0, max: 30, step: 0.5 },
  { id: 'share', label: 'Share', def: 2, min: 0, max: 20, step: 0.5 },
  { id: 'copyLink', label: 'Copy the link', def: 20, min: 0, max: 60, step: 1 },
  { id: 'follow', label: 'Follow the author', def: 4, min: 0, max: 30, step: 0.5 },
  { id: 'click', label: 'Open the post', def: 0.4, min: 0, max: 5, step: 0.1 },
  { id: 'video', label: 'Watch the video', def: 0.05, min: 0, max: 5, step: 0.05 },
  { id: 'notInterested', label: '“Not interested”', def: -43.2, min: -300, max: 0, step: 1 },
  { id: 'block', label: 'Block the author', def: -31.2, min: -300, max: 0, step: 1 },
  { id: 'mute', label: 'Mute the author', def: -58.8, min: -300, max: 0, step: 1 },
  { id: 'report', label: 'Report', def: -234, min: -600, max: 0, step: 1 },
]

type Post = {
  id: string
  title: string
  trait: string
  probs: Record<string, number>
}

// Illustrative per-post action probabilities (what the Phoenix model predicts)
const POSTS: Post[] = [
  {
    id: 'friend',
    title: 'Your close friend announces a new job',
    trait: 'replies from mutuals',
    probs: {
      like: 0.25, reply: 0.12, repost: 0.02, quote: 0.01, share: 0.02, copyLink: 0.005,
      follow: 0, click: 0.08, video: 0, notInterested: 0.001, block: 0.0001, mute: 0.0002, report: 0.0001,
    },
  },
  {
    id: 'thread',
    title: 'Deep-dive thread on chip manufacturing',
    trait: 'bookmark bait',
    probs: {
      like: 0.12, reply: 0.02, repost: 0.05, quote: 0.02, share: 0.04, copyLink: 0.03,
      follow: 0.04, click: 0.3, video: 0, notInterested: 0.005, block: 0.0003, mute: 0.002, report: 0.0005,
    },
  },
  {
    id: 'dog',
    title: 'Golden retriever fails agility course',
    trait: 'pure watch time',
    probs: {
      like: 0.3, reply: 0.01, repost: 0.04, quote: 0.005, share: 0.03, copyLink: 0.002,
      follow: 0.01, click: 0.05, video: 0.6, notInterested: 0.002, block: 0.0002, mute: 0.0005, report: 0.0001,
    },
  },
  {
    id: 'news',
    title: 'Breaking news clip from a media outlet',
    trait: 'shareable',
    probs: {
      like: 0.15, reply: 0.04, repost: 0.1, quote: 0.03, share: 0.06, copyLink: 0.01,
      follow: 0.01, click: 0.1, video: 0.35, notInterested: 0.01, block: 0.001, mute: 0.002, report: 0.001,
    },
  },
  {
    id: 'ragebait',
    title: 'Hot take engineered to make you angry',
    trait: 'ragebait',
    probs: {
      like: 0.18, reply: 0.15, repost: 0.06, quote: 0.1, share: 0.01, copyLink: 0.004,
      follow: 0.005, click: 0.12, video: 0, notInterested: 0.05, block: 0.01, mute: 0.015, report: 0.008,
    },
  },
  {
    id: 'spam',
    title: '“Send 1 ETH, get 2 back” giveaway',
    trait: 'spam',
    probs: {
      like: 0.02, reply: 0.005, repost: 0.003, quote: 0.002, share: 0.001, copyLink: 0.0005,
      follow: 0.001, click: 0.02, video: 0, notInterested: 0.09, block: 0.04, mute: 0.05, report: 0.03,
    },
  },
]

const DEFAULTS: Record<string, number> = Object.fromEntries(WEIGHT_DEFS.map((w) => [w.id, w.def]))

const PRESETS: [string, string, Record<string, number>][] = [
  ['Factory settings', 'the real production weights', DEFAULTS],
  [
    'Rage merchant',
    'raise the conversation weights and ignore all negative feedback',
    { ...DEFAULTS, reply: 30, quote: 30, notInterested: 0, block: 0, mute: 0, report: 0 },
  ],
  [
    'Zen mode',
    'punish annoying content and reward calm video',
    { ...DEFAULTS, video: 3, like: 2, notInterested: -300, block: -300, mute: -300, report: -600 },
  ],
]

export function WeightLab() {
  const [weights, setWeights] = useState<Record<string, number>>(DEFAULTS)

  const setWeight = (id: string, v: number) => setWeights((prev) => ({ ...prev, [id]: v }))

  const ranked = useMemo(() => {
    const scored = POSTS.map((p) => ({
      ...p,
      score: WEIGHT_DEFS.reduce((s, w) => s + (p.probs[w.id] ?? 0) * weights[w.id], 0),
    }))
    return scored.sort((a, b) => b.score - a.score)
  }, [weights])

  const maxAbs = Math.max(...ranked.map((p) => Math.abs(p.score)), 0.001)

  // Naming: the name only changes when the user asks Grok. Moving the knobs
  // never renames on its own. Client-side exponential backoff after the first
  // few calls, and the Worker enforces real rate limits on top of this.
  const configKey = useMemo(() => JSON.stringify(weights), [weights])
  const [name, setName] = useState('Just Regular X')
  const [namedKey, setNamedKey] = useState<string | null>(null)
  const [naming, setNaming] = useState(false)
  const [cooldownUntil, setCooldownUntil] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const nameCache = useRef(new Map<string, string>())
  const callCount = useRef(0)
  const isDefault = WEIGHT_DEFS.every((d) => weights[d.id] === d.def)
  const isPreset = PRESETS.some(([, , preset]) =>
    WEIGHT_DEFS.every((d) => weights[d.id] === preset[d.id])
  )

  const cooldownLeft = Math.max(0, Math.ceil((cooldownUntil - now) / 1000))

  useEffect(() => {
    if (cooldownUntil <= Date.now()) return
    const interval = setInterval(() => {
      setNow(Date.now())
      if (Date.now() >= cooldownUntil) clearInterval(interval)
    }, 500)
    return () => clearInterval(interval)
  }, [cooldownUntil])

  // The current configuration is named when its key matches the last naming.
  const alreadyNamed = namedKey === configKey

  const nameIt = async () => {
    if (naming || cooldownLeft > 0 || isDefault || isPreset || alreadyNamed) return
    const cached = nameCache.current.get(configKey)
    if (cached) {
      setName(cached)
      setNamedKey(configKey)
      return
    }
    setNaming(true)
    try {
      const res = await fetch('/api/name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weights }),
      })
      if (res.status === 429) {
        setCooldownUntil(Date.now() + 30_000)
        return
      }
      if (!res.ok) throw new Error(`status ${res.status}`)
      const data = (await res.json()) as { name?: string }
      if (data.name) {
        nameCache.current.set(configKey, data.name)
        setName(data.name)
        setNamedKey(configKey)
      }
      // First 3 calls are free; after that the wait doubles: 2s, 4s, 8s... up to 60s.
      callCount.current += 1
      if (callCount.current >= 3) {
        const delay = Math.min(2 ** (callCount.current - 3) * 2, 60)
        setCooldownUntil(Date.now() + delay * 1000)
        setNow(Date.now())
      }
    } catch {
      /* keep the previous name */
    } finally {
      setNaming(false)
    }
  }

  return (
    <Section id="playground" theme="dark">
      <Reveal>
        <h2 className="display">
          Now you <span className="dim">be the algorithm.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          Here are six posts. Each post has model-predicted odds for each action. The sliders are
          the same knobs that X engineers tune, and they start at the real production values. Drag
          them and watch the feed re-rank in real time.
        </p>
      </Reveal>

      <div style={{ marginTop: 40, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {PRESETS.map(([presetName, desc, preset]) => (
          <button
            key={presetName}
            className="preset-btn"
            onClick={() => setWeights(preset)}
            title={desc}
          >
            {presetName}
          </button>
        ))}
      </div>

      <div className="algo-name">
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.5 }}>
            You built
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="display"
              style={{ fontSize: 'clamp(22px, 3vw, 32px)', marginTop: 4 }}
            >
              {name}
            </motion.div>
          </AnimatePresence>
        </div>
        {!isDefault && !isPreset && !alreadyNamed && (
          <button
            className="preset-btn"
            onClick={nameIt}
            disabled={naming || cooldownLeft > 0}
            style={naming || cooldownLeft > 0 ? { opacity: 0.5, cursor: 'default' } : undefined}
          >
            {naming ? 'naming...' : cooldownLeft > 0 ? `wait ${cooldownLeft}s` : 'Ask Grok'}
          </button>
        )}
      </div>

      <div className="playground-grid" style={{ marginTop: 40 }}>
        <div>
          <span className="tag mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6 }}>
            The knobs
          </span>
          <div style={{ marginTop: 16 }}>
            {WEIGHT_DEFS.map((w) => (
              <div key={w.id} className="slider-row">
                <span className="slider-label">{w.label}</span>
                <input
                  type="range"
                  className={`wslider ${w.def < 0 || w.max === 0 ? 'neg' : 'pos'}`}
                  min={w.min}
                  max={w.max}
                  step={w.step}
                  value={weights[w.id]}
                  onChange={(e) => setWeight(w.id, Number(e.target.value))}
                />
                <span className="slider-value">
                  {weights[w.id] > 0 ? `+${weights[w.id]}` : weights[w.id]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="tag mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6 }}>
            Your feed, ranked
          </span>
          <div style={{ marginTop: 16 }}>
            {ranked.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="rank-row"
              >
                <span className="mono" style={{ opacity: 0.4, fontSize: 12, width: 20 }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{p.title}</div>
                  <div className="mono" style={{ fontSize: 11, opacity: 0.45, marginTop: 2 }}>
                    {p.trait}
                  </div>
                  <div className="bar-track" style={{ marginTop: 8, height: 4 }}>
                    <motion.div
                      animate={{ width: `${(Math.abs(p.score) / maxAbs) * 100}%` }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      style={{
                        height: '100%',
                        backgroundColor: p.score >= 0 ? '#fff' : 'transparent',
                        backgroundImage:
                          p.score < 0
                            ? 'repeating-linear-gradient(45deg, #fff 0 4px, transparent 4px 8px)'
                            : undefined,
                      }}
                    />
                  </div>
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: 13,
                    width: 64,
                    textAlign: 'right',
                    opacity: p.score >= 0 ? 1 : 0.6,
                  }}
                >
                  {p.score >= 0 ? '+' : ''}
                  {p.score.toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Reveal delay={0.2}>
        <p className="small" style={{ marginTop: 32 }}>
          Each score is the sum of probability × weight across all actions. The real ranker runs
          the same formula. Try Rage merchant: when negative feedback is zero, the angriest post
          moves to the top. The weights do quiet moderation work all day.
        </p>
      </Reveal>
    </Section>
  )
}
