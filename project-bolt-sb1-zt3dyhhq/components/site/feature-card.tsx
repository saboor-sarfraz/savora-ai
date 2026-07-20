'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { staggerItem } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  accent?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = 'text-primary',
}: FeatureCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/40"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-70" />
      <div
        className={cn(
          'relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-muted/40',
          accent
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="relative mt-5 font-display text-xl font-semibold">
        {title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}
