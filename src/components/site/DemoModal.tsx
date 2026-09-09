import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, Sparkles, MessageCircle, ArrowRight, CheckCircle2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const hasSeen = sessionStorage.getItem("arabiyatlearn_demo_modal_seen");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Friendly 1.5s delay so page loads first
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("arabiyatlearn_demo_modal_seen", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-card"
        style={{
          background: "linear-gradient(145deg, #FFFFFF 0%, #FAF6EE 100%)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-soft px-3.5 py-1 text-xs font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5 text-pink" />
          <span>Special Offer • 100% Free Trial</span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-primary leading-tight">
          Experience Arabic Made Simple For Your Child
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Book a complimentary 25-minute live 1-on-1 demo session with Ustadha Arabiyat. See your child smile and speak their first Arabic words!
        </p>

        {/* Bullet points */}
        <div className="mt-5 space-y-2.5 rounded-2xl bg-white/80 p-4 border border-border/60">
          <div className="flex items-center gap-2.5 text-xs font-medium text-foreground/85">
            <CheckCircle2 className="h-4 w-4 text-emerald shrink-0" />
            <span>Gentle English-speaking teacher (Relatable & Kind)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-medium text-foreground/85">
            <CheckCircle2 className="h-4 w-4 text-emerald shrink-0" />
            <span>Interactive digital whiteboard & visual letter games</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-medium text-foreground/85">
            <CheckCircle2 className="h-4 w-4 text-emerald shrink-0" />
            <span>Personalized Arabic roadmap · Zero payment required</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="flex-1 rounded-xl bg-primary hover:bg-emerald text-primary-foreground font-semibold shadow-soft"
            onClick={handleClose}
          >
            <Link to="/contact">
              <Video className="mr-2 h-4 w-4" /> Book Free Demo <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>

          <a
            href="https://wa.me/923098444501?text=Hello%20ArabiyatLearn%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20free%20Arabic%20demo%20for%20my%20child."
            target="_blank"
            rel="noreferrer"
            onClick={handleClose}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm font-semibold text-emerald hover:bg-emerald/20 transition-colors"
          >
            <MessageCircle className="h-4 w-4 fill-current text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <p className="mt-4 text-center text-[0.72rem] text-muted-foreground">
          No credit card needed. You can choose your preferred day & time slot.
        </p>
      </div>
    </div>
  );
}
