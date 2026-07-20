'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import type {
  ChatMessage,
  BackendChatResponse,
  CartItem,
} from '@/lib/types';
import { useCart } from './cart-context';

interface ChatContextValue {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendUserMessage: (content: string) => Promise<void>;
  clearConversation: () => void;
  /** Imperative hook for navbar/footer CTAs. */
  lastError: string | null;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const SUGGESTED_PROMPTS = [
  'Recommend something spicy',
  "I'm vegetarian",
  'I want burgers',
  'I only have $20',
  'Show desserts',
];

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi, I'm Savora AI — your food assistant. Tell me what you're craving, your budget, or any dietary needs, and I'll build the perfect order for you.",
  timestamp: Date.now(),
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface ChatProviderProps {
  children: ReactNode;
  /** Pluggable sender so tests / future wiring can override. */
  sendFn?: (
    message: string,
    conversation: ChatMessage[]
  ) => Promise<BackendChatResponse>;
}

export function ChatProvider({ children, sendFn }: ChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const cart = useCart();
  const messagesRef = useRef<ChatMessage[]>(messages);
  messagesRef.current = messages;

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((o) => !o), []);

  const clearConversation = useCallback(() => {
    setMessages([{ ...WELCOME, id: 'welcome', timestamp: Date.now() }]);
    setLastError(null);
  }, []);

  const sendUserMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isTyping) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      };
      const pendingId = uid();
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);
      setLastError(null);

      try {
        const response = await (sendFn ?? defaultSend)(
          trimmed,
          messagesRef.current
        );

        const replyText =
          response.reply ??
          response.message ??
          "Sorry, I couldn't process that. Could you rephrase?";

        const assistantMsg: ChatMessage = {
          id: pendingId,
          role: 'assistant',
          content: replyText,
          timestamp: Date.now(),
          toolResult: {
            tool: response.tool,
            cart: response.cart,
            cartSummary: response.cartSummary,
            suggestedPrompts: response.suggestedPrompts,
          },
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Cart synchronization: backend is the source of truth when it
        // returns a cart payload. We simply replace local cart state.
        if (response.cart) {
          cart.setCart(response.cart as CartItem[]);
        }
      } catch (err) {
        setLastError(err instanceof Error ? err.message : 'Chat failed');
        setMessages((prev) => [
          ...prev,
          {
            id: pendingId,
            role: 'assistant',
            content:
              'I hit a snag reaching the kitchen. Please try again in a moment.',
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [cart, isTyping]
  );

  const value: ChatContextValue = {
    messages,
    isOpen,
    isTyping,
    openChat,
    closeChat,
    toggleChat,
    sendUserMessage,
    clearConversation,
    lastError,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}

export { SUGGESTED_PROMPTS };

/**
 * Default sender — calls the backend chat endpoint.
 * Replace `sendFn` on the provider to mock or redirect.
 *
 * TODO: Replace with your real backend endpoint when wiring up.
 */
async function defaultSend(
  message: string,
  conversation: ChatMessage[]
): Promise<BackendChatResponse> {
  const response = await fetch('http://localhost:8000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversation }),
  });
  if (!response.ok) {
    throw new Error(`Chat request failed (${response.status})`);
  }
  return (await response.json()) as BackendChatResponse;
}
