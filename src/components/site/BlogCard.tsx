import { Link } from "@tanstack/react-router";
import { Clock, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const categoryColors: Record<string, string> = {
    "Learning Tips": "bg-emerald-100 text-emerald-700",
    "Arabic for Kids": "bg-teal-100 text-teal-700",
    "Parent Guide": "bg-amber-100 text-amber-700",
    "Methods & Tools": "bg-blue-100 text-blue-700",
    "Quran & Faith": "bg-purple-100 text-purple-700",
  };
  const colorClass = categoryColors[post.category] ?? "bg-gray-100 text-gray-700";

  if (featured) {
    return (
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group block rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
        aria-label={`Read: ${post.title}`}
      >
        {/* Cover image placeholder */}
        <div className="relative h-52 bg-gradient-to-br from-[#0C3E35] to-[#1a6b57] flex items-center justify-center overflow-hidden">
          <span className="text-6xl opacity-20 select-none font-arabic">عربي</span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}>
            {post.category}
          </span>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-bold text-foreground leading-snug group-hover:text-[#0C3E35] transition-colors line-clamp-2 mb-2">
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime}</span>
            </div>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex gap-4 py-5 border-b border-border last:border-0 hover:bg-muted/30 transition-colors px-2 -mx-2 rounded-lg"
      aria-label={`Read: ${post.title}`}
    >
      {/* Colour swatch instead of image */}
      <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#0C3E35]/10 to-[#C8707E]/10 flex items-center justify-center">
        <Tag className="h-6 w-6 text-[#0C3E35]/40" />
      </div>

      <div className="flex-1 min-w-0">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClass} mb-1 inline-block`}>
          {post.category}
        </span>
        <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-[#0C3E35] transition-colors line-clamp-2 mb-1">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{post.readingTime}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
