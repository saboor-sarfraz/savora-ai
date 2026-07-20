'use client';

import { motion } from 'framer-motion';
import { Sparkles, Send, ShoppingCart, Trash2, Utensils } from 'lucide-react';
import { SectionHeading } from './section-heading';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

const EXAMPLES = [
  {
    user: "I'm really hungry but only have $15.",
    assistant: 'I recommend the Classic Cheeseburger combo with fries — comes to $13.50 with tax, leaving you room for a drink.',
    tool: { label: 'Added to cart', icon: ShoppingCart },
  },
  {
    user: "I'm vegetarian.",
    assistant: "You'd love our Veggie Supreme Pizza — wood-fired, loaded with roasted peppers and mushrooms. Want me to add it?",
    tool: { label: 'Added to cart', icon: ShoppingCart },
  },
  {
    user: 'I want something spicy.',
    assistant: 'Try the Firecracker Wrap — crispy chicken, sriracha slaw, and ghost-pepper jam. It packs serious heat.',
    tool: { label: 'Added to cart', icon: ShoppingCart },
  },
];

const CAPABILITIES = [
  { icon: Sparkles, label: 'Recommend meals' },
  { icon: Utensils, label: 'Answer menu questions' },
  { icon: ShoppingCart, label: 'Add to cart' },
  { icon: Trash2, label: 'Remove & update items' },
];

export function AiAssistantSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-card/30 via-background to-background" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="The centerpiece"
          title={
            <>
              Meet the <span className="text-gradient-brand">AI Food Assistant</span>
            </>
          }
          description="Tell it your craving, your budget, or your dietary needs. Savora AI understands natural language, recommends the perfect dish, and manages your cart — all in conversation."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12"
        >
          {/* Chat examples */}
          <motion.div
            variants={fadeUp}
            className="glass relative overflow-hidden rounded-3xl border border-border/70 p-6 shadow-2xl sm:p-8"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative space-y-5">
              {EXAMPLES.map((ex, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="space-y-3"
                >
                  {/* User bubble */}
                  <div className="flex justify-end gap-2.5">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-lg">
                      {ex.user}
                    </div>
                  </div>
                  {/* Assistant bubble */}
                  <div className="flex gap-2.5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div className="max-w-[80%] space-y-1.5">
                      <div className="glass rounded-2xl rounded-tl-md px-4 py-2.5 text-sm leading-relaxed">
                        {ex.assistant}
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        <ex.tool.icon className="h-3 w-3" />
                        {ex.tool.label}
                      </div>
                    </div>
                  </div>
                  {i < EXAMPLES.length - 1 && (
                    <div className="h-px bg-border/40" />
                  )}
                </motion.div>
              ))}

              {/* Input mock */}
              <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background/50 p-2">
                <div className="flex-1 px-3 text-sm text-muted-foreground">
                  Show me something sweet...
                </div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Send className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Capabilities + CTA */}
          <motion.div variants={fadeUp} className="flex flex-col justify-center gap-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <motion.div
                  key={c.label}
                  variants={staggerItem}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium">{c.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={staggerItem}
              className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-6"
            >
              <p className="font-display text-lg font-semibold">
                Built for natural conversation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The assistant is ready to connect to your backend. It already
                renders structured cart updates, tool calls, and suggested
                prompts — just point it at your API.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
