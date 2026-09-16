import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BookMarked,
  Heart,
  Sparkles,
  UserRound,
  Gauge,
  MessageCircle,
  Mic,
  Repeat,
  Moon,
  CheckCircle2,
  CalendarCheck,
  ClipboardCheck,
  GraduationCap,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import quranHero from "@/assets/quran-1to1-hero.jpg";
import quranTeaching from "@/assets/quran-1to1-teaching.jpg";

export const Route = createFileRoute("/quran-learning")({
  head: () => ({
    meta: [
      { title: "1-to-1 Quran Learning | ArabiyatLearn" },
      {
        name: "description",
        content:
          "Personalized 1-to-1 Quran learning for children, including Quran reading, Qaida, Tajweed, memorization and revision.",
      },
      { property: "og:title", content: "1-to-1 Quran Learning | ArabiyatLearn" },
      {
        property: "og:description",
        content:
          "Personalized 1-to-1 Quran learning for children, including Quran reading, Qaida, Tajweed, memorization and revision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:url",
        content: "https://arabiyat-kids-learn.lovable.app/quran-learning",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://arabiyat-kids-learn.lovable.app/quran-learning",
      },
    ],
  }),
  component: QuranLearning,
});

const WHATSAPP_URL =
  "https://wa.me/923098444501?text=Hello%20ArabiyatLearn%2C%20I%20would%20like%20to%20inquire%20about%201-to-1%20Quran%20Learning%20for%20my%20child.";

const introCards = [
  {
    icon: UserRound,
    title: "Personal Attention",
    text: "One teacher can focus completely on your child's learning needs.",
  },
  {
    icon: Gauge,
    title: "Learn at Their Own Pace",
    text: "Lessons can move according to your child's understanding and progress.",
  },
  {
    icon: Heart,
    title: "Individual Guidance",
    text: "Receive focused correction, practice and support throughout the learning journey.",
  },
];

const learnCards = [
  { icon: BookOpen, title: "Quran Reading", text: "Build confidence and fluency in Quran reading." },
  { icon: Sparkles, title: "Qaida & Basics", text: "Develop a strong foundation in Arabic letters, sounds and reading." },
  { icon: Mic, title: "Tajweed", text: "Learn correct pronunciation and essential Tajweed rules step by step." },
  { icon: BookMarked, title: "Quran Memorization", text: "Memorize selected Surahs and verses with guided practice and revision." },
  { icon: Repeat, title: "Quran Revision", text: "Strengthen previously learned Surahs through regular revision and practice." },
  { icon: Moon, title: "Islamic Basics", text: "Learn essential Islamic knowledge in an age-appropriate way." },
];

const steps = [
  { n: "01", icon: CalendarCheck, title: "Book a Free Demo", text: "Choose a suitable day and time." },
  { n: "02", icon: UserRound, title: "Meet the Teacher", text: "Your child experiences a personalized one-to-one session." },
  { n: "03", icon: ClipboardCheck, title: "Understand Their Level", text: "Identify the child's current level, strengths and areas that need attention." },
  { n: "04", icon: GraduationCap, title: "Start the Learning Journey", text: "Follow a learning approach designed around your child's needs." },
];

const levels = [
  {
    title: "Beginners",
    text: "For children starting Quran learning from the basics.",
    points: ["Arabic letters", "Basic reading", "Qaida", "Pronunciation"],
  },
  {
    title: "Quran Readers",
    text: "For children who can already read but want to improve fluency and confidence.",
    points: ["Reading practice", "Fluency", "Pronunciation", "Regular revision"],
  },
  {
    title: "Tajweed & Memorization",
    text: "For children who want to improve recitation, Tajweed and memorization.",
    points: ["Tajweed practice", "Recitation", "Memorization", "Revision"],
  },
];

const benefits = [
  "Personal teacher attention",
  "Individual learning pace",
  "Personalized lesson planning",
  "Direct correction and feedback",
  "Focused practice",
  "Regular revision",
  "Comfortable learning environment",
  "Parent-friendly progress communication",
];

const faqs = [
  {
    q: "Is Quran learning one-to-one?",
    a: "Yes. Each session is focused on one student so the teacher can provide individual attention and guidance.",
  },
  { q: "Are beginners welcome?", a: "Yes. Beginners can start from the basic foundations and progress step by step." },
  { q: "Can my child learn Tajweed?", a: "Yes. Tajweed can be included according to the child's current level and learning goals." },
  { q: "Can my child learn Quran memorization?", a: "Yes. Memorization and regular revision can be included in the learning plan." },
  { q: "Can the learning schedule be adjusted?", a: "Parents can discuss a suitable schedule according to availability." },
  { q: "How long is the free demo?", a: "The complimentary demo session is 25 minutes." },
];

function QuranLearning() {
  return (
    <SiteLayout>
      {/* Breadcrumb: Home > Quran Learning */}
      <Breadcrumb items={[{ label: "Quran Learning", href: "/quran-learning" }]} />

      {/* HERO */}
      <section className="gradient-hero border-b border-border/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-block rounded-full bg-pink-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              1-to-1 Quran Learning
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-primary md:text-5xl">
              Learn the Quran With <span className="text-pink">Confidence</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Personalized one-to-one Quran learning designed around your child's level, pace and learning goals.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-2xl bg-primary hover:bg-emerald text-primary-foreground font-semibold shadow-soft">
                <Link to="/contact">
                  Book a Free Demo <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl border-border bg-card font-semibold">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
              {["1-to-1 Learning", "Personal Attention", "Flexible Schedule", "Beginner Friendly"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-emerald" /> {b}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={quranHero}
              alt="A Quran teacher guiding one child through an open Quran in a calm, sunlit room"
              width={1024}
              height={1024}
              className="w-full rounded-3xl border border-border/70 object-cover shadow-card"
            />
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-soft backdrop-blur sm:left-6 sm:right-auto sm:max-w-xs">
              <p className="font-display text-sm font-bold text-primary">1-to-1 Quran Learning</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Personalized • Focused • Supportive</p>
            </div>
            <span className="absolute right-4 top-4 rounded-full bg-pink-soft px-3.5 py-1.5 text-xs font-bold text-primary shadow-soft">
              Free 25-Min Demo
            </span>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">Personalized Learning</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">Every Child Learns Differently</h2>
          <p className="mt-4 text-muted-foreground">
            Quran learning becomes more meaningful when a child receives the right guidance and personal attention. Our one-to-one approach allows lessons to be adapted to the child's level, pace and learning goals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {introCards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft card-lift">
              <div className="mb-4 inline-flex rounded-2xl bg-pink-soft p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT CAN THEY LEARN */}
      <section className="border-y border-border/60 bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">What Can Your Child Learn?</h2>
            <p className="mt-4 text-muted-foreground">
              Build a strong foundation and develop confidence through a structured Quran learning journey.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learnCards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-border/70 bg-card p-7 shadow-xs card-lift">
                <div className="mb-4 inline-flex rounded-2xl bg-emerald/10 p-3 text-emerald">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">Simple. Personal. Focused.</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, icon: Icon, title, text }) => (
            <div key={n} className="relative rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
              <span className="font-display text-3xl font-bold text-gold/70">{n}</span>
              <div className="mt-3 inline-flex rounded-2xl bg-pink-soft p-2.5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="rounded-2xl bg-primary hover:bg-emerald text-primary-foreground font-semibold shadow-soft">
            <Link to="/contact">
              Book a Free Demo <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* LEVELS */}
      <section className="border-y border-border/60 bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">Quran Learning for Every Starting Point</h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {levels.map((lvl) => (
              <div key={lvl.title} className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft card-lift">
                <h3 className="font-display text-xl font-bold text-primary">{lvl.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lvl.text}</p>
                <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5">
                  {lvl.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-foreground/85">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY 1-TO-1 */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <img
            src={quranTeaching}
            alt="One Quran teacher sitting with one child student during a personal lesson"
            width={1024}
            height={896}
            loading="lazy"
            className="w-full rounded-3xl border border-border/70 object-cover shadow-card"
          />
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">The 1-to-1 Difference</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
              Learning That Gives Your Child the Attention They Deserve
            </h2>
            <p className="mt-4 text-muted-foreground">
              With one-to-one learning, the teacher can focus on your child's specific needs instead of following the same pace for everyone.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PARENT FOCUS */}
      <section className="border-y border-border/60 bg-pink-soft/40">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center md:py-20">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">Peace of Mind for Parents</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            You want your child to learn the Quran correctly, consistently and with confidence. A personalized learning approach helps make the journey structured, focused and easier to follow.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Know Their Level", text: "Understand where your child is and what they need to work on." },
              { title: "Build Consistency", text: "Create a regular learning routine." },
              { title: "See Their Progress", text: "Stay informed about your child's learning journey." },
            ].map((f) => (
              <div key={f.title} className="rounded-3xl border border-border/70 bg-card/90 p-7 text-left shadow-soft">
                <h3 className="font-display text-base font-bold text-primary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE DEMO CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
          <span className="inline-block rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground">
            Free 25-Minute Demo
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Give Your Child a More Personal Quran Learning Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Book a complimentary 25-minute one-to-one demo session and discover a learning approach designed around your child's needs.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-2xl bg-card text-primary hover:bg-card/90 font-bold shadow-soft">
              <Link to="/contact">
                Book Free Demo <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl border-primary-foreground/40 bg-transparent font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Contact Us
              </a>
            </Button>
          </div>

          <p className="mt-5 text-xs text-primary-foreground/70">No payment required for the demo.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:py-20">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">Common Questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q-${i}`} className="rounded-2xl border border-border/70 bg-card px-6 shadow-xs">
              <AccordionTrigger className="py-4 text-left font-display text-base font-semibold text-primary hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">Start Your Child's Quran Learning Journey</h2>
          <p className="mt-3 text-muted-foreground">One teacher. One student. One personalized learning journey.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-2xl bg-primary hover:bg-emerald text-primary-foreground font-semibold shadow-soft">
              <Link to="/contact">
                Book a Free Demo <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl border-border bg-card font-semibold">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Contact Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
