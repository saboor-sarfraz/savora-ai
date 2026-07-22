'use client';

import { motion } from 'framer-motion';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  Beef,
  Pizza,
  Sandwich,
  Soup,
  CakeSlice,
  CupSoda,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
  Beef,
  Pizza,
  Burrito: Sandwich,
  Soup,
  CakeSlice,
  CupSoda,
};

export function CategoryTabs({
  value,
  onChange,
  className,
}: {
  value: Category | 'all';
  onChange: (value: Category | 'all') => void;
  className?: string;
}) {
  const allTabs: { id: Category | 'all'; label: string; icon: LucideIcon | null }[] = [
    { id: 'all', label: 'All', icon: Utensils },
    ...CATEGORIES.map((cat) => ({
      id: cat.id,
      label: cat.label,
      icon: ICONS[cat.icon] ?? null,
    })),
  ];

  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={(v) => onChange(v as Category | 'all')}
      className={cn('w-full', className)}
    >
      <TabsPrimitive.List className="no-scrollbar flex h-auto w-full gap-2 overflow-x-auto rounded-2xl border border-border/60 bg-card/40 p-2 backdrop-blur-sm">
        {allTabs.map((tab) => {
          const isActive = value === tab.id;
          const Icon = tab.icon;
          return (
            <TabsPrimitive.Trigger
              key={tab.id}
              value={tab.id}
              className={cn(
                'relative inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {Icon && <Icon className="relative h-4 w-4" />}
              <span className="relative whitespace-nowrap">{tab.label}</span>
            </TabsPrimitive.Trigger>
          );
        })}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
