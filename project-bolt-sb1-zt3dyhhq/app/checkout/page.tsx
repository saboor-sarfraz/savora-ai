'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Banknote,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Lock,
  Check,
  ShoppingBag,
} from 'lucide-react';
import { PageHeader } from '@/components/site/page-header';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/data';
import { cn } from '@/lib/utils';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'cash', label: 'Cash on Delivery', icon: Banknote },
  { id: 'wallet', label: 'Digital Wallet', icon: Wallet },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totals, clear } = useCart();
  const [payment, setPayment] = useState('card');
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    notes: '',
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    // Generate a fake order number and redirect to success.
    const orderNumber = `SVR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const eta = new Date(Date.now() + 35 * 60 * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const payload = { orderNumber, eta, total: totals.total, itemCount: totals.itemCount };
    sessionStorage.setItem('savora-last-order', JSON.stringify(payload));
    clear();
    setTimeout(() => router.push('/order-success'), 700);
  };

  if (items.length === 0 && !placing) {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="Checkout" />
        <section className="py-20">
          <div className="mx-auto max-w-xl px-4 text-center">
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border/60 py-16">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/60" />
              <p className="font-display text-xl font-semibold">
                Your cart is empty
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Browse Menu <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Almost there"
        description="Review your order and delivery details. This is a demo — no payment is processed."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handlePlaceOrder}
            className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12"
          >
            {/* Form fields */}
            <div className="space-y-6">
              <FormCard title="Delivery details" step={1}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Alex Morgan"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone" required>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+1 (415) 555-0192"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Street address" required className="sm:col-span-2">
                    <input
                      required
                      value={form.address}
                      onChange={(e) => update('address', e.target.value)}
                      placeholder="318 Mission Street, Apt 4B"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="City" required>
                    <input
                      required
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder="San Francisco"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="ZIP code" required>
                    <input
                      required
                      value={form.zip}
                      onChange={(e) => update('zip', e.target.value)}
                      placeholder="94105"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Delivery notes" className="sm:col-span-2">
                    <textarea
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      placeholder="Leave at door, ring bell, etc."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                </div>
              </FormCard>

              <FormCard title="Payment method" step={2}>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayment(m.id)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all',
                        payment === m.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40'
                      )}
                    >
                      <m.icon className="h-6 w-6" />
                      <span className="text-xs font-semibold">{m.label}</span>
                      {payment === m.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                {payment === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 grid gap-4 sm:grid-cols-2"
                  >
                    <Field label="Card number" className="sm:col-span-2">
                      <input
                        placeholder="4242 4242 4242 4242"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Expiry">
                      <input placeholder="MM / YY" className={inputClass} />
                    </Field>
                    <Field label="CVC">
                      <input placeholder="123" className={inputClass} />
                    </Field>
                  </motion.div>
                )}
                <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  Demo only — do not enter real card details.
                </p>
              </FormCard>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-semibold">
                  Order summary
                </h3>

                <div className="mt-4 max-h-64 space-y-3 overflow-y-auto chat-scroll pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                      <span className="text-sm font-semibold tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2.5 border-t border-border/60 pt-5 text-sm">
                  <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
                  <Row label="Tax" value={formatPrice(totals.tax)} />
                  <Row
                    label="Delivery"
                    value={
                      totals.delivery === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        formatPrice(totals.delivery)
                      )
                    }
                  />
                  <div className="my-2 h-px bg-border/60" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-semibold">
                      Total
                    </span>
                    <span className="font-display text-2xl font-bold tabular-nums text-primary">
                      {formatPrice(totals.total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={placing}
                  className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 disabled:opacity-70"
                >
                  {placing ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
                      />
                      Placing order...
                    </>
                  ) : (
                    <>
                      Place order
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <Link
                  href="/cart"
                  className="mt-3 flex w-full items-center justify-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to cart
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

const inputClass =
  'h-11 w-full rounded-xl border border-border/70 bg-card/50 px-3.5 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20';

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn('block space-y-1.5', className)}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}

function FormCard({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-sm font-bold text-primary">
          {step}
        </span>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="font-medium tabular-nums text-foreground">{value}</span>
    </div>
  );
}
