import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  BookOpen, 
  CreditCard,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Parent FAQs — ArabiyatLearn Live Arabic Academy" },
      {
        name: "description",
        content: "Frequently asked questions by parents regarding our live interactive Arabic classes, age groups, native female teachers, scheduling, and sibling discounts.",
      },
      { property: "og:title", content: "Parent FAQs — ArabiyatLearn" },
      { property: "og:description", content: "Everything parents need to know about our live Arabic classes for kids." },
    ],
  }),
  component: Faq,
});

interface FaqCategory {
  id: string;
  name: string;
  icon: typeof Sparkles;
  items: { q: string; a: string }[];
}

const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started & Placement",
    icon: Sparkles,
    items: [
      {
        q: "What age group are the classes designed for?",
        a: "Our academy specializes in children aged 4 to 15. We divide classes into specific age cohorts (Little Explorers ages 4–6, Young Learners ages 7–10, and Youth Fluency ages 11–15) so peer dynamics and attention spans match perfectly.",
      },
      {
        q: "Does my child need to know any Arabic before joining?",
        a: "No prior knowledge is needed! Over 70% of our new students start with zero Arabic. Our Level 1 Foundation course introduces letters, sounds, and phonetics from the absolute ground up in a gentle, welcoming way.",
      },
      {
        q: "How do you assess which level my child should join?",
        a: "We offer a complimentary 25-minute 1-on-1 placement demo session. During this mini-lesson, our senior teacher assesses your child's letter recognition, phonics, and conversational comfort, and provides you with a personalized learning pathway.",
      },
      {
        q: "Are the classes live or pre-recorded?",
        a: "All classes are 100% live and interactive with a certified female teacher. Students can ask questions, write on the digital screen, and receive instant pronunciation feedback. Lesson recordings and homework summaries are also provided after each class for revision.",
      },
    ],
  },
  {
    id: "classroom-experience",
    name: "Live Classroom & Teaching Method",
    icon: BookOpen,
    items: [
      {
        q: "Are lessons taught in English or full immersion?",
        a: "Lessons are taught with patient English explanations for grammar and instructions, while maximizing Arabic immersion through flashcards, gestures, and repetition. This ensures English-speaking children never feel confused or intimidated.",
      },
      {
        q: "How many children are in a group class?",
        a: "We strictly cap our small cohorts at 4 to 5 students maximum. This ensures every single child gets direct speaking turns, personalized pronunciation corrections, and active engagement every single lesson.",
      },
      {
        q: "What if my child is shy or easily distracted?",
        a: "Our teachers are specially trained in child psychology and gamified pedagogy. We use colorful visual slides, interactive screen drawing, stars, and digital sticker rewards that keep even hesitant or shy children eagerly participating.",
      },
      {
        q: "Who are your teachers?",
        a: "All of our teachers are native female Arab educators holding degrees in Islamic Studies, Arabic linguistics, or Tajweed certification. Every teacher is thoroughly vetted, background-checked, and fluent in English.",
      },
    ],
  },
  {
    id: "scheduling-tech",
    name: "Schedules, Tech & Rescheduling",
    icon: Calendar,
    items: [
      {
        q: "What time zones do you cater to?",
        a: "We run cohorts across UK (GMT/BST), North America (EST, CST, PST), and the Gulf (GST/AST). When you book your demo or enroll, we align class times to your child's after-school or weekend schedule.",
      },
      {
        q: "What happens if we miss a class due to illness or holiday?",
        a: "For 1-on-1 classes, you can reschedule at zero fee with 24 hours notice. For small group cohorts, you receive the full lesson recording, slides, and teacher notes, plus your child can submit their voice note homework for individual review.",
      },
      {
        q: "What equipment or apps do we need?",
        a: "All you need is an iPad, tablet, laptop, or desktop computer with a functioning camera and microphone, plus a standard internet connection. Our classroom runs directly in the browser or via Zoom with one secure click.",
      },
    ],
  },
  {
    id: "tuition-discounts",
    name: "Tuition, Sibling Discounts & Guarantee",
    icon: CreditCard,
    items: [
      {
        q: "Is the first trial session really free?",
        a: "Yes, 100% free with no credit card required. It is an opportunity for your child to experience the classroom fun and for you to meet the teacher before making any decision.",
      },
      {
        q: "Do you offer sibling discounts?",
        a: "Yes! We offer a 15% discount for the second sibling and 20% for the third sibling enrolled in any of our monthly or term cohorts.",
      },
      {
        q: "Is there a long-term contract?",
        a: "No. Our classes run on flexible month-to-month plans. You can pause, adjust, or cancel your child's enrollment at any time with zero cancellation penalties.",
      },
      {
        q: "How can parents track progress?",
        a: "Parents receive weekly WhatsApp voice updates from the teacher, bi-weekly progress checklists, and quarterly graduation certificates as your child masters each curriculum level.",
      },
    ],
  },
];

function Faq() {
  const [activeCategory, setActiveCategory] = useState("all");

  const displayedCategories = activeCategory === "all" 
    ? faqCategories 
    : faqCategories.filter(c => c.id === activeCategory);

  return (
    <SiteLayout>
      <PageHeader 
        eyebrow="Help & FAQ" 
        title="Everything Parents Need to Know" 
        subtitle="Clear answers about our live Arabic classes, teaching methods, teacher vetting, and scheduling." 
      />

      <section className="mx-auto max-w-5xl px-4 py-16">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border/80 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Questions
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categorized Accordion Groups */}
        <div className="space-y-12">
          {displayedCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-border/60">
                  <div className="p-2 rounded-xl bg-teal/10 text-teal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-primary">
                    {category.name}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {category.items.map((f, i) => (
                    <AccordionItem 
                      key={f.q} 
                      value={`${category.id}-${i}`} 
                      className="rounded-2xl border border-border/70 bg-card px-6 shadow-xs"
                    >
                      <AccordionTrigger className="text-left font-display text-base font-semibold text-primary hover:no-underline py-4">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>

        {/* Direct Help & WhatsApp Concierge Banner */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Box 1: Book Free Demo */}
          <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-pink mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Free Assessment
              </span>
              <h3 className="font-display text-xl font-bold text-primary">
                Want to see how your child responds?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Book a 25-minute live trial lesson. No obligations, no upfront payment. Experience our warm teaching style first-hand.
              </p>
            </div>
            <Button asChild size="lg" className="mt-6 rounded-2xl bg-primary hover:bg-emerald text-primary-foreground font-bold">
              <Link to="/contact">
                Book Free Trial Class
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Box 2: WhatsApp Concierge */}
          <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-emerald/10 via-card to-teal/10 p-8 shadow-soft flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald mb-2">
                <MessageCircle className="w-3.5 h-3.5" /> Instant Parent Support
              </span>
              <h3 className="font-display text-xl font-bold text-primary">
                Have a specific question right now?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Chat directly with our academic advisor on WhatsApp. We typically respond within minutes during daytime hours.
              </p>
            </div>
            <Button asChild size="lg" className="mt-6 rounded-2xl bg-emerald hover:bg-emerald/90 text-white font-bold">
              <a 
                href="https://wa.me/447700900077?text=Hello%20Arabiyat%20Learn%2C%20I%20have%20a%20question%20about%20your%20live%20classes%20for%20my%20child." 
                target="_blank" 
                rel="noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

