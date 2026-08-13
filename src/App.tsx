import { motion, useScroll, useSpring } from 'framer-motion'
import { Reveal, Section } from './components/Reveal'
import { ScoreLab } from './sections/ScoreLab'
import { Adjustments } from './sections/Adjustments'
import { Weights } from './sections/Weights'

const NAV = [
  ['Sources', '#sources'],
  ['Signals', '#signals'],
  ['Weights', '#weights'],
  ['Scoring', '#scoring'],
  ['Takeaways', '#takeaways'],
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
        <Reveal>
          <span className="eyebrow">An interactive field guide to the For You feed</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display" style={{ maxWidth: 900, fontSize: 'clamp(42px, 6.5vw, 84px)' }}>
            How X decides
            <br />
            <span className="dim">what you see.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lede">
            Every time you open the For You feed, an algorithm assembles it from scratch, just for
            you, in that moment. Scroll to learn how it works, no engineering degree required.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div style={{ marginTop: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="boxlink" href="#fresh">
              Start scrolling ↓
            </a>
            <a
              className="boxlink"
              href="https://github.com/dabit3/x-algorithm"
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
          There is no pre-made timeline waiting for you. When you open or refresh the app, a system
          called <span className="mono">Home Mixer</span> runs a pipeline that gathers candidate
          posts, scores them, and filters them, all within a moment.
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
          Before anything is ranked, the algorithm collects candidates from accounts you follow and
          from the rest of X, then judges them all with the same model.
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
          Maximum candidates fetched per source on each refresh: roughly 40% from your follows,
          60% from discovery, before scoring decides what survives.
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
            A live store keeps the most recent posts from every account you follow, ready to serve
            instantly. This is your familiar circle.
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
            ML retrieval finds posts from strangers whose content looks like things you engage
            with, by mapping you and every post into the same “taste space” and picking the
            nearest matches.
          </p>
        </motion.div>
      </div>
      <Reveal delay={0.2}>
        <p className="small" style={{ marginTop: 24 }}>
          This is why your feed isn't only your follows: discovery is built in, not a bug.
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
          The single most important input to the ranking model is your recent action history: the
          running sequence of everything you've engaged with lately. The model reads it like a
          sentence and predicts what you'll do next.
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
            Takeaway: every tap teaches it. Your feed is a mirror of your recent behavior, not a
            fixed profile of who you are.
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
          A transformer model (the same family of AI behind chatbots) estimates the probability of
          each action you might take, good and bad, for every candidate post.
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
          These are illustrative numbers for one imaginary post. The model produces a full set
          like this for every candidate, on every refresh.
        </p>
      </Reveal>
    </Section>
  )
}

function Visibility() {
  const rows: [string, string, string][] = [
    ['Allow', 'Shown normally', 'The default for almost everything.'],
    [
      'Interstitial',
      'Hidden behind a warning you can tap through',
      'Used for things like graphic or adult media.',
    ],
    ['Drop', 'Never shown to you', 'Blocked authors, policy violations, spam.'],
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
          After ranking, every post passes a visibility check built from your blocks and mutes plus
          safety labels other systems attach to posts and accounts. It gives one of three answers:
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
          Recommendations from accounts you don't follow face extra, stricter rules: the same
          post can be shown to a follower but not recommended to a stranger.
        </p>
      </Reveal>
    </Section>
  )
}

function Takeaways() {
  const items: [string, string][] = [
    [
      'Your attention is a vote',
      'Even lingering on a post (“dwell”) counts. What you spend time on, you get more of.',
    ],
    [
      'Replies and shares speak loudest',
      'A reply is worth ~10 likes to the ranker. Sharing a post via DM or copying its link is worth even more.',
    ],
    [
      'Negative feedback is powerful',
      '“Not interested”, mute, and block carry huge negative weights. One report outweighs hundreds of likes. Use them. They work.',
    ],
    [
      'Your feed resets constantly',
      'Ranking uses your recent actions, so a few days of different behavior genuinely changes what you see.',
    ],
    [
      'Following still matters',
      'Posts from mutual follows get boosted, and out-of-network posts are discounted. Curating who you follow shapes the whole feed.',
    ],
    [
      'Variety is enforced',
      'Repeated posts from one author decay in score, and similar posts are spread apart on purpose.',
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
          <div style={{ display: 'flex', gap: 24 }} className="small mono">
            <a href="https://github.com/dabit3/x-algorithm" target="_blank" rel="noreferrer">
              Source code ↗
            </a>
            <a href="https://deepwiki.com/xai-org/x-algorithm/" target="_blank" rel="noreferrer">
              DeepWiki ↗
            </a>
          </div>
        </div>
        <p className="small" style={{ marginTop: 24, maxWidth: 640 }}>
          Weights and behaviors described here come from the open-sourced X algorithm repository
          (August 2026 snapshot). Values change over time as X runs experiments.
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
          background: '#0d0d0d',
          mixBlendMode: 'difference',
          transformOrigin: '0 50%',
          scaleX,
          zIndex: 100,
        }}
      />
      <Nav />
      <Hero />
      <Fresh />
      <Sources />
      <Signals />
      <Predictions />
      <Weights />
      <ScoreLab />
      <Adjustments />
      <Visibility />
      <Takeaways />
      <Footer />
    </>
  )
}
