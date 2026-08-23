import { Star } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import { SectionHeading } from "./SiteLayout";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading title="What Families Say" subtitle="Placeholder content — real parent reviews will replace these." />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.text} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.text}"</blockquote>
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              — {t.author} · placeholder
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
