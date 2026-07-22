'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SuggestedPrompt({
  prompt,
  onClick,
  disabled,
}: {
  prompt: string;
  onClick: (prompt: string) => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(prompt)}
      disabled={disabled}
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-3.5 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors',
        'hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50'
      )}
    >
      <Sparkles className="h-3 w-3 text-primary/70 transition-colors group-hover:text-primary" />
      {prompt}
    </motion.button>
  );
}
