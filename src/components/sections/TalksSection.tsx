import { Info, Link as LinkIcon } from "lucide-react";
import { SectionBand, SectionHeader } from "@/components/design-system/Dossier";
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
    summary: "Hosted and presented a Lunch & Learn product launch in NYC, with additional locations coordinated in Rome, Athens, and Purchase.",
    url: "https://www.linkedin.com/posts/alexathoennes_intelligence-is-becoming-fast-conversational-ugcPost-7460767669449867264-Swie/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB3WfnwBG2V5aCsXyXW2XIxZ5ze9Iksy2fA",
  },
  {
    id: "alumni-feature",
    type: "video",
    title: "Mastery learning and professional outcomes",
    venue: "21st Century Cyber Charter alumni spotlight",
    date: "2026",
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

const artifactTypeLabel: Record<ArtifactType, string> = {
  note: "Note",
  talk: "Talk",
  video: "Video",
};

const artifactTypeTone: Record<ArtifactType, string> = {
  note: "blue",
  talk: "ochre",
  video: "green",
};

const topicToneByIndex = ["blue", "violet", "green", "ochre"] as const;

export function TalksSection() {
  return (
    <SectionBand id="talks">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          marker="02"
          title="Engagements"
          description="Posts, talks, education, earlier technical work, and selected honors."
          className="mb-8"
        />

        <div className="evidence-table-wrap notched">
          <table className="evidence-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Entry</th>
                <th>Date / Place</th>
                <th>Evidence</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {artifacts.map((item, index) => (
                <tr key={item.id} className="evidence-row">
                  <td className="evidence-ref" data-label="Ref">{String(index + 1).padStart(2, "0")}</td>
                  <td className="evidence-entry-cell" data-label="Entry">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="evidence-entry-link"
                    >
                      {item.title}
                    </a>
                    {item.venue && (
                      <span className="mt-1 block text-xs font-semibold text-[var(--ink-muted)]">
                        {item.venue}
                      </span>
                    )}
                  </td>
                  <td className="evidence-date-cell" data-label="Date / Place">
                    <span className="block">{item.date}</span>
                    {item.location && (
                      <span className="block text-xs text-[var(--ink-faint)]">{item.location}</span>
                    )}
                  </td>
                  <td className="evidence-proof-cell" data-label="Evidence">
                    <p>{item.summary}</p>
                    {item.topics && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.topics.map((topic, topicIndex) => (
                          <span key={topic} className={`evidence-mini-badge ${topicToneByIndex[topicIndex % topicToneByIndex.length]}`}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="evidence-link-cell" data-label="Link">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`evidence-link-badge ${artifactTypeTone[item.type]}`}
                    >
                      <LinkIcon className="h-3 w-3" />
                      {artifactTypeLabel[item.type]}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
