import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CourseCard } from "@/components/site/CourseCard";
import { courseFilters, courses } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Arabic Courses for Kids — Arabiyat Learning" },
      {
        name: "description",
        content:
          "Browse recorded Arabic courses for children: alphabet, numbers, vocabulary, speaking and beginner conversations.",
      },
      { property: "og:title", content: "Arabic Courses for Kids — Arabiyat Learning" },
      { property: "og:description", content: "Recorded Arabic courses for English-speaking children." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [filter, setFilter] = useState<string>("All");
  const visible = courses.filter((c) => filter === "All" || c.category === filter || c.level === filter);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Course Catalog"
        title="Arabic Courses for Children"
        subtitle="Every course is recorded, English-supported and yours for life."
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-9 flex flex-wrap justify-center gap-2">
          {courseFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/80 hover:border-primary/40",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">No courses in this category yet.</p>
        )}
      </div>
    </SiteLayout>
  );
}
