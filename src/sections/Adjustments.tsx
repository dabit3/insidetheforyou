import { motion } from 'framer-motion'
import { Reveal, Section } from '../components/Reveal'

function Bars({
  values,
  labels,
  marks,
}: {
  values: number[]
  labels: string[]
  marks?: string[]
}) {
  return (
    <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: marks ? '70px 1fr 48px' : '90px 1fr',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <span className="mono" style={{ fontSize: 11, opacity: 0.6 }}>
            {labels[i]}
          </span>
          <div className="bar-track">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${v * 100}%` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }}
              style={{ height: '100%', background: 'currentColor' }}
            />
          </div>
          {marks && (
            <span className="mono" style={{ fontSize: 11, opacity: 0.6, textAlign: 'right' }}>
              {marks[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export function Adjustments() {
  return (
    <Section theme="dark">
      <Reveal>
        <h2 className="display">
          Then the score <span className="dim">gets adjusted.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          The raw score is not the final word. Three deliberate adjustments shape the feed that
          you see:
        </p>
      </Reveal>
      <div style={{ marginTop: 48 }} className="cellgrid cols-3">
        <div className="cell" style={{ padding: 28 }}>
          <span className="tag">Author diversity</span>
          <h3 className="cell-title">No one gets to dominate</h3>
          <p className="small">
            Each extra post from the same author gets half the score, down to a floor. One
            prolific account cannot take over your feed.
          </p>
          <Bars
            values={[1, 0.5, 0.25, 0.25]}
            labels={['post 1', 'post 2', 'post 3', 'post 4']}
            marks={['×1.0', '×0.5', '×0.25', '×0.25']}
          />
        </div>
        <div className="cell" style={{ padding: 28 }}>
          <span className="tag">Out-of-network discount</span>
          <h3 className="cell-title">Strangers take a haircut</h3>
          <p className="small">
            Posts from accounts that you do not follow get multiplied by 0.75. Discovery must earn
            its place against your own network.
          </p>
          <Bars
            values={[1, 0.75]}
            labels={['followed', 'stranger']}
            marks={['×1.0', '×0.75']}
          />
        </div>
        <div className="cell" style={{ padding: 28 }}>
          <span className="tag">New-author boost</span>
          <h3 className="cell-title">Small accounts get a shot</h3>
          <p className="small">
            Posts from authors with few impressions get a lift. Fresh voices do not get buried
            under popular accounts.
          </p>
          <Bars values={[0.4, 0.75]} labels={['before', 'boosted']} />
        </div>
      </div>
    </Section>
  )
}
