'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Check,
} from 'lucide-react';
import { RESTAURANT } from '@/lib/data';
import { Logo } from './logo';
import { fadeUp, viewportOnce } from '@/lib/motion';

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { label: 'Menu', href: '/menu' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Cart', href: '/cart' },
    ],
  },
  {
    title: 'Order',
    links: [
      { label: 'Browse Menu', href: '/menu' },
      { label: 'Checkout', href: '/checkout' },
      { label: 'Order Status', href: '/order-success' },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative mt-24 border-t border-border/60 bg-card/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
        >
          {/* Brand + newsletter */}
          <div className="space-y-5">
            <Logo size={40} />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              An AI-powered restaurant experience. Chat with Savora AI to get
              personalized recommendations and order smarter.
            </p>
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email for tasty updates"
                className="h-11 w-full rounded-xl border border-border/70 bg-background/60 pl-4 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {subscribed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-medium text-success"
              >
                You&apos;re on the list. Welcome to the table.
              </motion.p>
            )}
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">
              Visit Us
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{RESTAURANT.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${RESTAURANT.phone}`} className="hover:text-primary">
                  {RESTAURANT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${RESTAURANT.email}`} className="hover:text-primary">
                  {RESTAURANT.email}
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: Instagram, href: RESTAURANT.social.instagram, label: 'Instagram' },
                { Icon: Twitter, href: RESTAURANT.social.twitter, label: 'Twitter' },
                { Icon: Facebook, href: RESTAURANT.social.facebook, label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/40 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Savora. Crafted as a portfolio demo.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary">Privacy</Link>
            <Link href="/" className="hover:text-primary">Terms</Link>
            <Link href="/" className="hover:text-primary">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
