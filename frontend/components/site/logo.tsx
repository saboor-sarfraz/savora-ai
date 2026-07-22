'use client';

import Image from 'next/image';
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
        className="relative inline-flex shrink-0 overflow-hidden rounded-xl shadow-lg shadow-primary/30"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/its-a-resturant-icon-named-savora-the-themse-is-ye(1).png"
          alt="Savora restaurant icon"
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {showText && (
        <span className="font-display text-xl font-semibold tracking-tight">
          Savora
        </span>
      )}
    </div>
  );
}
