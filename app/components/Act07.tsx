"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Reveal, RevealHeading } from "./Primitives";

export function Act07() {
  const [follow, setFollow] = useState(false);
  return (
    <section id="visibility" className="section light">
      <div className="wrap">
        <div className="act-grid">
          <div>
            <RevealHeading
              eyebrow="Act 07 / Visibility"
              lede="Ranking decides order. Visibility filtering decides whether a post can appear at all."
            >
              Being ranked first does not mean you will be shown.
            </RevealHeading>
            <Reveal delay={0.2}>
              <label className="follow-toggle">
                <input
                  type="checkbox"
                  checked={follow}
                  onChange={(event) => setFollow(event.target.checked)}
                />
                <span>Do you follow this account?</span>
              </label>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="sticky-visual">
            <motion.div className="post-card" layout>
              <div className="status-line">
                <span className="mono">same post / same rank</span>
                <motion.span
                  layout
                  className={`status ${follow ? "allow" : "drop"}`}
                >
                  {follow ? "ALLOW" : "DROP"}
                </motion.span>
              </div>
              <h3 className="serif">A post flagged as spam.</h3>
              <p className="small-copy">
                {follow
                  ? "You follow the author, so this post can still be shown."
                  : "You do not follow the author, so a high-recall spam rule drops this recommendation."}
              </p>
              <div className="outcome">
                <span>ranked #1</span>
                <ArrowRight size={16} />
                <motion.span layout>{follow ? "shown" : "removed"}</motion.span>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
