"use client";

import { Sparkles } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Reveal, RevealHeading } from "./Primitives";

const predictions: [string, number][] = [
  ["like", 42],
  ["reply", 18],
  ["share", 12],
  ["follow", 7],
  ["keep reading", 65],
];

function PredictionRow({
  name,
  amount,
  progress,
}: {
  name: string;
  amount: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduced = useReducedMotion();
  const width = useTransform(progress, [0.18, 0.75], ["4%", `${amount}%`]);
  return (
    <div className="prediction-row">
      <div>
        <span>{name}</span>
        <span className="muted">{amount}%</span>
      </div>
      <div className="progress-track">
        {reduced ? (
          <div className="progress-fill" style={{ width: `${amount}%` }} />
        ) : (
          <motion.div className="progress-fill" style={{ width }} />
        )}
      </div>
    </div>
  );
}

export function Act04() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <section ref={ref} id="model" className="section dark">
      <div className="wrap act-grid">
        <RevealHeading
          eyebrow="Act 04 / Prediction"
          lede="It reads your recent engagement history: the actions you took, in sequence. Each post gets its own score. Its neighbours do not change it."
        >
          One model guesses what you will do next.
        </RevealHeading>
        <Reveal delay={0.2} className="sticky-visual dark-panel">
          <div className="prediction-heading">
            <Sparkles className="text-lavender" />
            <span className="mono">one post, many possibilities</span>
          </div>
          {predictions.map(([name, amount]) => (
            <PredictionRow
              key={name}
              name={name}
              amount={amount}
              progress={scrollYProgress}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
