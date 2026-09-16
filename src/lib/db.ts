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

export const thumbFor = (key: string | null | undefined) => {
  if (!key) return thumb1;
  if (key.startsWith("http") || key.startsWith("/") || key.startsWith("data:")) return key;
  return thumbs[key] ?? thumb1;
};

export const thumbKeys = Object.keys(thumbs);

export type CourseWithCurriculum = CourseRow & {
  modules: (ModuleRow & { lessons: LessonRow[] })[];
};

export const fallbackSeedCourses: CourseRow[] = [
  {
    id: "course-1",
    slug: "arabic-alphabet-phonics",
    title: "Arabic Alphabet & Phonics Playground",
    tagline: "Fun letter sounds, shapes, and songs for young beginners",
    description: "An interactive journey through the 28 Arabic letters with fun phonetic games, shape recognition, and foundational sounds. Perfect for children with zero prior Arabic knowledge.",
    level: "Beginner",
    category: "Alphabet",
    price: 49,
    duration: "8 weeks",
    teacher: "Ustadha Fatima",
    thumbnail_key: "thumb1",
    rating: 4.9,
    reviews: 38,
    featured: true,
    sort_order: 1,
    language: "English & Arabic",
    outcomes: [
      "Recognize all 28 Arabic letters",
      "Letter forms (isolated, start, middle, end)",
      "Short vowels (Fatha, Kasra, Damma)",
      "Basic letter joining and word formation",
    ],
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "course-2",
    slug: "saudi-spoken-arabic",
    title: "Saudi Spoken Arabic",
    tagline: "Learn to speak Arabic naturally for everyday communication in Saudi Arabia",
    description: "Learn to speak Arabic naturally for everyday communication in Saudi Arabia. This course focuses on real spoken conversations, practical vocabulary, and the Saudi dialect used daily.",
    level: "Beginner",
    category: "Speaking",
    price: 69,
    duration: "12 weeks",
    teacher: "Ustadha Maryam",
    thumbnail_key: "thumb2",
    rating: 4.9,
    reviews: 47,
    featured: true,
    sort_order: 2,
    language: "English & Arabic",
    outcomes: [
      "Hold natural conversations in Saudi Arabic",
      "Essential everyday vocabulary and phrases",
      "Greetings, shopping, directions and social situations",
      "Understanding native Saudi speakers",
      "Confidence speaking with family and community",
    ],
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "course-3",
    slug: "quran-reading-hifz-kids",
    title: "Quran Reading & Hifz for Kids",
    tagline: "Build a strong connection with the Quran through guided reading and memorization",
    description: "Build a strong connection with the Quran through guided reading and memorization. Children learn to read with proper Tajweed and memorise key Surahs in a nurturing, encouraging environment.",
    level: "Beginner",
    category: "Quran",
    price: 79,
    duration: "10 weeks",
    teacher: "Ustadha Yasmeen",
    thumbnail_key: "thumb3",
    rating: 5.0,
    reviews: 62,
    featured: true,
    sort_order: 3,
    language: "English & Arabic",
    outcomes: [
      "Read the Quran with correct Tajweed",
      "Memorise selected Surahs from Juz Amma",
      "Understand the meaning of memorised Surahs",
      "Develop a lifelong love for the Quran",
      "Confident recitation in daily Salah",
    ],
    created_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
  },
];




export async function fetchCourses(): Promise<CourseRow[]> {
  let dbCourses: CourseRow[] = [];
  try {
    const { data, error } = await supabase.from("courses").select("*").order("sort_order");
    if (!error && data && data.length > 0) {
      dbCourses = data;
    }
  } catch (err) {
    // Network or table offline fallback
  }

  // Read courses dynamically created in Admin Director suite
  const dynamicCourses: CourseRow[] = [];
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("arabiyat_courses");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach((c: any, index: number) => {
            dynamicCourses.push({
              id: c.id || `course-${index + 1}`,
              slug: c.slug || (c.title ? c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : `course-${index + 1}`),
              title: c.title || "Arabic Course",
              tagline: c.description ? c.description.slice(0, 80) : "Interactive Arabic Learning",
              description: c.description || "",
              level: c.level || "Beginner",
              category: c.category || "Alphabet",
              price: Number(c.price) || 49,
              duration: c.duration || "8 weeks",
              teacher: "Ustadha Specialist",
              thumbnail_key: c.thumbnailUrl || (index % 3 === 0 ? "thumb1" : index % 3 === 1 ? "thumb2" : "thumb3"),
              rating: 4.9,
              reviews: 24 + index * 7,
              featured: index < 2,
              sort_order: index + 1,
              language: "English & Arabic",
              outcomes: Array.isArray(c.outcomes) ? c.outcomes : ["Foundational Arabic mastery", "Interactive practice"],
              created_at: "2026-09-01T00:00:00Z",
              updated_at: "2026-09-01T00:00:00Z",
            });
          });
        }
      }
    } catch (e) {
      // ignore
    }
  }

  const merged: CourseRow[] = [];
  const seenSlugs = new Set<string>();

  // Priority 1: Courses added in Admin Portal
  for (const c of dynamicCourses) {
    if (!seenSlugs.has(c.slug)) {
      seenSlugs.add(c.slug);
      merged.push(c);
    }
  }

  // Priority 2: Courses from Supabase database
  for (const c of dbCourses) {
    if (!seenSlugs.has(c.slug)) {
      seenSlugs.add(c.slug);
      merged.push(c);
    }
  }

  // Priority 3: Built-in 3 curated foundational courses
  for (const c of fallbackSeedCourses) {
    if (!seenSlugs.has(c.slug)) {
      seenSlugs.add(c.slug);
      merged.push(c);
    }
  }

  return merged;
}

export async function fetchCourseBySlug(slug: string): Promise<CourseWithCurriculum | null> {
  const allCourses = await fetchCourses();
  const course = allCourses.find((c) => c.slug === slug);
  if (!course) return null;

  try {
    const modules = await fetchCurriculum(course.id);
    if (modules && modules.length > 0) {
      return { ...course, modules };
    }
  } catch (e) {
    // continue to fallback modules
  }

  return {
    ...course,
    modules: [
      {
        id: `mod-${course.id}-1`,
        course_id: course.id,
        title: "Module 1: Foundations & Interactive Phonics",
        sort_order: 1,
        created_at: "2026-09-01T00:00:00Z",
        lessons: [
          {
            id: `les-${course.id}-1`,
            module_id: `mod-${course.id}-1`,
            title: "Lesson 1: Introduction & First Sounds",
            description: "Downloadable printable exercise worksheet included.",
            duration: "25 mins",
            sort_order: 1,
            video_url: null,
            is_free: true,
            created_at: "2026-09-01T00:00:00Z",
          },
          {
            id: `les-${course.id}-2`,
            module_id: `mod-${course.id}-1`,
            title: "Lesson 2: Daily Speaking & Vocal Practice",
            description: "Parent guidance audio track included.",
            duration: "30 mins",
            sort_order: 2,
            video_url: null,
            is_free: false,
            created_at: "2026-09-01T00:00:00Z",
          },
        ],
      },
    ],
  };
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

export async function fetchLessonCounts(): Promise<Record<string, number>> {
  try {
    const { data: modules, error: mErr } = await supabase.from("modules").select("id, course_id");
    if (mErr) throw mErr;
    const { data: lessons, error: lErr } = await supabase.from("lessons").select("module_id");
    if (lErr) throw lErr;
    const moduleToCourse = new Map((modules ?? []).map((m) => [m.id, m.course_id]));
    const counts: Record<string, number> = {};
    for (const l of lessons ?? []) {
      const courseId = moduleToCourse.get(l.module_id);
      if (courseId) counts[courseId] = (counts[courseId] ?? 0) + 1;
    }
    return counts;
  } catch (e) {
    return {
      "course-1": 16,
      "course-2": 24,
      "course-3": 20,
    };
  }
}

export async function countLessons(courseId: string) {
  const modules = await fetchCurriculum(courseId);
  return modules.reduce((n, m) => n + m.lessons.length, 0);
}

export type EnrollmentSummary = {
  course: CourseRow;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  enrolledAt: string;
};

export async function fetchMyEnrollments(userId: string): Promise<EnrollmentSummary[]> {
  const { data, error } = await supabase
    .from("enrollments")
    .select("created_at, courses(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  const { data: progress, error: pErr } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId);
  if (pErr) throw pErr;
  const done = new Set((progress ?? []).map((p) => p.lesson_id));

  const rows = (data ?? []).filter((r) => r.courses) as { created_at: string; courses: CourseRow }[];
  return Promise.all(
    rows.map(async (r) => {
      const modules = await fetchCurriculum(r.courses.id);
      const lessons = modules.flatMap((m) => m.lessons);
      const completed = lessons.filter((l) => done.has(l.id)).length;
      return {
        course: r.courses,
        totalLessons: lessons.length,
        completedLessons: completed,
        progress: lessons.length ? Math.round((completed / lessons.length) * 100) : 0,
        enrolledAt: r.created_at,
      };
    }),
  );
}

export async function isEnrolled(userId: string, courseId: string) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function createEnrollment(userId: string, courseId: string) {
  const existing = await isEnrolled(userId, courseId);
  if (existing) return;
  const { error } = await supabase.from("enrollments").insert({ user_id: userId, course_id: courseId });
  if (error) throw error;
}

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data;
}
