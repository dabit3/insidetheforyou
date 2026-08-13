"use client";

import { ArrowRight, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Act, Reveal, RevealHeading } from "./Primitives";

const inPosts = [
  "@people-you-follow",
  "recent conversations",
  "familiar voices",
];
const outPosts = [
  "@people-you-don’t-follow",
  "retrieved interests",
  "new voices",
];

export function Act02() {
  const [pile, setPile] = useState<"in" | "out">("in");
  const active = pile === "in" ? inPosts : outPosts;
  return (
    <Act id="piles">
      <div className="act-grid">
        <RevealHeading
          eyebrow="Act 02 / Candidates"
          lede="The feed gathers from people you follow and people you do not. Both piles arrive in parallel, then enter the same process."
        >
          Two piles of posts.
        </RevealHeading>
        <Reveal delay={0.2}>
          <div className="post-card">
            <div className="pile-heading">
              <div className="node">
                <Users size={20} />
              </div>
              <div>
                <p className="mono">Both piles merge here</p>
                <p className="small-copy">
                  Two sources, one candidate set for the next act.
                </p>
              </div>
            </div>
            <div
              className="pile-controls"
              role="group"
              aria-label="Choose a pile to inspect"
            >
              <button
                aria-pressed={pile === "in"}
                onClick={() => setPile("in")}
              >
                In-network
              </button>
              <button
                aria-pressed={pile === "out"}
                onClick={() => setPile("out")}
              >
                Out-of-network
              </button>
            </div>
            <div className="pile-merge">
              <div className="pile-column">
                <span className="mono">in-network</span>
                {inPosts.map((post) => (
                  <span
                    key={post}
                    className={
                      pile === "in" ? "source-post active" : "source-post"
                    }
                  >
                    {post}
                  </span>
                ))}
              </div>
              <ArrowRight className="merge-arrow" size={18} />
              <div className="pile-column">
                <span className="mono">out-of-network</span>
                {outPosts.map((post) => (
                  <span
                    key={post}
                    className={
                      pile === "out" ? "source-post active" : "source-post"
                    }
                  >
                    {post}
                  </span>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={pile}
                className="selected-pile"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {active.map((post, index) => (
                  <span key={post}>
                    <b>{post}</b>
                    <small className="mono">candidate 0{index + 1}</small>
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Act>
  );
}
