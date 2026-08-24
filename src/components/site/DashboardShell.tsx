import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; to?: string; active?: boolean };

export function DashboardShell({
  items,
  title,
  subtitle,
  children,
}: {
  items: NavItem[];
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <aside className="border-b border-border bg-cream/60 p-5 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <Logo />
        <nav className="mt-7 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {items.map((i) =>
            i.to ? (
              <Link
                key={i.label}
                to={i.to}
                className={cn(
                  "whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  i.active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary",
                )}
              >
                {i.label}
              </Link>
            ) : (
              <span
                key={i.label}
                className={cn(
                  "whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium",
                  i.active ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {i.label}
              </span>
            ),
          )}
        </nav>
      </aside>
      <main className="flex-1 px-5 py-8 lg:px-10">
        <h1 className="font-display text-3xl font-bold text-primary">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-primary">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="gradient-teal h-full rounded-full transition-[width] duration-700"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
