'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  Truck,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { PageHeader } from '@/components/site/page-header';
import { CartItem } from '@/components/site/cart-item';
import { useCart } from '@/lib/cart-context';
import { formatPrice, FREE_DELIVERY_THRESHOLD } from '@/lib/data';
import { useChat } from '@/lib/chat-context';

export default function CartPage() {
  const { items, clear, totals } = useCart();
  const { openChat } = useChat();

  if (items.length === 0) {
    return (
      <>
        <PageHeader
          eyebrow="Your cart"
          title="Your cart"
          description="Review your items before checkout — or let Savora AI build an order for you."
        />
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-border/60 bg-card/30 py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/40">
                <ShoppingBag className="h-9 w-9 text-muted-foreground/60" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold">
                  Your cart is empty
                </h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Browse the menu and add a few dishes, or ask Savora AI to
                  recommend the perfect order.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/40 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Browse Menu
                </Link>
                <button
                  onClick={openChat}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
                >
                  <Sparkles className="h-4 w-4" />
                  Chat with AI
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Your cart"
        title={
          <>
            {totals.itemCount} item{totals.itemCount === 1 ? '' : 's'} ready to
            go
          </>
        }
        description="Adjust quantities, remove items, or let the AI suggest something to round out your order."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            {/* Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Items</h2>
                <button
                  onClick={clear}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear cart
                </button>
              </div>

              <AnimatePresence initial={false}>
                <motion.div layout className="space-y-3">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </motion.div>
              </AnimatePresence>

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-primary transition-colors hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue shopping
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-semibold">
                  Order summary
                </h3>

                {/* Free delivery progress */}
                {!totals.freeDeliveryUnlocked && (
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="h-3.5 w-3.5" />
                      <span>
                        Add{' '}
                        <span className="font-semibold text-foreground">
                          {formatPrice(totals.amountToFreeDelivery)}
                        </span>{' '}
                        for free delivery
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(
                            100,
                            (totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-5 space-y-2.5 text-sm">
                  <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
                  <Row label="Tax (8.75%)" value={formatPrice(totals.tax)} />
                  <Row
                    label="Delivery"
                    value={
                      totals.delivery === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        formatPrice(totals.delivery)
                      )
                    }
                  />
                  <div className="my-3 h-px bg-border/60" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-semibold">
                      Grand Total
                    </span>
                    <span className="font-display text-2xl font-bold tabular-nums text-primary">
                      {formatPrice(totals.total)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
                >
                  Proceed to checkout
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={openChat}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  Ask AI to add more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="font-medium tabular-nums text-foreground">{value}</span>
    </div>
  );
}
