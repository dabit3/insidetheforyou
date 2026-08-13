import { motion } from 'framer-motion'
import { Reveal, Section } from '../components/Reveal'

// Real production weights from home-mixer/params/param.rs (Aug 2026 snapshot)
const WEIGHTS: [string, number][] = [
  ['Watch the video', 0.05],
  ['Open the post', 0.4],
  ['Like', 0.5],
  ['Repost', 1.0],
  ['Share', 2.0],
  ['Follow the author', 4.0],
  ['Reply', 5.0],
  ['Quote', 5.0],
  ['Share via DM', 5.0],
  ['Copy the link', 20.0],
  ['Reply (mutual follow)', 20.0],
  ['Block the author', -31.2],
  ['“Not interested”', -43.2],
  ['Mute the author', -58.8],
  ['Report', -234.0],
]

const MAX = Math.sqrt(234)

export function Weights() {
  return (
    <Section id="weights" theme="light" step={4}>
      <Reveal>
        <h2 className="display">
          Every action has <span className="dim">a price tag.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          Each predicted action carries a fixed weight — a measure of how much the algorithm cares
          about it. These are the actual values from the open-sourced code. Notice how small the
          rewards are, and how enormous the punishments.
        </p>
      </Reveal>
      <div style={{ marginTop: 48, maxWidth: 820 }}>
        {WEIGHTS.map(([label, w], i) => (
          <div className="weight-row" key={label}>
            <span className="weight-label">{label}</span>
            <div className="bar-track">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(Math.sqrt(Math.abs(w)) / MAX) * 100}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.05, duration: 0.7, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: w >= 0 ? '#0d0d0d' : 'transparent',
                  backgroundImage:
                    w < 0
                      ? 'repeating-linear-gradient(45deg, #0d0d0d 0 6px, transparent 6px 12px)'
                      : undefined,
                }}
              />
            </div>
            <span className="weight-value">{w > 0 ? `+${w}` : w}</span>
          </div>
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="small" style={{ marginTop: 24 }}>
          Bars use a square-root scale so the small weights stay visible. Hatched bars are negative
          weights — actions the algorithm actively tries to avoid provoking.
        </p>
      </Reveal>
    </Section>
  )
}
