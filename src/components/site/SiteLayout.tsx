import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="gradient-hero border-b border-border/60">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
        <span className="inline-block rounded-full bg-pink-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold text-primary md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <div className="mb-3 flex items-center justify-center gap-3 text-gold">
        <span className="h-px w-10 bg-gold/60" />
        <span className="text-lg">✦</span>
        <span className="h-px w-10 bg-gold/60" />
      </div>
      <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
