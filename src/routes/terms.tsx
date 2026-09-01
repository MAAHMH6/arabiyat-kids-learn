import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Arabiyat Learn" },
      { name: "description", content: "Terms of use for Arabiyat Learn recorded Arabic courses." },
      { property: "og:title", content: "Terms & Conditions — Arabiyat Learn" },
      { property: "og:description", content: "Course access, payments and acceptable use." },
    ],
  }),
  component: Terms,
});

const sections = [
  { h: "Course access", p: "Enrolled courses include lifetime access for the enrolling household. Access is personal and non-transferable." },
  { h: "Payments", p: "Course fees are charged once at enrollment through our payment provider. Prices are shown in US dollars." },
  { h: "Refunds", p: "If a course is not right for your child, contact us within 14 days of enrollment and we will review your request." },
  { h: "Content ownership", p: "All lesson videos, worksheets and materials remain the property of Arabiyat Learn. Sharing, downloading for redistribution or reselling is not permitted." },
  { h: "Acceptable use", p: "Accounts must be supervised by a parent or guardian. Accounts found sharing course content may be suspended." },
];

function Terms() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Terms" title="Terms & Conditions" subtitle="The simple rules that keep our courses fair for every family." />
      <article className="mx-auto max-w-3xl space-y-8 px-4 py-16">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-xl font-bold text-primary">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
        <p className="text-xs text-muted-foreground">
          These terms are a starting template and should be reviewed before launch.
        </p>
      </article>
    </SiteLayout>
  );
}
