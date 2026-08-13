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
    <Section id="weights" theme="light">
      <Reveal>
        <h2 className="display">
          Every action has <span className="dim">a price tag.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          Each predicted action has a fixed weight. The weight shows how much the algorithm cares
          about that action. These are the real values from the open-source code. The rewards are
          small, and the punishments are enormous.
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
                  backgroundColor: w >= 0 ? 'var(--ink)' : 'transparent',
                  backgroundImage:
                    w < 0
                      ? 'repeating-linear-gradient(45deg, var(--ink) 0 6px, transparent 6px 12px)'
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
          The bars use a square-root scale so that the small weights stay visible. Hatched bars
          show negative weights. The algorithm tries to not cause these actions.
        </p>
      </Reveal>
    </Section>
  )
}
