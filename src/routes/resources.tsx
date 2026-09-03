import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { fetchResources } from "@/lib/db";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Free Arabic Resources for Kids — Arabiyat Learn" },
      {
        name: "description",
        content: "Free printable Arabic worksheets, flashcards, vocabulary lists and practice activities for children.",
      },
      { property: "og:title", content: "Free Arabic Resources for Kids — Arabiyat Learn" },
      { property: "og:description", content: "Printable worksheets, flashcards and practice activities." },
    ],
  }),
  component: Resources,
});

function Resources() {
  const [cat, setCat] = useState("All");
  const { data: resources = [], isLoading } = useQuery({ queryKey: ["resources"], queryFn: fetchResources });

  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];
  const visible = resources.filter((r) => cat === "All" || r.category === cat);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Free Resources"
        title="Practice Arabic at Home"
        subtitle="Free worksheets and activities parents can print and use alongside the courses."
      />
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-9 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/80 hover:border-primary/40",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground">Loading resources…</p>
        ) : visible.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">No resources published yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((r) => (
              <div key={r.id} className="card-lift rounded-3xl border border-border/70 bg-card p-7 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-soft text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-emerald">
                  {r.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                {r.file_url ? (
                  <Button asChild variant="outline" className="mt-5 w-full rounded-xl">
                    <a href={r.file_url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Download Worksheet
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="mt-5 w-full rounded-xl"
                    onClick={() =>
                      toast("Coming soon", { description: "This worksheet will be available to download shortly." })
                    }
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Worksheet
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
