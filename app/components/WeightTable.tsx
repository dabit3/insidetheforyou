"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { likeComparison, weightKind, weights } from "../../lib/weights";

export function WeightTable() {
  const [selected, setSelected] = useState(0);
  const [hurt, setHurt] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const visible = weights.filter((weight) =>
    hurt ? weight.value <= 0 : weight.value > 0,
  );
  const preview = hovered === null ? weights[selected] : weights[hovered];

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
          const magnitude = Math.min((Math.abs(weight.value) / 234) * 100, 100);
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
                <motion.div
                  className={`weight-bar ${weight.value < 0 ? "negative-bar" : ""}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${magnitude}%` }}
                  viewport={{ once: false, amount: 0.2 }}
                  animate={{ width: `${magnitude}%` }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
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
