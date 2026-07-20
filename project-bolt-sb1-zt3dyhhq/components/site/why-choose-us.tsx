'use client';

import { motion } from 'framer-motion';
import {
  Leaf,
  Zap,
  Sparkles,
  HeartHandshake,
  MousePointerClick,
  Clock,
} from 'lucide-react';
import { SectionHeading } from './section-heading';
import { FeatureCard } from './feature-card';
import { staggerContainer, viewportOnce } from '@/lib/motion';

const FEATURES = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description:
      'Locally sourced produce, house-baked buns, and meats delivered daily. Nothing frozen, nothing compromised.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description:
      'Hot food at your door in under 30 minutes. Real-time tracking from kitchen to doorstep.',
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description:
      'Savora AI learns your taste and budget to suggest the perfect dish every single time.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Suggestions',
    description:
      'Vegetarian, gluten-free, or chasing the heat — your preferences shape every recommendation.',
  },
  {
    icon: MousePointerClick,
    title: 'Easy Ordering',
    description:
      'Chat naturally or tap to add. Your cart syncs instantly across the whole experience.',
  },
  {
    icon: Clock,
    title: 'Open Late',
    description:
      'Cravings don&apos;t keep office hours. We&apos;re serving until midnight on weekends.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Why Savora"
          title="Built for the way you actually order"
          description="We started Savora to remove the friction between being hungry and eating well. Every feature serves that one idea."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
