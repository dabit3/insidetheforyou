"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { scoreActions } from "@/lib/data";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { SectionShell } from "../ui/SectionShell";
import { Slider } from "../ui/Slider";

const groups = ["Engagement", "Clicks & attention", "Author", "Negative"];

const presets: Record<string, string> = {
  like: "like / favorite",
  reply: "reply",
  dm: "share via DM",
  report: "report",
};

export function Scoring() {
  const [values, setValues] = useState(scoreActions.map((action) => action.value));
  const [mutual, setMutual] = useState(false);
  const scrollPosition = useRef<number | null>(null);
  const preserveScroll = (update: () => void) => {
    scrollPosition.current = window.scrollY;
    update();
  };
  useLayoutEffect(() => {
    if (scrollPosition.current !== null) {
      window.scrollTo({ top: scrollPosition.current, behavior: "instant" });
      scrollPosition.current = null;
    }
  }, [mutual, values]);
  const score = useMemo(
    () =>
      scoreActions.reduce((total, action, index) => {
        if (action.name === "reply")
          return total + (mutual ? 20 : action.weight) * (values[index] / 100);
        return total + action.weight * (values[index] / 100);
      }, 0),
    [mutual, values],
  );
  const setPreset = (preset: string) => {
    const target = presets[preset];
    preserveScroll(() =>
      setValues(scoreActions.map((action) => (action.name === target ? 100 : 0))),
    );
  };

  return (
    <SectionShell
      id="scoring"
      className="scoring-section"
      dark
      eyebrow="STEP 3 — SCORING"
      title="One post, about thirty predictions, one number"
      body="The model predicts a probability for each action you might take. Each action carries a weight. Multiply, add them up, and that sum is the post’s score. Nothing else decides the order."
    >
      <div className="formula mono">score = Σ ( weight × probability(action) )</div>
      <div className="score-layout">
        <div className="score-controls">
          {groups.map((group) => (
            <div className="score-group" key={group}>
              <div className="group-label">{group}</div>
              {scoreActions
                .filter((action) => action.group === group)
                .map((action) => {
                  const index = scoreActions.indexOf(action);
                  const weight = action.name === "reply" && mutual ? 20 : action.weight;
                  return (
                    <div
                      className={`score-row ${action.muted ? "score-row-muted" : ""}`}
                      key={action.name}
                    >
                      <div className="score-name">
                        <span>{action.name}</span>
                        {action.name === "unexplored-post nudge" ? (
                          <small>in-network only</small>
                        ) : null}
                      </div>
                      <span className="weight mono">
                        {weight > 0 ? "+" : ""}
                        {weight}
                      </span>
                      <div className="slider-stack">
                        <Slider
                          label={action.name}
                          muted={action.muted}
                          value={values[index]}
                          onChange={(value) =>
                            preserveScroll(() =>
                              setValues((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index ? value : item,
                                ),
                              ),
                            )
                          }
                        />
                        <div className="contribution">
                          <span style={{ width: `${values[index]}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
        <aside className="score-card">
          <div className="eyebrow eyebrow-dark">LIVE SCORE</div>
          <AnimatedNumber value={score} />
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={mutual}
              onChange={(event) => preserveScroll(() => setMutual(event.target.checked))}
            />
            <span className="toggle-track" aria-hidden="true" />
            <span>You and the author follow each other</span>
          </label>
          <div className="preset-row">
            {[
              ["like", "A post you like"],
              ["reply", "A post you reply to"],
              ["dm", "A post you DM to a friend"],
              ["report", "A post you report"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => setPreset(id)}>
                {label}
              </button>
            ))}
          </div>
          <div className="comparison">
            <b>Derived comparisons</b>
            <br />
            1 report ≈ 468 likes of damage
            <br />1 copy-link share ≈ 40 likes
          </div>
          <p className="honesty-note">
            These are defaults published in the repository and read from a config system, so live
            values can differ and change over time.
          </p>
        </aside>
      </div>
    </SectionShell>
  );
}
