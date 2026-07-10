import { ArrowRight, Mail } from "lucide-react";
import { DossierLink, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

const collaborationPaths = [
  { id: "01", title: "Product conversations", focus: "AI tools, evaluation, adoption" },
  { id: "02", title: "Impact-oriented work", focus: "Health, food, climate, finance, public-interest tech" },
  { id: "03", title: "Food and culture", focus: "Private dining, hosting, events, menus" },
];

export function MentorshipSection() {
  const email = "alexa.thoennes@gmail.com";
  const mailtoLink = `mailto:${email}?subject=Website%20Inquiry`;

  return (
    <SectionBand id="mentorship">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          marker="06"
          title="Ways to get in touch."
          className="mb-8"
        />

        <div className="notched relative overflow-hidden border border-[var(--rule)] bg-[var(--paper-card)] p-6 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[18px] after:border-t after:border-[var(--rule)] after:bg-[linear-gradient(135deg,transparent_0_8px,var(--paper-soft)_8px_16px,transparent_16px)] after:bg-[length:16px_18px] md:p-8">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <StampBadge tone="red">Contact</StampBadge>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--ink-muted)]">
                I’m easiest to reach by email. I’m glad to hear from people working on responsible AI products, evaluation, writing, career mentorship, food and culture, or a specific question.
              </p>

              <DossierLink href={mailtoLink} className="mt-6 bg-[var(--ink-soft)] text-[var(--paper)] hover:bg-[var(--ink)]">
                <Mail className="mr-2 h-4 w-4" />
                Send email
                <ArrowRight className="ml-2 h-4 w-4" />
              </DossierLink>
            </div>

            <div className="border-y border-[var(--rule)]">
              {collaborationPaths.map((item) => (
                <div key={item.id} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-b border-[rgba(213,198,177,0.7)] py-4 last:border-b-0">
                  <span className="font-display text-2xl leading-none text-[var(--revision-red)]">{item.id}</span>
                  <div className="min-w-0 text-left">
                    <p className="mb-1 text-sm font-semibold leading-tight text-[var(--ink)]">{item.title}</p>
                    <p className="text-xs font-semibold uppercase leading-snug tracking-[0.07em] text-[var(--ink-muted)]">{item.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionBand>
  );
}
