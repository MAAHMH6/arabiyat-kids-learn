import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart,
  GraduationCap,
  Users,
  Globe,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ArrowRight,
  BookOpen,
  Award,
  ShieldCheck,
  Star,
  Calendar,
} from "lucide-react";
import { SiteLayout, PageHeader, SectionHeading } from "@/components/site/SiteLayout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Button } from "@/components/ui/button";
import teacher from "@/assets/teacher-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet Ustadha Arabiyat — ArabiyatLearn Academy" },
      {
        name: "description",
        content:
          "Meet the teacher behind ArabiyatLearn: A patient, experienced Arabic teacher specializing in teaching English-speaking children with kindness, interactive methods and Islamic values.",
      },
      { property: "og:title", content: "Meet Ustadha Arabiyat — ArabiyatLearn Academy" },
      { property: "og:description", content: "Patient, child-centered Arabic teaching for English-speaking children." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://arabiyatlearn.com/about" },
      { property: "og:image", content: "https://arabiyatlearn.com/arabiyat-logo.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://arabiyatlearn.com/about" }],
  }),
  component: About,
});


const credentials = [
  { icon: GraduationCap, title: "10+ Years Experience", body: "Specializing exclusively in teaching Arabic to diaspora and English-speaking children." },
  { icon: Award, title: "Certified Tajweed & Arabic", body: "Ijazah-trained with rigorous grounding in classical Arabic phonetics (Makharij) and grammar." },
  { icon: Heart, title: "Gentle & Encouraging", body: "Zero intimidation. Every child learns with warm smiles, positive praise, and patience." },
  { icon: Globe, title: "English-Supported Instruction", body: "Explains tricky Arabic concepts using clear, child-friendly English analogies." },
];

const pillars = [
  {
    step: "01",
    title: "Accurate Sound & Makharij",
    desc: "Arabic has unique throat and tongue letters (like ح, ع, ق). We use playful mouth-position exercises so children produce authentic sounds without tension.",
  },
  {
    step: "02",
    title: "Everyday Active Vocabulary",
    desc: "We focus on words children immediately experience: family members, toys, foods, colours, emotions, and Islamic expressions used at home.",
  },
  {
    step: "03",
    title: "Conversational Confidence",
    desc: "From the very first class, children don't just memorize — they speak! Guided role-playing creates natural confidence without fear of mistakes.",
  },
  {
    step: "04",
    title: "The Quranic Bridge",
    desc: "We connect spoken Arabic vocabulary directly to the language of the Qur'an, giving your child lifelong spiritual meaning in their prayers.",
  },
];

const ageTracks = [
  {
    age: "Ages 4 – 6",
    track: "Little Explorers",
    focus: "Alphabet, Phonics & Visual Play",
    points: [
      "Letter shapes, sounds and vibrant visual flashcards",
      "Counting 1 to 10 with interactive Arabic games",
      "Colors, animals and simple daily Islamic greetings",
      "Short 25-minute engaging live sessions suited to young attention spans",
    ],
    tag: "Fun & Playful",
  },
  {
    age: "Ages 7 – 10",
    track: "Junior Speakers",
    focus: "Word Building, Reading & Dialogue",
    points: [
      "Joining letters to read 2 and 3-syllable Arabic words",
      "Everyday family and home conversation dialogues",
      "Introduction to simple sentence construction",
      "Understanding vocabulary from daily Du'as and Surahs",
    ],
    tag: "Most Popular",
  },
  {
    age: "Ages 11 – 15",
    track: "Youth Fluency",
    focus: "Grammar, Comprehension & Quran Roots",
    points: [
      "Core Arabic grammar patterns (Nouns, Verbs, Prepositions)",
      "Expressing thoughts and answering conversational prompts",
      "Reading classical Arabic passages with correct vowel markers",
      "Deep Quranic vocabulary breakdown for meaningful Salah",
    ],
    tag: "Comprehensive",
  },
];

const parentFeedback = [
  {
    quote: "My 7-year-old son used to dread traditional weekend madrassah. Ustadha has completely changed his mindset! He now eagerly waits for his class and greets his grandparents in Arabic on FaceTime.",
    parent: "Sister Amina K.",
    location: "Manchester, United Kingdom",
    child: "Mother of Rayan (Age 7)",
  },
  {
    quote: "The patience Ustadha shows is unmatched. She never rushes my daughter and makes her feel so capable. Within 6 weeks, Sophia knew all 28 letters with their correct sounds.",
    parent: "Dr. Tariq & Sarah M.",
    location: "Dallas, Texas, USA",
    child: "Parents of Sophia (Age 5)",
  },
  {
    quote: "Finding an online Arabic teacher who speaks fluent English and understands how Western children think was our biggest challenge. ArabiyatLearn has been an answer to our prayers.",
    parent: "Sister Fatima B.",
    location: "Toronto, Canada",
    child: "Mother of Zayd (Age 10)",
  },
];

function About() {
  return (
    <SiteLayout>
      {/* Breadcrumb: Home > About */}
      <Breadcrumb items={[{ label: "About", href: "/about" }]} />

      <PageHeader
        eyebrow="Meet the Academy"
        title="Meet Ustadha Arabiyat"
        subtitle="Dedicated to making the language of the Qur'an accessible, enjoyable, and meaningful for English-speaking Muslim children worldwide."
      />

      {/* Teacher Profile Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2">
        <div className="relative">
          <img
            src={teacher}
            alt="Illustration of Ustadha Arabiyat, patient Arabic teacher at her desk"
            loading="lazy"
            width={1008}
            height={1104}
            className="w-full rounded-4xl border border-border/60 object-cover shadow-card"
          />
          <div className="absolute -bottom-5 -right-5 rounded-3xl border border-border/80 bg-card p-5 shadow-card hidden sm:flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display font-bold text-primary">Certified Hijabi Educator</p>
              <p className="text-xs text-muted-foreground">500+ Diaspora Students Taught</p>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-block rounded-full bg-pink-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Founder & Lead Teacher
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-primary md:text-4xl">
            A Teacher Who Truly Understands <span className="text-pink">Your Child</span>
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              "Assalamu Alaikum wa Rahmatullahi wa Barakatuh! As a mother and seasoned Arabic educator, I watched
              many children struggle in traditional classrooms where Arabic was taught through harsh rote memorization
              without English explanations. Children felt intimidated, frustrated, and disconnected."
            </p>
            <p>
              "I founded <strong>ArabiyatLearn</strong> to change that experience completely. I believe that children
              flourish when they feel respected, encouraged, and safe to make mistakes. My lessons combine clear English
              guidance, lively interactive visuals, digital whiteboards, and gentle positive reinforcement."
            </p>
            <p>
              "Whether your child is holding a pencil for the first time or wanting to understand what they recite in
              prayer, our live classes build genuine love and lasting competence in Arabic, in shaa Allah."
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold">
              <Link to="/contact">
                Book a Free Demo with Ustadha <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd5a] font-semibold"
            >
              <a
                href="https://wa.me/923098444501?text=Assalamu%20Alaikum%20Ustadha%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20classes."
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5 fill-current" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Credentials Grid */}
      <section className="bg-cream/60 py-16 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Why Parents Trust Ustadha" subtitle="High standards of pedagogy, safety and Islamic values in every session." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c) => (
              <div key={c.title} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-soft text-primary">
                  <c.icon className="h-5 w-5 text-pink" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-primary">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Arabiyat Method: 4 Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          title="The 4-Pillar Arabiyat Teaching Method"
          subtitle="How we take children from complete beginner to confident speaker and reader."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.step} className="rounded-3xl border border-border/70 bg-card p-7 shadow-soft flex flex-col justify-between">
              <div>
                <span className="font-display text-3xl font-bold text-pink/60">{p.step}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-primary">{p.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-1.5 text-xs font-semibold text-emerald">
                <CheckCircle2 className="h-3.5 w-3.5" /> Proven Child Approach
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Age-Specific Learning Tracks */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary-foreground/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-gold">
              Tailored By Development
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Age-Specific Learning Tracks
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-foreground/80">
              A 5-year-old learns differently than a 12-year-old. Our classes are carefully customized to each cognitive stage.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {ageTracks.map((t) => (
              <div
                key={t.track}
                className="flex flex-col justify-between rounded-4xl border border-primary-foreground/20 bg-primary-foreground/5 p-8 backdrop-blur"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">{t.age}</span>
                    <span className="rounded-full bg-pink px-2.5 py-0.5 text-[0.7rem] font-bold text-white">
                      {t.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{t.track}</h3>
                  <p className="mt-2 text-xs font-medium text-primary-foreground/80">{t.focus}</p>

                  <ul className="mt-6 space-y-3 text-xs text-primary-foreground/90">
                    {t.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild size="lg" className="mt-8 w-full rounded-xl bg-background text-primary hover:bg-cream font-semibold">
                  <Link to="/contact">Book Demo for this Age</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Stories */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading title="What Families Are Saying" subtitle="Real stories from parents who entrusted their children's Arabic journey to us." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {parentFeedback.map((fb) => (
            <div key={fb.parent} className="rounded-3xl border border-border/70 bg-card p-7 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-xs italic leading-relaxed text-muted-foreground">
                  "{fb.quote}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60">
                <p className="font-display text-sm font-bold text-primary">{fb.parent}</p>
                <p className="text-xs text-emerald font-medium">{fb.child}</p>
                <p className="text-[0.7rem] text-muted-foreground">{fb.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Booking CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="gradient-teal rounded-4xl p-8 md:p-14 text-center text-primary-foreground shadow-card">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to Start Your Child's Arabic Journey?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/85">
            Book a complimentary 25-minute 1-on-1 trial session. Meet Ustadha, assess your child's level, and see how simple Arabic can be.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl bg-background text-primary hover:bg-cream font-semibold shadow-soft">
              <Link to="/contact">Book a Free Trial Class</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd5a] font-semibold shadow-soft"
            >
              <a
                href="https://wa.me/923098444501?text=Hello%20Arabiyat%20Learn%2C%20I%20would%20like%20to%20schedule%20a%20free%20demo%20class."
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4 fill-current" /> Chat on WhatsApp (+92 309 8444501)
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
