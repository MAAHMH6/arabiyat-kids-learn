import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Rss, Tag } from "lucide-react";
import { SiteLayout, PageHeader, SectionHeading } from "@/components/site/SiteLayout";
import { BlogCard } from "@/components/site/BlogCard";
import { Button } from "@/components/ui/button";
import { blogPosts, blogCategories, getPostsByCategory, type BlogCategory } from "@/lib/blog-data";

const SITE_URL = "https://arabiyatlearn.com";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Arabic Learning Blog for Parents & Children — ArabiyatLearn" },
      {
        name: "description",
        content:
          "Expert Arabic learning tips, guides and resources from a certified Arabic teacher. Everything parents need to know about teaching their children Arabic.",
      },
      { property: "og:title", content: "Arabic Learning Blog — ArabiyatLearn" },
      {
        property: "og:description",
        content:
          "Tips, guides and resources for parents teaching their children Arabic. Written by a certified Arabic teacher.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:site_name", content: "ArabiyatLearn" },
      { property: "og:image", content: `${SITE_URL}/arabiyat-logo.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Arabic Learning Blog — ArabiyatLearn" },
      {
        name: "twitter:description",
        content: "Expert guides for parents teaching their children Arabic.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  const filteredPosts = getPostsByCategory(activeCategory);
  const featuredPosts = blogPosts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured || activeCategory !== "All");

  // JSON-LD for Blog / CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ArabiyatLearn Blog",
    description: "Expert Arabic learning tips, guides and resources from a certified Arabic teacher.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "ArabiyatLearn",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/arabiyat-logo.png` },
    },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      author: {
        "@type": "Person",
        name: p.author,
        jobTitle: p.authorTitle,
      },
    })),
  };

  return (
    <SiteLayout>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Arabic Learning Blog"
        title="Tips, Guides & Resources for Parents"
        subtitle="Expert advice from a certified Arabic teacher to help your English-speaking child learn Arabic with confidence."
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Featured posts — shown on All tab */}
        {activeCategory === "All" && featuredPosts.length > 0 && (
          <section className="mb-16">
            <SectionHeading
              eyebrow="Featured Articles"
              title="Start Here"
              subtitle="Our most-read guides for parents just beginning the Arabic journey."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-[#0C3E35] text-white border-[#0C3E35]"
                  : "bg-white text-foreground border-border hover:border-[#0C3E35] hover:text-[#0C3E35]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* All / filtered posts */}
        <section className="mb-16">
          {activeCategory === "All" && (
            <SectionHeading eyebrow="All Articles" title="Browse Everything" />
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No articles in this category yet.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-sm text-[#0C3E35] underline underline-offset-2"
              >
                View all articles
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border rounded-2xl border border-border bg-card p-4 shadow-sm">
              {(activeCategory === "All" ? regularPosts : filteredPosts).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#0C3E35] to-[#1a6b57] rounded-3xl px-8 py-12 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Rss className="h-5 w-5 opacity-70" />
            <span className="text-sm font-semibold uppercase tracking-widest opacity-70">Ready to Start?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 max-w-lg mx-auto">
            Give Your Child the Gift of Arabic
          </h2>
          <p className="text-white/80 max-w-md mx-auto mb-8">
            Book a free 30-minute demo class and let your child experience how fun Arabic can be.
          </p>
          <Button asChild size="lg" className="bg-[#C8707E] hover:bg-[#b55e6d] text-white border-0">
            <Link to="/contact">
              Book Free Demo Class <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </SiteLayout>
  );
}
