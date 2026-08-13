import { SectionShell } from "../ui/SectionShell";

export function Adjustments() {
  return (
    <SectionShell
      id="adjustments"
      eyebrow="STEP 4 — ADJUSTMENTS"
      title="Then four corrections reshape the order"
    >
      <div className="adjust-grid">
        <div className="adjust-card">
          <h3>Author diversity</h3>
          <div className="decay-visual">
            {[
              ["1×", "bar-full"],
              ["0.5×", "bar-half"],
              ["0.25×", "bar-quarter"],
              ["0.25×", "bar-quarter"],
            ].map(([label, size], index) => (
              <div key={`${label}-${index}`} className="decay-column">
                <span className={size} />
                <small>{label}</small>
              </div>
            ))}
          </div>
          <p>
            Each additional post from the same author decays to a floor of 0.25×. One account cannot
            take over your feed.
          </p>
        </div>
        <div className="adjust-card">
          <h3>Out-of-network discount</h3>
          <div className="multiplier-visual mono">×0.75</div>
          <p>
            Posts from accounts you don’t follow are multiplied by 0.75 (0.5 for topic-based ones).
            A stranger must out-predict a followed post.
          </p>
        </div>
        <div className="adjust-card">
          <h3>New-author boost</h3>
          <div className="lift-visual">↗</div>
          <p>
            Posts from authors with very few impressions get lifted toward a target position — a
            small on-ramp for new accounts.
          </p>
        </div>
        <div className="adjust-card">
          <h3>Diversity re-rank</h3>
          <div className="separation-visual">
            <span>post A</span>
            <span>post A</span>
            <i>↔</i>
          </div>
          <p>
            A separate service trades a little score for less similarity between neighbors. Fewer
            near-identical posts back to back.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
