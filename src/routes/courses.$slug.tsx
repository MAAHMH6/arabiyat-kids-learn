import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, Clock, Globe, Lock, PlayCircle, Star, BadgeCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/site/Breadcrumb";
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
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://arabiyatlearn.com/courses/${params.slug}` },
      { property: "og:image", content: "https://arabiyatlearn.com/arabiyat-logo.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `https://arabiyatlearn.com/courses/${params.slug}` }],
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

  // Course JSON-LD schema
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `https://www.arabiyatlearn.com/courses/${course.slug}`,
    image: "https://www.arabiyatlearn.com/arabiyat-logo.png",
    provider: {
      "@type": "Organization",
      name: "ArabiyatLearn",
      sameAs: "https://www.arabiyatlearn.com",
    },
    courseMode: "online",
    educationalLevel: course.level,
    inLanguage: "en-GB",
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "GBP",
      url: `https://www.arabiyatlearn.com/courses/${course.slug}`,
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: {
        "@type": "Person",
        name: course.teacher ?? "Ustadha ArabiyatLearn",
        jobTitle: "Certified Arabic Teacher",
      },
    },
  };

  return (
    <SiteLayout>
      {/* Course schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />

      {/* Breadcrumb: Home > Courses > [Course Title] */}
      <Breadcrumb
        items={[
          { label: "Courses", href: "/courses" },
          { label: course.title },
        ]}
      />

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
            <Button asChild size="lg" className="mt-5 w-full rounded-xl bg-primary hover:bg-emerald">
              <Link to="/checkout/$slug" params={{ slug: course.slug }}>
                Enroll in Cohort · ${course.price}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="mt-3 w-full rounded-xl border-2 border-primary/20 text-primary font-bold hover:bg-primary/5">
              <Link to="/contact">
                Book a Free Demo Class
              </Link>
            </Button>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground border-t border-border/50 pt-4">
              <li className="flex items-center gap-2 font-medium text-foreground/90">
                <BadgeCheck className="h-4 w-4 text-emerald shrink-0" /> Live Interactive Video Classes with {course.teacher}
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald shrink-0" /> Micro-Groups (Max 5 Kids) or 1-on-1
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald shrink-0" /> Weekly Audio Voice Note Corrections
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald shrink-0" /> Printable PDF Activity Sheets & Milestone Badge
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald shrink-0" /> Replay access for any missed lessons
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

          <div className="mt-8 border-t border-border/60 pt-6">
            <h3 className="font-display text-base font-bold text-primary">Need Placement Advice?</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Not sure if this level is right for your child? Book a free 25-minute assessment demo with our teacher.
            </p>
            <Button asChild className="mt-4 w-full rounded-xl bg-primary text-primary-foreground hover:bg-emerald text-xs font-bold">
              <Link to="/contact">Book Free Assessment</Link>
            </Button>
          </div>
        </aside>
      </div>

      {/* NEW RICH SECTION: Live Classroom Guarantee */}
      <section className="bg-sand/30 py-16 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl bg-card border border-border/70 p-8 md:p-12 shadow-soft">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <span className="text-2xl mb-2 inline-block">🎯</span>
                <h4 className="font-display text-lg font-bold text-primary">Small Class Guarantee</h4>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Never more than 5 students per cohort. Your child will never sit muted or ignored in a massive room.
                </p>
              </div>
              <div>
                <span className="text-2xl mb-2 inline-block">🔄</span>
                <h4 className="font-display text-lg font-bold text-primary">Hassle-Free Rescheduling</h4>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Illness or travel? Easily reschedule 1-on-1 classes or access full HD lesson recordings and teacher feedback.
                </p>
              </div>
              <div>
                <span className="text-2xl mb-2 inline-block">⭐</span>
                <h4 className="font-display text-lg font-bold text-primary">Weekly WhatsApp Feedback</h4>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Receive personalized voice notes from your teacher on your child's pronunciation progress every single week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
