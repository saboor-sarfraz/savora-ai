'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import type { Category, MenuItem } from '@/lib/types';
import { MENU } from '@/lib/data';
import { CategoryTabs } from './category-tabs';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import { staggerContainer } from '@/lib/motion';

type SortKey = 'popular' | 'price-low' | 'price-high' | 'rating' | 'calories';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'calories', label: 'Lowest Calories' },
];

const FILTER_TAGS = ['vegetarian', 'vegan', 'spicy', 'gluten-free'] as const;

export function MenuGrid({ items = MENU }: { items?: MenuItem[] }) {
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('popular');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let result = [...items];
    if (category !== 'all') result = result.filter((i) => i.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }
    if (activeTags.length) {
      result = result.filter((i) => activeTags.every((t) => i.tags.includes(t as never)));
    }
    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'calories':
        result.sort((a, b) => a.calories - b.calories);
        break;
      default:
        result.sort((a, b) => Number(b.popular) - Number(a.popular));
    }
    return result;
  }, [items, category, query, sort, activeTags]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const activeCount = (category !== 'all' ? 1 : 0) + activeTags.length + (query ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="h-11 w-full rounded-xl border border-border/70 bg-card/50 pl-10 pr-10 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all',
                    activeTags.includes(tag)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/70 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {tag.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryTabs value={category} onChange={setCategory} />
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-xl border border-border/70 bg-card/50 px-3 text-sm outline-none backdrop-blur-sm transition-colors focus:border-primary/50"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-card">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeCount > 0 && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {filtered.length} of {items.length} items
            </span>
            <button
              onClick={() => {
                setCategory('all');
                setQuery('');
                setActiveTags([]);
                setSort('popular');
              }}
              className="font-medium text-primary hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <motion.div layout>
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key={category + query + activeTags.join() + sort}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filtered.map((item, i) => (
                <ProductCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 py-20 text-center"
            >
              <Search className="h-10 w-10 text-muted-foreground/50" />
              <p className="font-display text-xl font-semibold">No dishes found</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Try a different search term, clear your filters, or ask our AI
                assistant for a recommendation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
