import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, User, ArrowRight, LayoutDashboard, LogOut, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { AnnouncementBar } from "./AnnouncementBar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useApp } from "@/portal/context/AppContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    void navigate({ to: "/" });
  };

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Nav Links - Spacious, never squeezed */}
          <div className="hidden items-center gap-1 xl:gap-2 lg:flex shrink-0">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold text-foreground/80 transition-all hover:bg-muted/70 hover:text-primary data-[status=active]:bg-pink-soft data-[status=active]:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden items-center gap-2 lg:flex shrink-0">
            <a
              href="https://wa.me/923098444501?text=Hello%20ArabiyatLearn%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20free%20Arabic%20demo%20for%20my%20child."
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald/30 bg-emerald/10 px-3 py-2 text-xs font-semibold text-emerald hover:bg-emerald/20 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 fill-current text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {currentUser || user ? (
              <>
                <Button asChild variant="outline" size="sm" className="rounded-xl border-border bg-card font-semibold shrink-0 whitespace-nowrap">
                  <Link to="/portal">
                    <LayoutDashboard className="mr-1.5 h-3.5 w-3.5 text-primary" /> 
                    {currentUser?.role === 'admin' || currentUser?.role === 'founder' ? 'Director Portal' : 'Academy Portal'}
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-xl text-muted-foreground shrink-0" 
                  onClick={() => {
                    if (currentUser) logout();
                    if (user) void handleSignOut();
                  }}
                  title="Log out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              <Button asChild variant="ghost" size="sm" className="rounded-xl text-sm font-medium shrink-0 whitespace-nowrap">
                <Link to="/login">
                  <User className="mr-1 h-4 w-4" /> Login
                </Link>
              </Button>
            )}

            <Button asChild className="rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold shadow-soft shrink-0 whitespace-nowrap">
              <Link to="/contact">
                Book Free Demo <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="rounded-lg p-2 text-primary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="border-t border-border bg-background px-4 py-5 lg:hidden animate-fade-in">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted text-foreground/85"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
              <a
                href="https://wa.me/923098444501?text=Hello%20ArabiyatLearn%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20free%20Arabic%20demo%20for%20my%20child."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald/30 bg-emerald/10 py-2.5 text-sm font-semibold text-emerald"
              >
                <MessageCircle className="h-4 w-4 fill-current text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              {currentUser || user ? (
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link to="/portal" onClick={() => setOpen(false)}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Open Academy Portal
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <User className="mr-2 h-4 w-4" /> Portal Sign In
                  </Link>
                </Button>
              )}

              <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground font-semibold">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Book a Free Demo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
