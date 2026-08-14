import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Section } from '../components/Reveal'

type Action = {
  id: string
  label: string
  weight: number
  prob: number
}

// Real production weights from home-mixer/params/param.rs (Aug 2026 snapshot).
// `prob` is an illustrative baseline predicted probability for a typical user
// and post. Rare actions like report have baselines 1,000x+ lower than a like.
const ACTIONS: Action[] = [
  { id: 'fav', label: 'Like', weight: 0.5, prob: 0.06 },
  { id: 'reply', label: 'Reply', weight: 5.0, prob: 0.01 },
  { id: 'reply_mutual', label: 'Reply (mutual follow)', weight: 20.0, prob: 0.02 },
  { id: 'repost', label: 'Repost', weight: 1.0, prob: 0.01 },
  { id: 'quote', label: 'Quote', weight: 5.0, prob: 0.004 },
  { id: 'share', label: 'Share', weight: 2.0, prob: 0.005 },
  { id: 'share_dm', label: 'Share via DM', weight: 5.0, prob: 0.003 },
  { id: 'copy_link', label: 'Copy the link', weight: 20.0, prob: 0.002 },
  { id: 'follow', label: 'Follow the author', weight: 4.0, prob: 0.001 },
  { id: 'click', label: 'Open the post', weight: 0.4, prob: 0.05 },
  { id: 'video', label: 'Watch the video', weight: 0.05, prob: 0.2 },
  { id: 'not_interested', label: '“Not interested”', weight: -43.2, prob: 0.0015 },
  { id: 'block', label: 'Block the author', weight: -31.2, prob: 0.0002 },
  { id: 'mute', label: 'Mute the author', weight: -58.8, prob: 0.0004 },
  { id: 'report', label: 'Report', weight: -234.0, prob: 0.00004 },
]

type Mode = 'certain' | 'typical'

const MAX_ABS: Record<Mode, number> = { certain: 234, typical: 0.6 }

export function ScoreLab() {
  const [on, setOn] = useState<Set<string>>(new Set(['fav', 'reply']))
  const [mode, setMode] = useState<Mode>('certain')
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
  const score = selected.reduce(
    (s, a) => s + a.weight * (mode === 'certain' ? 1 : a.prob),
    0
  )

  return (
    <Section id="scoring" theme="light">
      <Reveal>
        <h2 className="display">
          Not all engagement <span className="dim">is equal.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          For each post, the model predicts <em>your</em> personal probability of taking each
          action, multiplies each probability by a weight, and adds the results into one score.
          The weights never touch raw like or report counts. These are the real weights.
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

      <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.5 }}>
          Predicted probability
        </span>
        <button
          className={`pill-toggle ${mode === 'certain' ? 'on' : ''}`}
          onClick={() => setMode('certain')}
        >
          Certain (100%)
        </button>
        <button
          className={`pill-toggle ${mode === 'typical' ? 'on' : ''}`}
          onClick={() => setMode('typical')}
        >
          Typical baseline odds
        </button>
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
            {Number(score.toFixed(mode === 'certain' ? 2 : 3))}
          </motion.span>
          <span className="small">
            {score >= (mode === 'certain' ? 20 : 0.3)
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
              width: `${Math.min(Math.abs(score) / MAX_ABS[mode], 1) * 100}%`,
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
        The negative weights look enormous, but they multiply your <em>predicted probability</em>{' '}
        of each action, not raw counts. One report does not erase hundreds of likes. Your baseline
        odds of reporting a post are more than 1,000× lower than your odds of liking one, so the
        −234 only bites when the model genuinely expects you to report. Switch to “Typical
        baseline odds” above to see how small each contribution really is.
      </p>
    </Section>
  )
}
