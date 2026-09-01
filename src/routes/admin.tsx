import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell, StatCard } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { fetchCourses, fetchCurriculum, fetchResources, thumbKeys } from "@/lib/db";
import type { CourseRow, LessonRow, ModuleRow, ResourceRow } from "@/lib/db";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Panel — Arabiyat Learn" },
      { name: "description", content: "Manage Arabic courses, lessons, videos, students and free resources." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Panel — Arabiyat Learn" },
      { property: "og:description", content: "Teacher tools for courses, students and resources." },
    ],
  }),
  component: AdminPanel,
});

function AdminPanel() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const qc = useQueryClient();

  if (loading) return <div className="p-10 text-sm text-muted-foreground">Loading…</div>;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Admin sign in required</h1>
          <p className="mt-2 text-sm text-muted-foreground">Please sign in with the teacher account.</p>
          <Button asChild className="mt-6 rounded-xl bg-primary hover:bg-emerald">
            <Link to="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-2xl font-bold text-primary">No admin access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account is not an administrator. If you are the teacher and no admin exists yet, you can claim admin
            access once.
          </p>
          <Button
            disabled={claiming}
            className="mt-6 rounded-xl bg-primary hover:bg-emerald"
            onClick={async () => {
              setClaiming(true);
              const { data, error } = await supabase.rpc("claim_first_admin");
              setClaiming(false);
              if (error || !data) {
                toast.error("An administrator already exists for this site.");
                return;
              }
              toast.success("You are now an administrator");
              window.location.reload();
            }}
          >
            Claim admin access
          </Button>
          <div className="mt-4">
            <Button variant="outline" className="rounded-xl" onClick={() => void signOut()}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminContent onSignOut={() => void signOut()} qcInvalidate={() => void qc.invalidateQueries()} />;
}

function AdminContent({ onSignOut }: { onSignOut: () => void; qcInvalidate: () => void }) {
  const courses = useQuery({ queryKey: ["admin", "courses"], queryFn: fetchCourses });
  const resources = useQuery({ queryKey: ["admin", "resources"], queryFn: fetchResources });
  const students = useQuery({
    queryKey: ["admin", "students"],
    queryFn: async () => {
      const [{ data: profiles }, { data: enrollments }] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("enrollments").select("id, course_id, user_id, status"),
      ]);
      return { profiles: profiles ?? [], enrollments: enrollments ?? [] };
    },
  });

  const catalogueValue = (courses.data ?? []).reduce((s, c) => s + Number(c.price), 0);

  return (
    <DashboardShell
      title="Admin Panel"
      subtitle="Manage courses, lesson videos, resources and students."
      items={[
        { label: "Overview", active: true },
        { label: "Parent Dashboard", to: "/parent" },
        { label: "Student Dashboard", to: "/dashboard" },
        { label: "Public site", to: "/" },
      ]}
    >
      <div className="mb-8 flex justify-end">
        <Button variant="outline" className="rounded-xl" onClick={onSignOut}>
          Sign out
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <StatCard label="Courses" value={String(courses.data?.length ?? 0)} />
        <StatCard label="Parents" value={String(students.data?.profiles.length ?? 0)} />
        <StatCard label="Enrolments" value={String(students.data?.enrollments.length ?? 0)} />
        <StatCard label="Catalogue value" value={`$${catalogueValue}`} />
      </div>

      <Tabs defaultValue="courses" className="mt-10">
        <TabsList className="rounded-2xl">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="curriculum">Lessons & Videos</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6">
          <CoursesTab courses={courses.data ?? []} />
        </TabsContent>
        <TabsContent value="curriculum" className="mt-6">
          <CurriculumTab courses={courses.data ?? []} />
        </TabsContent>
        <TabsContent value="resources" className="mt-6">
          <ResourcesTab resources={resources.data ?? []} />
        </TabsContent>
        <TabsContent value="students" className="mt-6">
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-cream/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Parent</th>
                  <th className="px-6 py-3">Child</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Enrolments</th>
                </tr>
              </thead>
              <tbody>
                {(students.data?.profiles ?? []).map((p) => (
                  <tr key={p.id} className="border-t border-border/60">
                    <td className="px-6 py-3">{p.parent_name ?? "—"}</td>
                    <td className="px-6 py-3">{p.child_name ?? "—"}</td>
                    <td className="px-6 py-3">{p.email ?? "—"}</td>
                    <td className="px-6 py-3">
                      {(students.data?.enrollments ?? []).filter((e) => e.user_id === p.id).length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(students.data?.profiles.length ?? 0) === 0 && (
              <p className="px-6 py-10 text-center text-sm text-muted-foreground">No parent accounts yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

/* ---------------- Courses ---------------- */

const emptyCourse = {
  slug: "",
  title: "",
  tagline: "",
  description: "",
  thumbnail_key: "thumb1",
  level: "Beginner",
  category: "Beginner",
  duration: "",
  price: 0,
  language: "English + Arabic",
  teacher: "Ustadha Arabiyat",
  featured: false,
  sort_order: 0,
};

function CoursesTab({ courses }: { courses: CourseRow[] }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<CourseRow> | null>(null);

  const save = useMutation({
    mutationFn: async (course: Partial<CourseRow>) => {
      const payload = {
        slug: course.slug ?? "",
        title: course.title ?? "",
        tagline: course.tagline ?? "",
        description: course.description ?? "",
        thumbnail_key: course.thumbnail_key ?? "thumb1",
        level: course.level ?? "Beginner",
        category: course.category ?? "Beginner",
        duration: course.duration ?? "",
        price: Number(course.price ?? 0),
        language: course.language ?? "English + Arabic",
        teacher: course.teacher ?? "Ustadha Arabiyat",
        featured: Boolean(course.featured),
        sort_order: Number(course.sort_order ?? 0),
      };
      const { error } = course.id
        ? await supabase.from("courses").update(payload).eq("id", course.id)
        : await supabase.from("courses").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Course saved");
      setEditing(null);
      void qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Course deleted");
      void qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Button className="rounded-xl bg-primary hover:bg-emerald" onClick={() => setEditing({ ...emptyCourse })}>
          <Plus className="mr-2 h-4 w-4" /> Add course
        </Button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-cream/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Level</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t border-border/60">
                <td className="px-6 py-3 font-medium text-primary">{c.title}</td>
                <td className="px-6 py-3">{c.level}</td>
                <td className="px-6 py-3">${c.price}</td>
                <td className="px-6 py-3 text-right">
                  <Button size="sm" variant="outline" className="mr-2 rounded-lg" onClick={() => setEditing(c)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg text-destructive"
                    onClick={() => {
                      if (confirm(`Delete "${c.title}" and all its lessons?`)) remove.mutate(c.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit course" : "New course"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <Field label="Title" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field
                label="URL slug"
                value={editing.slug ?? ""}
                onChange={(v) => setEditing({ ...editing, slug: v.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
              />
              <Field
                label="Tagline"
                value={editing.tagline ?? ""}
                onChange={(v) => setEditing({ ...editing, tagline: v })}
              />
              <div>
                <Label>Description</Label>
                <Textarea
                  className="mt-2 rounded-xl"
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Level" value={editing.level ?? ""} onChange={(v) => setEditing({ ...editing, level: v })} />
                <Field
                  label="Category"
                  value={editing.category ?? ""}
                  onChange={(v) => setEditing({ ...editing, category: v })}
                />
                <Field
                  label="Duration"
                  value={editing.duration ?? ""}
                  onChange={(v) => setEditing({ ...editing, duration: v })}
                />
                <Field
                  label="Price (USD)"
                  value={String(editing.price ?? 0)}
                  onChange={(v) => setEditing({ ...editing, price: Number(v) || 0 })}
                />
                <div>
                  <Label>Thumbnail</Label>
                  <select
                    className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    value={editing.thumbnail_key ?? "thumb1"}
                    onChange={(e) => setEditing({ ...editing, thumbnail_key: e.target.value })}
                  >
                    {thumbKeys.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
                <Field
                  label="Sort order"
                  value={String(editing.sort_order ?? 0)}
                  onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(editing.featured)}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                Featured on the home page
              </label>
            </div>
          )}
          <DialogFooter>
            <Button
              className="rounded-xl bg-primary hover:bg-emerald"
              disabled={save.isPending}
              onClick={() => editing && save.mutate(editing)}
            >
              Save course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- Curriculum ---------------- */

function CurriculumTab({ courses }: { courses: CourseRow[] }) {
  const qc = useQueryClient();
  const [courseId, setCourseId] = useState<string>("");
  const [editingLesson, setEditingLesson] = useState<(Partial<LessonRow> & { module_id: string }) | null>(null);

  useEffect(() => {
    if (!courseId && courses[0]) setCourseId(courses[0].id);
  }, [courses, courseId]);

  const curriculum = useQuery({
    queryKey: ["admin", "curriculum", courseId],
    queryFn: () => fetchCurriculum(courseId),
    enabled: !!courseId,
  });

  const addModule = useMutation({
    mutationFn: async () => {
      const title = prompt("Module title", `Module ${(curriculum.data?.length ?? 0) + 1}`);
      if (!title) return;
      const { error } = await supabase
        .from("modules")
        .insert({ course_id: courseId, title, sort_order: (curriculum.data?.length ?? 0) + 1 });
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "curriculum"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const removeModule = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("modules").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Module deleted");
      void qc.invalidateQueries({ queryKey: ["admin", "curriculum"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveLesson = useMutation({
    mutationFn: async (lesson: Partial<LessonRow> & { module_id: string }) => {
      const payload = {
        module_id: lesson.module_id,
        title: lesson.title ?? "",
        description: lesson.description ?? "",
        duration: lesson.duration ?? "",
        is_free: Boolean(lesson.is_free),
        video_url: lesson.video_url?.trim() ? lesson.video_url.trim() : null,
        sort_order: Number(lesson.sort_order ?? 0),
      };
      const { error } = lesson.id
        ? await supabase.from("lessons").update(payload).eq("id", lesson.id)
        : await supabase.from("lessons").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Lesson saved");
      setEditingLesson(null);
      void qc.invalidateQueries({ queryKey: ["admin", "curriculum"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeLesson = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("lessons").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Lesson deleted");
      void qc.invalidateQueries({ queryKey: ["admin", "curriculum"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <select
          className="rounded-xl border border-border bg-background px-4 py-2 text-sm"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <Button variant="outline" className="rounded-xl" onClick={() => addModule.mutate()}>
          <Plus className="mr-2 h-4 w-4" /> Add module
        </Button>
      </div>

      <div className="mt-6 space-y-6">
        {(curriculum.data ?? []).map((m: ModuleRow & { lessons: LessonRow[] }) => (
          <div key={m.id} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-primary">{m.title}</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg"
                  onClick={() =>
                    setEditingLesson({
                      module_id: m.id,
                      title: "",
                      description: "",
                      duration: "10 min",
                      is_free: false,
                      video_url: "",
                      sort_order: m.lessons.length + 1,
                    })
                  }
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Lesson
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg text-destructive"
                  onClick={() => {
                    if (confirm(`Delete module "${m.title}"?`)) removeModule.mutate(m.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {m.lessons.map((l) => (
                <li
                  key={l.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-primary">{l.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {l.duration} · {l.is_free ? "Free preview" : "Enrolled only"} ·{" "}
                      {l.video_url ? l.video_url : "No video yet"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => setEditingLesson({ ...l, module_id: m.id })}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-destructive"
                      onClick={() => {
                        if (confirm(`Delete lesson "${l.title}"?`)) removeLesson.mutate(l.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </li>
              ))}
              {m.lessons.length === 0 && <p className="text-sm text-muted-foreground">No lessons yet.</p>}
            </ul>
          </div>
        ))}
      </div>

      <Dialog open={!!editingLesson} onOpenChange={(o) => !o && setEditingLesson(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingLesson?.id ? "Edit lesson" : "New lesson"}</DialogTitle>
          </DialogHeader>
          {editingLesson && (
            <div className="space-y-3">
              <Field
                label="Title"
                value={editingLesson.title ?? ""}
                onChange={(v) => setEditingLesson({ ...editingLesson, title: v })}
              />
              <div>
                <Label>Description</Label>
                <Textarea
                  className="mt-2 rounded-xl"
                  value={editingLesson.description ?? ""}
                  onChange={(e) => setEditingLesson({ ...editingLesson, description: e.target.value })}
                />
              </div>
              <Field
                label="Video link (MP4, YouTube or Vimeo URL)"
                value={editingLesson.video_url ?? ""}
                onChange={(v) => setEditingLesson({ ...editingLesson, video_url: v })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Duration"
                  value={editingLesson.duration ?? ""}
                  onChange={(v) => setEditingLesson({ ...editingLesson, duration: v })}
                />
                <Field
                  label="Sort order"
                  value={String(editingLesson.sort_order ?? 0)}
                  onChange={(v) => setEditingLesson({ ...editingLesson, sort_order: Number(v) || 0 })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(editingLesson.is_free)}
                  onChange={(e) => setEditingLesson({ ...editingLesson, is_free: e.target.checked })}
                />
                Free preview lesson (visible to everyone)
              </label>
            </div>
          )}
          <DialogFooter>
            <Button
              className="rounded-xl bg-primary hover:bg-emerald"
              disabled={saveLesson.isPending}
              onClick={() => editingLesson && saveLesson.mutate(editingLesson)}
            >
              Save lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- Resources ---------------- */

function ResourcesTab({ resources }: { resources: ResourceRow[] }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<ResourceRow> | null>(null);

  const save = useMutation({
    mutationFn: async (r: Partial<ResourceRow>) => {
      const payload = {
        title: r.title ?? "",
        category: r.category ?? "Arabic Worksheets",
        description: r.description ?? "",
        file_url: r.file_url?.trim() ? r.file_url.trim() : null,
        sort_order: Number(r.sort_order ?? 0),
      };
      const { error } = r.id
        ? await supabase.from("resources").update(payload).eq("id", r.id)
        : await supabase.from("resources").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Resource saved");
      setEditing(null);
      void qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Resource deleted");
      void qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Button
          className="rounded-xl bg-primary hover:bg-emerald"
          onClick={() =>
            setEditing({ title: "", category: "Arabic Worksheets", description: "", file_url: "", sort_order: resources.length + 1 })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Add resource
        </Button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-cream/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">File link</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-t border-border/60">
                <td className="px-6 py-3 font-medium text-primary">{r.title}</td>
                <td className="px-6 py-3">{r.category}</td>
                <td className="max-w-[220px] truncate px-6 py-3 text-muted-foreground">{r.file_url ?? "—"}</td>
                <td className="px-6 py-3 text-right">
                  <Button size="sm" variant="outline" className="mr-2 rounded-lg" onClick={() => setEditing(r)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg text-destructive"
                    onClick={() => {
                      if (confirm(`Delete "${r.title}"?`)) remove.mutate(r.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit resource" : "New resource"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-3">
              <Field label="Title" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field
                label="Category"
                value={editing.category ?? ""}
                onChange={(v) => setEditing({ ...editing, category: v })}
              />
              <div>
                <Label>Description</Label>
                <Textarea
                  className="mt-2 rounded-xl"
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
              <Field
                label="Download link (PDF or file URL)"
                value={editing.file_url ?? ""}
                onChange={(v) => setEditing({ ...editing, file_url: v })}
              />
              <Field
                label="Sort order"
                value={String(editing.sort_order ?? 0)}
                onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })}
              />
            </div>
          )}
          <DialogFooter>
            <Button
              className="rounded-xl bg-primary hover:bg-emerald"
              disabled={save.isPending}
              onClick={() => editing && save.mutate(editing)}
            >
              Save resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input className="mt-2 rounded-xl" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
