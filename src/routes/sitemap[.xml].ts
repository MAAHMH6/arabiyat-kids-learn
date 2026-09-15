// src/routes/sitemap[.xml].ts
// Dynamic XML sitemap served at /sitemap.xml
// Uses TanStack Start's server handler pattern (no /api subpath needed)

import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/lib/blog-data";
import { fallbackSeedCourses } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";

const SITE_URL = "https://arabiyatlearn.com";
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

type SitemapEntry = {
  url: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
};

function buildXml(entries: SitemapEntry[]): string {
  const urlsXml = entries
    .map((e) =>
      [
        "  <url>",
        `    <loc>${e.url}</loc>`,
        `    <lastmod>${e.lastmod}</lastmod>`,
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        "  </url>",
      ].join("\n"),
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    urlsXml,
    "</urlset>",
  ].join("\n");
}

async function generateSitemapXml(): Promise<string> {
  // --- Static pages ---
  const staticEntries: SitemapEntry[] = [
    { url: `${SITE_URL}/`, lastmod: TODAY, changefreq: "weekly", priority: "1.0" },
    { url: `${SITE_URL}/courses/`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
    { url: `${SITE_URL}/blog/`, lastmod: TODAY, changefreq: "daily", priority: "0.9" },
    { url: `${SITE_URL}/about`, lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
    { url: `${SITE_URL}/how-it-works`, lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
    { url: `${SITE_URL}/faq`, lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
    { url: `${SITE_URL}/contact`, lastmod: TODAY, changefreq: "monthly", priority: "0.7" },
    { url: `${SITE_URL}/resources`, lastmod: TODAY, changefreq: "monthly", priority: "0.7" },
    { url: `${SITE_URL}/parent`, lastmod: TODAY, changefreq: "monthly", priority: "0.6" },
    { url: `${SITE_URL}/login`, lastmod: TODAY, changefreq: "yearly", priority: "0.3" },
    { url: `${SITE_URL}/privacy`, lastmod: TODAY, changefreq: "yearly", priority: "0.2" },
    { url: `${SITE_URL}/terms`, lastmod: TODAY, changefreq: "yearly", priority: "0.2" },
  ];

  // --- Course pages (try Supabase, fall back to seed data) ---
  let courseSlugs: string[] = fallbackSeedCourses.map((c) => c.slug);
  try {
    const { data } = await supabase.from("courses").select("slug");
    if (data && data.length > 0) {
      courseSlugs = data.map((c) => c.slug);
    }
  } catch {
    // silently use fallback
  }

  const courseEntries: SitemapEntry[] = courseSlugs.map((slug) => ({
    url: `${SITE_URL}/courses/${slug}`,
    lastmod: TODAY,
    changefreq: "monthly",
    priority: "0.8",
  }));

  // --- Blog post pages ---
  const blogEntries: SitemapEntry[] = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.updatedAt,
    changefreq: "monthly",
    priority: "0.7",
  }));

  return buildXml([...staticEntries, ...courseEntries, ...blogEntries]);
}

// ---- TanStack Start: serve as a raw Response from a loader ----
// The route component returns null, but the loader returns an XML Response
// intercepted by the router before rendering.
export const Route = createFileRoute("/sitemap.xml")({
  loader: async () => {
    const xml = await generateSitemapXml();
    // Throw a Response so TanStack Start short-circuits rendering
    throw new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=43200, s-maxage=43200",
      },
    });
  },
  component: () => null,
});
