const SITE_URL = "https://www.arabiyatlearn.com";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Renders:
 * 1. Visible HTML breadcrumb nav (Home > Courses > Arabic Alphabet)
 * 2. Inline JSON-LD BreadcrumbList schema for Google
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visible breadcrumb nav */}
      <nav
        aria-label="Breadcrumb"
        className={`max-w-6xl mx-auto px-4 pt-6 pb-2 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span className="text-muted-foreground/50 select-none">/</span>
                )}
                {isLast || !item.href ? (
                  <span
                    className={isLast ? "font-medium text-foreground" : ""}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="hover:text-[#0C3E35] hover:underline underline-offset-2 transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
