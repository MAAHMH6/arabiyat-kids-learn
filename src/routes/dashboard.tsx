import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { DashboardShell, ProgressBar, StatCard } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/site-data";

export const Route = createFileRoute("/dashboard")({
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

const enrolled = courses.slice(0, 3).map((c, i) => ({ course: c, progress: [65, 30, 10][i] ?? 0 }));

function StudentDashboard() {
  return (
    <DashboardShell
      title="Welcome back, Amina!"
      subtitle="Keep going — you are learning a little every day."
      items={[
        { label: "My Learning", active: true },
        { label: "Parent Dashboard", to: "/parent" },
        { label: "Browse Courses", to: "/courses" },
        { label: "Free Resources", to: "/resources" },
        { label: "Sign out", to: "/login" },
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Courses enrolled" value="3" hint="Across beginner levels" />
        <StatCard label="Lessons completed" value="18" hint="Great streak this week" />
        <StatCard label="Words practised" value="126" hint="Arabic vocabulary" />
      </div>

      <h2 className="mt-10 font-display text-xl font-bold text-primary">Continue learning</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {enrolled.map(({ course, progress }) => (
          <div key={course.slug} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <div className="flex gap-4">
              <img src={course.thumbnail} alt={course.title} className="h-20 w-20 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="font-display font-bold text-primary">{course.title}</p>
                <p className="text-xs text-muted-foreground">{course.lessons} lessons · {course.duration}</p>
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
    </DashboardShell>
  );
}
