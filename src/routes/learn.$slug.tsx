import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, Lock, PlayCircle, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { Button } from "@/components/ui/button";
import { practiceWords } from "@/lib/site-data";
import { fetchCourseBySlug } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/$slug")({
  head: () => ({
    meta: [
      { title: "Lesson Player — Arabiyat Learn" },
      { name: "description", content: "Watch recorded Arabic lessons for children." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Lesson Player — Arabiyat Learn" },
      { property: "og:description", content: "Recorded Arabic lessons for children." },
    ],
  }),
  component: LessonPlayer,
});

function LessonPlayer() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [index, setIndex] = useState(0);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetchCourseBySlug(slug),
  });

  const { data: enrolled } = useQuery({
    queryKey: ["enrolled", course?.id, user?.id],
    enabled: !!course?.id && !!user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("id")
        .eq("course_id", course!.id)
        .eq("user_id", user!.id)
        .maybeSingle();
      return !!data;
    },
  });

  const { data: progress } = useQuery({
    queryKey: ["progress", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data } = await supabase.from("lesson_progress").select("lesson_id").eq("user_id", user!.id);
      return (data ?? []).map((r) => r.lesson_id);
    },
  });

  const flat = useMemo(
    () => (course?.modules ?? []).flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))),
    [course],
  );

  useEffect(() => setIndex(0), [slug]);

  if (isLoading) {
    return (
      <SiteLayout>
        <p className="py-24 text-center text-muted-foreground">Loading lessons…</p>
      </SiteLayout>
    );
  }

  if (!course || flat.length === 0) {
    return (
      <SiteLayout>
        <div className="py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-primary">No lessons available yet</h1>
          <Button asChild className="mt-6 rounded-xl bg-primary hover:bg-emerald">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const lesson = flat[Math.min(index, flat.length - 1)]!;
  const canWatch = lesson.is_free || !!enrolled;
  const completed = progress ?? [];

  const markComplete = async () => {
    if (!user) {
      toast("Sign in to save progress");
      return;
    }
    const { error } = await supabase.from("lesson_progress").insert({ user_id: user.id, lesson_id: lesson.id });
    if (error && !error.message.includes("duplicate")) {
      toast.error(error.message);
      return;
    }
    toast.success("Lesson marked as complete");
    void qc.invalidateQueries({ queryKey: ["progress"] });
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Link
          to="/courses/$slug"
          params={{ slug: course.slug }}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          ← Back to course
        </Link>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            {canWatch ? (
              <VideoPlayer src={lesson.video_url ?? ""} title={lesson.title} />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-3xl border border-border bg-secondary/60 text-center">
                <div className="px-8">
                  <Lock className="mx-auto h-7 w-7 text-primary" />
                  <p className="mt-3 font-display text-lg font-bold text-primary">This lesson is for enrolled students</p>
                  <Button asChild className="mt-5 rounded-xl bg-primary hover:bg-emerald">
                    <Link to="/checkout/$slug" params={{ slug: course.slug }}>
                      Enroll to Unlock
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            <h1 className="mt-6 font-display text-2xl font-bold text-primary">{lesson.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{lesson.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="rounded-xl"
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
              </Button>
              <Button className="rounded-xl bg-primary hover:bg-emerald" onClick={() => void markComplete()}>
                <Check className="mr-2 h-4 w-4" /> Mark as Complete
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                disabled={index >= flat.length - 1}
                onClick={() => setIndex((i) => Math.min(flat.length - 1, i + 1))}
              >
                Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <section className="mt-10 rounded-3xl border border-border/70 bg-cream/60 p-7">
              <h2 className="font-display text-xl font-bold text-primary">Practice This Lesson</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {practiceWords.map((w) => (
                  <div key={w.arabic} className="rounded-2xl border border-border/70 bg-card p-5 text-center">
                    <p className="arabic text-2xl font-semibold text-primary">{w.arabic}</p>
                    <p className="mt-2 text-sm font-medium text-pink">{w.roman}</p>
                    <p className="text-xs text-muted-foreground">{w.english}</p>
                    <button
                      className="mx-auto mt-3 flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-primary"
                      onClick={() => {
                        if (typeof window !== "undefined" && "speechSynthesis" in window) {
                          const utter = new SpeechSynthesisUtterance(w.arabic);
                          utter.lang = "ar-SA";
                          window.speechSynthesis.speak(utter);
                        }
                      }}
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Play
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-primary">Course Curriculum</h2>
            <div className="mt-4 space-y-5">
              {course.modules.map((m) => (
                <div key={m.id}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.title}</p>
                  <ul className="mt-2 space-y-1">
                    {m.lessons.map((l) => {
                      const i = flat.findIndex((f) => f.id === l.id);
                      return (
                        <li key={l.id}>
                          <button
                            onClick={() => setIndex(i)}
                            className={cn(
                              "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                              i === index ? "bg-secondary text-primary" : "hover:bg-secondary/60",
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {completed.includes(l.id) ? (
                                <Check className="h-3.5 w-3.5 text-emerald" />
                              ) : l.is_free || enrolled ? (
                                <PlayCircle className="h-3.5 w-3.5 text-primary" />
                              ) : (
                                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                              <span className="truncate">{l.title}</span>
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">{l.duration}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
