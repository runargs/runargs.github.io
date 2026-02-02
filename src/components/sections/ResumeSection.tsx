import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeSection() {
  return (
    <section id="resume" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative flourish */}
        <div className="mb-8">
          <span className="font-flourish text-4xl text-primary/30">❧</span>
        </div>

        {/* Section header */}
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Resume</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">
          A comprehensive overview of my experience, skills, and education
        </p>

        {/* Resume preview card */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8 shadow-warm">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-primary" />
            <span className="font-serif text-xl">Your Name — Resume 2024</span>
          </div>

          {/* Brief summary */}
          <div className="text-left space-y-4 text-sm text-foreground/80 mb-8">
            <div className="p-4 bg-background rounded">
              <h4 className="font-medium text-foreground mb-2">Experience Highlights</h4>
              <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                <li>10+ years in design and product development</li>
                <li>Led teams at Fortune 500 companies and startups</li>
                <li>Expertise in design systems, UX strategy, and leadership</li>
              </ul>
            </div>

            <div className="p-4 bg-background border border-border/40 rounded-lg shadow-sm">
              {/* Header: Academic & Elite Certs combined */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-primary/10">
                <h4 className="font-serif text-lg text-primary italic">Education & Credentials</h4>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-foreground leading-tight">B.S. Applied Computing</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-tighter italic">Business Analytics • Magna Cum Laude</p>
                </div>
              </div>
            
              {/* Compact Grid for Credentials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { title: "Influencing with Diplomacy", org: "Wharton", date: "2025" },
                  { title: "ML for Business", org: "Wharton", date: "2025" },
                  { title: "Lean Product Management", org: "Jeff Gothelf", date: "2024" },
                  { title: "Product Management E2E", org: "Mastercard", date: "2023" },
                  { title: "PM Fundamentals", org: "Pluralsight", date: "2023" },
                  { title: "Intro to Marketing", org: "Wharton", date: "2016" },
                ].map((cert, i) => (
                  <div key={i} className="flex items-center justify-between group py-1 border-b border-muted/30 last:border-0 md:last:border-b">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {cert.title}
                      </p>
                      <p className="text-[9px] text-muted-foreground/70 uppercase tracking-widest leading-none">
                        {cert.org}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-primary/40 ml-2 tabular-nums">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            
              {/* Footer: Tiny Social Proof */}
              <div className="mt-4 pt-2 border-t border-muted/20">
                <p className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.2em] text-center">
                  Additional: Mental Health First Aid (USA) • Communication Focus
                </p>
              </div>
            </div>
                      </div>

          {/* Download button */}
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </Button>
        </div>

        {/* Contact note */}
        <p className="text-sm text-muted-foreground">
          For inquiries, please reach out via{" "}
          <a href="mailto:hello@example.com" className="text-primary hover:underline">
            email
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary hover:underline">
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
