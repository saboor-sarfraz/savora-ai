'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  Home,
  Receipt,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { formatPrice } from '@/lib/data';

interface LastOrder {
  orderNumber: string;
  eta: string;
  total: number;
  itemCount: number;
}

const FALLBACK: LastOrder = {
  orderNumber: 'SVR-DEMO1',
  eta: '6:35 PM',
  total: 0,
  itemCount: 0,
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<LastOrder>(FALLBACK);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('savora-last-order');
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* keep fallback */
    }
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/10 blur-[140px]" />
      <div className="absolute inset-0 -z-10 bg-dots opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg"
      >
        <div className="glass-strong rounded-3xl border border-border/60 p-8 text-center shadow-2xl sm:p-12">
          {/* Animated check */}
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full bg-success/20"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-success/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success text-success-foreground shadow-2xl shadow-success/40"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
            >
              <motion.span
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Check className="h-10 w-10" strokeWidth={3} />
              </motion.span>
            </motion.span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Order confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-base text-muted-foreground"
          >
            Your food is on its way. Sit back — the kitchen&apos;s already fired
            up.
          </motion.p>

          {/* Order details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 grid grid-cols-2 gap-3"
          >
            <DetailCard
              icon={Receipt}
              label="Order number"
              value={order.orderNumber}
            />
            <DetailCard
              icon={Clock}
              label="Estimated delivery"
              value={order.eta}
            />
            <DetailCard
              icon={MapPin}
              label="Items"
              value={`${order.itemCount} dish${order.itemCount === 1 ? '' : 'es'}`}
            />
            <DetailCard
              icon={Sparkles}
              label="Total paid"
              value={order.total > 0 ? formatPrice(order.total) : '—'}
            />
          </motion.div>

          {/* Tracker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-5 text-left"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Order status</span>
              <span className="text-success">In the kitchen</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {['Confirmed', 'Preparing', 'On the way', 'Delivered'].map((step, i) => (
                <div key={step} className="flex flex-1 items-center gap-2">
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        i <= 1
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted/60 text-muted-foreground'
                      }`}
                    >
                      {i <= 1 ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{step}</span>
                  </div>
                  {i < 3 && (
                    <div className="h-0.5 flex-1 rounded-full bg-muted/60">
                      <motion.div
                        className="h-full rounded-full bg-success"
                        initial={{ width: i === 0 ? '100%' : '0%' }}
                        animate={{ width: i === 0 ? '100%' : '0%' }}
                        transition={{ delay: 1, duration: 0.6 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/"
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            <Link
              href="/menu"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/70 bg-card/40 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary/40"
            >
              Order again
            </Link>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          This is a demo — no real order was placed or charged.
        </p>
      </motion.div>
    </section>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Check;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-start gap-1 rounded-2xl border border-border/60 bg-card/40 p-4 text-left">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="font-display text-base font-semibold">{value}</span>
    </div>
  );
}
