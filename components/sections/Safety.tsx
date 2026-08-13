import { SectionShell } from "../ui/SectionShell";

export function Safety() {
  return (
    <SectionShell
      id="safety"
      dark
      eyebrow="SAFETY"
      title="Ranking sets the order. A second system decides what’s allowed."
      body="After the order is fixed, every post is checked for you specifically. Three answers:"
    >
      <div className="safety-grid">
        <div className="safety-cell">
          <h3>ALLOW</h3>
          <p>shown normally</p>
        </div>
        <div className="safety-cell">
          <h3>INTERSTITIAL</h3>
          <p>shown behind a tap-through warning, e.g. adult or graphic media</p>
        </div>
        <div className="safety-cell">
          <h3>DROP</h3>
          <p>not shown to you</p>
        </div>
      </div>
      <p className="dark-copy">
        The rules read labels attached earlier by other systems — classifiers for spam, adult
        content and violent media, plus account-level signals like how often an account gets blocked
        or reported relative to how often it’s liked — together with your own blocks, mutes,
        settings and country.
      </p>
      <div className="safety-notes">
        <p>
          <b>First drop wins.</b> The first rule that says drop ends the check.
        </p>
        <p>
          <b>Recommendation is a higher bar.</b> Some rules only drop a post when it’s a
          recommendation from an account you don’t follow. The same post is still allowed to that
          account’s followers.
        </p>
        <p>
          <b>Threads follow the post.</b> If a post is dropped, replies and quotes hanging off it go
          too.
        </p>
      </div>
      <p className="honesty-note">
        X ships an “Under the Hood” report so an account can see aggregate stats about labels
        applied to it.
      </p>
    </SectionShell>
  );
}
