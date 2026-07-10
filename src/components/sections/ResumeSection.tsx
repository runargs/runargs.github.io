import { ArrowRight, Download, Mail } from "lucide-react";
import { DossierLink, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

const resumeHighlights = [
  "Experience across product, engineering, automation, developer experience, and AI-enabled research workflows.",
  "Current product work on AI research-assistant workflows, including retrieval quality, evaluation, source grounding, personalization, and adoption.",
  "Interested in technical products where trust, documentation, launch quality, and use determine whether the work matters.",
];

const credentials = [
  { title: "Communicating Persuasively & Building Trust", org: "Stanford GSB" },
  { title: "Maximizing Operational Effectiveness", org: "MIT" },
  { title: "Ethical & Impactful AI Solutions", org: "IMD" },
  { title: "Driving Digital Transformation", org: "IMD" },
  { title: "Understanding Customer Needs", org: "Wharton Executive Education" },
  { title: "Compelling Data Stories", org: "UVA Darden Executive Education" },
  { title: "Influencing with Diplomacy", org: "Wharton Executive Education" },
  { title: "B.S. Applied Computing (Business Analytics)", org: "University of Scranton · Magna Cum Laude" },
];

export function ResumeSection() {
  return (
    <SectionBand id="resume">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          marker="09"
          title="Curriculum Vitae."
          className="mb-8"
        />

        <div className="resume-file-card notched mb-8 border border-[var(--rule)] bg-[var(--paper-card)] p-6 text-left md:p-8">
          <img src="/images/clip-floppy-disk.png" alt="" aria-hidden="true" className="resume-disk-icon" />
          <div className="relative z-10 mb-8 flex flex-col gap-4 border-b border-[var(--rule)] pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl text-[var(--ink)]">Alexa Thoennes</span>
            </div>
            <DossierLink href="mailto:alexa.thoennes@gmail.com?subject=Resume%20PDF%20Request" className="w-full bg-[var(--ink-soft)] text-[var(--paper)] hover:bg-[var(--ink)] md:w-auto">
              <Download className="h-5 w-5 opacity-80" />
              Request résumé PDF
            </DossierLink>
          </div>

          <div className="relative z-10 space-y-6">
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
