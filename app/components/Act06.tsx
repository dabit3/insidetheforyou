"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Reveal, RevealHeading } from "./Primitives";

const adjustments = [
  [
    "Author diversity",
    "Each next post from one author is cut in half, down to a 0.25 floor.",
    "1 → 0.5 → 0.25",
  ],
  [
    "Out-of-network",
    "A post from someone you do not follow gets a 0.75 multiplier. Topic-based discovery gets 0.5.",
    "× 0.75",
  ],
  [
    "Cold start",
    "Posts under 24 hours old from small authors are lifted toward positions 15–16.",
    "↑ 15–16",
  ],
];

function AdjustmentCard({
  title,
  copy,
  label,
  index,
  progress,
}: {
  title: string;
  copy: string;
  label: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduced = useReducedMotion();
  const heights = [
    useTransform(progress, [0.2, 0.7], ["90%", `${index === 0 ? 90 : 35}%`]),
    useTransform(progress, [0.2, 0.7], ["50%", `${index === 1 ? 75 : 18}%`]),
    useTransform(progress, [0.2, 0.7], ["25%", `${index === 2 ? 95 : 8}%`]),
  ];
  return (
    <div className="adjustment-card">
      <div className="adjustment-bars">
        {heights.map((height, bar) =>
          reduced ? (
            <div
              key={bar}
              className="adjustment-bar"
              style={{ height: `${[90, 50, 25][bar]}%` }}
            />
          ) : (
            <motion.div
              key={bar}
              className="adjustment-bar"
              style={{ height }}
            />
          ),
        )}
      </div>
      <p className="mono text-lavender">{label}</p>
      <h3 className="serif">{title}</h3>
      <p className="dark-copy">{copy}</p>
    </div>
  );
}

export function Act06() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <section ref={ref} id="adjust" className="section dark">
      <div className="wrap">
        <RevealHeading
          eyebrow="Act 06 / Balance"
          lede="The raw score is adjusted so the feed has room for variety, new voices, and posts from outside your network."
        >
          Then three thumbs go on the scale.
        </RevealHeading>
        <div className="adjustment-grid">
          {adjustments.map(([title, copy, label], index) => (
            <Reveal key={title} delay={index * 0.1}>
              <AdjustmentCard
                title={title}
                copy={copy}
                label={label}
                index={index}
                progress={scrollYProgress}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
