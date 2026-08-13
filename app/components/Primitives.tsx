"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow mono">
      <i />
      {children}
    </span>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Act({
  id,
  children,
  dark = false,
}: {
  id: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section id={id} className={`section ${dark ? "dark" : "light"}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX: progress }}
      aria-label="Reading progress"
    />
  );
}

export function RevealHeading({
  eyebrow,
  children,
  lede,
}: {
  eyebrow: string;
  children: ReactNode;
  lede: string;
}) {
  return (
    <div>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="serif">{children}</h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="lede">{lede}</p>
      </Reveal>
    </div>
  );
}
