import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlayCircle } from "lucide-react";
import { DashboardShell, ProgressBar, StatCard } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { fetchMyEnrollments, thumbFor } from "@/lib/db";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Student Dashboard — Arabiyat Learn" },
      { name: "description", content: "Continue your Arabic lessons, track progress and practise new words." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Student Dashboard — Arabiyat Learn" },
      { property: "og:description", content: "Continue lessons and track Arabic learning progress." },
    ],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const { data: enrolled = [], isLoading } = useQuery({
    queryKey: ["my-enrollments", user?.id],
    queryFn: () => fetchMyEnrollments(user!.id),
    enabled: Boolean(user),
  });

  const completed = enrolled.reduce((n, e) => n + e.completedLessons, 0);

  return (
    <DashboardShell
      title="Welcome back!"
      subtitle="Keep going — you are learning a little every day."
      items={[
        { label: "My Learning", active: true },
        { label: "Parent Dashboard", to: "/parent" },
        { label: "Browse Courses", to: "/courses" },
        { label: "Free Resources", to: "/resources" },
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Courses enrolled" value={String(enrolled.length)} hint="Your active courses" />
        <StatCard label="Lessons completed" value={String(completed)} hint="Keep the streak going" />
        <StatCard
          label="Average progress"
          value={`${enrolled.length ? Math.round(enrolled.reduce((n, e) => n + e.progress, 0) / enrolled.length) : 0}%`}
        />
      </div>

      <h2 className="mt-10 font-display text-xl font-bold text-primary">Continue learning</h2>
      {isLoading ? (
        <p className="mt-5 text-sm text-muted-foreground">Loading your courses…</p>
      ) : enrolled.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">You are not enrolled in any course yet.</p>
          <Button asChild className="mt-5 rounded-xl bg-primary hover:bg-emerald">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {enrolled.map(({ course, progress, totalLessons, completedLessons }) => (
            <div key={course.id} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="flex gap-4">
                <img
                  src={thumbFor(course.thumbnail_key)}
                  alt={course.title}
                  loading="lazy"
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display font-bold text-primary">{course.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {completedLessons}/{totalLessons} lessons · {course.duration}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <ProgressBar value={progress} />
                <p className="mt-2 text-xs text-muted-foreground">{progress}% complete</p>
              </div>
              <Button asChild className="mt-5 w-full rounded-xl bg-primary hover:bg-emerald">
                <Link to="/learn/$slug" params={{ slug: course.slug }}>
                  <PlayCircle className="mr-2 h-4 w-4" /> Continue
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}

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
