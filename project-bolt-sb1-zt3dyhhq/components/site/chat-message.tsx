'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Check } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { Avatar } from './chat-typing';
import { cn } from '@/lib/utils';

const TOOL_LABELS: Record<string, { label: string; icon: typeof ShoppingCart }> = {
  add_to_cart: { label: 'Added to cart', icon: ShoppingCart },
  remove_from_cart: { label: 'Removed from cart', icon: Trash2 },
  update_quantity: { label: 'Updated quantity', icon: Check },
  clear_cart: { label: 'Cleared cart', icon: Trash2 },
};

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user';
  const tool = message.toolResult?.tool;
  const cartSummary = message.toolResult?.cartSummary;
  const ToolIcon = tool ? TOOL_LABELS[tool]?.icon : null;
  const toolLabel = tool ? TOOL_LABELS[tool]?.label : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex w-full gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {!isUser && <Avatar size={34} />}

      <div className={cn('flex max-w-[78%] flex-col gap-1', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
            isUser
              ? 'rounded-tr-md bg-primary text-primary-foreground'
              : 'glass rounded-tl-md text-foreground'
          )}
        >
          {message.content}
        </div>

        {/* Structured tool result card */}
        {tool && toolLabel && ToolIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs"
          >
            <ToolIcon className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold text-primary">{toolLabel}</span>
            {cartSummary && (
              <span className="text-muted-foreground">
                · {cartSummary.itemCount} item{cartSummary.itemCount === 1 ? '' : 's'} ·{' '}
                <span className="font-semibold text-foreground">
                  {formatPrice(cartSummary.subtotal)}
                </span>
              </span>
            )}
          </motion.div>
        )}

        <span className="px-1 text-[10px] text-muted-foreground/70">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
