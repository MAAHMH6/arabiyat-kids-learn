import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Send,
  User,
  Globe,
} from "lucide-react";
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
      { title: "Book a Free Demo Class & Contact — ArabiyatLearn" },
      {
        name: "description",
        content:
          "Schedule a free 25-minute live 1-on-1 Arabic trial class for your child or chat directly with Ustadha on WhatsApp.",
      },
      { property: "og:title", content: "Book a Free Demo Class & Contact — ArabiyatLearn" },
      { property: "og:description", content: "Free live Arabic demo session for English-speaking kids." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://arabiyatlearn.com/contact" },
      { property: "og:image", content: "https://arabiyatlearn.com/arabiyat-logo.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://arabiyatlearn.com/contact" }],
  }),
  component: Contact,
});


const demoSchema = z.object({
  parentName: z.string().trim().min(2, "Please enter parent / guardian name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone or WhatsApp number").max(30),
  childName: z.string().trim().min(2, "Please enter your child's name").max(100),
  childAge: z.string().min(1, "Please select child's age group"),
  arabicLevel: z.string().min(1, "Please select your child's level"),
  timezone: z.string().min(1, "Please select your timezone"),
  preferredTime: z.string().min(1, "Please select preferred timing"),
  notes: z.string().max(1000).optional(),
});

const generalSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(5, "Please write your question or inquiry").max(1500),
});

function Contact() {
  const [activeTab, setActiveTab] = useState<"demo" | "general">("demo");
  const [demoErrors, setDemoErrors] = useState<Record<string, string>>({});
  const [generalErrors, setGeneralErrors] = useState<Record<string, string>>({});
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [generalSubmitted, setGeneralSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      parentName: String(fd.get("parentName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      childName: String(fd.get("childName") ?? ""),
      childAge: String(fd.get("childAge") ?? ""),
      arabicLevel: String(fd.get("arabicLevel") ?? ""),
      timezone: String(fd.get("timezone") ?? ""),
      preferredTime: String(fd.get("preferredTime") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    };

    const parsed = demoSchema.safeParse(data);
    if (!parsed.success) {
      const errMap: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errMap[String(issue.path[0])] = issue.message;
      }
      setDemoErrors(errMap);
      return;
    }

    setDemoErrors({});
    setDemoSubmitted(true);
    toast.success("Demo Request Received! 🎉", {
      description: `We will message you on WhatsApp (${data.phone}) within 24 hours to confirm your time slot!`,
    });
  };

  const handleGeneralSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = generalSchema.safeParse(data);
    if (!parsed.success) {
      const errMap: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errMap[String(issue.path[0])] = issue.message;
      }
      setGeneralErrors(errMap);
      return;
    }

    setGeneralErrors({});
    setGeneralSubmitted(true);
    toast.success("Message Sent Successfully", {
      description: "Ustadha will respond to your email shortly, in shaa Allah.",
    });
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Schedule & Inquiries"
        title="Book a Free Trial or Contact Us"
        subtitle="Experience a 25-minute live 1-on-1 trial session. Meet Ustadha, assess your child's starting point, and get all your questions answered."
      />

      {/* Main Container */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        {/* WhatsApp Highlight Banner */}
        <div className="mb-10 overflow-hidden rounded-4xl border border-emerald/40 bg-gradient-to-r from-emerald/10 via-card to-emerald/5 p-6 shadow-card md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-soft">
              <MessageCircle className="h-7 w-7 fill-current" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald/20 px-2.5 py-0.5 text-xs font-bold text-emerald">
                <Sparkles className="h-3 w-3" /> Fastest Response Time
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-primary md:text-2xl">
                Prefer to Chat Directly on WhatsApp?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Message Ustadha right now to discuss class timings, your child's background, or book a demo instantly.
              </p>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd5a] font-semibold text-base shrink-0 shadow-soft w-full md:w-auto"
          >
            <a
              href="https://wa.me/923098444501?text=Assalamu%20Alaikum%20Ustadha%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20free%20Arabic%20demo%20class%20for%20my%20child."
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5 fill-current" /> Open WhatsApp (+92 309 8444501)
            </a>
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Left Column: Booking & Form Tabs */}
          <div>
            {/* Tab Selector */}
            <div className="mb-6 flex gap-2 rounded-2xl bg-secondary/80 p-1.5 w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("demo")}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                  activeTab === "demo"
                    ? "bg-card text-primary shadow-soft"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Book a Free Demo Class
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                  activeTab === "general"
                    ? "bg-card text-primary shadow-soft"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Ask a Question
              </button>
            </div>

            {activeTab === "demo" ? (
              <div className="rounded-4xl border border-border/70 bg-card p-7 md:p-10 shadow-card">
                <div className="mb-6 border-b border-border/60 pb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink">
                    100% Free · 25 Minutes · Live 1-on-1
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-bold text-primary">
                    Book Your Child's Free Demo Class
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Please provide basic details so Ustadha can prepare appropriate interactive materials for your child.
                  </p>
                </div>

                {demoSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold text-primary">Demo Request Submitted!</h3>
                    <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                      JazakAllahu Khairan! We have received your booking request. We will reach out on WhatsApp to confirm your exact meeting link.
                    </p>
                    <div className="mt-6">
                      <Button
                        onClick={() => setDemoSubmitted(false)}
                        variant="outline"
                        className="rounded-xl"
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleDemoSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="parentName">Parent / Guardian Name *</Label>
                        <Input
                          id="parentName"
                          name="parentName"
                          className="mt-1.5 rounded-xl"
                          placeholder="e.g. Sister Fatima"
                        />
                        {demoErrors['parentName'] && (
                          <p className="mt-1 text-xs text-destructive">{demoErrors['parentName']}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="mt-1.5 rounded-xl"
                          placeholder="you@example.com"
                        />
                        {demoErrors['email'] && (
                          <p className="mt-1 text-xs text-destructive">{demoErrors['email']}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="phone">WhatsApp / Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          className="mt-1.5 rounded-xl"
                          placeholder="+44 7123 456789"
                        />
                        <p className="mt-1 text-[0.7rem] text-muted-foreground">
                          Include country code for WhatsApp confirmation.
                        </p>
                        {demoErrors['phone'] && (
                          <p className="mt-1 text-xs text-destructive">{demoErrors['phone']}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="childName">Child's Name & Nickname *</Label>
                        <Input
                          id="childName"
                          name="childName"
                          className="mt-1.5 rounded-xl"
                          placeholder="e.g. Rayan"
                        />
                        {demoErrors['childName'] && (
                          <p className="mt-1 text-xs text-destructive">{demoErrors['childName']}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="childAge">Child's Age Group *</Label>
                        <select
                          id="childAge"
                          name="childAge"
                          defaultValue="Ages 7–10"
                          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        >
                          <option value="Ages 4–6 (Early Beginner)">Ages 4–6 (Little Explorers)</option>
                          <option value="Ages 7–10">Ages 7–10 (Junior Speakers)</option>
                          <option value="Ages 11–15">Ages 11–15 (Youth Track)</option>
                          <option value="16+ or Adult">16+ / Older Student</option>
                        </select>
                        {demoErrors['childAge'] && (
                          <p className="mt-1 text-xs text-destructive">{demoErrors['childAge']}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="arabicLevel">Current Arabic Level *</Label>
                        <select
                          id="arabicLevel"
                          name="arabicLevel"
                          defaultValue="Complete Beginner"
                          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        >
                          <option value="Complete Beginner">Complete Beginner (No background)</option>
                          <option value="Knows some letters">Knows some Arabic letters / sounds</option>
                          <option value="Reads Quran but cannot speak">Reads Arabic / Quran but zero speaking</option>
                          <option value="Intermediate learner">Has studied before / wants fluency</option>
                        </select>
                        {demoErrors['arabicLevel'] && (
                          <p className="mt-1 text-xs text-destructive">{demoErrors['arabicLevel']}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="timezone">Your Timezone / Location *</Label>
                        <select
                          id="timezone"
                          name="timezone"
                          defaultValue="UK / Europe (GMT / BST)"
                          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        >
                          <option value="UK / Europe (GMT / BST)">United Kingdom / Europe (GMT / BST)</option>
                          <option value="USA / Canada (Eastern Time)">USA / Canada (Eastern Time - EST)</option>
                          <option value="USA / Canada (Central / Pacific)">USA / Canada (Central / Pacific Time)</option>
                          <option value="Gulf / Middle East (GST / AST)">Gulf / Middle East (UAE, KSA, Qatar)</option>
                          <option value="Australia / New Zealand">Australia / New Zealand</option>
                          <option value="Other">Other International Location</option>
                        </select>
                        {demoErrors['timezone'] && (
                          <p className="mt-1 text-xs text-destructive">{demoErrors['timezone']}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="preferredTime">Preferred Class Time *</Label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          defaultValue="Weekday Evenings"
                          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        >
                          <option value="Weekday Evenings">Weekday Afternoons / Evenings</option>
                          <option value="Weekend Mornings">Weekend Mornings</option>
                          <option value="Weekend Afternoons">Weekend Afternoons</option>
                          <option value="Flexible / Any Time">Flexible / Any Available Slot</option>
                        </select>
                        {demoErrors['preferredTime'] && (
                          <p className="mt-1 text-xs text-destructive">{demoErrors['preferredTime']}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Special Goals or Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        className="mt-1.5 rounded-xl"
                        placeholder="e.g. My child is shy, we want him to speak Arabic with grandparents, or specific learning preferences."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold text-base py-6 shadow-soft"
                    >
                      <Send className="mr-2 h-5 w-5" /> Submit Free Demo Booking Request
                    </Button>

                    <p className="text-center text-[0.75rem] text-muted-foreground">
                      🔒 No payment details collected. Zero spam. We only contact you to schedule your session.
                    </p>
                  </form>
                )}
              </div>
            ) : (
              <div className="rounded-4xl border border-border/70 bg-card p-7 md:p-10 shadow-card">
                <div className="mb-6 border-b border-border/60 pb-5">
                  <h2 className="font-display text-2xl font-bold text-primary">Send a General Message</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Have a question about class fees, sibling discounts, or curriculum details?
                  </p>
                </div>

                {generalSubmitted ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald" />
                    <h3 className="mt-4 font-display text-xl font-bold text-primary">Message Received</h3>
                    <p className="mt-2 text-sm text-muted-foreground">We will get back to your email within 1 business day.</p>
                    <Button onClick={() => setGeneralSubmitted(false)} variant="outline" className="mt-5 rounded-xl">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleGeneralSubmit}>
                    <div>
                      <Label htmlFor="genName">Your Name</Label>
                      <Input id="genName" name="name" className="mt-1.5 rounded-xl" placeholder="Full name" />
                      {generalErrors['name'] && <p className="mt-1 text-xs text-destructive">{generalErrors['name']}</p>}
                    </div>

                    <div>
                      <Label htmlFor="genEmail">Your Email</Label>
                      <Input id="genEmail" name="email" type="email" className="mt-1.5 rounded-xl" placeholder="you@example.com" />
                      {generalErrors['email'] && <p className="mt-1 text-xs text-destructive">{generalErrors['email']}</p>}
                    </div>

                    <div>
                      <Label htmlFor="genMessage">Your Inquiry</Label>
                      <Textarea id="genMessage" name="message" rows={5} className="mt-1.5 rounded-xl" placeholder="How can we help you?" />
                      {generalErrors['message'] && <p className="mt-1 text-xs text-destructive">{generalErrors['message']}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold">
                      Send Inquiry
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Academy Contact & What to Expect */}
          <div className="space-y-6">
            {/* What to Expect in the Trial */}
            <div className="rounded-3xl border border-border/70 bg-cream/70 p-7">
              <span className="text-xs font-bold uppercase tracking-wider text-pink">The Demo Experience</span>
              <h3 className="mt-2 font-display text-xl font-bold text-primary">
                What Happens in the Free Class?
              </h3>
              <ul className="mt-5 space-y-4 text-xs leading-relaxed text-foreground/85">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-[0.7rem]">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Warm Introduction</span>
                    <p className="text-muted-foreground">Ustadha welcomes your child, breaks the ice, and creates a relaxed, smiling atmosphere.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-[0.7rem]">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Interactive Mini-Lesson</span>
                    <p className="text-muted-foreground">A 15-minute playful activity with Arabic letters, colors, or numbers on the digital whiteboard.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-[0.7rem]">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Parent Debrief & Roadmap</span>
                    <p className="text-muted-foreground">Ustadha shares her evaluation with you, recommends the best course track, and answers any scheduling questions.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {[
                { icon: MessageCircle, title: "WhatsApp Direct", body: "+92 3098444501", href: "https://wa.me/923098444501", note: "Instant chat" },
                { icon: Phone, title: "Phone", body: "+92 3098444501", href: "tel:+923098444501", note: "Voice call" },
                { icon: Mail, title: "Email", body: "hello@arabiyatlearn.com", href: "mailto:hello@arabiyatlearn.com", note: "Official inbox" },
                { icon: Clock, title: "Response Time", body: "Within 15 mins (WhatsApp) / 1 day (Email)", note: "Guaranteed reply" },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{c.title}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noreferrer" className="text-sm font-bold text-primary hover:underline">
                          {c.body}
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-primary">{c.body}</p>
                      )}
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
                    {c.note}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-border/70 bg-card p-4 flex items-center justify-between shadow-soft">
              <span className="text-xs font-semibold text-primary">Follow Our Academy:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/arabiyatlearn"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border p-2 text-primary hover:text-pink transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/arabiyatlearn"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border p-2 text-primary hover:text-pink transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.threads.net/@arabiyatlearn"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border h-8 w-8 flex items-center justify-center font-bold text-xs text-primary hover:text-pink transition-colors"
                >
                  @
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
