'use client';

import { ThemeProvider } from '@/lib/theme-context';
import { CartProvider } from '@/lib/cart-context';
import { ChatProvider } from '@/lib/chat-context';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { CartDrawer } from '@/components/site/cart-drawer';
import { ChatWidget } from '@/components/site/chat-widget';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <ChatProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
          <ChatWidget />
        </ChatProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
