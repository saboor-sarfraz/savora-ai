'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ArrowRight, Trash2, Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice, FREE_DELIVERY_THRESHOLD } from '@/lib/data';
import { CartItem } from './cart-item';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    clear,
    totals,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60]"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 38 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col glass-strong border-l border-border/70 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold">Your Cart</h2>
                {totals.itemCount > 0 && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
                    {totals.itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="chat-scroll flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/40">
                    <ShoppingBag className="h-9 w-9 text-muted-foreground/60" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold">
                      Your cart is empty
                    </p>
                    <p className="mt-1 max-w-[15rem] text-sm text-muted-foreground">
                      Add dishes from the menu or ask Savora AI to build your
                      order.
                    </p>
                  </div>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Browse Menu <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>

                  <button
                    onClick={clear}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Clear cart
                  </button>
                </div>
              )}
            </div>

            {/* Footer / totals */}
            {items.length > 0 && (
              <div className="border-t border-border/60 px-5 py-4">
                {/* Free delivery progress */}
                {!totals.freeDeliveryUnlocked && (
                  <div className="mb-4 space-y-1.5">
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

                <div className="space-y-1.5 text-sm">
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
                  <div className="my-2 h-px bg-border/60" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-semibold">
                      Grand Total
                    </span>
                    <span className="font-display text-lg font-bold tabular-nums text-primary">
                      {formatPrice(totals.total)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
                >
                  Checkout
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="mt-2 block w-full text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="font-medium tabular-nums text-foreground">{value}</span>
    </div>
  );
}
