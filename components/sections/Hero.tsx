import { SectionShell } from "../ui/SectionShell";
import { StatBar } from "../ui/StatBar";

export function Hero() {
  return (
    <SectionShell
      className="hero"
      dark
      eyebrow="THE FOR YOU FEED, EXPLAINED"
      title="How the X algorithm decides what you see"
      body="X publishes the code that builds the For You feed. This is the human version: where posts come from, what the model is predicting about you, and what actually moves a post up or down. No engineering background needed."
      titleTag="h1"
    >
      <div className="hero-grid">
        <div className="hero-side">
          <div className="hero-code mono" aria-hidden="true">
            rust_home_mixer_reply_weight
            <br />
            rust_home_mixer_report_weight
            <br />
            rust_home_mixer_candidate_pipeline
            <br />
            rust_home_mixer_dwell_time_weight
          </div>
          <div className="hero-side-note">
            A simple tour of the For You feed, from candidate to ranking.
          </div>
        </div>
        <div className="hero-footer">
          <StatBar
            dark
            stats={[
              ["2 SOURCES", "posts you follow, plus posts you don’t"],
              ["~30 PREDICTIONS", "the chance you take each action"],
              ["1 SCORE", "one weighted sum decides the order"],
              ["48 HOURS", "nothing older gets in"],
            ]}
          />
          <div className="scroll-cue mono">↓ scroll to follow the feed</div>
        </div>
      </div>
    </SectionShell>
  );
}
