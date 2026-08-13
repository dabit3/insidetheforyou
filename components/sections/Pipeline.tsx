"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { pipelineSteps } from "@/lib/data";
import { SectionShell } from "../ui/SectionShell";

export function Pipeline() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [hoverStep, setHoverStep] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrub = useTransform(scrollYProgress, [0, 1], [0, pipelineSteps.length - 1]);
  const [scrubStep, setScrubStep] = useState(0);
  scrub.on("change", (value) => {
    if (!reduced) setScrubStep(Math.min(pipelineSteps.length - 1, Math.max(0, Math.round(value))));
  });
  const active = hoverStep ?? scrubStep;

  return (
    <section ref={ref} id="pipeline" className="pipeline-section section-shell">
      <div className="page-grid">
        <div className="section-heading">
          <div className="eyebrow">HOW IT WORKS</div>
          <div className="heading-copy">
            <h2>Every refresh rebuilds your feed from scratch</h2>
            <p>
              Your feed is not a stored list. Each time you pull to refresh, the pipeline runs again
              in a few hundred milliseconds.
            </p>
          </div>
        </div>
        <div className="pipeline-layout">
          <div className="pipeline-steps">
            {pipelineSteps.map(([name, description], index) => (
              <div
                className={`pipeline-step ${active === index ? "pipeline-step-active" : ""}`}
                key={name}
                onMouseEnter={() => setHoverStep(index)}
                onMouseLeave={() => setHoverStep(null)}
              >
                <span className="step-index mono">0{index + 1}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
            <p className="takeaway">
              A separate safety system decides whether each surviving post is allowed to be shown at
              all — that runs after the ranking.
            </p>
          </div>
          <div className="pipeline-visual-wrap">
            <div className="pipeline-visual">
              <div className="pipeline-line" />
              <div className="pipeline-nodes">
                {pipelineSteps.map(([name], index) => (
                  <motion.div
                    className={`pipeline-node ${active === index ? "node-active" : ""}`}
                    key={name}
                    animate={{ scale: active === index ? 1.06 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {name}
                  </motion.div>
                ))}
              </div>
              <div className="pipeline-caption mono">scroll position → active stage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
