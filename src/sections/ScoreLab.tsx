import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Section } from '../components/Reveal'

type Action = {
  id: string
  label: string
  weight: number
}

// Real production weights from home-mixer/params/param.rs (Aug 2026 snapshot)
const ACTIONS: Action[] = [
  { id: 'fav', label: 'Like', weight: 0.5 },
  { id: 'reply', label: 'Reply', weight: 5.0 },
  { id: 'reply_mutual', label: 'Reply (mutual follow)', weight: 20.0 },
  { id: 'repost', label: 'Repost', weight: 1.0 },
  { id: 'quote', label: 'Quote', weight: 5.0 },
  { id: 'share', label: 'Share', weight: 2.0 },
  { id: 'share_dm', label: 'Share via DM', weight: 5.0 },
  { id: 'copy_link', label: 'Copy the link', weight: 20.0 },
  { id: 'follow', label: 'Follow the author', weight: 4.0 },
  { id: 'click', label: 'Open the post', weight: 0.4 },
  { id: 'video', label: 'Watch the video', weight: 0.05 },
  { id: 'not_interested', label: '“Not interested”', weight: -43.2 },
  { id: 'block', label: 'Block the author', weight: -31.2 },
  { id: 'mute', label: 'Mute the author', weight: -58.8 },
  { id: 'report', label: 'Report', weight: -234.0 },
]

const MAX_ABS = 234

export function ScoreLab() {
  const [on, setOn] = useState<Set<string>>(new Set(['fav', 'reply']))
  const [aura, setAura] = useState<'good' | 'bad' | null>(null)
  const [auraKey, setAuraKey] = useState(0)

  const toggle = (id: string) => {
    setOn((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const maxAura = () => {
    setOn(new Set(ACTIONS.filter((a) => a.weight > 0).map((a) => a.id)))
    setAura('good')
    setAuraKey((k) => k + 1)
  }
  const negativeAura = () => {
    setOn(new Set(ACTIONS.filter((a) => a.weight < 0).map((a) => a.id)))
    setAura('bad')
    setAuraKey((k) => k + 1)
  }

  useEffect(() => {
    if (!aura) return
    const t = setTimeout(() => setAura(null), 1200)
    return () => clearTimeout(t)
  }, [aura, auraKey])

  const selected = ACTIONS.filter((a) => on.has(a.id))
  const score = selected.reduce((s, a) => s + a.weight, 0)

  return (
    <Section id="scoring" theme="light">
      <Reveal>
        <h2 className="display">
          Not all engagement <span className="dim">is equal.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          The model multiplies each predicted action by a weight and adds the results into one
          score. These are the real weights.
        </p>
      </Reveal>

      <div className="aura-row" style={{ marginTop: 48 }}>
        <button className="aura-btn good" onClick={maxAura}>
          Max aura <span style={{ opacity: 0.6 }}>↑</span>
        </button>
        <button className="aura-btn bad" onClick={negativeAura}>
          Negative aura <span style={{ opacity: 0.6 }}>↓</span>
        </button>
        <button className="aura-btn neutral" onClick={() => setOn(new Set(['fav', 'reply']))}>
          Reset <span style={{ opacity: 0.6 }}>↺</span>
        </button>
      </div>

      <div className="pill-grid" style={{ marginTop: 16 }}>
        {ACTIONS.map((a) => (
          <button
            key={a.id}
            className={`pill-toggle ${on.has(a.id) ? 'on' : ''} ${a.weight < 0 ? 'negative' : ''}`}
            onClick={() => toggle(a.id)}
          >
            {a.label}
            <span style={{ opacity: 0.55 }}>
              {a.weight > 0 ? `+${a.weight}` : a.weight}
            </span>
          </button>
        ))}
      </div>

      {aura && <div key={`flash-${auraKey}`} className={`aura-flash ${aura}`} />}

      <div
        key={`card-${auraKey}`}
        className={aura ? `score-card aura-${aura}` : 'score-card'}
        style={{ marginTop: 40, maxWidth: 820 }}
      >
        <span className="tag mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6 }}>
          Post score
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 8 }}>
          <motion.span
            key={score}
            initial={{ opacity: 0.4, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="display score-value"
          >
            {score > 0 ? '+' : ''}
            {Number(score.toFixed(2))}
          </motion.span>
          <span className="small">
            {score >= 20
              ? 'straight to the top of your feed'
              : score > 0
                ? 'competes for a spot in your feed'
                : score === 0
                  ? 'invisible to the ranker'
                  : 'buried, you will almost never see posts like this'}
          </span>
        </div>
        <div className="bar-track score-bar">
          <motion.div
            animate={{
              width: `${Math.min(Math.abs(score) / MAX_ABS, 1) * 100}%`,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            style={{
              height: '100%',
              backgroundColor: score >= 0 ? 'var(--ink)' : 'transparent',
              backgroundImage:
                score < 0
                  ? 'repeating-linear-gradient(45deg, var(--ink) 0 6px, transparent 6px 12px)'
                  : undefined,
            }}
          />
        </div>
      </div>
      <p className="small" style={{ marginTop: 20, maxWidth: 820 }}>
        Notice the asymmetry: one report (−234) cancels 468 likes (+0.5 each). The penalty for
        one bad experience is far larger than the reward for one good experience.
      </p>
    </Section>
  )
}
