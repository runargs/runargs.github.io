import { Calendar, Link as LinkIcon, MapPin, Mic2, PenLine, Video } from "lucide-react";
import { EditorialCard, EvidenceMeta, SectionBand, SectionHeader } from "@/components/design-system/Dossier";

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
  { title: "Strategic Business Plan Award", organization: "tecBRIDGE radio", year: "2018" },
  { title: "Award for Excellence in Applied Computing, Magna Cum Laude", organization: "University of Scranton", year: "2021" },
  { title: "First Place: Autonomous Maze-Solving Robotics Competition", organization: "University of Scranton", year: "2018" },
  { title: "Technical Competition Finalist: SumoBot Engineering", organization: "IEEE Hackathon", year: "2019" },
  { title: "Leadership Award", organization: "The Ronald Reagan Presidential Foundation & Institute", year: "2017" },
  { title: "Philanthropic Leadership: Grand Champion Fundraiser", organization: "Walk to End Alzheimer’s", year: "2017" },
  { title: "Exemplary Leadership Award", organization: "21st Century Cyber Charter", year: "2018" },
  { title: "Regional Leadership Recognition", organization: "NBC10 / Widener University", year: "2018" },
  { title: "Graphic Design Competition Runner-Up", organization: "Instructables.com", year: "2015" },
  { title: "Scholastic Art & Writing Silver Key", organization: "Greater Philadelphia Region", year: "2015" },
  { title: "Academic Excellence Recognition", organization: "21st Century Cyber Charter", year: "2018" },
  { title: "Dean’s List for Academic Achievement", organization: "University of Scranton", year: "2021" },
  { title: "University Merit Grant", organization: "University of Scranton", year: "2018" },
  { title: "Freedom Credit Union Grant", organization: "Freedom Credit Union", year: "2018" },
  { title: "AAWC Merit Award", organization: "FISDU & Asian American Women’s Coalition", year: "2018" },
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
              <div key={`${honor.title}-${honor.year}`} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-[rgba(213,198,177,0.55)] py-2">
                <span className="data-text text-[var(--ink-faint)]">{honor.year}</span>
                <p className="text-xs leading-5 text-[var(--ink-muted)]">
                  <span className="font-semibold text-[var(--ink-soft)]">{honor.title}</span>
                  <span className="text-[var(--ink-faint)]"> / {honor.organization}</span>
                </p>
              </div>
            ))}
          </div>
          <details className="mobile-more-details mobile-only-block mt-4">
            <summary>More honors ({honors.length - 5})</summary>
            <div className="mt-3 space-y-2">
              {honors.slice(5).map((honor) => (
                <div key={`mobile-more-${honor.title}-${honor.year}`} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-[rgba(213,198,177,0.55)] py-2">
                  <span className="data-text text-[var(--ink-faint)]">{honor.year}</span>
                  <p className="text-xs leading-5 text-[var(--ink-muted)]">
                    <span className="font-semibold text-[var(--ink-soft)]">{honor.title}</span>
                    <span className="text-[var(--ink-faint)]"> / {honor.organization}</span>
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
