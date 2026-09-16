import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, User2, Tag, Share2, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { getBlogPost, getRecentPosts, blogPosts } from "@/lib/blog-data";

const SITE_URL = "https://www.arabiyatlearn.com";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Route = (createFileRoute as any)("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) {
      return {
        meta: [
          { title: "Article Not Found — ArabiyatLearn" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${post.title} — ArabiyatLearn Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/blog/${post.slug}` },
        { property: "og:site_name", content: "ArabiyatLearn" },
        { property: "og:image", content: `${SITE_URL}/arabiyat-logo.png` },
        { property: "article:published_time", content: post.publishedAt },
        { property: "article:modified_time", content: post.updatedAt },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        ...post.tags.map((tag) => ({ property: "article:tag", content: tag })),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${post.slug}` }],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const params = Route.useParams() as { slug: string };
  const { slug } = params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            This article doesn't exist or may have been moved.
          </p>
          <Button asChild>
            <a href="/blog/">View All Articles</a>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  // JSON-LD BlogPosting schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "en-GB",
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/arabiyat-logo.png`,
    },
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorTitle,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "ArabiyatLearn",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/arabiyat-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const categoryColors: Record<string, string> = {
    "Learning Tips": "bg-emerald-100 text-emerald-700",
    "Arabic for Kids": "bg-teal-100 text-teal-700",
    "Parent Guide": "bg-amber-100 text-amber-700",
    "Methods & Tools": "bg-blue-100 text-blue-700",
    "Quran & Faith": "bg-purple-100 text-purple-700",
  };
  const colorClass = categoryColors[post.category] ?? "bg-gray-100 text-gray-700";

  // Parse the markdown-like content into styled HTML elements
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4 leading-tight">
            {trimmed.slice(3)}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="text-lg font-bold text-foreground mt-8 mb-3">
            {trimmed.slice(4)}
          </h3>
        );
      }
      if (trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc list-inside space-y-2 my-4 text-foreground/80">
            {items.map((item, j) => (
              <li key={j} className="leading-relaxed">
                {item.slice(2)}
              </li>
            ))}
          </ul>
        );
      }
      if (/^\d+\./.test(trimmed)) {
        const items = trimmed.split("\n").filter((l) => /^\d+\./.test(l));
        return (
          <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-foreground/80">
            {items.map((item, j) => (
              <li key={j} className="leading-relaxed">
                {item.replace(/^\d+\.\s*/, "")}
              </li>
            ))}
          </ol>
        );
      }
      if (trimmed.startsWith("*") && trimmed.endsWith("*") && !trimmed.startsWith("**")) {
        return (
          <blockquote key={i} className="border-l-4 border-[#C8707E] pl-5 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-lg">
            {trimmed.slice(1, -1)}
          </blockquote>
        );
      }

      // Handle inline bold **text** and links [text](/path) within paragraphs
      const parts = trimmed.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, text, href] = linkMatch;
          return (
            <a
              key={j}
              href={href}
              className="text-[#0C3E35] underline underline-offset-2 hover:text-[#C8707E] transition-colors"
            >
              {text}
            </a>
          );
        }
        return part;
      });

      return (
        <p key={i} className="text-foreground/80 leading-relaxed my-4">
          {rendered}
        </p>
      );
    });
  };

  return (
    <SiteLayout>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb: Home > Blog > [Post Title] */}
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog/" },
          { label: post.title },
        ]}
      />

      {/* Article Header */}
      <div className="bg-gradient-to-br from-[#0C3E35]/5 to-[#C8707E]/5 border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-14">
          <a
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0C3E35] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </a>

          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass} mb-4 inline-block`}>
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-5">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0C3E35] flex items-center justify-center">
                <User2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-xs">{post.author}</p>
                <p className="text-xs">{post.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article content + sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <div className="text-[1.05rem]">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              <span>Share this article:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + SITE_URL + "/blog/" + post.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(SITE_URL + "/blog/" + post.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DA1F2] hover:underline"
              >
                Twitter / X
              </a>
            </div>

            {/* Prev / Next navigation */}
            <nav className="mt-12 grid grid-cols-2 gap-4" aria-label="Article navigation">
              {prevPost ? (
                <a
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-border hover:border-[#0C3E35] transition-colors"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Previous
                  </span>
                  <span className="text-sm font-medium text-foreground group-hover:text-[#0C3E35] line-clamp-2">
                    {prevPost.title}
                  </span>
                </a>
              ) : (
                <div />
              )}
              {nextPost ? (
                <a
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-border hover:border-[#0C3E35] transition-colors text-right"
                >
                  <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                    Next <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-medium text-foreground group-hover:text-[#0C3E35] line-clamp-2">
                    {nextPost.title}
                  </span>
                </a>
              ) : (
                <div />
              )}
            </nav>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            {/* CTA box */}
            <div className="bg-gradient-to-br from-[#0C3E35] to-[#1a6b57] rounded-2xl p-6 text-white text-center">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-2">
                Free Demo Class
              </p>
              <h3 className="text-lg font-bold mb-3 leading-snug">
                Let Your Child Try Arabic for Free
              </h3>
              <p className="text-sm text-white/80 mb-5">
                30-minute live class with our certified teacher. No commitment required.
              </p>
              <Button
                asChild
                size="sm"
                className="w-full bg-[#C8707E] hover:bg-[#b55e6d] text-white border-0"
              >
                <a href="/contact">Book Free Demo</a>
              </Button>
            </div>

            {/* Recent posts */}
            {recentPosts.length > 0 && (
              <div className="rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-foreground mb-4">More Articles</h3>
                <div className="space-y-4">
                  {recentPosts.map((rp) => (
                    <a
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="group block"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-[#0C3E35] line-clamp-2 leading-snug">
                        {rp.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{rp.readingTime}</p>
                    </a>
                  ))}
                </div>
                <a
                  href="/blog/"
                  className="text-xs text-[#0C3E35] hover:underline mt-5 inline-block"
                >
                  View all articles →
                </a>
              </div>
            )}

            {/* Course promo */}
            <div className="rounded-2xl border border-border p-5 bg-muted/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                Featured Course
              </p>
              <h3 className="text-sm font-bold text-foreground mb-2">
                Arabic Alphabet & Phonics Playground
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Our most popular course for beginners aged 5–10.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href="/courses/arabic-alphabet-phonics">
                  View Course <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
