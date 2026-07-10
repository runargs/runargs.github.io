import { Calendar, Info, Link as LinkIcon, MapPin, Mic2, PenLine, Video } from "lucide-react";
import { EditorialCard, EvidenceMeta, SectionBand, SectionHeader } from "@/components/design-system/Dossier";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ArtifactType = "talk" | "video" | "note";

interface Artifact {
  id: string;
  type: ArtifactType;
  title: string;
  venue?: string;
  date?: string;
  location?: string;
  topics?: string[];
  url: string;
  summary?: string;
  imageUrl?: string;
}

const artifacts: Artifact[] = [
  {
    id: "ami-linkedin",
    type: "note",
    title: "Global AI product launch",
    venue: "Ask Mastercard Intelligence",
    date: "2026",
    location: "New York, NY",
    topics: ["AI Product", "Research Assistants", "Conversational Intelligence"],
    summary: "Hosted and presented Lunch & Learn product launch in NYC, with addtn locations coordinated in Rome, Athens, and Purchase.",
    url: "https://www.linkedin.com/posts/alexathoennes_intelligence-is-becoming-fast-conversational-ugcPost-7460767669449867264-Swie/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB3WfnwBG2V5aCsXyXW2XIxZ5ze9Iksy2fA",
  },
  {
    id: "alumni-feature",
    type: "video",
    title: "Mastery learning and professional outcomes",
    venue: "21st Century Cyber Charter alumni spotlight",
    date: "February 2026",
    location: "Downingtown, PA",
    topics: ["Education", "Career Path", "Technical Learning"],
    summary: "A multi-channel feature on individualized education, mastery curriculums, early development, and professional trajectory.",
    url: "https://www.linkedin.com/posts/alexathoennes_21cccsalumni-classof2018-alumnispotlight-activity-7424802530242506752-15Qf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB3WfnwBG2V5aCsXyXW2XIxZ5ze9Iksy2fA",
  },
  {
    id: "women-in-stem",
    type: "talk",
    title: "Early-career roadmapping",
    venue: "Bucks County Community College, Women in STEM",
    date: "2024",
    location: "Newtown, PA",
    topics: ["Mentorship", "Career Design", "Women in Tech"],
    summary: "Invited guest session and Q&A for college students on early career, choice confidence, and navigating ambiguous paths.",
    url: "https://www.bucks.edu/",
  },
  {
    id: "informs",
    type: "talk",
    title: "Amazon reviews to forecast product match",
    venue: "INFORMS Annual Conference",
    date: "2021",
    location: "Anaheim, CA",
    topics: ["AI/ML", "NLP", "E-commerce", "Product Match"],
    summary: "NLP for recommendations from user propensity, feature sentiment summary (prior to Amazon's 'AI Customer Highlights' in 2023).",
    url: "https://meetings.informs.org/wordpress/anaheim2021/#ready",
  },
];

const honors = [
  { title: "Startup | Strategic Business Plan Award", organization: "tecBRIDGE radio", year: "2018" },
  { title: "Award for Applied Computing Excellence", organization: "University of Scranton", year: "2021" },
  { title: "Presidential Award", organization: "The Ronald Reagan Presidential Foundation & Institute", year: "2017" },
  { title: "Grand Champion Fundraiser", organization: "Walk to End Alzheimer’s", year: "2017" },
  { title: "Student Leadership grant", organization: "21st Century Cyber Charter", year: "2018" },
  { title: "NBC10 / Widener | Regional Leadership Recognition", organization: "NBC10 / Widener University", year: "2018" },
  { title: "Instructables  | Graphic design contest", organization: "Instructables.com", year: "2015" },
  { title: "Scholastic Art & Writing | Silver Key", organization: "Greater Philadelphia Region", year: "2015" },
  { title: "Freedom Credit Union Grant", organization: "Freedom Credit Union", year: "2018" },
  { title: "Asian American Women’s Coalition Merit Award", organization: "FISDU & Asian American Women’s Coalition", year: "2018" },
];

function OrganizationTooltip({ organization, title }: { organization: string; title: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="ml-1 inline-flex h-4 w-4 translate-y-[0.1rem] items-center justify-center text-[var(--ink-faint)] transition-colors hover:text-[var(--civic-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]"
          aria-label={`${title} organization`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="start"
        sideOffset={8}
        className="relative max-w-[220px] overflow-visible rounded-none border-2 border-[var(--ink)] bg-[var(--paper-card)] px-2.5 py-1.5 text-[11px] font-semibold leading-tight text-[var(--ink)] shadow-[3px_3px_0_var(--civic-blue)]"
      >
        {organization}
        <div className="absolute -bottom-[9px] left-4 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[var(--ink)]">
          <div className="absolute -left-[7px] -top-[9px] h-0 w-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-[var(--paper-card)]" />
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function TypeIcon({ type }: { type: ArtifactType }) {
  const iconProps = "h-4 w-4 text-muted-foreground shrink-0";
  switch (type) {
    case "video":
      return <Video className={iconProps} />;
    case "talk":
      return <Mic2 className={iconProps} />;
    case "note":
      return <PenLine className={iconProps} />;
    default:
      return null;
  }
}

export function TalksSection() {
  return (
    <SectionBand id="talks">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          marker="04"
          title="Engagements and activations"
          description="Posts, talks, education, earlier technical work, and selected honors."
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {artifacts.map((item) => (
            <EditorialCard
              key={item.id}
              className="group cursor-pointer"
              onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
            >
              {item.imageUrl && (
                <div className="mb-5 aspect-[4/3] overflow-hidden border border-[var(--rule)] bg-[var(--paper-soft)]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover grayscale contrast-[1.08] sepia-[0.10]"
                  />
                </div>
              )}

                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-xl leading-tight transition-colors group-hover:text-[var(--civic-blue)]">
                    {item.title}
                  </h3>
                  <TypeIcon type={item.type} />
                </div>
                {item.venue && (
                  <p className="text-sm font-semibold text-[var(--ink-soft)]">
                    {item.venue}
                  </p>
                )}

                {(item.date || item.location) && (
                  <div className="my-4 flex flex-wrap items-center gap-4 text-sm text-[var(--ink-muted)]">
                    {item.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    )}
                  </div>
                )}

                {item.summary && (
                  <p className="mb-4 text-sm leading-7 text-[var(--ink-muted)]">
                    {item.summary}
                  </p>
                )}

                {item.topics && (
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map((topic) => (
                      <span key={topic} className="stamp-tag stamp-tag-blue">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <EvidenceMeta className="justify-start">
                <div className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--ink-muted)] transition-colors group-hover:text-[var(--civic-blue)]">
                  <LinkIcon className="h-3 w-3" />
                  Open link
                </div>
                </EvidenceMeta>
            </EditorialCard>
          ))}
        </div>

        <div className="mt-8 border-t border-[var(--rule)] pt-6">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <h3 className="text-lg leading-tight text-[var(--ink)]">Honors</h3>
            <span className="data-text text-[var(--ink-faint)]">{honors.length}</span>
          </div>
          <div className="honors-grid grid gap-x-5 md:grid-cols-2">
            {honors.map((honor) => (
              <div key={`${honor.title}-${honor.year}`} className="grid grid-cols-[48px_minmax(0,1fr)] gap-2.5 border-b border-[rgba(213,198,177,0.55)] py-1.5">
                <span className="data-text text-[var(--ink-faint)]">{honor.year}</span>
                <p className="text-xs leading-5 text-[var(--ink-muted)]">
                  <span className="font-semibold text-[var(--ink-soft)]">{honor.title}</span>
                  <OrganizationTooltip organization={honor.organization} title={honor.title} />
                </p>
              </div>
            ))}
          </div>
          <details className="mobile-more-details mobile-only-block mt-4">
            <summary>More honors ({honors.length - 5})</summary>
            <div className="mt-3 space-y-2">
              {honors.slice(5).map((honor) => (
                <div key={`mobile-more-${honor.title}-${honor.year}`} className="grid grid-cols-[48px_minmax(0,1fr)] gap-2.5 border-b border-[rgba(213,198,177,0.55)] py-1.5">
                  <span className="data-text text-[var(--ink-faint)]">{honor.year}</span>
                  <p className="text-xs leading-5 text-[var(--ink-muted)]">
                    <span className="font-semibold text-[var(--ink-soft)]">{honor.title}</span>
                    <OrganizationTooltip organization={honor.organization} title={honor.title} />
                  </p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </SectionBand>
  );
}
