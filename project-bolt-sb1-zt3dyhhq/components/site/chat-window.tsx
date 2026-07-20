'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useChat } from '@/lib/chat-context';
import { SUGGESTED_PROMPTS } from '@/lib/chat-context';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { SuggestedPrompt } from './suggested-prompt';
import { TypingIndicator } from './chat-typing';

export function ChatWindow() {
  const { messages, isTyping, sendUserMessage } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  // Show suggestions only before the first user message.
  const showSuggestions = messages.filter((m) => m.role === 'user').length === 0;

  return (
    <div className="flex h-full flex-col">
      {/* Conversation */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}

        <div ref={endRef} />
      </div>

      {/* Suggested prompts */}
      {showSuggestions && (
        <div className="border-t border-border/50 px-4 py-3 sm:px-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Try asking
          </p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {SUGGESTED_PROMPTS.map((p) => (
              <SuggestedPrompt
                key={p}
                prompt={p}
                onClick={sendUserMessage}
                disabled={isTyping}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border/60 p-3 sm:p-4">
        <ChatInput onSend={sendUserMessage} disabled={isTyping} />
        <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
          Savora AI can recommend meals and manage your cart. Responses are
          demo data.
        </p>
      </div>
    </div>
  );
}
