import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://savora.ai'),
  title: 'Savora — AI Food Assistant',
  description:
    'Savora is an AI-powered restaurant. Chat with our AI Food Assistant to get personalized meal recommendations, build your cart, and order smarter.',
  keywords: [
    'AI food assistant',
    'restaurant',
    'food ordering',
    'menu',
    'burgers',
    'pizza',
    'AI recommendations',
  ],
  authors: [{ name: 'Savora' }],
  openGraph: {
    title: 'Savora — AI Food Assistant',
    description:
      'Ordering food has never been smarter. Chat with Savora AI to get personalized recommendations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} font-body`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
