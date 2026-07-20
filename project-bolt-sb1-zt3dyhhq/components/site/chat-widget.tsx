'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, RotateCcw, ShoppingCart } from 'lucide-react';
import { useChat } from '@/lib/chat-context';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/data';
import { ChatWindow } from './chat-window';
import { Avatar, AiBadge } from './chat-typing';

export function ChatWidget() {
  const { isOpen, toggleChat, openChat, clearConversation, messages } = useChat();
  const { totals, openCart } = useCart();

  const hasConversation = messages.some((m) => m.role === 'user');

  return (
    <>
      {/* Floating launcher button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            onClick={openChat}
            aria-label="Open Savora AI chat"
            className="group fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2.5 rounded-2xl bg-primary px-4 text-primary-foreground shadow-2xl shadow-primary/40 transition-all hover:shadow-primary/60 sm:bottom-6 sm:right-6"
          >
            <span className="absolute inset-0 rounded-2xl bg-primary" />
            <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-primary/50" />
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/15">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="relative pr-1 text-sm font-semibold">
              Chat with AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col glass-strong border-l border-border/70 shadow-2xl sm:bottom-6 sm:right-6 sm:h-[min(720px,calc(100dvh-3rem))] sm:w-[440px] sm:rounded-3xl sm:border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-3">
                <Avatar size={42} />
                <div>
                  <div className="flex items-center gap-2">
                    <AiBadge />
                  </div>
                  <h3 className="mt-1 font-display text-base font-semibold leading-tight">
                    Savora AI
                  </h3>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Online · Food Assistant
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {totals.itemCount > 0 && (
                  <button
                    onClick={openCart}
                    aria-label="Open cart"
                    className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                      {totals.itemCount}
                    </span>
                  </button>
                )}
                {hasConversation && (
                  <button
                    onClick={clearConversation}
                    aria-label="Reset conversation"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  aria-label="Close chat"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Cart preview bar (when items exist) */}
            <AnimatePresence>
              {totals.itemCount > 0 && (
                <motion.button
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onClick={openCart}
                  className="flex items-center justify-between overflow-hidden border-b border-border/50 bg-primary/5 px-4 py-2.5 text-left sm:px-5"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <AiBadge />
                    <span className="text-muted-foreground">
                      {totals.itemCount} item{totals.itemCount === 1 ? '' : 's'} in cart
                    </span>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-primary">
                    {formatPrice(totals.subtotal)}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Conversation + input */}
            <div className="min-h-0 flex-1">
              <ChatWindow />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
