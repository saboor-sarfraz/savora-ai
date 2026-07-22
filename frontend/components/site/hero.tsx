'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, UtensilsCrossed, ArrowRight, Star } from 'lucide-react';
import { useChat } from '@/lib/chat-context';
import { EASE_OUT, staggerContainer, staggerItem } from '@/lib/motion';

const STATS = [
  { value: '12K+', label: 'Orders served' },
  { value: '4.8', label: 'Avg. rating' },
  { value: '<90s', label: 'AI reply time' },
];

export function Hero() {
  const { openChat } = useChat();

  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-card/30" />
      <div className="absolute inset-0 -z-10 bg-brand-glow" />
      <div className="absolute inset-0 -z-10 bg-dots opacity-40 mask-fade-b" />

      {/* Floating orbs */}
      <div
        aria-hidden
        className="absolute -left-20 top-32 -z-10 h-72 w-72 rounded-full bg-primary/20 opacity-70 blur-[100px]"
      />
      <div
        aria-hidden
        className="absolute -right-10 top-52 -z-10 h-80 w-80 rounded-full bg-accent/15 opacity-60 blur-[110px]"
      />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pb-32 lg:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.h1
              variants={staggerItem}
              className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Ordering food has
              <br />
              never been{' '}
              <span className="text-gradient-brand">smarter.</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Chat with our AI Food Assistant to get personalized meal
              recommendations, build your cart in conversation, and order in
              seconds. No menus to scroll. No decisions to dread.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <button
                onClick={openChat}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:shadow-primary/50"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Sparkles className="h-5 w-5" />
                Chat with AI
              </button>
              <Link
                href="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card/50 px-7 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80"
              >
                <UtensilsCrossed className="h-5 w-5" />
                Browse Menu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-10 flex items-center gap-8"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: image collage + floating chat preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
            className="relative"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative grid grid-cols-2 gap-4">
              {/* First image - floating up */}
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
                <Image
                  src="/images/f72338208425ee93d1a17a222615ad92.jpg"
                  alt="Signature burger"
                  width={400}
                  height={533}
                  className="aspect-[3/4] w-full object-cover"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                />
              </div>

              {/* Second image */}
              <div className="mt-10 overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
                <Image
                  src="/images/images.jpg"
                  alt="Wood-fired pizza"
                  width={400}
                  height={533}
                  className="aspect-[3/4] w-full object-cover"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                />
              </div>
            </div>

            {/* Floating chat preview card */}
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 }}
              className="glass-strong absolute -bottom-6 -left-6 w-64 rounded-2xl border border-border/70 p-3.5 shadow-2xl sm:-left-10"
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-semibold">Savora AI</span>
                <span className="ml-auto flex h-2 w-2 rounded-full bg-success" />
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                &ldquo;I&apos;m hungry but only have{' '}
                <span className="font-semibold text-foreground">$15</span>.&rdquo;
              </p>
              <p className="mt-2 rounded-lg rounded-tl-sm bg-primary/15 px-2.5 py-2 text-xs leading-relaxed text-foreground">
                Try the Classic Cheeseburger combo with fries —{' '}
                <span className="font-semibold">$13.50</span> total.
              </p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Star className="h-3 w-3 fill-accent text-accent" />
                Recommended in 1.2s
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}