import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, Clock, Globe, Lock, PlayCircle, Star, BadgeCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchCourseBySlug, thumbFor } from "@/lib/db";

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Arabic Course — Arabiyat Learn` },
      { name: "description", content: `Recorded Arabic lessons for children: ${params.slug.replace(/-/g, " ")}.` },
      { property: "og:title", content: `Arabic Course — Arabiyat Learn` },
      { property: "og:description", content: "Recorded Arabic courses for English-speaking children." },
    ],
  }),
  component: CourseDetail,
});

function CourseDetail() {
  const { slug } = Route.useParams();
  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetchCourseBySlug(slug),
  });

  if (isLoading) {
    return (
      <SiteLayout>
        <p className="py-24 text-center text-muted-foreground">Loading course…</p>
      </SiteLayout>
    );
  }

  if (!course) {
    return (
      <SiteLayout>
        <div className="py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-primary">Course not found</h1>
          <Button asChild className="mt-6 rounded-xl bg-primary hover:bg-emerald">
            <Link to="/courses">Browse all courses</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const lessonCount = course.modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <SiteLayout>
      <section className="gradient-hero border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald">{course.level} course</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-primary md:text-5xl">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">{course.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-foreground/85">
              <span className="flex items-center gap-1 text-gold">
                <Star className="h-4 w-4 fill-current" /> {course.rating}
              </span>
              <span className="flex items-center gap-1">
                <PlayCircle className="h-4 w-4" /> {lessonCount} lessons
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-4 w-4" /> {course.language}
              </span>
            </div>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-card">
            <img
              src={thumbFor(course.thumbnail_key)}
              alt={course.title}
              loading="lazy"
              width={1200}
              height={800}
              className="h-44 w-full rounded-2xl object-cover"
            />
            <p className="mt-5 font-display text-3xl font-bold text-primary">${course.price}</p>
            <p className="text-xs text-muted-foreground">One-time payment · lifetime access</p>
            <Button asChild size="lg" className="mt-5 w-full rounded-xl bg-primary hover:bg-emerald">
              <Link to="/checkout/$slug" params={{ slug: course.slug }}>
                Enroll Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="mt-3 w-full rounded-xl">
              <Link to="/learn/$slug" params={{ slug: course.slug }}>
                Watch Free Lesson
              </Link>
            </Button>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald" /> Taught by {course.teacher}
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald" /> Replay lessons anytime
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald" /> Parent progress tracking
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary">What You'll Learn</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {course.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 rounded-2xl bg-secondary/60 p-4 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" /> {o}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-2xl font-bold text-primary">Course Curriculum</h2>
          <Accordion type="multiple" className="mt-5">
            {course.modules.map((m) => (
              <AccordionItem key={m.id} value={m.id} className="mb-3 rounded-2xl border border-border/70 bg-card px-5">
                <AccordionTrigger className="font-display text-base font-semibold text-primary hover:no-underline">
                  {m.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {m.lessons.map((l) => (
                      <li key={l.id} className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 px-4 py-3">
                        <span className="flex items-center gap-2 text-sm">
                          {l.is_free ? (
                            <PlayCircle className="h-4 w-4 text-emerald" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                          {l.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{l.is_free ? "Free" : l.duration}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="h-fit rounded-3xl border border-border/70 bg-cream/50 p-7">
          <h2 className="font-display text-xl font-bold text-primary">About the Teacher</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {course.teacher} teaches Arabic to children in a simple, friendly and practical way, with English support
            throughout so young learners never feel lost.
          </p>
          <Button asChild variant="outline" className="mt-5 rounded-xl">
            <Link to="/about">Meet the Teacher</Link>
          </Button>
        </aside>
      </div>
    </SiteLayout>
  );
}
