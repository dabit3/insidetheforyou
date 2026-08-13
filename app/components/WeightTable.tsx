"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { likeComparison, weightKind, weights } from "../../lib/weights";

export function WeightTable() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [hurt, setHurt] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const visible = weights.filter((weight) =>
    hurt ? weight.value <= 0 : weight.value > 0,
  );
  const preview = hovered === null ? weights[selected] : weights[hovered];
  const maxMagnitude = Math.max(
    ...visible.map((weight) => Math.abs(weight.value)),
  );

  return (
    <div className="weight-layout">
      <div>
        <div className="comparison-grid">
          <div>
            <strong>40×</strong>
            <span>A copy-link share is worth 40 likes.</span>
          </div>
          <div>
            <strong>40×</strong>
            <span>A mutual reply is worth 40 likes.</span>
          </div>
          <div className="negative-card">
            <strong>−468</strong>
            <span>One report cancels 468 likes.</span>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="selected-explanation"
            key={preview.action}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="selected-label">
              <span className="mono">Selected action</span>
              <b>{preview.action}</b>
            </div>
            <p>{preview.gloss}</p>
            <span
              className={`mono ${weightKind(preview.value) === "negative" ? "negative-text" : "positive-text"}`}
            >
              weight {preview.value} · {likeComparison(preview.value)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="weight-table">
        <div className="table-toolbar">
          <span className="mono muted">full weight table</span>
          <div className="pile-controls">
            <button aria-pressed={!hurt} onClick={() => setHurt(false)}>
              What helps
            </button>
            <button aria-pressed={hurt} onClick={() => setHurt(true)}>
              What hurts
            </button>
          </div>
        </div>
        {visible.map((weight) => {
          const index = weights.indexOf(weight);
          const magnitude = (Math.abs(weight.value) / maxMagnitude) * 100;
          return (
            <motion.div
              layout
              key={weight.action}
              className={`weight-row ${selected === index ? "active" : ""}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <button
                onClick={() => setSelected(index)}
                aria-label={`Select ${weight.action}`}
              >
                {weight.action}
              </button>
              <div className="weight-bar-track">
                <WeightBar
                  key={`${weight.action}-${hurt}`}
                  magnitude={magnitude}
                  negative={weight.value < 0}
                  reduced={reduced}
                />
              </div>
              <span className="mono">{weight.value}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function WeightBar({
  magnitude,
  negative,
  reduced,
}: {
  magnitude: number;
  negative: boolean;
  reduced: boolean | null;
}) {
  const className = `weight-bar ${negative ? "negative-bar" : ""}`;
  if (reduced) {
    return <div className={className} style={{ width: `${magnitude}%` }} />;
  }
  return (
    <motion.div
      className={className}
      initial={{ width: 0 }}
      whileInView={{ width: `${magnitude}%` }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    />
  );
}
