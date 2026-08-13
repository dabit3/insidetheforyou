import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: ReactNode
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({
  id,
  theme,
  eyebrow,
  step,
  children,
}: {
  id?: string
  theme: 'light' | 'dark'
  eyebrow?: string
  step?: number
  children: ReactNode
}) {
  return (
    <section id={id} className={`section ${theme}`}>
      <div className="section-inner">
        {step !== undefined && (
          <Reveal>
            <span className="eyebrow eyebrow-num">{step}</span>
          </Reveal>
        )}
        {eyebrow && (
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
