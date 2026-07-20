'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from './animated-counter';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

const STATS = [
  { value: 12000, suffix: '+', label: 'Orders served', decimals: 0 },
  { value: 4.8, suffix: '', label: 'Average rating', decimals: 1 },
  { value: 38, suffix: '', label: 'Signature dishes', decimals: 0 },
  { value: 30, suffix: ' min', label: 'Avg. delivery', decimals: 0 },
];

export function StatsBand() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="flex flex-col items-center justify-center gap-1 bg-card/60 px-6 py-10 text-center backdrop-blur-sm"
            >
              <AnimatedCounter
                value={s.value}
                decimals={s.decimals}
                suffix={s.suffix}
                className="font-display text-4xl font-bold text-gradient-brand sm:text-5xl"
              />
              <span className="mt-1 text-sm text-muted-foreground">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
