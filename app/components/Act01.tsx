"use client";

import { RefreshCw } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Reveal, RevealHeading } from "./Primitives";

export function Act01() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const fill = useTransform(scrollYProgress, [0.2, 0.7], ["12%", "100%"]);
  return (
    <section ref={ref} id="refresh" className="section dark">
      <div className="wrap act-grid">
        <RevealHeading
          eyebrow="Act 01 / Start fresh"
          lede="Nothing is pre-baked. Every refresh is a fresh assembly, using who you are right now: your recent engagements, follows, blocks, mutes, and what you have already seen."
        >
          Your feed is built the moment you pull to refresh.
        </RevealHeading>
        <Reveal delay={0.22} className="sticky-visual dark-panel">
          <RefreshCw className="mb-8 text-lavender" />
          <div className="signal-list mono">
            <div>
              <span>your signals</span>
              <strong>now</strong>
            </div>
            <div className="rule" />
            <div>
              <span>new assembly</span>
              <strong className="text-lavender">fresh</strong>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                style={reduced ? { width: "100%" } : { width: fill }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
