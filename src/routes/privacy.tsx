import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Arabiyat Learning" },
      { name: "description", content: "How Arabiyat Learning protects family and children's privacy." },
      { property: "og:title", content: "Privacy Policy — Arabiyat Learning" },
      { property: "og:description", content: "Our privacy commitments to parents and children." },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    h: "Parent-first accounts",
    p: "Accounts are created and managed by parents or guardians. We ask only for a child's first name so lessons feel personal, and we never require a child's date of birth, address, phone number or photograph.",
  },
  {
    h: "Information we collect",
    p: "Parent name, email address, course enrollments and lesson progress. Payment details are handled by our payment provider and are never stored on our servers.",
  },
  {
    h: "How we use information",
    p: "To provide course access, show learning progress in the parent dashboard, and send essential account or course emails. We do not sell personal information.",
  },
  {
    h: "Course content protection",
    p: "Lesson videos are hosted privately and are only accessible to enrolled accounts. Private video links are never published publicly.",
  },
  {
    h: "Your choices",
    p: "Parents may request access to, correction of, or deletion of their account data at any time by contacting us.",
  },
];

function Privacy() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Privacy" title="Privacy Policy" subtitle="Written with children's privacy as the priority." />
      <article className="mx-auto max-w-3xl space-y-8 px-4 py-16">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-xl font-bold text-primary">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
        <p className="text-xs text-muted-foreground">
          This policy is a starting template and should be reviewed before launch.
        </p>
      </article>
    </SiteLayout>
  );
}
