'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center gap-2 rounded-2xl border border-border/50 bg-card/40 p-2 backdrop-blur-md focus-within:border-primary/50"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Ask for a recommendation, a budget meal, anything..."
        className="max-h-[120px] flex-1 resize-none bg-transparent px-3 py-1.5 text-base leading-6 outline-none placeholder:text-muted-foreground my-auto"
      />

      <motion.button
        whileTap={{ scale: 0.92 }}
        type="submit"
        disabled={!value.trim() || disabled}
        aria-label="Send message"
        className={cn(
          'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors',
          value.trim() && !disabled
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-muted/60 text-muted-foreground/50'
        )}
      >
        <Send className="h-4 w-4" />
      </motion.button>
    </form>
  );
}
