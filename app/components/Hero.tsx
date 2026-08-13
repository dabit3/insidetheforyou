import { ArrowDown } from "lucide-react";
import { Act, Eyebrow, Reveal } from "./Primitives";

const codeLines = [
  "score = sum(weight * probability) candidate.author = follow_graph",
  "visibility = ALLOW | DROP fresh_request() engagement_history[] ranking",
  "!= visibility feed_blender()",
];

export function Hero() {
  return (
    <Act id="top" dark>
      <div className="hero">
        <div className="code-texture">
          {codeLines.map((line) => (
            <span className="code-line" key={line}>
              {line}
            </span>
          ))}
        </div>
        <div className="hero-copy">
          <Reveal>
            <Eyebrow>Field guide / 01</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="serif">
              How the X algorithm
              <br />
              <span>actually works.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              The For You feed, explained for the person scrolling it — not the
              engineer who built it.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <span className="mono">Based on the code X publishes</span>
          </Reveal>
        </div>
        <div className="scroll-cue">
          <span className="mono">Scroll to assemble your feed</span>
          <ArrowDown size={18} />
        </div>
      </div>
    </Act>
  );
}
