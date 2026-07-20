import { MapPin, Navigation } from 'lucide-react';
import { PageHeader } from '@/components/site/page-header';
import { SectionHeading } from '@/components/site/section-heading';
import {
  ReservationForm,
  ContactInfo,
} from '@/components/site/contact-sections';
import { RESTAURANT } from '@/lib/data';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title={
          <>
            Come say <span className="text-gradient-brand">hello</span>
          </>
        }
        description="Questions, catering, or just want to reserve a table? We're here seven days a week — and Savora AI is always one chat away."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            {/* Info + map */}
            <div className="space-y-6">
              <ContactInfo />

              {/* Map placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card/40">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-card/60" />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(120,120,120,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(120,120,120,0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Fake roads */}
                <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 bg-muted/30" />
                <div className="absolute bottom-1/3 left-0 right-1/3 h-1.5 bg-muted/20" />
                <div className="absolute bottom-0 left-1/2 top-0 w-2 bg-muted/30" />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl">
                      <MapPin className="h-6 w-6" />
                    </span>
                  </div>
                </div>

                <div className="glass-strong absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl p-3">
                  <div>
                    <p className="text-sm font-semibold">Savora HQ</p>
                    <p className="text-xs text-muted-foreground">
                      {RESTAURANT.address}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                    <Navigation className="h-3.5 w-3.5" />
                    Directions
                  </span>
                </div>
              </div>
            </div>

            {/* Reservation form */}
            <div id="reserve">
              <SectionHeading
                eyebrow="Reserve a table"
                title="Book your spot"
                description="Walk-ins welcome, but reservations guarantee your table. We'll confirm by email within the hour."
              />
              <div className="mt-6 rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
                <ReservationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
