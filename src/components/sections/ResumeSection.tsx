import { ArrowRight, Download, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const resumeHighlights = [
  "4+ years across product, engineering, automation, developer experience, and AI-enabled research workflows.",
  "Current product work on an AI research assistant with focus on synthesis, conversational analytics, personalization, evaluation, and adoption.",
  "Interested in products where execution details matter: incentives, trust, distribution, quality, and behavior change.",
];

const credentials = [
  { title: "Compelling Data Stories", org: "UVA Darden Executive Education", date: "2026" },
  { title: "Influencing with Diplomacy", org: "Wharton Executive Education", date: "2025" },
  { title: "Machine Learning for Business", org: "Wharton Executive Education", date: "2025" },
  { title: "Lean Product Management", org: "Jeff Gothelf", date: "2024" },
  { title: "Product Management Fundamentals", org: "Matthew Pizzi", date: "2023" },
  { title: "B.S. Applied Computing", org: "University of Scranton · Magna Cum Laude", date: "2021" },
];

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <span className="font-flourish text-4xl text-primary/30">ꕥ</span>
        </div>

        <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold mb-3">
          Résumé
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Résumé & contact</h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Résumé, credentials, and contact in one place.
        </p>

        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8 shadow-warm text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl">Alexa Thoennes, résumé</span>
            </div>
            <a href="/Alexa_Public_Resume.pdf" download="Alexa_Thoennes_Resume.pdf" className="w-full md:w-auto">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full md:w-auto shadow-md active:scale-95 transition-all">
                <Download className="h-5 w-5 opacity-80" />
                Download PDF
              </Button>
            </a>
          </div>

          <div className="space-y-6">
            <div className="p-5 bg-background border border-border/40 rounded-lg shadow-sm">
              <h4 className="font-serif text-lg text-primary mb-3 italic">Summary</h4>
              <ul className="space-y-2.5 text-muted-foreground text-sm leading-snug">
                {resumeHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="text-primary mt-1.5 text-[11px]">✦</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-background border border-border/40 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-2 border-b border-primary/10 gap-2">
                <h4 className="font-serif text-lg text-primary italic">Education & selected credentials</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {credentials.map((credential) => (
                  <div key={`${credential.title}-${credential.date}`} className="flex items-center justify-between group py-1 border-b border-muted/30 last:border-0 md:last:border-b">
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {credential.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 uppercase tracking-widest leading-none">
                        {credential.org}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-primary/40 ml-2 tabular-nums">
                      {credential.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm text-muted-foreground">
          <a href="mailto:alexa.thoennes@gmail.com" className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium">
            <Mail className="h-4 w-4" />
            Email
          </a>
          <span className="hidden sm:inline text-muted-foreground/40">·</span>
          <a href="https://linkedin.com/in/alexathoennes" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium">
            LinkedIn
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
