import React, { useState } from "react";
import { Download, FileText, Key, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ResumeSection() {
  const [keyInput, setKeyInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  // The "Soft Barrier" Key - Congrats, you found it!
  const ACCESS_KEY = "2026";

  const handleKeyEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyInput(value);

    // Auto-unlocks the moment the correct key is typed
    if (value.toUpperCase() === ACCESS_KEY) {
      setIsUnlocked(true);
    }
  };

  return (
    <section id="resume" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative flourish */}
        <div className="mb-8">
          <span className="font-flourish text-4xl text-primary/30">ꕥ</span>
        </div>

        {/* Section header */}
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Resume</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">
          A strategic overview of my experience in technical orchestration and AI-native product leadership.
        </p>

        {/* Resume preview card */}
        <div className="bg-card rounded-lg border border-border p-6 md:p-8 mb-8 shadow-warm">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl">Alexa Thoennes — 2026</span>
          </div>

          <div className="space-y-6 mb-10">
            {/* Executive Summary */}
            <div className="p-5 bg-background border border-border/40 rounded-lg shadow-sm text-left">
              <h4 className="font-serif text-lg text-primary mb-3 italic">Executive Summary</h4>
              <ul className="space-y-2.5 text-muted-foreground text-sm leading-snug">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-[11px]">✦</span>
                  <span>
                    4+ years synthesizing technical execution with product intuition to build tools that honor both utility and human intent.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-[11px]">✦</span>
                  <span>
                    Applying an engineering lens to low-code ecosystems to challenge digital constraints and prototype unconventional systems from first principles.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1.5 text-[11px]">✦</span>
                  <span>
                    Exploring the frontier of agentic systems, with a focus on how multi-agent orchestration can augment, rather than replace, professional cognition.
                  </span>
                </li>
              </ul>
            </div>

            {/* Education & Credentials */}
            <div className="p-5 bg-background border border-border/40 rounded-lg shadow-sm text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-2 border-b border-primary/10 gap-2">
                <h4 className="font-serif text-lg text-primary italic">Education & Credentials</h4>
                <div className="md:text-right">
                  <p className="text-[12px] font-bold text-foreground leading-tight">B.S. Applied Computing</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tighter italic">Business Analytics • Magna Cum Laude</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { title: "Compelling Data Stories", org: "UVA Darden Executive Education", date: "2026" },
                  { title: "Influencing with Diplomacy", org: "Wharton Executive Education", date: "2025" },
                  { title: "Machine Learning for Business", org: "Wharton Executive Education", date: "2025" },
                  { title: "Lean Product Management", org: "Jeff Gothelf", date: "2024" },
                  { title: "Product Management Fundamentals", org: "Matthew Pizzi", date: "2023" },
                  { title: "Intro to Marketing", org: "Wharton Penn Online Learning", date: "2016" },
                ].map((cert, i) => (
                  <div key={i} className="flex items-center justify-between group py-1 border-b border-muted/30 last:border-0 md:last:border-b">
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {cert.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 uppercase tracking-widest leading-none">
                        {cert.org}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-primary/40 ml-2 tabular-nums">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ACCESS CONTROL AREA */}
          <div className="max-w-xs mx-auto pt-6 border-t border-border/50">
            {!isUnlocked ? (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Enter Key for PDF Access
                </p>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="••••"
                    value={keyInput}
                    onChange={handleKeyEntry}
                    className="text-center bg-muted/20 border-dashed border-primary/20 focus-visible:ring-primary/40 uppercase tracking-widest"
                  />
                  <Key className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500">
                <a 
                  href="/Alexa_Public_Resume.pdf" 
                  download="Alexa_Thoennes_Resume.pdf"
                  className="inline-block w-full md:w-auto"
                >
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full md:w-auto shadow-md active:scale-95 transition-all"
                  >
                    <CheckCircle2 className="h-5 w-5 opacity-80" />
                    Download PDF
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Contact note */}
        <p className="text-sm text-muted-foreground">
          For inquiries, please reach out via{" "}
          <a href="mailto:alexa.thoennes@gmail.com" className="text-primary hover:underline font-medium">
            email
          </a>{" "}
          or{" "}
          <a 
            href="https://linkedin.com/in/alexathoennes" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline font-medium"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
