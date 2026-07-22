'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar />
      <div className="glass flex items-center gap-1.5 rounded-2xl rounded-tl-md px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Avatar({
  size = 32,
  showStatusDot = true,
}: {
  size?: number;
  showStatusDot?: boolean;
}) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground shadow-lg shadow-primary/25"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      S
      {showStatusDot && (
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background" />
      )}
    </span>
  );
}

export function AiBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary',
        className
      )}
    >
      <Sparkles className="h-3 w-3" /> Savora AI
    </span>
  );
}
