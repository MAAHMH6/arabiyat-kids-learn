import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Arabiyat Learning" },
      { name: "description", content: "Questions about our Arabic courses for children? Send us a message." },
      { property: "og:title", content: "Contact — Arabiyat Learning" },
      { property: "og:description", content: "Get in touch with the Arabiyat Learning team." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please write a message").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="We're Here to Help" subtitle="Ask us anything about courses, levels or enrollment." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, title: "Email", body: "hello@arabiyatlearning.com" },
            { icon: MessageCircle, title: "Support", body: "Course access and enrollment help." },
            { icon: Clock, title: "Response time", body: "Usually within 1–2 business days." },
          ].map((i) => (
            <div key={i.title} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
              <i.icon className="h-5 w-5 text-emerald" />
              <h3 className="mt-3 font-display text-lg font-bold text-primary">{i.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
        <form
          className="rounded-3xl border border-border/70 bg-card p-8 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const parsed = schema.safeParse({
              name: fd.get("name"),
              email: fd.get("email"),
              message: fd.get("message"),
            });
            if (!parsed.success) {
              const next: Record<string, string> = {};
              for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
              setErrors(next);
              return;
            }
            setErrors({});
            (e.target as HTMLFormElement).reset();
            toast.success("Message sent", { description: "We'll get back to you soon, in shaa Allah." });
          }}
        >
          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" className="mt-2 rounded-xl" placeholder="Parent or guardian name" />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" className="mt-2 rounded-xl" placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} className="mt-2 rounded-xl" placeholder="How can we help?" />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full rounded-xl bg-primary hover:bg-emerald">
              Send Message
            </Button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}
