import { ArrowRight, Mail, MessageCircle, Sparkles, Users } from "lucide-react";
import { DossierLink, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

const collaborationPaths = [
  { id: "1", title: "Product conversations", focus: "AI tools, evaluation, adoption", icon: Sparkles },
  { id: "2", title: "Impact-oriented work", focus: "Health, food, climate, finance, public-interest tech", icon: Users },
  { id: "3", title: "Food and culture", focus: "Private dining, hosting, events, menus", icon: MessageCircle },
];

export function MentorshipSection() {
  const email = "alexa.thoennes@gmail.com";
  const mailtoLink = `mailto:${email}?subject=Website%20Inquiry`;

  return (
    <SectionBand id="mentorship">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          marker="06"
          eyebrow="Contact paths"
          title="Reach out through the practical routes."
          className="mb-8"
        />

        <div className="notched relative overflow-hidden border border-[var(--rule)] bg-[var(--paper-card)] p-6 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[18px] after:border-t after:border-[var(--rule)] after:bg-[linear-gradient(135deg,transparent_0_8px,var(--paper-soft)_8px_16px,transparent_16px)] after:bg-[length:16px_18px] md:p-8">
          <div className="grid gap-10 md:grid-cols-[1fr_310px] md:items-start">
          <div>
            <StampBadge tone="red">Contact</StampBadge>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--ink-muted)]">
              Useful reasons to get in touch: AI product work, healthspan, impact-oriented products, writing, collaboration, culinary events, or a specific question.
            </p>

            <DossierLink href={mailtoLink} className="mt-6 bg-[var(--ink-soft)] text-[var(--paper)] hover:bg-[var(--ink)]">
                <Mail className="mr-2 h-4 w-4" />
                Send email
                <ArrowRight className="ml-2 h-4 w-4" />
            </DossierLink>
          </div>

          <div className="w-full shrink-0 space-y-3">
            {collaborationPaths.map((item) => (
              <div key={item.id} className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 border border-[var(--rule)] bg-[var(--paper-soft)] px-4 py-3">
                <item.icon className="h-5 w-5 shrink-0 text-[var(--civic-blue)]" />
                <div className="min-w-0 text-left">
                  <p className="mb-1 text-sm font-semibold leading-tight text-[var(--ink)]">{item.title}</p>
                  <p className="text-xs font-extrabold uppercase leading-snug tracking-[0.07em] text-[var(--ink-muted)]">{item.focus}</p>
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
