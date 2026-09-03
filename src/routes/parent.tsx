import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell, ProgressBar, StatCard } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { fetchMyEnrollments, fetchProfile } from "@/lib/db";

export const Route = createFileRoute("/parent")({
  ssr: false,
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

function ParentDashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const { data: enrolled = [] } = useQuery({
    queryKey: ["my-enrollments", user?.id],
    queryFn: () => fetchMyEnrollments(user!.id),
    enabled: Boolean(user),
  });
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: Boolean(user),
  });

  const spent = enrolled.reduce((s, e) => s + Number(e.course.price), 0);
  const lessons = enrolled.reduce((s, e) => s + e.completedLessons, 0);

  return (
    <DashboardShell
      title="Parent Dashboard"
      subtitle={
        profile?.child_name
          ? `A calm overview of ${profile.child_name}'s Arabic learning.`
          : "A calm overview of your child's Arabic learning."
      }
      items={[
        { label: "Overview", active: true },
        { label: "My Learning", to: "/dashboard" },
        { label: "Browse Courses", to: "/courses" },
        { label: "Contact Teacher", to: "/contact" },
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Child" value={profile?.child_name ?? "—"} hint="Linked to this account" />
        <StatCard label="Active enrolments" value={String(enrolled.length)} hint="Courses in progress" />
        <StatCard label="Total spent" value={`$${spent}`} hint={`${lessons} lessons completed`} />
      </div>

      <h2 className="mt-10 font-display text-xl font-bold text-primary">Course progress</h2>
      {enrolled.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">No enrolments yet.</p>
          <Button asChild className="mt-5 rounded-xl bg-primary hover:bg-emerald">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {enrolled.map((e) => (
            <div key={e.course.id} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <p className="font-display text-lg font-bold text-primary">{e.course.title}</p>
              <p className="text-xs text-muted-foreground">
                {e.completedLessons} of {e.totalLessons} lessons completed
              </p>
              <div className="mt-5">
                <ProgressBar value={e.progress} />
                <p className="mt-2 text-xs text-muted-foreground">{e.progress}% of current course</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 font-display text-xl font-bold text-primary">Enrolment history</h2>
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
            {enrolled.length === 0 ? (
              <tr>
                <td className="px-6 py-4 text-muted-foreground" colSpan={3}>
                  No payments yet.
                </td>
              </tr>
            ) : (
              enrolled.map((e) => (
                <tr key={e.course.id} className="border-t border-border/60">
                  <td className="px-6 py-3">{new Date(e.enrolledAt).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{e.course.title}</td>
                  <td className="px-6 py-3">${Number(e.course.price)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Button
        variant="outline"
        className="mt-10 rounded-xl"
        onClick={async () => {
          await signOut();
          void navigate({ to: "/login" });
        }}
      >
        Sign out
      </Button>
    </DashboardShell>
  );
}
