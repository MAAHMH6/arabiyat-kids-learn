import { Link } from "@tanstack/react-router";
import { Star, Clock, PlayCircle } from "lucide-react";
import type { Course } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="card-lift flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
      <img
        src={course.thumbnail}
        alt={course.title}
        loading="lazy"
        width={1200}
        height={800}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald">
          <span className="rounded-full bg-secondary px-3 py-1">{course.level}</span>
          <span className="flex items-center gap-1 text-gold">
            <Star className="h-3.5 w-3.5 fill-current" /> {course.rating}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-primary">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{course.description}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <PlayCircle className="h-4 w-4" /> {course.lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {course.duration}
          </span>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-primary">${course.price}</span>
          <Button asChild className="rounded-xl bg-primary hover:bg-emerald">
            <Link to="/courses/$slug" params={{ slug: course.slug }}>
              View Course
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
