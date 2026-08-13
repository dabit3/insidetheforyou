import { inputCards } from "@/lib/data";
import { Reveal } from "../ui/Reveal";
import { SectionShell } from "../ui/SectionShell";

export function Inputs() {
  return (
    <SectionShell
      id="inputs"
      eyebrow="STEP 1 — INPUTS"
      title="The main input is what you did recently"
      body="Before anything is scored, the pipeline loads a picture of you. Your recent action sequence is the most important part — the posts you liked, replied to, reposted, clicked, and lingered on."
    >
      <div className="input-grid">
        {inputCards.map(([icon, title, description], index) => (
          <Reveal className="input-card" delay={index * 0.06} key={title}>
            <div className="outline-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
          </Reveal>
        ))}
      </div>
      <p className="takeaway">
        Your feed follows your behavior more than your intentions. What you open and dwell on
        counts, even when you never tap like.
      </p>
    </SectionShell>
  );
}
