import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, SectionHeading } from "@/components/site/SiteLayout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Button } from "@/components/ui/button";
import { howItWorks, parentReasons } from "@/lib/site-data";
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Video, 
  FileText, 
  Mic, 
  Award, 
  Laptop, 
  Wifi, 
  Volume2, 
  Calendar, 
  RotateCcw, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — ArabiyatLearn Live Arabic Academy" },
      {
        name: "description",
        content: "Discover our step-by-step live learning system: small interactive cohorts, dedicated Ustadha coaching, weekly homework reviews, and flexible scheduling.",
      },
      { property: "og:title", content: "How It Works — ArabiyatLearn" },
      { property: "og:description", content: "Step-by-step live Arabic learning designed specifically for diaspora children." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://arabiyatlearn.com/how-it-works" },
      { property: "og:image", content: "https://arabiyatlearn.com/arabiyat-logo.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://arabiyatlearn.com/how-it-works" }],
  }),
  component: HowItWorks,
});


const classPhases = [
  {
    time: "00 – 05 min",
    title: "Warm Greeting & Spoken Arabic Check-In",
    desc: "Ustadha greets each child by name in Arabic ('Kayfa Haluk?'), warming up their vocal cords and breaking any shyness.",
    color: "bg-teal/10 text-teal border-teal/20",
  },
  {
    time: "05 – 18 min",
    title: "Makharij & Phonics Focus",
    desc: "Interactive visual cards showing tongue placement and letter articulation points with lively multi-sensory associations.",
    color: "bg-pink/10 text-pink border-pink/20",
  },
  {
    time: "18 – 28 min",
    title: "Digital Whiteboard Practice & Gamified Reading",
    desc: "Students take turns on the live interactive screen matching letter forms (isolated, beginning, medial, end) and blending sounds.",
    color: "bg-gold/10 text-gold border-gold/20",
  },
  {
    time: "28 – 35 min",
    title: "Quranic & Everyday Islamic Vocabulary",
    desc: "Connecting the letters to Quranic verses, authentic Du'as, and moral character values that children remember for life.",
    color: "bg-emerald/10 text-emerald border-emerald/20",
  },
  {
    time: "35 – 40 min",
    title: "Micro-Quiz, Homework Briefing & Closing Du'a",
    desc: "A quick confidence-boosting review game, stars awarded to all students, and instructions for the weekly practice audio.",
    color: "bg-primary/10 text-primary border-primary/20",
  },
];

const learningCycle = [
  {
    step: "01",
    icon: Video,
    title: "Live Interactive Lessons",
    desc: "Two weekly 40-minute sessions with a certified female teacher in micro-groups (max 5 students) or 1-on-1 private classes.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Printable Activity Packs",
    desc: "Engaging tracing worksheets, coloring sheets, and word-matching puzzles delivered to your portal every Monday.",
  },
  {
    step: "03",
    icon: Mic,
    title: "Audio Voice Note Feedback",
    desc: "Children record a 30-second reading audio on WhatsApp or portal; Ustadha replies with gentle pronunciation correction within 24h.",
  },
  {
    step: "04",
    icon: Award,
    title: "Milestone Assessment & Certificates",
    desc: "Regular level checks celebrate your child's growth with personalized digital and printable certificates sent to your home.",
  },
];

function HowItWorks() {
  return (
    <SiteLayout>
      {/* Breadcrumb: Home > How It Works */}
      <Breadcrumb items={[{ label: "How It Works", href: "/how-it-works" }]} />

      <PageHeader
        eyebrow="How It Works"
        title="Start Learning in Four Simple Steps"
        subtitle="Live interactive online Arabic classes designed with patience, love, and modern visual pedagogy."
      />

      {/* ORIGINAL PRESERVED SECTION: Four Simple Steps */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <ol className="space-y-6">
          {howItWorks.map((s) => (
            <li key={s.step} className="flex gap-5 rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary font-display font-bold text-primary-foreground">
                {s.step}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* NEW RICH SECTION: Inside a 40-Minute Live Lesson */}
      <section className="bg-sand/30 py-20 border-y border-border/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-pink">Minute-by-Minute Breakdown</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
              Inside a 40-Minute Live Class
            </h2>
            <p className="mt-3 text-muted-foreground">
              Young attention spans require dynamic rhythm. Here is how our teachers keep kids excited from start to finish.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {classPhases.map((phase, idx) => (
              <div key={idx} className="relative rounded-3xl border border-border/70 bg-card p-6 shadow-soft flex flex-col justify-between">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${phase.color}`}>
                    <Clock className="inline-block w-3 h-3 mr-1" />
                    {phase.time}
                  </span>
                  <h3 className="font-display text-base font-bold text-primary mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/40 text-[0.7rem] font-bold text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald" /> Step {idx + 1} of 5
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW RICH SECTION: The 360° Learning Cycle */}
      <section className="py-20 mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-teal">Beyond Screen Time</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
            The 360° Retention Loop
          </h2>
          <p className="mt-3 text-muted-foreground">
            Children don't learn a language from isolated screen time. Our multi-touchpoint method guarantees genuine fluency and love for Arabic.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {learningCycle.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft hover:shadow-card transition-all">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-2xl font-bold text-primary/30">
                    {item.step}
                  </span>
                  <div className="h-12 w-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEW RICH SECTION: Minimal Tech Requirements */}
      <section className="bg-cream/70 py-20 border-t border-border/50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-gold">Parent Peace of Mind</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
              Zero Tech Hassle for Parents
            </h2>
            <p className="mt-3 text-muted-foreground">
              You do not need complicated software or dedicated expensive equipment. Everything is accessible in a single click.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
              <div className="h-12 w-12 rounded-2xl bg-pink/10 flex items-center justify-center text-pink mb-4">
                <Laptop className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">Any Device Works</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use an iPad, Android tablet, MacBook, or Windows PC. Touchscreens work great for younger children using our digital whiteboard.
              </p>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
              <div className="h-12 w-12 rounded-2xl bg-teal/10 flex items-center justify-center text-teal mb-4">
                <Wifi className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">Standard Internet</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Any standard home Wi-Fi or 4G/5G mobile connection (minimum 5 Mbps) is sufficient for crystal-clear HD video and audio.
              </p>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
              <div className="h-12 w-12 rounded-2xl bg-emerald/10 flex items-center justify-center text-emerald mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary mb-2">100% Child-Safe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No open chatrooms or external links. Each child attends via a secure, passwordless classroom portal monitored strictly by Arabiyat admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGINAL PRESERVED SECTION: Why Parents Choose Us */}
      <section className="bg-background py-20 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Why Parents Choose Us" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parentReasons.map((r) => (
              <div key={r.title} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
                <span className="text-2xl">{r.emoji}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>

          {/* NEW RICH SECTION: Rescheduling & Flexible Makeup Guarantee */}
          <div className="mt-14 rounded-3xl bg-gradient-to-r from-primary to-[#0F4C4A] p-8 md:p-12 text-primary-foreground shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold border border-gold/40 mb-3">
                <RotateCcw className="w-3.5 h-3.5" />
                Parent-Friendly Scheduling
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold">
                Busy Family Life? We Understand.
              </h3>
              <p className="mt-3 text-white/85 text-sm md:text-base leading-relaxed">
                Illness, exams, or family holidays happen. Simply notify us 24 hours in advance and reschedule your 1-on-1 lesson or receive a cohort catch-up recording with personalized teacher feedback at zero extra cost.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button asChild size="lg" className="rounded-2xl bg-gold text-primary hover:bg-gold/90 font-bold px-8 shadow-md">
                <Link to="/contact">
                  Book Free Demo Class
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

