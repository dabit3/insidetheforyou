"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedNumber({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animate = mounted && !reduced;

  return (
    <motion.span
      className="animated-number"
      key={value.toFixed(2)}
      initial={animate ? { opacity: 0.35, y: 5 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {value.toFixed(1)}
    </motion.span>
  );
}
