'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  CalendarDays,
  Users,
} from 'lucide-react';
import { RESTAURANT } from '@/lib/data';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-success/30 bg-success/10 p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="font-display text-2xl font-semibold">Reservation requested!</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks, {form.name || 'friend'}. We&apos;ve received your request for{' '}
          {form.guests} guest{form.guests === '1' ? '' : 's'}
          {form.date && ` on ${form.date}`}
          {form.time && ` at ${form.time}`}. We&apos;ll confirm by email shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: '',
              email: '',
              phone: '',
              date: '',
              time: '',
              guests: '2',
              notes: '',
            });
          }}
          className="mt-2 rounded-xl border border-border/70 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40"
        >
          Make another reservation
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Field label="Email" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="alex@example.com"
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
        <Field label="Guests">
          <select
            value={form.guests}
            onChange={(e) => update('guests', e.target.value)}
            className={inputClass}
          >
            {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => (
              <option key={n} value={n} className="bg-card">
                {n} {n === '1' ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Date" required>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Time" required>
          <input
            type="time"
            required
            value={form.time}
            onChange={(e) => update('time', e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Special requests">
        <textarea
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Window seat, birthday celebration, dietary needs..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </Field>
      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
      >
        <CalendarDays className="h-4 w-4" />
        Request reservation
      </button>
      <p className="text-center text-xs text-muted-foreground">
        This is a demo form — no reservation is actually booked.
      </p>
    </form>
  );
}

const inputClass =
  'h-11 w-full rounded-xl border border-border/70 bg-card/50 px-3.5 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function ContactInfo() {
  const info = [
    {
      icon: MapPin,
      label: 'Address',
      value: RESTAURANT.address,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: RESTAURANT.phone,
      href: `tel:${RESTAURANT.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: RESTAURANT.email,
      href: `mailto:${RESTAURANT.email}`,
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="space-y-4"
    >
      {info.map((item) => (
        <motion.div
          key={item.label}
          variants={staggerItem}
          whileHover={{ y: -2 }}
          className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <item.icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {item.label}
            </p>
            {item.href ? (
              <a
                href={item.href}
                className="mt-0.5 block font-medium transition-colors hover:text-primary"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-0.5 font-medium">{item.value}</p>
            )}
          </div>
        </motion.div>
      ))}

      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Opening hours
          </p>
        </div>
        <ul className="mt-3 space-y-2">
          {RESTAURANT.hours.map((h) => (
            <li
              key={h.day}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">{h.day}</span>
              <span className="font-medium tabular-nums">{h.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
