import { Link as LinkIcon, Users } from "lucide-react";
import { EditorialCard, EvidenceMeta, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

interface Community {
  id: string;
  name: string;
  role: string;
  description: string;
  period?: string;
  url?: string;
}

const communities: Community[] = [
  {
    id: "product-research",
    name: "Ōura, Manta Sleep, Bearable, Atlassian, Canva, Dynamo AI, Koinly + more",
    role: "Beta testing and research participation",
    description:
      "Beta testing and research participation across wellness hardware, productivity software, AI tools, and finance products. It keeps product judgment close to friction, onboarding, and everyday use.",
    period: "2022–Present",
  },
  {
    id: "moral-ambition",
    name: "Moral Ambition Community",
    role: "Member",
    description:
      "A community for people applying ambition to high-stakes problems. I’m interested in the practical side: incentives, institutions, tradeoffs, and follow-through.",
    period: "2026–Present",
    url: "https://www.moralambition.org/",
  },
  {
    id: "ikap",
    name: "I Know a Place Culinary Agency",
    role: "Advisory consultant and private chef",
    description:
      "Independent and collaborative culinary work across menus, event concepts, operations, and hosting. A practical place to think about culture, constraint, pacing, service, and whether people feel taken care of.",
    period: "2024–Present",
    url: "https://iknowaplace.agency/",
  },
  {
    id: "mentorship-volunteerism",
    name: "Mentorship and volunteerism",
    role: "Independent mentor and community volunteer",
    description:
      "Career mentorship for emerging technical talent and early-career peers, including Year Up United, alongside earlier volunteer work across meal delivery, grants, and Alzheimer’s research fundraising.",
    period: "2015–Present",
    url: "https://catholicphilly.com/2017/08/photo-features/st-william-parishs-youths-help-needy-philadelphians/",
  },
];

export function CommunitySection() {
  return (
    <SectionBand id="community-building">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          marker="05"
          eyebrow="Community"
          title="Contexts that keep the work grounded."
          description="Wellness tools, public-interest work, food culture, service, and community contexts that keep product judgment close to lived experience."
          className="mb-10"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {communities.map((community) => (
            <EditorialCard key={community.id} className="group flex h-full flex-col">
                <div className="space-y-2">
                  <h3 className="text-xl leading-tight transition-colors group-hover:text-[var(--civic-blue)]">
                    {community.name}
                  </h3>
                  <StampBadge tone="ochre">
                    {community.role}
                  </StampBadge>
                </div>

                <p className="mt-5 flex-grow text-sm leading-7 text-[var(--ink-muted)]">
                  {community.description}
                </p>

                <EvidenceMeta className="mt-auto">
                  <div className="space-y-3">
                  {community.period && (
                    <div className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)]">
                      <Users className="h-3 w-3" />
                      <span>{community.period}</span>
                    </div>
                  )}

                  {community.url && (
                    <a
                      href={community.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--ink-muted)] transition-colors group-hover:text-[var(--civic-blue)]"
                    >
                      <LinkIcon className="h-3 w-3" />
                      Open link
                    </a>
                  )}
                </div>
                </EvidenceMeta>
            </EditorialCard>
          ))}
        </div>
      </div>
    </SectionBand>
  );
}
