'use client';

import { motion } from 'framer-motion';
import { Leaf, Sparkles, Heart, Target, Quote } from 'lucide-react';
import { PageHeader } from '@/components/site/page-header';
import { SectionHeading } from '@/components/site/section-heading';
import { FeatureCard } from '@/components/site/feature-card';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '@/lib/motion';

const VALUES = [
  {
    icon: Leaf,
    title: 'Source with intent',
    description:
      'We partner with regional farmers and fisheries. Seasonal menus keep our footprint small and our flavor big.',
  },
  {
    icon: Sparkles,
    title: 'Technology with a purpose',
    description:
      'Savora AI exists to remove decision fatigue, not replace human craft. The kitchen still makes every dish by hand.',
  },
  {
    icon: Heart,
    title: 'Hospitality first',
    description:
      'Every guest is a regular we haven&apos;t met yet. Warm, attentive, never scripted.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={
          <>
            A restaurant reimagined <br />
            <span className="text-gradient-brand">around a conversation</span>
          </>
        }
        description="Savora began with a simple frustration: ordering food online felt like filling out a form. We thought it should feel like talking to a friend who knows the menu by heart."
      />

      {/* Story */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Savora kitchen"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden overflow-hidden rounded-2xl border border-border/60 shadow-2xl sm:block">
                <img
                  src="https://images.pexels.com/photos/5417153/pexels-photo-5417153.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Plating a dish"
                  className="h-40 w-56 object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-6"
            >
              <motion.h2
                variants={staggerItem}
                className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                From a late-night idea to a smarter table
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="text-base leading-relaxed text-muted-foreground"
              >
                In 2023, our founder — a former line cook turned software
                engineer — noticed the gap between how people describe what they
                want and how menus force them to choose. &ldquo;I&apos;m hungry,
                it&apos;s late, I&apos;ve got fifteen bucks, and I don&apos;t
                want anything heavy&rdquo; is a perfectly clear sentence. No
                filter menu captures it.
              </motion.p>
              <motion.p
                variants={staggerItem}
                className="text-base leading-relaxed text-muted-foreground"
              >
                So we built Savora: a restaurant where the menu is a
                conversation. Our AI Food Assistant understands cravings,
                budgets, and dietary needs in plain language, then assembles
                your order in seconds. The food is still made the old-fashioned
                way — by people who care.
              </motion.p>
              <motion.div
                variants={staggerItem}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/40 p-5"
              >
                <Quote className="h-8 w-8 shrink-0 text-primary" />
                <p className="font-display text-lg italic leading-snug">
                  &ldquo;We didn&apos;t build an AI to replace the chef. We
                  built it to replace the indecision.&rdquo;
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef section */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-5"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-6 bg-primary/60" />
                Meet the chef
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Chef Marisol Reyes
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Marisol trained in kitchens across Oaxaca, Naples, and
                Copenhagen before returning home to San Francisco. Her cooking
                lives where technique meets instinct — fire-kissed crusts,
                bright acid, and a belief that comfort food deserves serious
                craft.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                She leads a team of twelve and personally taste-tests every new
                dish before it earns a spot on the menu — or in Savora AI&apos;s
                recommendation engine.
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                {[
                  { value: '14 yrs', label: 'Professional kitchens' },
                  { value: '3', label: 'Continents trained' },
                  { value: '38', label: 'Dishes on the menu' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-bold text-gradient-brand">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/5432267/pexels-photo-5432267.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Chef Marisol Reyes"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="glass-strong absolute -bottom-5 -left-5 rounded-2xl border border-border/70 p-4 shadow-xl">
                <p className="font-display text-sm font-semibold">
                  Executive Chef &amp; Co-founder
                </p>
                <p className="text-xs text-muted-foreground">Savora, San Francisco</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission + values */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="Our mission & values"
            description="Great food, made humanely, served intelligently. These principles guide every plate and every line of code."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {VALUES.map((v) => (
              <FeatureCard key={v.title} {...v} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center sm:p-12"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Target className="h-6 w-6" />
            </span>
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              Our mission
            </h3>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              To make great food effortless to order — so you spend less time
              deciding and more time enjoying. Every recommendation, every
              filter, every conversation is built toward that single goal.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
