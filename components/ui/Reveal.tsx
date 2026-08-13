"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`reveal ${className}`.trim()}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduced === true ? 0 : 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
