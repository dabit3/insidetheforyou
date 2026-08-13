"use client";

import { Filter, X } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Reveal, RevealHeading } from "./Primitives";

const filters = [
  ["48h", "Older than 48 hours"],
  ["seen", "Already shown this session"],
  ["words", "Muted keywords"],
  ["blocks", "Blocked or muted accounts"],
  ["you", "Your own posts"],
  ["duplicates", "Duplicates across sources"],
];

function FilterCard({
  label,
  title,
  progress,
  index,
}: {
  label: string;
  title: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  const reduced = useReducedMotion();
  const start = index * 0.12;
  const opacity = useTransform(progress, [start, start + 0.16], [1, 0.48]);
  const x = useTransform(progress, [start, start + 0.16], [0, 26]);
  const removedOpacity = useTransform(
    progress,
    [start, start + 0.16],
    [0, 1],
  );
  return (
    <motion.div
      className="filter-card"
      style={reduced ? undefined : { opacity, x }}
    >
      <div className="filter-icons">
        <Filter size={24} />
        <X size={18} className="negative-icon" />
      </div>
      <p className="mono">{label}</p>
      <p className="filter-title">{title}</p>
      {reduced ? (
        <span className="filter-removed">removed</span>
      ) : (
        <motion.span className="filter-removed" style={{ opacity: removedOpacity }}>
          removed
        </motion.span>
      )}
    </motion.div>
  );
}

export function Act03() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <section ref={ref} id="filters" className="section light">
      <div className="wrap">
        <RevealHeading
          eyebrow="Act 03 / Triage"
          lede="Before a score exists, filters remove posts that cannot belong in your feed."
        >
          Most posts are thrown out before they are ever scored.
        </RevealHeading>
        <div className="filter-stage">
          {filters.map(([label, title], index) => (
            <FilterCard
              key={label}
              label={label}
              title={title}
              progress={scrollYProgress}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
