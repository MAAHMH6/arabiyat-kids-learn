import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";

type FooterItem =
  | {
      label: string;
      to: "/" | "/courses" | "/blog" | "/about" | "/how-it-works" | "/contact" | "/faq" | "/privacy" | "/terms" | "/login";
      href?: never;
    }
  | {
      label: string;
      href: string;
      to?: never;
    };

interface FooterColumn {
  title: string;
  items: FooterItem[];
}

const columns: FooterColumn[] = [
  {
    title: "Live Classes",
    items: [
      { label: "All Arabic Courses", to: "/courses" },
      { label: "Book a Free Demo", to: "/contact" },
      { label: "How Classes Work", to: "/how-it-works" },
      { label: "Student Login", to: "/login" },
    ],
  },
  {
    title: "About Academy",
    items: [
      { label: "Meet Ustadha", to: "/about" },
      { label: "Teaching Methodology", to: "/about" },
      { label: "Arabic Learning Blog", to: "/blog" },
      { label: "Parent FAQ", to: "/faq" },
      { label: "Contact & Booking", to: "/contact" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Parent Inquiries", to: "/contact" },
      { label: "WhatsApp Direct Chat", href: "https://wa.me/923098444501" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="rounded-2xl bg-background/95 p-3 w-fit">
            <Logo />
          </div>
          <p className="mt-4 text-sm text-primary-foreground/80 leading-relaxed">
            Live interactive Arabic classes designed specifically for English-speaking children. Speaking, letters, vocabulary & confidence.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-primary-foreground/80">
            <a
              href="mailto:hello@arabiyatlearn.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <span className="font-semibold">✉ Email:</span> hello@arabiyatlearn.com
            </a>
            <a
              href="https://wa.me/923098444501"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366] fill-current" /> WhatsApp: +92 309 8444501
            </a>
            <a
              href="tel:+923098444501"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" /> Direct Phone: +92 309 8444501
            </a>
          </div>
          <div className="mt-5 flex items-center gap-3" aria-label="Social media links">
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
              href="https://www.facebook.com/arabiyatlearn"
              target="_blank"
              rel="noreferrer"
              aria-label="Arabiyat Learn on Facebook"
              className="rounded-full border border-primary-foreground/20 p-2 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.threads.net/@arabiyatlearn"
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
            <h3 className="font-display text-base font-semibold text-gold">{col.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/85">
              {col.items.map((i) => (
                <li key={i.label}>
                  {i.to ? (
                    <Link to={i.to} className="transition-colors hover:text-gold">
                      {i.label}
                    </Link>
                  ) : (
                    <a href={i.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold flex items-center gap-1.5">
                      {i.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/70">
        © 2026 ArabiyatLearn Academy. Live Arabic classes for kids worldwide. All rights reserved.
      </div>
    </footer>
  );
}
