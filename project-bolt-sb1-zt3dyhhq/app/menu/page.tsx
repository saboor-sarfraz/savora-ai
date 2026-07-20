import { PageHeader } from '@/components/site/page-header';
import { MenuGrid } from '@/components/site/menu-grid';
import { Sparkles } from 'lucide-react';

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our menu"
        title={
          <>
            Every dish, <span className="text-gradient-brand">one chat away</span>
          </>
        }
        description="Browse the full menu, filter by craving, or let Savora AI pick for you. Add to cart with a tap — the assistant can manage it all in conversation."
      >
        <MenuCallout />
      </PageHeader>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MenuGrid />
        </div>
      </section>
    </>
  );
}

function MenuCallout() {
  // Server component — keep it presentational. Chat opens client-side via the widget.
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <Sparkles className="h-4 w-4" />
      </span>
      <p className="text-sm">
        <span className="font-semibold">Not sure what to order?</span>{' '}
        <span className="text-muted-foreground">
          Tap &ldquo;Chat with AI&rdquo; in the corner and describe your craving.
        </span>
      </p>
    </div>
  );
}
