'use client';

import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { useCart } from '@/lib/cart-context';

export function CartItem({ item }: { item: CartItemType }) {
  const { increaseQty, decreaseQty, removeItem } = useCart();
  const subtotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="group flex gap-3 rounded-xl border border-border/50 bg-card/40 p-3"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h4 className="truncate text-sm font-semibold">{item.name}</h4>
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name}`}
            className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs capitalize text-muted-foreground">{item.category}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="inline-flex items-center rounded-lg border border-border/60 bg-background/50">
            <button
              onClick={() => decreaseQty(item.id)}
              aria-label="Decrease quantity"
              className="inline-flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-semibold tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQty(item.id)}
              aria-label="Increase quantity"
              className="inline-flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-sm font-bold tabular-nums">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
