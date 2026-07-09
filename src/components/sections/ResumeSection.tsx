import { ArrowRight, Download, FileText, Mail } from "lucide-react";
import { DossierLink, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

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
    <SectionBand id="resume">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          marker="09"
          eyebrow="Résumé"
          title="Résumé, credentials, and contact in one place."
          description="A compact schedule of current focus, selected credentials, and ways to reach me."
          className="mb-8"
        />

        <div className="notched mb-8 border border-[var(--rule)] bg-[var(--paper-card)] p-6 text-left md:p-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-[var(--rule)] pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-[var(--civic-blue)]" />
              <span className="font-serif text-xl text-[var(--ink)]">Alexa Thoennes, résumé</span>
            </div>
            <DossierLink href="mailto:alexa.thoennes@gmail.com?subject=Resume%20PDF%20Request" className="w-full bg-[var(--ink-soft)] text-[var(--paper)] hover:bg-[var(--ink)] md:w-auto">
              <Download className="h-5 w-5 opacity-80" />
              Request résumé PDF
            </DossierLink>
          </div>

          <div className="space-y-6">
            <div className="border border-[var(--rule)] bg-[var(--paper)] p-5">
              <StampBadge tone="blue">Summary</StampBadge>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--ink-muted)]">
                {resumeHighlights.map((highlight) => (
                  <li key={highlight} className="grid grid-cols-[24px_minmax(0,1fr)] gap-2">
                    <span className="font-display text-xl text-[var(--civic-blue)]">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[var(--rule)] bg-[var(--paper)] p-5">
              <div className="mb-4 flex flex-col justify-between gap-2 border-b border-[var(--rule)] pb-2 md:flex-row md:items-center">
                <h4 className="font-serif text-lg text-[var(--ink)]">Education & selected credentials</h4>
              </div>

              <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                {credentials.map((credential) => (
                  <div key={`${credential.title}-${credential.date}`} className="group flex items-center justify-between border-b border-[rgba(213,198,177,0.72)] py-3 last:border-0 md:last:border-b">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--civic-blue)]">
                        {credential.title}
                      </p>
                      <p className="text-xs font-extrabold uppercase leading-snug tracking-[0.07em] text-[var(--ink-muted)]">
                        {credential.org}
                      </p>
                    </div>
                    <span className="ml-2 font-display text-xl text-[var(--civic-blue)]">
                      {credential.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 text-sm text-[var(--ink-muted)] sm:flex-row sm:items-center">
          <a href="mailto:alexa.thoennes@gmail.com" className="inline-flex items-center gap-1.5 font-semibold text-[var(--civic-blue)] hover:underline">
            <Mail className="h-4 w-4" />
            Email
          </a>
          <span className="hidden text-[var(--ink-faint)] sm:inline">/</span>
          <a href="https://linkedin.com/in/alexathoennes" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[var(--civic-blue)] hover:underline">
            LinkedIn
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </SectionBand>
  );
}
