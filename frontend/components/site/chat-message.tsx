'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

  const hasTable = message.content.includes('|') && message.content.includes('\n|');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex w-full gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {!isUser && <Avatar size={34} />}

      <div
        className={cn(
          'flex flex-col gap-1',
          isUser ? 'max-w-[80%] items-end' : hasTable ? 'w-full max-w-full' : 'max-w-[90%]'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-base leading-relaxed shadow-sm',
            hasTable && 'w-full',
            isUser
              ? 'rounded-tr-md bg-primary text-primary-foreground'
              : 'glass rounded-tl-md text-foreground'
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <div className="my-2.5 w-full overflow-x-auto rounded-xl border border-border/60 shadow-sm">
                  <table className="w-full border-collapse text-sm text-left">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-primary/10 text-left">{children}</thead>
              ),
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => (
                <tr className="border-b border-border/40 last:border-b-0 even:bg-muted/30 transition-colors hover:bg-muted/50">
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="border-r border-border/40 last:border-r-0 px-3.5 py-2.5 font-semibold text-primary align-top">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-r border-border/40 last:border-r-0 px-3.5 py-2.5 text-foreground/90 align-top">
                  {children}
                </td>
              ),
              p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="mb-1.5 ml-4 list-disc last:mb-0">{children}</ul>,
              ol: ({ children }) => <ol className="mb-1.5 ml-4 list-decimal last:mb-0">{children}</ol>,
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Structured tool result card */}
        {tool && toolLabel && ToolIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-sm"
          >
            <ToolIcon className="h-4 w-4 text-primary" />
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

        <span className="px-1 text-xs text-muted-foreground/70">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
