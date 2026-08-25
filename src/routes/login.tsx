import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Student Login — Arabiyat Learning" },
      { name: "description", content: "Parent and guardian login for Arabiyat Learning Arabic courses." },
      { property: "og:title", content: "Student Login — Arabiyat Learning" },
      { property: "og:description", content: "Sign in to continue your child's Arabic lessons." },
    ],
  }),
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

const signupSchema = loginSchema.extend({
  parentName: z.string().trim().min(1, "Parent or guardian name is required").max(100),
  childName: z.string().trim().min(1, "Child's first name is required").max(100),
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"student" | "parent" | "admin">("student");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = {
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      parentName: String(fd.get("parentName") ?? ""),
      childName: String(fd.get("childName") ?? ""),
    };
    const parsed = mode === "login" ? loginSchema.safeParse(values) : signupSchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    toast.success("Signed in", {
      description: "Secure accounts activate when the backend is connected. Showing the demo dashboard.",
    });
    void navigate({ to: role === "admin" ? "/admin" : role === "parent" ? "/parent" : "/dashboard" });
  };

  return (
    <div className="gradient-hero flex min-h-screen items-center justify-center px-4 py-14">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-8 rounded-4xl border border-border/70 bg-card p-8 shadow-card">
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-secondary p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setErrors({});
                }}
                className={cn(
                  "rounded-xl py-2 text-sm font-semibold transition-colors",
                  mode === m ? "bg-card text-primary shadow-soft" : "text-muted-foreground",
                )}
              >
                {m === "login" ? "Login" : "Create account"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-2xl font-bold text-primary">
            {mode === "login" ? "Welcome back" : "Create a parent account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accounts belong to parents and guardians. We only ask for a child's first name so lessons feel personal.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-1 rounded-2xl bg-secondary p-1">
            {(["student", "parent", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "rounded-xl py-2 text-xs font-semibold capitalize transition-colors",
                  role === r ? "bg-card text-primary shadow-soft" : "text-muted-foreground",
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            {mode === "signup" && (
              <>
                <div>
                  <Label htmlFor="parentName">Parent / guardian name</Label>
                  <Input id="parentName" name="parentName" className="mt-2 rounded-xl" placeholder="Your name" />
                  {errors['parentName'] && <p className="mt-1 text-xs text-destructive">{errors['parentName']}</p>}
                </div>
                <div>
                  <Label htmlFor="childName">Child's first name</Label>
                  <Input id="childName" name="childName" className="mt-2 rounded-xl" placeholder="First name only" />
                  {errors['childName'] && <p className="mt-1 text-xs text-destructive">{errors['childName']}</p>}
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" className="mt-2 rounded-xl" placeholder="you@example.com" />
              {errors['email'] && <p className="mt-1 text-xs text-destructive">{errors['email']}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" className="mt-2 rounded-xl" placeholder="••••••••" />
              {errors['password'] && <p className="mt-1 text-xs text-destructive">{errors['password']}</p>}
            </div>
            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <Checkbox id="remember" /> Remember me
                </label>
                <button
                  type="button"
                  className="font-medium text-pink hover:underline"
                  onClick={() =>
                    toast("Password reset", { description: "Email reset links activate with the backend connection." })
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}
            <Button type="submit" size="lg" className="w-full rounded-xl bg-primary hover:bg-emerald">
              {mode === "login" ? "Login" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              ← Back to Arabiyat Learning
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
