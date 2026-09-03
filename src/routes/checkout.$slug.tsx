import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Lock, PartyPopper, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { createEnrollment, fetchCourseBySlug, thumbFor } from "@/lib/db";

export const Route = createFileRoute("/checkout/$slug")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Checkout — Arabiyat Learn" },
      { name: "description", content: "Secure enrollment for your child's Arabic course." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Checkout — Arabiyat Learn" },
      { property: "og:description", content: "Complete your child's course enrollment." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  parentName: z.string().trim().min(1, "Parent name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
});

function Checkout() {
  const { slug } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetchCourseBySlug(slug),
  });

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (isLoading) {
    return (
      <SiteLayout>
        <p className="mx-auto max-w-xl px-4 py-24 text-center text-muted-foreground">Loading course…</p>
      </SiteLayout>
    );
  }

  if (!course) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-primary">Course not found</h1>
          <Button asChild className="mt-6 rounded-xl bg-primary hover:bg-emerald">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </section>
      </SiteLayout>
    );
  }

  const lessonCount = course.modules.reduce((n, m) => n + m.lessons.length, 0);

  if (done) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-xl px-4 py-24 text-center">
          <PartyPopper className="mx-auto h-10 w-10 text-gold" />
          <h1 className="mt-5 font-display text-3xl font-bold text-primary">🎉 You're Enrolled!</h1>
          <p className="mt-3 text-muted-foreground">Your Arabic learning journey starts now.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-emerald">
              <Link to="/learn/$slug" params={{ slug: course.slug }}>
                Go to My Course
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link to="/dashboard">My Dashboard</Link>
            </Button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Complete Your Enrollment</h1>
          <div className="mt-6 flex gap-4 rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
            <img
              src={thumbFor(course.thumbnail_key)}
              alt={course.title}
              loading="lazy"
              width={1200}
              height={800}
              className="h-24 w-32 rounded-2xl object-cover"
            />
            <div>
              <h2 className="font-display text-lg font-bold text-primary">{course.title}</h2>
              <p className="text-xs text-muted-foreground">
                {lessonCount} lessons · {course.duration} · {course.language}
              </p>
              <p className="mt-2 text-sm font-semibold text-primary">${Number(course.price)}</p>
            </div>
          </div>

          <form
            className="mt-8 space-y-5 rounded-3xl border border-border/70 bg-card p-7 shadow-soft"
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const parsed = schema.safeParse({
                parentName: String(fd.get("parentName") ?? ""),
                email: String(fd.get("email") ?? ""),
              });
              if (!parsed.success) {
                const next: Record<string, string> = {};
                for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
                setErrors(next);
                return;
              }
              setErrors({});
              if (!user) {
                void navigate({ to: "/login" });
                return;
              }
              setSaving(true);
              try {
                await createEnrollment(user.id, course.id);
                setDone(true);
              } catch (err) {
                toast.error("Could not complete enrollment", {
                  description: err instanceof Error ? err.message : "Please try again.",
                });
              } finally {
                setSaving(false);
              }
            }}
          >
            <div>
              <Label htmlFor="parentName">Parent / guardian name</Label>
              <Input id="parentName" name="parentName" className="mt-2 rounded-xl" placeholder="Your name" />
              {errors['parentName'] && <p className="mt-1 text-xs text-destructive">{errors['parentName']}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email ?? ""}
                className="mt-2 rounded-xl"
                placeholder="you@example.com"
              />
              {errors['email'] && <p className="mt-1 text-xs text-destructive">{errors['email']}</p>}
            </div>
            <div className="rounded-2xl border border-dashed border-border bg-secondary/50 p-5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2 font-medium text-primary">
                <Lock className="h-4 w-4" /> Payment details
              </p>
              <p className="mt-2">
                Card payment fields appear here once a payment provider is connected. No card details are collected or
                processed yet.
              </p>
            </div>
            <Button type="submit" size="lg" disabled={saving} className="w-full rounded-xl bg-primary hover:bg-emerald">
              {saving ? "Enrolling…" : "Complete Enrollment"}
            </Button>
          </form>
        </div>

        <aside className="h-fit rounded-3xl border border-border/70 bg-cream/60 p-7">
          <h2 className="font-display text-xl font-bold text-primary">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{course.title}</dt>
              <dd className="font-medium">${Number(course.price)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Lifetime access</dt>
              <dd className="font-medium">Included</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-lg font-bold text-primary">
              <dt>Total</dt>
              <dd>${Number(course.price)}</dd>
            </div>
          </dl>
          <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
            Enrollments are parent-managed. We never collect unnecessary information about children.
          </p>
        </aside>
      </div>
    </SiteLayout>
  );
}
