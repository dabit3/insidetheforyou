"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SectionShell } from "../ui/SectionShell";
import { Tabs } from "../ui/Tabs";

const pools = {
  "In-network": ["IN-NETWORK", "IN-NETWORK", "IN-NETWORK"],
  "Out-of-network": ["OUT-OF-NETWORK", "OUT-OF-NETWORK", "OUT-OF-NETWORK"],
  Both: ["IN-NETWORK", "OUT-OF-NETWORK", "IN-NETWORK", "OUT-OF-NETWORK"],
};

export function Candidates() {
  const [pool, setPool] = useState<keyof typeof pools>("Both");
  return (
    <SectionShell
      id="candidates"
      eyebrow="STEP 1 — CANDIDATES"
      title="Two pools: people you follow, and everyone else"
      body="Being followed is not required to reach you. Both pools are ranked by the same model, side by side."
    >
      <div className="split-grid">
        <div className="split-copy">
          <p className="large-copy">
            The For You feed starts broad. It gathers recent posts from accounts you follow, then
            finds promising posts from the rest of X.
          </p>
          <div className="takeaway">
            <strong>What this means for you</strong>
            <br />
            Both pools are ranked by the same model. Out-of-network posts are scored with a
            handicap, so a stranger’s post has to predict a stronger reaction.
          </div>
        </div>
        <div className="pool-visual">
          <Tabs
            options={["In-network", "Out-of-network", "Both"]}
            value={pool}
            onChange={(value) => setPool(value as keyof typeof pools)}
          />
          <div className="pool-list">
            {pools[pool].map((label, index) => (
              <motion.div layout className="post-tile" key={`${label}-${index}`}>
                <span className="mono tile-label">{label}</span>
                <div className="tile-line" />
                <div className="tile-line tile-line-short" />
              </motion.div>
            ))}
          </div>
          <p className="visual-note">
            Out-of-network retrieval uses vectors and community clusters to find posts close to what
            people like you engage with.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
