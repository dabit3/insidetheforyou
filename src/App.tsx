import { useState, type ComponentType } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Reveal, Section } from './components/Reveal'
import { ScoreLab } from './sections/ScoreLab'
import { Adjustments } from './sections/Adjustments'
import { Weights } from './sections/Weights'
import { WeightLab } from './sections/WeightLab'
import { DemoFeed, ActionEffects } from './sections/DemoFeed'

const NAV = [
  ['Scoring', '#scoring'],
  ['Feed', '#feed'],
  ['Playground', '#playground'],
  ['Deep dive', '#deepdive'],
]

function Nav() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--paper)',
        borderBottom: '1px solid var(--line-light)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          borderLeft: '1px solid var(--line-light)',
          borderRight: '1px solid var(--line-light)',
        }}
      >
        <a
          href="#top"
          className="mono"
          style={{
            padding: '14px 20px',
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            textDecoration: 'none',
            borderRight: '1px solid var(--line-light)',
          }}
        >
          insidetheforyou
        </a>
        <div style={{ flex: 1 }} />
        {NAV.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="mono nav-link"
            style={{
              padding: '14px 16px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderLeft: '1px solid var(--line-light)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {label}
          </a>
        ))}
        <a
          href="https://devin.ai"
          target="_blank"
          rel="noreferrer"
          className="nav-devin"
          title="Built with Devin"
        >
          <img src="/devin.png" alt="Devin" width={18} height={18} />
        </a>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="section dark">
      <div
        className="section-inner"
        style={{ minHeight: '82vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Reveal delay={0.1}>
          <h1 className="display" style={{ maxWidth: 900, fontSize: 'clamp(42px, 6.5vw, 84px)' }}>
            How X decides
            <br />
            <span className="dim">what you see.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lede">
            Each time you open the For You feed, an algorithm builds it from scratch, just for
            you. Scroll to learn how it works. You do not need an engineering degree.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div style={{ marginTop: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="boxlink" href="#scoring">
              Start scrolling ↓
            </a>
            <a
              className="boxlink"
              href="https://github.com/xai-org/x-algorithm"
              target="_blank"
              rel="noreferrer"
            >
              Read the source ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Fresh() {
  return (
    <Section id="fresh" theme="light">
      <Reveal>
        <h2 className="display">
          Your feed is built <span className="dim">fresh, every single time.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          There is no pre-made timeline that waits for you. When you open or refresh the app, a
          system called <span className="mono">Home Mixer</span> gathers candidate posts, scores
          them, and filters them in less than a second.
        </p>
      </Reveal>
      <div style={{ marginTop: 56 }}>
        <div className="cellgrid cols-3">
          {[
            ['~3,000', 'candidate posts gathered', 'up to 1,200 from follows + 1,800 from discovery'],
            ['19+', 'actions predicted per post', 'from “likely to like” to “likely to report”'],
            ['1', 'ranked feed, just for you', 'rebuilt on every refresh'],
          ].map(([big, title, sub], i) => (
            <motion.div
              key={title}
              className="cell"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="display" style={{ fontSize: 44 }}>
                {big}
              </div>
              <div className="cell-title" style={{ marginTop: 12 }}>
                {title}
              </div>
              <p className="small">{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Sources() {
  return (
    <Section id="sources" theme="dark">
      <Reveal>
        <h2 className="display">
          Posts come from <span className="dim">two worlds.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          Before ranking starts, the algorithm collects candidates from accounts that you follow
          and from the rest of X. Then one model judges them all.
        </p>
      </Reveal>
      <div style={{ marginTop: 48, maxWidth: 760 }}>
        {(
          [
            ['Thunder · people you follow', 1200],
            ['Phoenix · ML discovery', 1000],
            ['SimClusters · taste communities', 800],
          ] as [string, number][]
        ).map(([label, n], i) => (
          <div className="weight-row" key={label}>
            <span className="weight-label">{label}</span>
            <div className="bar-track">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(n / 1200) * 100}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }}
                style={{ height: '100%', background: '#fff' }}
              />
            </div>
            <span className="weight-value">{n.toLocaleString()}</span>
          </div>
        ))}
        <p className="small" style={{ marginTop: 16 }}>
          This is the maximum number of candidates from each source on each refresh: approximately
          40% from your follows and 60% from discovery. Then scoring decides what survives.
        </p>
      </div>
      <div style={{ marginTop: 40 }} className="cellgrid cols-2">
        <motion.div
          className="cell"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ padding: 32 }}
        >
          <span className="tag">In-network · “Thunder”</span>
          <h3 className="cell-title" style={{ fontSize: 24 }}>
            People you follow
          </h3>
          <p className="small" style={{ marginTop: 8 }}>
            A live store keeps the most recent posts from each account that you follow. It serves
            them instantly. This is your familiar circle.
          </p>
        </motion.div>
        <motion.div
          className="cell filled"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ padding: 32 }}
        >
          <span className="tag">Out-of-network · “Phoenix” + “SimClusters”</span>
          <h3 className="cell-title" style={{ fontSize: 24 }}>
            People you don't (yet)
          </h3>
          <p className="small" style={{ marginTop: 8, color: 'inherit', opacity: 0.7 }}>
            ML retrieval maps you and each post into the same “taste space”. Then it finds posts
            from strangers that look like the content you engage with.
          </p>
        </motion.div>
      </div>
      <Reveal delay={0.2}>
        <p className="small" style={{ marginTop: 24 }}>
          This is why your feed is not only your follows. Discovery is a built-in feature, not a
          bug.
        </p>
      </Reveal>
    </Section>
  )
}

function Signals() {
  const actions = [
    'liked a post about F1',
    'watched a cooking video to the end',
    'replied to a friend',
    'skipped 12 crypto posts',
    'hit “not interested” on a meme',
    "opened someone's profile",
    'reposted a launch announcement',
  ]
  return (
    <Section id="signals" theme="light">
      <Reveal>
        <h2 className="display">
          It doesn't read your mind. <span className="dim">It reads your habits.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          The most important input to the ranking model is your recent action history. That is the
          sequence of everything that you engaged with lately. The model reads it like a sentence
          and predicts your next action.
        </p>
      </Reveal>
      <div style={{ marginTop: 48, maxWidth: 720 }}>
        {actions.map((a, i) => (
          <motion.div
            key={a}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="mono"
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'baseline',
              padding: '12px 16px',
              borderBottom: '1px solid var(--line-light)',
              fontSize: 13,
            }}
          >
            <span style={{ opacity: 0.4 }}>
              {actions.length - i === 1 ? 'just now' : `${actions.length - i} actions ago`}
            </span>
            <span>you {a}</span>
          </motion.div>
        ))}
        <Reveal delay={0.4}>
          <p className="small" style={{ marginTop: 24 }}>
            Each tap teaches the model. Your feed is a mirror of your recent behavior, not a fixed
            profile of who you are.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

function Predictions() {
  const probs: [string, number][] = [
    ['you like it', 0.31],
    ['you reply', 0.04],
    ['you repost it', 0.07],
    ['you watch the video', 0.42],
    ['you follow the author', 0.01],
    ['you say “not interested”', 0.002],
  ]
  return (
    <Section theme="dark">
      <Reveal>
        <h2 className="display">
          For every post, one question: <span className="dim">“what would you do with this?”</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          A transformer model (the same family of AI that powers chatbots) estimates the
          probability of each action, good and bad, for each candidate post.
        </p>
      </Reveal>
      <div style={{ marginTop: 48, maxWidth: 760 }}>
        {probs.map(([label, p], i) => (
          <div className="weight-row" key={label}>
            <span className="weight-label">P({label})</span>
            <div className="bar-track">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${p * 100}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.8, ease: 'easeOut' }}
                style={{ height: '100%', background: '#fff' }}
              />
            </div>
            <span className="weight-value">{(p * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
      <Reveal delay={0.3}>
        <p className="small" style={{ marginTop: 24 }}>
          These numbers are examples for one imaginary post. The model produces a full set like
          this for each candidate on each refresh.
        </p>
      </Reveal>
    </Section>
  )
}

function Visibility() {
  const rows: [string, string, string][] = [
    ['Allow', 'The post appears normally.', 'This is the default for almost all posts.'],
    [
      'Interstitial',
      'The post hides behind a warning that you can tap through.',
      'X uses this for graphic or adult media.',
    ],
    [
      'Drop',
      'The post never appears for you.',
      'This applies to blocked authors, policy violations, and spam.',
    ],
  ]
  return (
    <Section theme="dark">
      <Reveal>
        <h2 className="display">
          Ranking picks the order. <span className="dim">A separate gate decides visibility.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          After ranking, each post goes through a visibility check. The check uses your blocks,
          your mutes, and safety labels from other systems. It gives one of three answers:
        </p>
      </Reveal>
      <div style={{ marginTop: 48 }} className="cellgrid cols-3">
        {rows.map(([verdict, what, why], i) => (
          <motion.div
            key={verdict}
            className={`cell ${verdict === 'Drop' ? 'filled' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <h3 className="cell-title" style={{ fontSize: 22 }}>
              {verdict}
            </h3>
            <p className="small" style={{ color: 'inherit', opacity: 0.75 }}>
              {what}
            </p>
            <p className="small" style={{ marginTop: 8, color: 'inherit', opacity: 0.55 }}>
              {why}
            </p>
          </motion.div>
        ))}
      </div>
      <Reveal delay={0.25}>
        <p className="small" style={{ marginTop: 24 }}>
          Recommendations from accounts that you do not follow have stricter rules. The same post
          can appear for a follower but not for a stranger.
        </p>
      </Reveal>
    </Section>
  )
}

function Takeaways() {
  const items: [string, string][] = [
    [
      'Your attention is a vote',
      'Even time spent on a post (“dwell”) counts. You get more of what you spend time on.',
    ],
    [
      'Replies and shares speak loudest',
      'A reply is worth approximately 10 likes to the ranker. A share via DM or a copied link is worth even more.',
    ],
    [
      'Negative feedback is powerful',
      '“Not interested”, mute, and block carry large negative weights. One report outweighs hundreds of likes. Use them. They work.',
    ],
    [
      'Your feed resets constantly',
      'Ranking uses your recent actions. A few days of different behavior changes what you see.',
    ],
    [
      'Following still matters',
      'Posts from mutual follows get a boost, and out-of-network posts get a discount. The accounts that you follow shape the whole feed.',
    ],
    [
      'Variety is enforced',
      'Repeated posts from one author decay in score, and the system spreads similar posts apart on purpose.',
    ],
  ]
  return (
    <Section id="takeaways" theme="light" eyebrow="What to do with all this">
      <Reveal>
        <h2 className="display">
          You have more control <span className="dim">than you think.</span>
        </h2>
      </Reveal>
      <div style={{ marginTop: 56 }} className="cellgrid cols-2">
        {items.map(([title, body], i) => (
          <motion.div
            key={title}
            className="cell"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 2) * 0.1, duration: 0.5 }}
          >
            <h3 className="cell-title">{title}</h3>
            <p className="small">{body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

const SLIDES: [string, ComponentType][] = [
  ['The pipeline', Fresh],
  ['Two worlds', Sources],
  ['Your habits', Signals],
  ['Predictions', Predictions],
  ['The price tags', Weights],
  ['Adjustments', Adjustments],
  ['The gate', Visibility],
  ['Takeaways', Takeaways],
]

function DeepDive() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const count = SLIDES.length

  const go = (n: number) => {
    const next = ((n % count) + count) % count
    setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1)
    setIndex(next)
    document.getElementById('deepdive')?.scrollIntoView({ behavior: 'smooth' })
  }

  const ActiveSlide = SLIDES[index][1]
  const nextLabel = index === count - 1 ? 'Back to the start' : SLIDES[index + 1][0]

  return (
    <div id="deepdive">
      <div className="slide-bar">
        <div className="slide-bar-inner">
          {SLIDES.map(([label], n) => (
            <button
              key={label}
              className={`slide-tab ${n === index ? 'active' : ''}`}
              onClick={() => go(n)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 48 * dir }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -48 * dir }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <ActiveSlide />
        </motion.div>
      </AnimatePresence>
      <button className="slide-next" onClick={() => go(index + 1)}>
        <div className="slide-next-inner">
          <span
            className="mono"
            style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.5 }}
          >
            Next up
          </span>
          <span className="display" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
            {nextLabel} {index === count - 1 ? '↺' : '→'}
          </span>
        </div>
      </button>
    </div>
  )
}

function Footer() {
  return (
    <footer className="section dark" style={{ borderBottom: 'none' }}>
      <div className="section-inner" style={{ padding: '64px 48px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'baseline',
          }}
        >
          <span className="mono" style={{ fontSize: 12, letterSpacing: '0.14em' }}>
            INSIDETHEFORYOU
          </span>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="small mono">
            <a href="https://github.com/dabit3/learn-the-algorithm" target="_blank" rel="noreferrer">
              Source code ↗
            </a>
            <a href="https://deepwiki.com/xai-org/x-algorithm/" target="_blank" rel="noreferrer">
              DeepWiki ↗
            </a>
            <a
              href="https://devin.ai"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <img
                src="/devin.png"
                alt="Devin"
                width={16}
                height={16}
                style={{ filter: 'invert(1)', display: 'block' }}
              />
              Built with Devin ↗
            </a>
          </div>
        </div>
        <p className="small" style={{ marginTop: 24, maxWidth: 640 }}>
          The weights and behaviors on this page come from the open-source X algorithm repository
          (August 2026 snapshot). The values change over time as X runs experiments.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'var(--ink)',
          mixBlendMode: 'difference',
          transformOrigin: '0 50%',
          scaleX,
          zIndex: 100,
        }}
      />
      <Nav />
      <Hero />
      <ScoreLab />
      <DemoFeed />
      <ActionEffects />
      <WeightLab />
      <DeepDive />
      <Footer />
    </>
  )
}
