'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Rating({
  value,
  reviews,
  className,
  size = 'sm',
}: {
  value: number;
  reviews?: number;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const star = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        <Star className={cn(star, 'fill-accent text-accent')} />
        <span className="text-sm font-semibold tabular-nums">
          {value.toFixed(1)}
        </span>
      </div>
      {reviews !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
