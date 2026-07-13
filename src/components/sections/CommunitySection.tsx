import { Link as LinkIcon, Users } from "lucide-react";
import { EditorialCard, EvidenceMeta, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

interface Community {
  id: string;
  name: string;
  role: string;
  description: string;
  period?: string;
  url?: string;
  companyLinks?: Array<{
    name: string;
    url: string;
  }>;
}

const communities: Community[] = [
  {
    id: "product-research",
    name: "Product research participation",
    role: "Beta testing and research participation",
    description:
      "Product research participation across consumer wellness hardware, productivity software, AI tools, and finance products. There's no better way to have user empathy than to be one :)",
    period: "2022–Present",
    companyLinks: [
      { name: "Ōura", url: "https://ouraring.com/" },
      { name: "Manta Sleep", url: "https://mantasleep.com/" },
      { name: "Bearable", url: "https://bearable.app/science-research/" },
      { name: "Atlassian", url: "https://www.atlassian.com/" },
      { name: "Canva", url: "https://www.canva.com/" },
      { name: "Dynamo AI", url: "https://dynamo.ai/" },
      { name: "Koinly", url: "https://koinly.io/" },
      { name: "Lumia", url: "https://lumiahealth.com/" },
    ],
  },
  {
    id: "moral-ambition",
    name: "Moral Ambition Community",
    role: "Member",
    description:
      "A community for people applying ambition to high-stakes problems. Recognizing that we’re among the most privileged people in the history of humanity. That means we have an enormous opportunity to make a difference.",
    period: "2026–Present",
    url: "https://www.moralambition.org/",
  },
  {
    id: "chef",
    name: "Private dining & hosted culinary experiences",
    role: "Advisory consultant and private chef",
    description:
      "Independent and collaborative culinary work (I Know a Place Culinary Agency) across menus, event concepts, operations, and hosting.",
    period: "2024–Present",
    url: "https://iknowaplace.agency/",
  },
  {
    id: "mentorship-volunteerism",
    name: "Mentorship and volunteerism",
    role: "Independent mentor and community volunteer",
    description:
      "Career mentorship for emerging technical talent, as well as providing meals, grants, and serving as a Grand Champion fundraiser for Alzheimer’s research.",
    period: "2015–Present",
    url: "https://catholicphilly.com/2017/08/photo-features/st-william-parishs-youths-help-needy-philadelphians/",
  },
];

export function CommunitySection() {
  return (
    <SectionBand id="community-building">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          marker="03"
          title="Service keeps me grounded."
          description="Wellness tools, public-interest work, food culture, service, and community contexts that give me broader perspectives."
          className="mb-10"
        />

        <div className="service-work-grid grid grid-cols-1 gap-5 md:grid-cols-2">
          {communities.map((community) => (
            <EditorialCard key={community.id} className="service-work-card group flex h-full flex-col">
                <div className="service-work-heading space-y-2">
                  <h3 className="service-work-title text-xl leading-tight transition-colors group-hover:text-[var(--civic-blue)]">
                    {community.companyLinks ? (
                      <>
                        {community.companyLinks.map((company, index) => (
                          <span key={company.name}>
                            <a
                              href={company.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-[var(--rule-strong)] underline-offset-[0.18em] transition-colors hover:text-[var(--civic-blue)] hover:decoration-[var(--civic-blue)]"
                            >
                              {company.name}
                            </a>
                            {index < community.companyLinks.length - 1 ? ", " : " + more"}
                          </span>
                        ))}
                      </>
                    ) : (
                      community.name
                    )}
                  </h3>
                  <StampBadge tone="ochre" className="service-work-role">
                    {community.role}
                  </StampBadge>
                </div>

                <p className="mobile-digest-copy mt-5 flex-grow text-sm leading-7 text-[var(--ink-muted)]">
                  {community.description}
                </p>

                <EvidenceMeta className="service-work-meta mt-auto">
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
