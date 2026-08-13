import { motion } from 'framer-motion'
import { Reveal, Section } from '../components/Reveal'

const CUT: [string, string][] = [
  ['Older than 48 hours', 'the feed is always recent'],
  ['Posts you already saw', 'checked against two separate records'],
  ['Your own posts', 'you know what you said'],
  ['Blocked & muted accounts', 'your choices are absolute'],
  ['Posts with your muted keywords', 'words you never want to see'],
  ['Duplicates & repeated reposts', 'once is enough'],
  ['Replies from strangers to strangers', 'context you are not part of'],
  ['Subscriber-only posts you can’t access', 'no teasing'],
]

export function Filters() {
  return (
    <Section id="filters" theme="light" eyebrow="Always on — the cutting room floor">
      <Reveal>
        <h2 className="display">
          Most posts never <span className="dim">stood a chance.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          Before and after scoring, a battery of filters silently removes posts. No matter how high
          a post would score, these rules cut it:
        </p>
      </Reveal>
      <div style={{ marginTop: 48, maxWidth: 760 }}>
        {CUT.map(([what, why], i) => (
          <motion.div
            key={what}
            initial={{ opacity: 1 }}
            whileInView="cut"
            viewport={{ once: true, margin: '-100px' }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 16,
              alignItems: 'baseline',
              padding: '14px 16px',
              borderBottom: '1px solid var(--line-light)',
            }}
          >
            <span style={{ position: 'relative', fontWeight: 500 }}>
              {what}
              <motion.span
                variants={{ cut: { width: '100%' } }}
                initial={{ width: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.35, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '55%',
                  height: 2,
                  background: 'var(--ink)',
                }}
              />
            </span>
            <span className="small mono" style={{ fontSize: 12, textAlign: 'right' }}>
              {why}
            </span>
          </motion.div>
        ))}
      </div>
      <Reveal delay={0.4}>
        <p className="small" style={{ marginTop: 24 }}>
          This is why blocking, muting, and muting keywords are the sharpest tools you have —
          they don't lower a score, they remove posts entirely.
        </p>
      </Reveal>
    </Section>
  )
}
