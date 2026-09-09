import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Heart, Star, Compass } from "lucide-react";

interface Announcement {
  id: number;
  icon: typeof Sparkles;
  badge: string;
  text: string;
  actionText: string;
  link: string;
  isExternal?: boolean;
}

const announcements: Announcement[] = [
  {
    id: 1,
    icon: Sparkles,
    badge: "FREE TRIAL",
    text: "Book a Free 25-Minute 1-on-1 Demo Session for Your Child",
    actionText: "Book Demo Now →",
    link: "/contact",
  },
  {
    id: 2,
    icon: Star,
    badge: "LIVE CLASSES",
    text: "Interactive Small Groups & 1-on-1 Batches • UK, USA, Canada & Gulf Friendly",
    actionText: "Explore Classes →",
    link: "/courses",
  },
  {
    id: 3,
    icon: Heart,
    badge: "AGES 4–15",
    text: "Arabic Alphabet, Vocabulary & Quranic Reading Taught with Love & Patience",
    actionText: "Meet Ustadha →",
    link: "/about",
  },
  {
    id: 4,
    icon: Compass,
    badge: "NEW COHORTS",
    text: "Limited Seats Available for Next Week's Live Classes",
    actionText: "Claim Your Spot →",
    link: "/contact",
  },
];


export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideState, setSlideState] = useState<"active" | "exiting" | "entering">("active");

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Slide out to the left
      setSlideState("exiting");
      
      setTimeout(() => {
        // 2. Advance index and position off-screen right
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
        setSlideState("entering");
        
        // 3. Immediately slide into center
        requestAnimationFrame(() => {
          setTimeout(() => {
            setSlideState("active");
          }, 30);
        });
      }, 350);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const current = announcements[currentIndex] ?? announcements[0]!;
  const Icon = current.icon;

  // Class names for sliding transition
  const getTransformClasses = () => {
    if (slideState === "exiting") {
      return "opacity-0 -translate-x-12 transition-all duration-300 ease-in";
    }
    if (slideState === "entering") {
      return "opacity-0 translate-x-12";
    }
    return "opacity-100 translate-x-0 transition-all duration-400 ease-out";
  };

  return (
    <aside
      className="relative z-50 overflow-hidden bg-gradient-to-r from-[#0a3533] via-[#0F4C4A] to-[#125855] text-primary-foreground shadow-sm py-2 px-3 border-b border-white/10"
      aria-label="Live Announcements"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center min-h-[26px]">
        <div
          className={`flex items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-sm font-medium ${getTransformClasses()}`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-2.5 py-0.5 text-[0.68rem] font-bold tracking-wider text-gold border border-gold/40 shrink-0">
            <Icon className="h-3 w-3 animate-spin-slow" />
            {current.badge}
          </span>

          <span className="text-white/95 font-medium tracking-tight truncate max-w-[220px] sm:max-w-md md:max-w-none">
            {current.text}
          </span>

          {current.isExternal ? (
            <a
              href={current.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-gold underline underline-offset-4 hover:text-white transition-colors shrink-0 text-xs"
            >
              {current.actionText}
            </a>
          ) : (
            <Link
              to={current.link}
              className="inline-flex items-center gap-1 font-bold text-gold underline underline-offset-4 hover:text-white transition-colors shrink-0 text-xs"
            >
              {current.actionText}
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
