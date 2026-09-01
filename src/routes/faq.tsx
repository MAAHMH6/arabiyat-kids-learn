import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Arabiyat Learn" },
      {
        name: "description",
        content: "Answers about ages, levels, recorded lessons, replays, English support and parent progress tracking.",
      },
      { property: "og:title", content: "FAQ — Arabiyat Learn" },
      { property: "og:description", content: "Common questions from parents about our Arabic courses for kids." },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="FAQ" title="Questions Parents Ask" subtitle="Everything you need to know before enrolling." />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Accordion type="single" collapsible defaultValue="q0">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="mb-3 rounded-2xl border border-border/70 bg-card px-6">
              <AccordionTrigger className="text-left font-display text-base font-semibold text-primary hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 rounded-3xl bg-cream/70 p-8 text-center">
          <p className="text-sm text-muted-foreground">Still have a question?</p>
          <Button asChild className="mt-4 rounded-xl bg-primary hover:bg-emerald">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
