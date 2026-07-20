'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { CartItem, MenuItem } from '@/lib/types';
import {
  TAX_RATE,
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  formatPrice,
} from '@/lib/data';

export interface CartTotals {
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  itemCount: number;
  freeDeliveryUnlocked: boolean;
  amountToFreeDelivery: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  /** Replace cart state entirely — used by the chatbot backend sync. */
  setCart: (items: CartItem[]) => void;
  totals: CartTotals;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  lastAddedId: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'savora-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity,
        },
      ];
    });
    setLastAddedId(item.id);
    window.setTimeout(() => setLastAddedId(null), 1200);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const increaseQty = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const decreaseQty = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const setCart = useCallback((next: CartItem[]) => setItems(next), []);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const itemCount = items.reduce((s, i) => s + i.quantity, 0);
    const freeDeliveryUnlocked = subtotal >= FREE_DELIVERY_THRESHOLD;
    const delivery = itemCount === 0 ? 0 : freeDeliveryUnlocked ? 0 : DELIVERY_FEE;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + delivery;
    return {
      subtotal,
      tax,
      delivery,
      total,
      itemCount,
      freeDeliveryUnlocked,
      amountToFreeDelivery: Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal),
    };
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    setQuantity,
    clear,
    setCart,
    totals,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((o) => !o),
    lastAddedId,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export { formatPrice };
