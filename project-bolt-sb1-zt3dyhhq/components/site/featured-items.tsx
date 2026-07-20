'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getFeatured } from '@/lib/data';
import { ProductCard } from './product-card';
import { SectionHeading } from './section-heading';
import { staggerContainer, viewportOnce } from '@/lib/motion';

export function FeaturedItems() {
  const items = getFeatured();

  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Chef's picks"
            title="Featured this week"
            description="A rotating selection of our most-loved dishes, chosen by the kitchen and loved by thousands."
          />
          <Link
            href="/menu"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-border/70 bg-card/40 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40"
          >
            View full menu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
