import { Calendar, Link as LinkIcon, MapPin, Mic2, PenLine, Video } from "lucide-react";
import { EditorialCard, EvidenceMeta, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

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
    title: "Ask Mastercard Intelligence public post",
    venue: "LinkedIn",
    date: "2026",
    location: "New York, NY",
    topics: ["AI Product", "Research Assistants", "Conversational Intelligence"],
    summary: "Public post on AI research assistant work and conversational market intelligence.",
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
    summary: "A public feature on education, early technical development, and professional trajectory.",
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
    summary: "Guest session on early career choices, technical confidence, and navigating ambiguous paths.",
    url: "https://www.bucks.edu/",
  },
  {
    id: "informs",
    type: "talk",
    title: "Amazon reviews to forecast product match",
    venue: "INFORMS Annual Meeting",
    date: "2021",
    location: "Anaheim, CA",
    topics: ["AI/ML", "E-commerce", "Product Match"],
    summary: "Earlier work on using review data to understand product fit and purchasing signals.",
    url: "https://meetings.informs.org/wordpress/anaheim2021/#ready",
  },
];

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
          eyebrow="Public links"
          title="Public artifacts and appearances."
          description="A few public links: AI research-assistant work, speaking, education, and earlier technical projects."
          className="mb-10"
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
                      <StampBadge key={topic} tone="blue">
                        {topic}
                      </StampBadge>
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
      </div>
    </SectionBand>
  );
}
