import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Phone } from "lucide-react";
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
          <a
            href="tel:+923098444501"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4" /> 03098444501
          </a>
          <div className="mt-4 flex items-center gap-3" aria-label="Social media links">
            <a
              href="https://www.instagram.com/arabiyatlearn"
              target="_blank"
              rel="noreferrer"
              aria-label="Arabiyat Learn on Instagram"
              className="rounded-full border border-primary-foreground/20 p-2 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?"
              target="_blank"
              rel="noreferrer"
              aria-label="Arabiyat Learn on Facebook"
              className="rounded-full border border-primary-foreground/20 p-2 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.threads.com/@arabiyatlearn"
              target="_blank"
              rel="noreferrer"
              aria-label="Arabiyat Learn on Threads"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-foreground/20 text-sm font-bold transition-colors hover:border-gold hover:text-gold"
            >
              @
            </a>
          </div>
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
