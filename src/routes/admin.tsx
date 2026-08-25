import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardShell, StatCard } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { courses, resources } from "@/lib/site-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Arabiyat Learning" },
      { name: "description", content: "Manage Arabic courses, lessons, students and free resources." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Panel — Arabiyat Learning" },
      { property: "og:description", content: "Teacher tools for courses, students and resources." },
    ],
  }),
  component: AdminPanel,
});

const students = [
  { parent: "Sara Ahmed", child: "Amina", course: courses[0]?.title ?? "", status: "Active" },
  { parent: "Bilal Khan", child: "Yusuf", course: courses[1]?.title ?? "", status: "Active" },
  { parent: "Hana Ali", child: "Layla", course: courses[2]?.title ?? "", status: "Trial" },
];

function AdminPanel() {
  const revenue = courses.reduce((s, c) => s + c.price, 0);

  return (
    <DashboardShell
      title="Admin Panel"
      subtitle="Teacher tools for courses, students and resources."
      items={[
        { label: "Overview", active: true },
        { label: "Parent Dashboard", to: "/parent" },
        { label: "Student Dashboard", to: "/dashboard" },
        { label: "Public site", to: "/" },
        { label: "Sign out", to: "/login" },
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-4">
        <StatCard label="Courses" value={String(courses.length)} />
        <StatCard label="Students" value={String(students.length)} hint="Parent-linked accounts" />
        <StatCard label="Resources" value={String(resources.length)} />
        <StatCard label="Catalogue value" value={`$${revenue}`} />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-primary">Courses</h2>
        <Button
          className="rounded-xl bg-primary hover:bg-emerald"
          onClick={() =>
            toast("Course editor", {
              description: "Creating and editing courses saves permanently once the backend is connected.",
            })
          }
        >
          Add course
        </Button>
      </div>
      <div className="mt-5 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-cream/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Level</th>
              <th className="px-6 py-3">Lessons</th>
              <th className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.slug} className="border-t border-border/60">
                <td className="px-6 py-3 font-medium text-primary">{c.title}</td>
                <td className="px-6 py-3">{c.level}</td>
                <td className="px-6 py-3">{c.lessons}</td>
                <td className="px-6 py-3">${c.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 font-display text-xl font-bold text-primary">Students</h2>
      <div className="mt-5 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-cream/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Parent</th>
              <th className="px-6 py-3">Child</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.child} className="border-t border-border/60">
                <td className="px-6 py-3">{s.parent}</td>
                <td className="px-6 py-3">{s.child}</td>
                <td className="px-6 py-3">{s.course}</td>
                <td className="px-6 py-3">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
