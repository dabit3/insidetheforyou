"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedNumber({ value }: { value: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="animated-number"
      key={reduced ? "reduced" : value.toFixed(2)}
      initial={reduced ? false : { opacity: 0.35, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {value.toFixed(1)}
    </motion.span>
  );
}
