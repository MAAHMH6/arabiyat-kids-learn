import { Link } from "@tanstack/react-router";
import logo from "@/assets/arabiyat-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
      <img
        src={logo.url}
        alt="Arabiyat Learn logo"
        width={56}
        height={56}
        className="h-12 w-12 rounded-full object-contain md:h-14 md:w-14"
      />
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-lg font-bold tracking-tight text-primary md:text-xl">
            Arabiyat Learn
          </span>
          <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Learn • Speak • Grow
          </span>
        </span>
      )}
    </Link>
  );
}
