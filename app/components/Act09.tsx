import { Reveal, Eyebrow } from "./Primitives";

const takeaways = [
  "Replies — especially between mutuals — and copy-link shares are powerful signals.",
  "Likes are cheap. Reports, mutes, and “not interested” are enormous.",
  "Posts have about 48 hours to live.",
  "Repeating the same account decays fast.",
  "New and small accounts get a real coded-in boost.",
  "Muting, blocking, and not-interested reshape your own feed fastest.",
  "If reach feels off, check Under the Hood for labels on your account.",
];

export function Act09() {
  return (
    <section id="takeaways" className="section dark">
      <div className="wrap">
        <Reveal>
          <Eyebrow>Act 09 / Takeaways</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="serif">So, what actually matters?</h2>
        </Reveal>
        <div className="takeaway-grid">
          {takeaways.map((item, index) => (
            <Reveal key={item} delay={index * 0.05}>
              <div className="takeaway-card">
                <span className="mono text-lavender">0{index + 1}</span>
                <p>{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
