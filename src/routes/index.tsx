import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  PlayCircle,
  Smile,
  Clock,
  BookOpen,
  Baby,
  Star,
  Type,
  Hash,
  MessageCircle,
  Volume2,
  Users,
  Check,
} from "lucide-react";
import { SiteLayout, SectionHeading } from "@/components/site/SiteLayout";
import { CourseCard } from "@/components/site/CourseCard";
import { Testimonials } from "@/components/site/Testimonials";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { Button } from "@/components/ui/button";
import { courses, howItWorks, learningTopics, parentReasons } from "@/lib/site-data";
import heroImage from "@/assets/hero-classroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arabiyat Learning — Arabic Made Simple for Kids" },
      {
        name: "description",
        content:
          "Fun, practical recorded Arabic courses for English-speaking children. Letters, numbers, vocabulary, pronunciation and speaking, taught step by step.",
      },
      { property: "og:title", content: "Arabiyat Learning — Arabic Made Simple for Kids" },
      {
        property: "og:description",
        content: "Recorded Arabic lessons for English-speaking children. Learn • Speak • Grow.",
      },
    ],
  }),
  component: Home,
});

const topicIcons = { letters: Type, numbers: Hash, book: BookOpen, speak: MessageCircle, sound: Volume2, kids: Users };

function Home() {
  const featured = courses.find((c) => c.featured)!;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="gradient-hero overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full bg-pink-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Welcome to Arabiyat Learning
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-primary md:text-6xl">
              Arabic Made <br className="hidden md:block" />
              Simple for <span className="text-pink">Kids</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Fun, practical Arabic lessons designed to help English-speaking children learn Arabic, understand
              everyday words, speak confidently, and build a strong foundation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-emerald">
                <Link to="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary/25 bg-card">
                <a href="#free-lesson">
                  Watch Free Lesson <PlayCircle className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Smile, label: "Beginner Friendly" },
                { icon: Clock, label: "Learn at Your Own Pace" },
                { icon: BookOpen, label: "English Supported" },
                { icon: Baby, label: "Made for Kids" },
              ].map((t) => (
                <li key={t.label} className="flex items-center gap-2 rounded-2xl bg-card/80 px-3 py-2.5 shadow-soft">
                  <t.icon className="h-4 w-4 shrink-0 text-emerald" />
                  <span className="text-xs font-medium text-foreground/85">{t.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-fade-up">
            <img
              src={heroImage}
              alt="Arabic teacher in hijab teaching children Arabic letters in a warm classroom"
              width={1408}
              height={1008}
              className="w-full rounded-4xl border border-border/60 object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title="Learn Arabic Step by Step" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {learningTopics.map((t) => {
            const Icon = topicIcons[t.icon as keyof typeof topicIcons];
            return (
              <div key={t.title} className="card-lift rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-soft text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-primary">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured course */}
      <section className="bg-cream/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 overflow-hidden rounded-4xl border border-border/70 bg-card p-6 shadow-card md:grid-cols-2 md:p-10">
            <img
              src={featured.thumbnail}
              alt={featured.title}
              loading="lazy"
              width={1200}
              height={800}
              className="h-full w-full rounded-3xl object-cover"
            />
            <div>
              <span className="rounded-full bg-pink px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                {featured.tagline}
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-primary">{featured.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{featured.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Teacher", featured.teacher],
                  ["Lessons", `${featured.lessons} lessons`],
                  ["Duration", featured.duration],
                  ["Level", featured.level],
                  ["Language", featured.language],
                  ["Access", "Lifetime access"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-secondary/70 px-3 py-2">
                    <dt className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">{k}</dt>
                    <dd className="font-medium text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex items-center gap-5">
                <span className="font-display text-3xl font-bold text-primary">${featured.price}</span>
                <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-emerald">
                  <Link to="/courses/$slug" params={{ slug: featured.slug }}>
                    View Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title="How It Works" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((s) => (
            <div key={s.step} className="rounded-3xl border border-border/70 bg-card p-7 text-center shadow-soft">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="gradient-pink rounded-xl text-primary-foreground hover:opacity-90">
            <Link to="/courses">Start Learning Arabic</Link>
          </Button>
        </div>
      </section>

      {/* Why parents */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Learning Arabic Should Feel Simple.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parentReasons.map((r) => (
              <div key={r.title} className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-7">
                <span className="text-2xl">{r.emoji}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/80">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular courses */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title="Popular Courses" subtitle="Recorded lessons your child can watch anytime." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-xl border-primary/25">
            <Link to="/courses">See All Courses</Link>
          </Button>
        </div>
      </section>

      {/* Free lesson */}
      <section id="free-lesson" className="bg-cream/60 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <VideoPlayer
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            title="Introduction to Arabic"
          />
          <div>
            <SectionHeading title="Try a Free Arabic Lesson" />
            <h3 className="font-display text-xl font-bold text-primary">Lesson 1 — Introduction to Arabic</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Watch a full sample lesson before you enroll. Your child will meet the teacher, hear their first Arabic
              words and see exactly how the lessons are taught.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/85">
              {["No account needed", "Watch as many times as you like", "English-supported explanations"].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald" /> {i}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-7 rounded-xl bg-primary hover:bg-emerald">
              <Link to="/courses/$slug" params={{ slug: featured.slug }}>
                Start the Full Course
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="gradient-teal rounded-4xl px-6 py-14 text-center text-primary-foreground shadow-card md:px-16">
          <Star className="mx-auto h-6 w-6 text-gold" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Give Your Child the Gift of Arabic</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Start with simple lessons, build confidence, and make Arabic part of your child's everyday learning
            journey.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl bg-background text-primary hover:bg-cream">
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="#free-lesson">Try a Free Lesson</a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
