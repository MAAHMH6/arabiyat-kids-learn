#!/usr/bin/env node
/**
 * ArabiyatLearn Pre-render Script
 * ================================
 * Generates static HTML snapshots for all public pages into public/_static/
 * These are served as CDN-first fallbacks so Googlebot reads complete content
 * even before JavaScript hydrates. TanStack Start already SSRs, but this
 * gives belt-and-suspenders Wave 1 crawling insurance.
 *
 * Run: node scripts/prerender.mjs (or as part of npm run build)
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITE_URL = "https://www.arabiyatlearn.com";

// ============================================================
// Page definitions — every public URL with its meta content
// ============================================================
const pages = [
  {
    path: "/",
    title: "ArabiyatLearn — Arabic Made Simple for Kids",
    description: "Live 1-on-1 Arabic classes for English-speaking children. Learn Quran, Saudi Arabic, and foundational Arabic with certified female teachers.",
    type: "WebSite",
    breadcrumbs: [],
  },
  {
    path: "/courses",
    title: "Arabic Courses & Live Classes for Kids — ArabiyatLearn",
    description: "Browse Arabic and Quran courses for English-speaking children aged 4–15. Alphabet, Saudi Spoken Arabic, and Quran Reading & Hifz.",
    type: "CollectionPage",
    breadcrumbs: [{ name: "Courses", url: "/courses" }],
  },
  {
    path: "/courses/arabic-alphabet-phonics",
    title: "Arabic Alphabet & Phonics Playground — ArabiyatLearn",
    description: "An interactive journey through the 28 Arabic letters with fun phonetic games, shape recognition, and foundational sounds for children.",
    type: "Course",
    breadcrumbs: [
      { name: "Courses", url: "/courses" },
      { name: "Arabic Alphabet & Phonics Playground", url: "/courses/arabic-alphabet-phonics" },
    ],
  },
  {
    path: "/courses/saudi-spoken-arabic",
    title: "Saudi Spoken Arabic — ArabiyatLearn",
    description: "Learn to speak Arabic naturally for everyday communication in Saudi Arabia. Practical vocabulary and the Saudi dialect used daily.",
    type: "Course",
    breadcrumbs: [
      { name: "Courses", url: "/courses" },
      { name: "Saudi Spoken Arabic", url: "/courses/saudi-spoken-arabic" },
    ],
  },
  {
    path: "/courses/quran-reading-hifz-kids",
    title: "Quran Reading & Hifz for Kids — ArabiyatLearn",
    description: "Build a strong connection with the Quran through guided reading and memorization with certified Arabic teachers.",
    type: "Course",
    breadcrumbs: [
      { name: "Courses", url: "/courses" },
      { name: "Quran Reading & Hifz for Kids", url: "/courses/quran-reading-hifz-kids" },
    ],
  },
  {
    path: "/quran-learning",
    title: "Quran Learning for Kids — Live 1-on-1 Classes — ArabiyatLearn",
    description: "Live 1-on-1 Quran reading, Tajweed, and Hifz classes for children with certified female Arab teachers.",
    type: "WebPage",
    breadcrumbs: [{ name: "Quran Learning", url: "/quran-learning" }],
  },
  {
    path: "/how-it-works",
    title: "How It Works — ArabiyatLearn Arabic Classes",
    description: "Start in four simple steps: book a free trial, get assessed, join a live cohort, and track progress with certified Arabic teachers.",
    type: "WebPage",
    breadcrumbs: [{ name: "How It Works", url: "/how-it-works" }],
  },
  {
    path: "/about",
    title: "About Us — Meet Ustadha Arabiyat",
    description: "Meet the certified Arabic teachers behind ArabiyatLearn — dedicated to making Arabic accessible, enjoyable and meaningful for children.",
    type: "AboutPage",
    breadcrumbs: [{ name: "About", url: "/about" }],
  },
  {
    path: "/faq",
    title: "Parent FAQs — ArabiyatLearn Live Arabic Academy",
    description: "Answers to parent questions about live Arabic classes, age groups, certified teachers, scheduling, and sibling discounts.",
    type: "FAQPage",
    breadcrumbs: [{ name: "FAQ", url: "/faq" }],
  },
  {
    path: "/contact",
    title: "Book a Free Trial or Contact Us — ArabiyatLearn",
    description: "Book a complimentary 25-minute live Arabic trial class for your child. Meet the teacher and get a personalised learning plan.",
    type: "ContactPage",
    breadcrumbs: [{ name: "Contact", url: "/contact" }],
  },
  {
    path: "/blog/",
    title: "Arabic Learning Blog — Tips & Guides for Parents — ArabiyatLearn",
    description: "Educational articles, parent guides, and teaching tips to help your child learn Arabic at home and in class.",
    type: "Blog",
    breadcrumbs: [{ name: "Blog", url: "/blog/" }],
  },
  // Blog posts
  {
    path: "/blog/how-to-teach-arabic-to-kids-at-home",
    title: "How to Teach Arabic to Kids at Home — ArabiyatLearn Blog",
    description: "Practical strategies for parents to help children learn Arabic at home, from flashcards to daily conversations.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "How to Teach Arabic to Kids at Home", url: "/blog/how-to-teach-arabic-to-kids-at-home" },
    ],
  },
  {
    path: "/blog/best-age-to-start-arabic",
    title: "Best Age to Start Learning Arabic — ArabiyatLearn Blog",
    description: "Research-backed guidance on the optimal age for children to begin learning Arabic as a second language.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "Best Age to Start Learning Arabic", url: "/blog/best-age-to-start-arabic" },
    ],
  },
  {
    path: "/blog/arabic-for-muslim-kids",
    title: "Why Arabic Matters for Muslim Kids — ArabiyatLearn Blog",
    description: "The spiritual and practical importance of Arabic for Muslim children growing up in English-speaking countries.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "Why Arabic Matters for Muslim Kids", url: "/blog/arabic-for-muslim-kids" },
    ],
  },
  {
    path: "/blog/quran-memorisation-tips-for-children",
    title: "Quran Memorisation Tips for Children — ArabiyatLearn Blog",
    description: "Practical tips and strategies to help children memorise the Quran effectively and joyfully.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "Quran Memorisation Tips for Children", url: "/blog/quran-memorisation-tips-for-children" },
    ],
  },
  {
    path: "/blog/arabic-alphabet-learning-activities",
    title: "Arabic Alphabet Learning Activities for Kids — ArabiyatLearn Blog",
    description: "Fun and creative activities to help children learn the Arabic alphabet through play and hands-on exercises.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "Arabic Alphabet Learning Activities", url: "/blog/arabic-alphabet-learning-activities" },
    ],
  },
  {
    path: "/blog/online-arabic-classes-vs-apps",
    title: "Online Arabic Classes vs Apps — Which is Better? — ArabiyatLearn Blog",
    description: "Comparing live teacher-led Arabic classes with self-paced apps to find the best learning method for children.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "Online Arabic Classes vs Apps", url: "/blog/online-arabic-classes-vs-apps" },
    ],
  },
  {
    path: "/blog/tajweed-rules-explained-for-beginners",
    title: "Tajweed Rules Explained for Beginners — ArabiyatLearn Blog",
    description: "A beginner-friendly guide to Tajweed rules that makes Quran recitation beautiful and correct.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "Tajweed Rules Explained for Beginners", url: "/blog/tajweed-rules-explained-for-beginners" },
    ],
  },
  {
    path: "/blog/how-to-make-arabic-fun-for-kids",
    title: "How to Make Arabic Fun for Kids — ArabiyatLearn Blog",
    description: "Creative ideas and teaching strategies to keep children engaged and excited about learning Arabic.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "How to Make Arabic Fun for Kids", url: "/blog/how-to-make-arabic-fun-for-kids" },
    ],
  },
  {
    path: "/blog/arabic-learning-progress-milestones",
    title: "Arabic Learning Progress Milestones for Kids — ArabiyatLearn Blog",
    description: "A milestone guide for parents to track their child's Arabic learning journey from beginner to fluency.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "Arabic Learning Progress Milestones", url: "/blog/arabic-learning-progress-milestones" },
    ],
  },
  {
    path: "/blog/saudi-arabic-dialect-guide",
    title: "Saudi Arabic Dialect Guide for Beginners — ArabiyatLearn Blog",
    description: "An introduction to Saudi Arabic dialect — key differences from Modern Standard Arabic and phrases for everyday use.",
    type: "BlogPosting",
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: "Saudi Arabic Dialect Guide", url: "/blog/saudi-arabic-dialect-guide" },
    ],
  },
];

// ============================================================
// HTML template generator
// ============================================================
function generateHtml(page) {
  const canonicalUrl = `${SITE_URL}${page.path}`;
  const allCrumbs = [{ name: "Home", url: "/" }, ...page.breadcrumbs];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allCrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.url}`,
    })),
  };

  const breadcrumbHtml = allCrumbs
    .map((crumb, i) => {
      const isLast = i === allCrumbs.length - 1;
      const sep = i > 0 ? ' <span aria-hidden="true" style="margin:0 4px;color:#aaa">/</span> ' : "";
      if (isLast) {
        return `${sep}<span aria-current="page" style="color:#0C3E35;font-weight:600">${crumb.name}</span>`;
      }
      return `${sep}<a href="${crumb.url}" style="color:#555;text-decoration:none">${crumb.name}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.title}</title>
  <meta name="description" content="${page.description}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${SITE_URL}/arabiyat-logo.png" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${page.title}" />
  <meta name="twitter:description" content="${page.description}" />
  <!-- BreadcrumbList schema -->
  <script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
</head>
<body>
  <!-- Visible breadcrumb for Googlebot -->
  <nav aria-label="Breadcrumb" style="font-family:sans-serif;font-size:14px;padding:12px 16px;background:#fff;border-bottom:1px solid #eee">
    ${breadcrumbHtml}
  </nav>
  <p style="font-family:sans-serif;padding:24px;color:#555">
    Loading ArabiyatLearn — Arabic Made Simple for Kids…
  </p>
  <!-- The React app hydrates here. This file is the static snapshot for search engine crawlers. -->
  <noscript>
    <p style="font-family:sans-serif;padding:24px">
      Please enable JavaScript to use ArabiyatLearn's interactive Arabic learning platform.
      Visit <a href="${canonicalUrl}">${page.title}</a>.
    </p>
  </noscript>
</body>
</html>`;
}

// ============================================================
// Write files
// ============================================================
let count = 0;
for (const page of pages) {
  const urlPath = page.path === "/" ? "" : page.path.replace(/\/$/, "");
  const dir = join(ROOT, "public", "_static", urlPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const filePath = join(dir, "index.html");
  writeFileSync(filePath, generateHtml(page), "utf-8");
  count++;
  console.log(`  ✓ ${page.path}`);
}

console.log(`\n✅ Pre-rendered ${count} pages to public/_static/`);
console.log("   Googlebot will find complete HTML on Wave 1 crawl.\n");
