import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, ProgressBar, StatCard } from "@/components/site/DashboardShell";
import { courses } from "@/lib/site-data";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard — Arabiyat Learn" },
      { name: "description", content: "Follow your child's Arabic progress, enrolments and payment history." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Parent Dashboard — Arabiyat Learn" },
      { property: "og:description", content: "Track enrolments, lesson progress and receipts in one place." },
    ],
  }),
  component: ParentDashboard,
});

const children = [
  { name: "Amina", age: 8, progress: 65, lessons: 18 },
  { name: "Yusuf", age: 6, progress: 24, lessons: 6 },
];

const payments = [
  { date: "12 Aug 2026", item: courses[0]?.title ?? "Arabic course", amount: courses[0]?.price ?? 0 },
  { date: "02 Jul 2026", item: courses[1]?.title ?? "Arabic course", amount: courses[1]?.price ?? 0 },
];

function ParentDashboard() {
  return (
    <DashboardShell
      title="Parent Dashboard"
      subtitle="A calm overview of your children's Arabic learning."
      items={[
        { label: "Overview", active: true },
        { label: "My Learning", to: "/dashboard" },
        { label: "Browse Courses", to: "/courses" },
        { label: "Contact Teacher", to: "/contact" },
        { label: "Sign out", to: "/login" },
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Children" value="2" hint="Linked to this account" />
        <StatCard label="Active enrolments" value="3" hint="Beginner and speaking" />
        <StatCard label="Spent this year" value={`$${payments.reduce((s, p) => s + p.amount, 0)}`} />
      </div>

      <h2 className="mt-10 font-display text-xl font-bold text-primary">Children's progress</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {children.map((c) => (
          <div key={c.name} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <p className="font-display text-lg font-bold text-primary">{c.name}</p>
            <p className="text-xs text-muted-foreground">Age {c.age} · {c.lessons} lessons completed</p>
            <div className="mt-5">
              <ProgressBar value={c.progress} />
              <p className="mt-2 text-xs text-muted-foreground">{c.progress}% of current course</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-display text-xl font-bold text-primary">Payment history</h2>
      <div className="mt-5 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-cream/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.date} className="border-t border-border/60">
                <td className="px-6 py-3">{p.date}</td>
                <td className="px-6 py-3">{p.item}</td>
                <td className="px-6 py-3">${p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
