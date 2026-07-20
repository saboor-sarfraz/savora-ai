'use client';

import { motion } from 'framer-motion';
import { Flame, Leaf, Plus, Check, ShoppingCart } from 'lucide-react';
import type { MenuItem, DietTag } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { Rating } from './rating';
import { staggerItem } from '@/lib/motion';

const TAG_META: Record<DietTag, { label: string; icon?: typeof Leaf }> = {
  vegetarian: { label: 'Vegetarian', icon: Leaf },
  vegan: { label: 'Vegan', icon: Leaf },
  spicy: { label: 'Spicy', icon: Flame },
  'gluten-free': { label: 'Gluten-Free' },
  halal: { label: 'Halal' },
};

interface ProductCardProps {
  item: MenuItem;
  variant?: 'default' | 'compact';
  index?: number;
}

export function ProductCard({
  item,
  variant = 'default',
  index = 0,
}: ProductCardProps) {
  const { addItem, lastAddedId } = useCart();
  const justAdded = lastAddedId === item.id;

  const handleAdd = () => addItem(item, 1);

  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-colors hover:border-primary/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {item.popular && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
              Popular
            </span>
          )}
          {item.tags.includes('spicy') && (
            <span className="flex items-center gap-1 rounded-full bg-destructive/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground shadow-lg">
              <Flame className="h-3 w-3" /> Spicy
            </span>
          )}
        </div>

        <span className="absolute bottom-3 right-3 rounded-full bg-background/80 px-3 py-1 text-sm font-bold tabular-nums text-foreground shadow-lg backdrop-blur-sm">
          {formatPrice(item.price)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              {item.category}
            </p>
            <h3 className="mt-0.5 truncate font-display text-lg font-semibold leading-tight">
              {item.name}
            </h3>
          </div>
          <Rating value={item.rating} reviews={item.reviews} />
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {variant === 'default' && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => {
              const meta = TAG_META[tag];
              const Icon = meta.icon;
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {Icon && <Icon className="h-3 w-3" />}
                  {meta.label}
                </span>
              );
            })}
          </div>
        )}

        {variant === 'default' && (
          <div className="mt-1 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
            <span className="tabular-nums">{item.calories} cal</span>
            <span className="truncate">{item.ingredients.slice(0, 3).join(' · ')}</span>
          </div>
        )}

        <button
          onClick={handleAdd}
          className={cn(
            'group/btn relative mt-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-all',
            justAdded
              ? 'bg-success text-success-foreground'
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
          )}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
              Add to Cart
              <Plus className="h-3.5 w-3.5 opacity-70" />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
