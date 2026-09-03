import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, User, ArrowRight, LayoutDashboard, LogOut, Shield } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/resources", label: "Resources" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    void navigate({ to: "/" });
  };

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 text-xs md:text-[0.8rem]">
          <span>★ Fun, practical Arabic lessons for English-speaking children</span>
          <span className="hidden sm:inline">☾ Helping children learn Arabic and grow in confidence</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-pink data-[status=active]:underline data-[status=active]:decoration-2 data-[status=active]:underline-offset-8"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                {isAdmin && (
                  <Button asChild variant="ghost" className="rounded-xl">
                    <Link to="/admin">
                      <Shield className="mr-1 h-4 w-4" /> Admin
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" className="rounded-xl border-border">
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-1 h-4 w-4" /> My Learning
                  </Link>
                </Button>
                <Button variant="ghost" className="rounded-xl" onClick={handleSignOut}>
                  <LogOut className="mr-1 h-4 w-4" /> Sign out
                </Button>
              </>
            ) : (
              <Button asChild variant="outline" className="rounded-xl border-border">
                <Link to="/login">
                  <User className="mr-1 h-4 w-4" /> Login
                </Link>
              </Button>
            )}
            <Button asChild className="gradient-pink rounded-xl text-primary-foreground hover:opacity-90">
              <Link to="/courses">
                Browse Courses <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <button
            className="rounded-lg p-2 text-primary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Button asChild variant="outline" className="rounded-xl">
                      <Link to="/admin" onClick={() => setOpen(false)}>
                        Admin Panel
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                      My Learning
                    </Link>
                  </Button>
                  <Button variant="ghost" className="rounded-xl" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </>
              ) : (
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
              )}
              <Button asChild className="gradient-pink rounded-xl text-primary-foreground">
                <Link to="/courses" onClick={() => setOpen(false)}>
                  Browse Courses
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
