import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, GraduationCap, Users, Globe } from "lucide-react";
import { SiteLayout, PageHeader, SectionHeading } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import teacher from "@/assets/teacher-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet Your Arabic Teacher — Arabiyat Learning" },
      {
        name: "description",
        content:
          "Meet the teacher behind Arabiyat Learning and the simple, step-by-step approach used to teach Arabic to English-speaking children.",
      },
      { property: "og:title", content: "Meet Your Arabic Teacher — Arabiyat Learning" },
      { property: "og:description", content: "A patient, experienced Arabic teacher for children." },
    ],
  }),
  component: About,
});

const highlights = [
  { icon: GraduationCap, title: "Experienced Educator", body: "Years of experience teaching Arabic to children." },
  { icon: Users, title: "Child-Centered Approach", body: "Lessons designed specifically for young learners." },
  { icon: Heart, title: "Loves Teaching Kids", body: "Patient, kind and passionate about children's learning." },
  { icon: Globe, title: "English-Supported Lessons", body: "Explaining Arabic in simple English children understand." },
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About Arabiyat Learning"
        title="Meet Your Arabic Teacher"
        subtitle="Arabiyat Learning was created with one simple goal: to make learning Arabic easy, enjoyable and meaningful for English-speaking children."
      />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <img
          src={teacher}
          alt="Illustration of a hijab-wearing Arabic teacher at her desk"
          loading="lazy"
          width={1008}
          height={1104}
          className="w-full rounded-4xl border border-border/60 object-cover shadow-card"
        />
        <div>
          <span className="inline-block rounded-full bg-pink-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Meet Our Teacher
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-primary md:text-4xl">
            A Passionate Teacher <span className="block text-pink">Who Cares</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            "Welcome! I teach Arabic to children in a simple, friendly and practical way. My goal is to help children
            understand Arabic, pronounce it correctly, and become comfortable using simple Arabic words and sentences."
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
                <h.icon className="h-5 w-5 text-emerald" />
                <h3 className="mt-3 text-sm font-semibold text-primary">{h.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream/60 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title="My Teaching Approach" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Simple explanations",
              "Step-by-step learning",
              "Speaking practice",
              "Repetition that builds memory",
              "Real, everyday examples",
              "Encouragement at every step",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-card p-5 text-sm font-medium text-primary">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-emerald">
              <Link to="/courses">Explore My Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
