import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Learn",
    items: [
      { label: "Courses", to: "/courses" },
      { label: "Free Lessons", to: "/resources" },
      { label: "Resources", to: "/resources" },
      { label: "How It Works", to: "/how-it-works" },
    ],
  },
  {
    title: "About",
    items: [
      { label: "About the Teacher", to: "/about" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help Center", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="rounded-2xl bg-background/95 p-3">
            <Logo />
          </div>
          <p className="mt-4 text-sm text-primary-foreground/80">
            Helping English-speaking children learn Arabic, speak with confidence and grow.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-base font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              {col.items.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="transition-colors hover:text-gold">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/70">
        © 2026 Arabiyat Learn. All rights reserved.
      </div>
    </footer>
  );
}
