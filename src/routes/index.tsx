import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
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
  Calendar,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Heart,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { SiteLayout, SectionHeading } from "@/components/site/SiteLayout";
import { CourseCard } from "@/components/site/CourseCard";
import { Testimonials } from "@/components/site/Testimonials";
import { Button } from "@/components/ui/button";
import { howItWorks, learningTopics, parentReasons } from "@/lib/site-data";
import { fetchCourses, fetchLessonCounts, thumbFor } from "@/lib/db";
import heroImage from "@/assets/hero-classroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ArabiyatLearn — Arabic Made Simple for Kids" },
      {
        name: "description",
        content:
          "Live 1-on-1 and small group Arabic classes designed for English-speaking kids. Learn with patient certified teachers.",
      },
      { property: "og:title", content: "ArabiyatLearn — Arabic Made Simple for Kids" },
      { property: "og:description", content: "Interactive Arabic lessons made fun for children." },
    ],
  }),
  component: Home,
});

const topicIcons = { letters: Type, numbers: Hash, book: BookOpen, speak: MessageCircle, sound: Volume2, kids: Users };

function Home() {
  const { data: allCourses } = useQuery({ queryKey: ["courses"], queryFn: fetchCourses });
  const { data: counts } = useQuery({ queryKey: ["lesson-counts"], queryFn: fetchLessonCounts });
  const list = allCourses ?? [];
  const featured = list.find((c) => c.featured) ?? list[0];
  const featuredLessons = featured ? (counts?.[featured.id] ?? 0) : 0;

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="gradient-hero overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full bg-pink-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Welcome to ArabiyatLearn
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
              <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold shadow-soft">
                <Link to="/contact">
                  Book a Free Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary/25 bg-card text-primary font-medium hover:bg-secondary">
                <Link to="/courses">
                  Explore Courses
                </Link>
              </Button>
            </div>

            <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Smile, label: "Beginner Friendly" },
                { icon: Clock, label: "Learn at Your Own Pace" },
                { icon: BookOpen, label: "English Supported" },
                { icon: Baby, label: "Made for Kids" },
              ].map((t) => (
                <li key={t.label} className="flex items-center gap-2 rounded-2xl bg-card/80 px-3 py-2.5 shadow-soft border border-border/50">
                  <t.icon className="h-4 w-4 shrink-0 text-emerald" />
                  <span className="text-xs font-medium text-foreground/85">{t.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up">
            <div className="relative">
              <img
                src={heroImage}
                alt="Arabic teacher in hijab teaching children Arabic in a warm classroom"
                width={1408}
                height={1008}
                className="w-full rounded-4xl border border-border/60 object-cover shadow-card"
              />
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card p-4 shadow-card hidden sm:flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-soft text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Free 25-Min Demo</p>
                  <p className="text-[0.7rem] text-muted-foreground">Zero obligation · 1-on-1 trial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title="Learn Arabic Step by Step" subtitle="A structured step-by-step curriculum designed for young English-speaking minds." />
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
      {featured && (
        <section className="bg-cream/60 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-8 overflow-hidden rounded-4xl border border-border/70 bg-card p-6 shadow-card md:grid-cols-2 md:p-10">
              <img
                src={thumbFor(featured.thumbnail_key)}
                alt={featured.title}
                loading="lazy"
                width={1200}
                height={800}
                className="h-full w-full rounded-3xl object-cover"
              />
              <div>
                <span className="rounded-full bg-pink px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                  {featured.tagline || "BEST FOR BEGINNERS"}
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold text-primary">{featured.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{featured.description}</p>
                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Instructor", featured.teacher],
                    ["Modules", `${featuredLessons} interactive sessions`],
                    ["Format", "Live 1-on-1 or Small Group"],
                    ["Level", featured.level],
                    ["Language", featured.language],
                    ["Assessment", "Continuous feedback"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-secondary/70 px-3 py-2">
                      <dt className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">{k}</dt>
                      <dd className="font-medium text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <span className="font-display text-3xl font-bold text-primary">${Number(featured.price)}</span>
                  <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold">
                    <Link to="/contact">
                      Book a Free Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl">
                    <Link to="/courses/$slug" params={{ slug: featured.slug }}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title="How It Works" subtitle="A simple, reassuring process for busy parents." />
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
          <Button asChild size="lg" className="gradient-pink rounded-xl text-primary-foreground hover:opacity-90 font-semibold">
            <Link to="/contact">Book Your Child's Free Demo</Link>
          </Button>
        </div>
      </section>

      {/* Why parents trust us */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Learning Arabic Should Feel Simple.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-primary-foreground/80">
            We teach children living in Western and English-speaking environments with gentleness, clarity and patience.
          </p>
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
        <SectionHeading title="Popular Arabic Courses" subtitle="Small groups and individual 1-on-1 slots available every week." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 3).map((c) => (
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
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-xl border-primary/25">
            <Link to="/courses">View All Courses & Timings</Link>
          </Button>
        </div>
      </section>

      {/* SECTION: Minute-by-Minute Breakdown */}
      <section className="bg-cream/80 py-20 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-pink">
              Inside the Classroom
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
              Minute-by-Minute Class Breakdown
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              How our 30–45 minute live sessions keep young English-speaking children smiling, focused, and absorbing Arabic without fatigue.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { time: "00 – 05 min", phase: "Warm Salam & Check-in", desc: "Friendly icebreaker in English & Arabic. Ustadha checks how your child's day went to build trust and eliminate hesitation.", icon: Smile, color: "bg-pink-soft text-primary" },
              { time: "05 – 15 min", phase: "Whiteboard & Letters", desc: "Interactive letter games on the digital whiteboard. Matching sounds, tracing shapes, and joyful visual memory cues.", icon: Type, color: "bg-secondary text-primary" },
              { time: "15 – 25 min", phase: "Active Speaking Drills", desc: "Speaking out loud! Playful repetition and gentle phonetic guidance to lock in authentic Makharij pronunciation.", icon: Volume2, color: "bg-emerald/15 text-emerald" },
              { time: "25 – 35 min", phase: "Story & Vocabulary", desc: "Short animated story or flashcard dialogue introducing 3–5 high-frequency Arabic words in natural everyday context.", icon: BookOpen, color: "bg-gold/20 text-gold" },
              { time: "35 – 45 min", phase: "Stickers & Celebration", desc: "Digital star stickers, high-fives, recap of new words, and light fun practice for next lesson.", icon: Award, color: "bg-primary text-primary-foreground" },
            ].map((item, index) => (
              <div key={item.phase} className="card-lift relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-soft">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-mono text-pink">{item.time}</span>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${item.color}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-base text-primary">{item.phase}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50 text-[0.7rem] font-bold text-muted-foreground">
                  Phase {index + 1} of 5
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Why Children Learn Faster With Us - Using Hero Background Color */}
      <section className="gradient-hero py-20 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-pink">
              The Arabiyat Difference
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
              Why Children Learn Faster With Us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              Compare our interactive, child-centered approach with traditional weekend schools and recorded apps.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-border/80 bg-card shadow-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/70 text-xs font-bold uppercase tracking-wider text-primary">
                <tr>
                  <th className="px-6 py-4">Learning Feature</th>
                  <th className="bg-primary/10 px-6 py-4 text-primary">ArabiyatLearn (Live)</th>
                  <th className="px-6 py-4 text-muted-foreground">Traditional Madrassah</th>
                  <th className="px-6 py-4 text-muted-foreground">Pre-recorded Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
                {[
                  {
                    feature: "Dedicated English-fluent Female Teacher",
                    us: "Yes — 100% fluent & culturally relatable",
                    madrassah: "Rarely (often language barrier)",
                    apps: "No teacher (robot audio)",
                  },
                  {
                    feature: "Class Size",
                    us: "1-on-1 or Max 4–5 Students",
                    madrassah: "20–30 students per room",
                    apps: "Solo / Unsupervised",
                  },
                  {
                    feature: "Child-Centered Encouragement (No Shaming)",
                    us: "Strict positive-praise policy",
                    madrassah: "Varies (often intimidating)",
                    apps: "No human connection",
                  },
                  {
                    feature: "Live Pronunciation (Makharij) Correction",
                    us: "Instant, playful phonetic guidance",
                    madrassah: "Limited per-student attention",
                    apps: "No speech correction",
                  },
                  {
                    feature: "Weekly Parent Progress Updates",
                    us: "Direct WhatsApp & Dashboard reports",
                    madrassah: "Once or twice a year",
                    apps: "Generic automated metrics",
                  },
                  {
                    feature: "Flexible Timezone Scheduling",
                    us: "Tailored to UK, US, Canada & Gulf",
                    madrassah: "Fixed weekend mornings only",
                    apps: "Anytime (low completion rate)",
                  },
                ].map((row, idx) => (
                  <tr key={row.feature} className={idx % 2 === 0 ? "bg-background/50" : "bg-card"}>
                    <td className="px-6 py-4 font-semibold text-primary">{row.feature}</td>
                    <td className="bg-primary/5 px-6 py-4 font-bold text-emerald flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald" />
                      {row.us}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{row.madrassah}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.apps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Detailed 4-Level Curriculum Overview */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          title="The Complete Arabic Curriculum"
          subtitle="From zero knowledge to confident everyday speech and reading fluency."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              level: "Level 1",
              title: "Letters & Sounds",
              desc: "Recognition of all 28 Arabic letters, correct articulation (Makharij), and vowel markers (Fatha, Kasra, Damma).",
              badge: "Foundations",
              outcomes: ["Accurate letter sounds", "Recognizing beginning, middle & end shapes", "Basic counting 1 to 10"],
            },
            {
              level: "Level 2",
              title: "Everyday Vocabulary",
              desc: "Building a joyful mental word bank of familiar everyday nouns, adjectives, and Islamic expressions.",
              badge: "Vocabulary",
              outcomes: ["Family & home words", "Colors, food & animals", "Common Du'as & greetings"],
            },
            {
              level: "Level 3",
              title: "Speaking & Sentences",
              desc: "Putting words together into simple conversational sentences with guided micro-dialogues.",
              badge: "Speaking",
              outcomes: ["'My name is... / I want...'", "Asking polite questions", "Expressing likes & feelings"],
            },
            {
              level: "Level 4",
              title: "Reading & Quranic Fluency",
              desc: "Reading compound words, connected sentences, and understanding core Quranic roots for Salah.",
              badge: "Mastery",
              outcomes: ["Fluent word blending", "Understanding Short Surahs", "Reading confidence"],
            },
          ].map((lvl) => (
            <div key={lvl.level} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-pink">{lvl.level}</span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.7rem] font-semibold text-primary">
                    {lvl.badge}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-primary">{lvl.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{lvl.desc}</p>

                <div className="mt-5 space-y-2 border-t border-border/50 pt-4">
                  <p className="text-[0.7rem] font-bold uppercase tracking-wider text-primary/70">Key Milestones:</p>
                  {lvl.outcomes.map((o) => (
                    <div key={o} className="flex items-center gap-2 text-xs text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-emerald shrink-0" />
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="mt-6 w-full rounded-xl">
                <Link to="/contact">Book Demo for {lvl.level}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* NEW SECTION 3: Parent Safeguarding & Classroom Standards */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-primary-foreground/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                Safety & Peace of Mind
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Our Safe Classroom Standards
              </h2>
              <p className="mt-4 text-sm text-primary-foreground/85 leading-relaxed">
                As parents ourselves, we understand that entrusting your child's education to an online teacher requires
                total transparency, emotional safety, and respect for family values.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Parents are Always Welcome to Observe",
                    desc: "You can sit beside your child during any lesson or observe without prior notice.",
                  },
                  {
                    title: "Kind, Hijabi Female Arabic Educator",
                    desc: "A warm role model wearing Islamic dress who values modesty, adab (manners) and kindness.",
                  },
                  {
                    title: "Healthy Screen Time Sessions",
                    desc: "Lessons are designed in 30 to 45-minute focused bursts with interactive visuals to prevent eye fatigue.",
                  },
                  {
                    title: "Encouraging, Positive Discipline",
                    desc: "Never any scolding, raised voices, or shaming. Mistakes are celebrated as part of learning.",
                  },
                ].map((std) => (
                  <div key={std.title} className="flex items-start gap-3.5">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{std.title}</h3>
                      <p className="text-xs text-primary-foreground/75 mt-0.5">{std.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-primary-foreground/20 bg-primary-foreground/5 p-8 backdrop-blur shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-gold">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">100% Parent Satisfaction Guarantee</h3>
                  <p className="text-xs text-primary-foreground/75">Experience the class risk-free</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-primary-foreground/80">
                If after your trial and first week of classes your child does not feel comfortable and enthusiastic
                about Arabic, we will gladly refund your enrollment or adjust to 1-on-1 pacing without hassle.
              </p>
              <div className="mt-6">
                <Button asChild size="lg" className="w-full rounded-xl bg-background text-primary hover:bg-cream font-semibold">
                  <Link to="/contact">Claim Your Free Demo Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Demo Showcase */}
      <section id="book-demo" className="bg-cream/60 py-20 border-y border-border/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-card">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-pink">
              <Sparkles className="h-3.5 w-3.5" /> 100% Free Trial
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary">
              Experience a Real 1-on-1 Class First
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Every child is unique. Before enrolling in any course, meet Ustadha Arabiyat in a gentle 25-minute live trial class.
            </p>

            <ul className="mt-6 space-y-3.5 text-sm text-foreground/85">
              {[
                { title: "No Credit Card or Payment Required", desc: "Completely free, friendly initial meeting." },
                { title: "Personal Arabic Level Assessment", desc: "We find your child's exact comfort zone and starting level." },
                { title: "Interactive Digital Whiteboard", desc: "Children see colorful Arabic letter games and interactive visuals." },
                { title: "Flexible Schedule for Your Timezone", desc: "Classes scheduled to suit UK, US, Canada and Middle East timezones." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-primary">{item.title}</span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold">
                <Link to="/contact">
                  Book a Free Demo Class <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-border">
                <Link to="/how-it-works">
                  See How Classes Work
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-soft text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary">Dedicated Hijabi Arabic Teacher</h3>
                  <p className="text-xs text-muted-foreground">Certified educator with 10+ years teaching children</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary">Safe & Supportive Environment</h3>
                  <p className="text-xs text-muted-foreground">Encouragement, positive praise, and confidence building</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/20 text-gold">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary">Max 4–5 Students or 1-on-1</h3>
                  <p className="text-xs text-muted-foreground">Every child gets ample speaking and correction time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Zero Tech Hassle (Effortless setup for parents) */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-primary-foreground/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                Effortless For Busy Families
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Zero Tech Hassle — Just Click & Learn
              </h2>
              <p className="mt-4 text-sm text-primary-foreground/85 leading-relaxed">
                We designed ArabiyatLearn so grandparents, busy mothers, and children can join in 5 seconds. No complicated setups, no heavy software, and no technical headaches.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "One-Click Join", desc: "Direct Google Meet / Zoom link sent straight to your WhatsApp and email. One tap to enter." },
                  { title: "Works on Any Device", desc: "iPad, Android tablet, MacBook, Windows PC or smartphone. No expensive equipment needed." },
                  { title: "Interactive Whiteboard", desc: "Children draw, trace, and match answers directly on the teacher's interactive screen." },
                  { title: "Automated Reminders", desc: "Helpful 1-hour and 15-minute WhatsApp reminders so your family never misses a session." },
                ].map((feat) => (
                  <div key={feat.title} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5">
                    <h4 className="font-bold text-sm text-gold">{feat.title}</h4>
                    <p className="mt-1.5 text-xs text-primary-foreground/75 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/5 p-8 backdrop-blur shadow-card">
              <h3 className="font-display text-2xl font-bold text-white">Start in 3 Easy Steps</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-primary text-sm">1</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Book Your Free Trial</h4>
                    <p className="text-xs text-primary-foreground/75 mt-0.5">Pick a convenient day and time that matches your family schedule.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-primary text-sm">2</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Receive Classroom Link</h4>
                    <p className="text-xs text-primary-foreground/75 mt-0.5">We send your child's private room link directly to your WhatsApp.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-primary text-sm">3</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Meet Ustadha & Learn!</h4>
                    <p className="text-xs text-primary-foreground/75 mt-0.5">Enjoy a friendly 25-minute interactive lesson with smiling guidance.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="w-full sm:w-auto rounded-xl bg-background text-primary hover:bg-cream font-semibold">
                  <Link to="/contact">Book Free Demo Now</Link>
                </Button>
                <a
                  href="https://wa.me/923098444501?text=Hello%20ArabiyatLearn%2C%20I%20have%20a%20question%20about%20classes."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-foreground/10 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 fill-current text-[#25D366]" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Live Class Parent FAQs (Distinct warm background) */}
      <section className="bg-cream/70 py-20 border-y border-border/60">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading
            title="Common Questions About Live Classes"
            subtitle="Everything parents ask before scheduling their child's first demo."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                q: "What if my child has zero background in Arabic?",
                a: "Most of our students start with zero Arabic knowledge! Ustadha uses clear English explanations, visual flashcards, and joyful repetition so children never feel confused.",
              },
              {
                q: "What technology or device do we need?",
                a: "A regular laptop, iPad, or tablet with internet connection and Zoom or Google Meet. No special software or complex downloads are required.",
              },
              {
                q: "Can I choose between 1-on-1 and small group batches?",
                a: "Yes! During your free demo class, Ustadha will discuss whether your child would thrive best in individual 1-on-1 tutoring or in a lively micro-group (max 4-5 students).",
              },
              {
                q: "What if we miss a scheduled live class?",
                a: "We offer flexible rescheduling with 24 hours notice, plus interactive lesson review notes so your child never falls behind their classmates.",
              },
              {
                q: "Are the class timings suitable for my timezone?",
                a: "Yes, we teach children across the UK (GMT), USA & Canada (EST, CST, PST), and the Middle East (GST). We offer afternoon and weekend morning options.",
              },
              {
                q: "Is there any obligation after the free trial?",
                a: "None whatsoever. The demo is completely free. If it's a good fit, we will recommend a schedule; if not, we are happy to have met your family!",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
                <h3 className="font-display text-base font-bold text-primary flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-pink shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="gradient-teal rounded-4xl px-6 py-14 text-center text-primary-foreground shadow-card md:px-16">
          <Star className="mx-auto h-6 w-6 text-gold" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Give Your Child the Gift of Arabic</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Start with simple lessons, build confidence, and make Arabic part of your child's everyday learning
            journey.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl bg-background text-primary hover:bg-cream font-semibold">
              <Link to="/contact">Book a Free Demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/courses">Explore All Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
