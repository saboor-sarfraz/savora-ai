'use client';

import { cn } from '@/lib/utils';

export function Logo({
  className,
  showText = true,
  size = 36,
}: {
  className?: string;
  showText?: boolean;
  size?: number;
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        className="relative inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary font-display font-bold text-primary-foreground shadow-lg shadow-primary/30"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        S
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-background" />
      </span>
      {showText && (
        <span className="font-display text-xl font-semibold tracking-tight">
          Savora
        </span>
      )}
    </div>
  );
}
