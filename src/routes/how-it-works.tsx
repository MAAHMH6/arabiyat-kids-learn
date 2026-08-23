import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader, SectionHeading } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { howItWorks, parentReasons } from "@/lib/site-data";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Arabiyat Learning" },
      {
        name: "description",
        content: "Choose a course, enroll securely, watch recorded Arabic lessons and learn at your own pace.",
      },
      { property: "og:title", content: "How It Works — Arabiyat Learning" },
      { property: "og:description", content: "Four simple steps to start your child's Arabic journey." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="How It Works"
        title="Start Learning in Four Simple Steps"
        subtitle="No timetables, no pressure — just clear lessons your child can watch whenever it suits your family."
      />
      <section className="mx-auto max-w-5xl px-4 py-16">
        <ol className="space-y-6">
          {howItWorks.map((s) => (
            <li key={s.step} className="flex gap-5 rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary font-display font-bold text-primary-foreground">
                {s.step}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-cream/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Why Parents Choose Us" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parentReasons.map((r) => (
              <div key={r.title} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
                <span className="text-2xl">{r.emoji}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="gradient-pink rounded-xl text-primary-foreground hover:opacity-90">
              <Link to="/courses">Start Learning Arabic</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
