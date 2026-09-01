import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import thumb1 from "@/assets/course-thumb-1.jpg";
import thumb2 from "@/assets/course-thumb-2.jpg";
import thumb3 from "@/assets/course-thumb-3.jpg";
import thumb4 from "@/assets/course-thumb-4.jpg";
import thumb5 from "@/assets/course-thumb-5.jpg";
import thumb6 from "@/assets/course-thumb-6.jpg";

export type CourseRow = Database["public"]["Tables"]["courses"]["Row"];
export type ModuleRow = Database["public"]["Tables"]["modules"]["Row"];
export type LessonRow = Database["public"]["Tables"]["lessons"]["Row"];
export type ResourceRow = Database["public"]["Tables"]["resources"]["Row"];

const thumbs: Record<string, string> = {
  thumb1,
  thumb2,
  thumb3,
  thumb4,
  thumb5,
  thumb6,
};

export const thumbFor = (key: string | null | undefined) => thumbs[key ?? "thumb1"] ?? thumb1;

export const thumbKeys = Object.keys(thumbs);

export type CourseWithCurriculum = CourseRow & {
  modules: (ModuleRow & { lessons: LessonRow[] })[];
};

export async function fetchCourses(): Promise<CourseRow[]> {
  const { data, error } = await supabase.from("courses").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function fetchCourseBySlug(slug: string): Promise<CourseWithCurriculum | null> {
  const { data: course, error } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  if (!course) return null;
  const modules = await fetchCurriculum(course.id);
  return { ...course, modules };
}

export async function fetchCurriculum(courseId: string) {
  const { data: modules, error: mErr } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", courseId)
    .order("sort_order");
  if (mErr) throw mErr;
  const ids = (modules ?? []).map((m) => m.id);
  if (ids.length === 0) return [];
  const { data: lessons, error: lErr } = await supabase
    .from("lessons")
    .select("*")
    .in("module_id", ids)
    .order("sort_order");
  if (lErr) throw lErr;
  return (modules ?? []).map((m) => ({
    ...m,
    lessons: (lessons ?? []).filter((l) => l.module_id === m.id),
  }));
}

export async function fetchResources(): Promise<ResourceRow[]> {
  const { data, error } = await supabase.from("resources").select("*").order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function countLessons(courseId: string) {
  const modules = await fetchCurriculum(courseId);
  return modules.reduce((n, m) => n + m.lessons.length, 0);
}
