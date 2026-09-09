import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Check,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Clock,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { SiteLayout, PageHeader, SectionHeading } from "@/components/site/SiteLayout";
import { CourseCard } from "@/components/site/CourseCard";
import { Button } from "@/components/ui/button";
import { courseFilters } from "@/lib/site-data";
import { fetchCourses, fetchLessonCounts, thumbFor } from "@/lib/db";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Arabic Courses & Live Classes for Kids — ArabiyatLearn" },
      {
        name: "description",
        content:
          "Browse Arabic courses and live interactive classes for children: alphabet, numbers, vocabulary, speaking, reading, and beginner conversations.",
      },
      { property: "og:title", content: "Arabic Courses & Live Classes for Kids — ArabiyatLearn" },
      { property: "og:description", content: "Interactive Arabic courses for English-speaking children." },
    ],
  }),
  component: CoursesPage,
});

const inclusions = [
  {
    icon: GraduationCap,
    title: "Live Teacher-Led Sessions",
    desc: "Interactive live classes with Ustadha Arabiyat, with real-time pronunciation guidance and positive praise.",
  },
  {
    icon: BookOpen,
    title: "Printable Worksheets & Flashcards",
    desc: "Child-friendly, colorful PDF activity sheets, tracing guides, and vocabulary cards for home practice.",
  },
  {
    icon: Users,
    title: "Micro-Groups or 1-on-1",
    desc: "Never crowded. Max 4–5 students per group so your child speaks and gets direct teacher attention every class.",
  },
  {
    icon: Award,
    title: "Official Academy Certificate",
    desc: "Awarded upon successful course completion to celebrate your child's hard work and motivation.",
  },
  {
    icon: ShieldCheck,
    title: "WhatsApp Homework Support",
    desc: "Send audio recordings of your child reciting or speaking for gentle correction between classes.",
  },
  {
    icon: Clock,
    title: "Timezone-Friendly Batches",
    desc: "Weekly schedules tailored to families in the UK (GMT), USA & Canada (EST/PST), and GCC (GST).",
  },
];

const levelGuidelines = [
  {
    level: "Foundations (Level 1)",
    ages: "Ages 4 – 7",
    idealFor: "Children with zero or little Arabic background",
    topics: ["Arabic alphabet identification (28 letters)", "Letter sounds (Makharij phonetics)", "Numbers 1 to 10", "Basic greetings & colors"],
  },
  {
    level: "Building Words (Level 2)",
    ages: "Ages 7 – 10",
    idealFor: "Children who know the alphabet and want to read & speak",
    topics: ["Connecting letter shapes", "Reading short 2-3 letter words", "Everyday family & home words", "Simple everyday Du'as"],
  },
  {
    level: "Conversations & Fluency (Level 3)",
    ages: "Ages 9 – 14",
    idealFor: "Children wanting to hold real conversations & read Quran",
    topics: ["Forming full conversational sentences", "Expressing thoughts, questions & feelings", "Short Surah vocabulary breakdown", "Basic Arabic sentence patterns"],
  },
];

function CoursesPage() {
  const [filter, setFilter] = useState<string>("All");
  const { data, isLoading } = useQuery({ queryKey: ["courses"], queryFn: fetchCourses });
  const { data: counts } = useQuery({ queryKey: ["lesson-counts"], queryFn: fetchLessonCounts });

  const visible = (data ?? []).filter((c) => filter === "All" || c.category === filter || c.level === filter);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Course Catalog"
        title="Arabic Courses & Live Classes"
        subtitle="Designed specifically for English-speaking children to learn with love, patience and confidence."
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Filter Pills */}
        <div className="mb-9 flex flex-wrap justify-center gap-2">
          {courseFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground font-semibold"
                  : "border-border bg-card text-foreground/80 hover:border-primary/40",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <CourseCard
              key={c.slug}
              course={{
                slug: c.slug,
                title: c.title,
                description: c.description,
                thumbnail: thumbFor(c.thumbnail_key),
                level: c.level,
                price: Number(c.price),
                rating: Number(c.rating),
                duration: c.duration,
                lessons: counts?.[c.id] ?? 0,
              }}
            />
          ))}
        </div>

        {isLoading && <p className="py-16 text-center text-muted-foreground">Loading courses…</p>}
        {!isLoading && visible.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">No courses in this category yet.</p>
        )}
      </div>

      {/* NEW CONTENT SECTION 1: What is Included */}
      <section className="bg-cream/60 py-16 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="What's Included With Every Course"
            subtitle="Everything your child needs to stay motivated, supported, and confident."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-soft text-primary">
                  <item.icon className="h-5 w-5 text-pink" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW CONTENT SECTION 2: Course Level Placement Guide */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          title="How to Choose the Right Level"
          subtitle="We group children by age and previous exposure so no student feels overwhelmed or bored."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {levelGuidelines.map((guide) => (
            <div key={guide.level} className="rounded-3xl border border-border/70 bg-card p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink">{guide.level}</span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {guide.ages}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-primary">{guide.idealFor}</h3>
                <div className="mt-5 space-y-2 border-t border-border/60 pt-4">
                  <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">What they cover:</p>
                  {guide.topics.map((t) => (
                    <div key={t} className="flex items-start gap-2 text-xs text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-emerald shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button asChild className="mt-7 w-full rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold">
                <Link to="/contact">Book Demo for this Level</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* NEW CONTENT SECTION 3: Book Demo CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-4xl gradient-teal p-8 md:p-14 text-center text-primary-foreground shadow-card">
          <Sparkles className="mx-auto h-7 w-7 text-gold" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Still Not Sure Which Level Fits?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/85">
            Book a complimentary 25-minute live demo. Ustadha Arabiyat will interact with your child, assess their current knowledge, and recommend the best path.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl bg-background text-primary hover:bg-cream font-semibold shadow-soft">
              <Link to="/contact">Book a Free Placement Demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd5a] font-semibold shadow-soft"
            >
              <a
                href="https://wa.me/923098444501?text=Hello%20Arabiyat%20Learn%2C%20I%20would%20like%20guidance%20on%20choosing%20the%20right%20course%20level%20for%20my%20child."
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4 fill-current" /> Ask on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
