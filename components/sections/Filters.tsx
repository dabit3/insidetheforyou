"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { filterReasons } from "@/lib/data";
import { SectionShell } from "../ui/SectionShell";

export function Filters() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [manualStep, setManualStep] = useState(0);
  const { scrollY } = useScroll();
  const sectionProgress = useTransform(scrollY, (value) => {
    const section = ref.current;
    if (!section) return 0;
    const start = section.getBoundingClientRect().top + window.scrollY;
    const end = start + section.offsetHeight;
    return Math.max(0, Math.min(1, (value - start) / (end - start)));
  });
  const scrollStep = useTransform(sectionProgress, [0.1, 0.85], [0, filterReasons.length]);
  const [progressStep, setProgressStep] = useState(0);
  useMotionValueEvent(scrollStep, "change", (value) => {
    if (reduced !== true) {
      setProgressStep(Math.max(0, Math.min(filterReasons.length, Math.floor(value))));
    }
  });
  const removed = Math.max(manualStep, progressStep);
  const current = Math.min(Math.max(removed, 0), filterReasons.length - 1);

  return (
    <section ref={ref} id="filters" className="filters-section section-shell">
      <div className="page-grid">
        <div className="section-heading">
          <div className="eyebrow">STEP 2 — FILTERS</div>
          <div className="heading-copy">
            <h2>Most candidates never reach the scoring step</h2>
            <p>
              Before the model spends its time scoring, a long list of hard filters removes posts
              that cannot appear for you.
            </p>
          </div>
        </div>
        <div className="filters-layout">
          <div className="filter-tiles">
            {filterReasons.map(([label], index) => (
              <motion.div
                className={`filter-tile ${index < removed ? "filter-removed" : ""}`}
                animate={{ opacity: index < removed ? 0.22 : 1, x: index < removed ? 14 : 0 }}
                key={label}
              >
                <span className="mono step-index">0{index + 1}</span>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
          <div className="filter-reason-sticky">
            <div className="reason-card">
              <div className="eyebrow">FILTER FIRED</div>
              <h3>{filterReasons[current][0]}</h3>
              <p>{filterReasons[current][1]}</p>
              <div className="filter-progress">
                <span style={{ width: `${(removed / filterReasons.length) * 100}%` }} />
              </div>
              <button
                className="text-button"
                onClick={() =>
                  setManualStep((value) => (value < filterReasons.length ? value + 1 : 0))
                }
              >
                {removed === filterReasons.length ? "Reset filters" : "Advance one filter"} →
              </button>
            </div>
          </div>
        </div>
        <p className="takeaway">
          Two of these explain most complaints. Nothing older than 48 hours can appear, and once a
          post has been shown to you it will not be shown again.
        </p>
      </div>
    </section>
  );
}
