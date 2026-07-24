import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Calendar, ExternalLink, MapPin, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CitationLink,
  EditorialCard,
  DossierLink,
  SectionBand,
  SectionHeader,
} from "@/components/design-system/Dossier";

/*
 * WorkSection carries the highest-density portfolio data and the desktop card
 * stacking interaction. Preserve the distinction between interactive filters,
 * descriptive skills, status badges, and plain metadata when editing it.
 */
type WorkAccent = "blue" | "teal" | "ochre" | "violet" | "green";

interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  impact: string[];
  skills: string[];
  accent: WorkAccent;
  links?: Array<{ label: string; url: string }>;
  video?: { id: string; title: string };
  artifactImage?: {
    src: string;
    alt: string;
    caption: string;
    fit?: "contain" | "cover";
  };
  testimonial?: {
    text: string;
    author: string;
    title: string;
  };
  featured?: boolean;
  type?: "secondary";
}

const experiences: Experience[] = [
  {
    id: "mc-pm",
    company: "Mastercard Insights & Intelligence",
    role: "Global Product Manager II, AI, Platform, Market Intelligence",
    location: "Remote (US - ET)",
    duration: "2024 to Present",
    description:
      "Leading product work on AI research-assistant workflows for market intelligence, including conversational analytics, retrieval quality, evaluation, personalization, and adoption.",
    links: [
      {
        label: "Explore the live platform",
        url: "https://mbi.mastercardservices.com/",
      },
    ],
    impact: [
      "Launched AI-assisted research tools and enhanced search using vector embeddings.",
      "Improved retrieval quality and traceability through source-grounded RAG.",
      "Defined launch requirements around evaluation, permissioning, and answer boundaries.",
      "Collaborate across global teams to align OKRs, KPIs, regional requirements, and product-launch tradeoffs.",
    ],
    skills: [
      "Product Strategy",
      "RAG Architecture",
      "Multi-Agent Systems",
      "Semantic Search",
      "GTM Strategy",
      "Data Analysis",
      "Client-facing",
      "Technical Writing",
      "Globalization",
      "User Research",
      "Enterprise Scale",
      "Stakeholder Management",
      "Automation",
      "Agile",
    ],
    video: { id: "ggs8jevYVZzpeYdcBuaFwW", title: "Ask Mastercard Intelligence" },
    featured: true,
    accent: "ochre",
  },
  {
    id: "mc-devops",
    company: "Mastercard",
    role: "Automation / DevOps Engineer I",
    location: "New York, NY",
    duration: "2022 to 2024",
    description:
      "Built and maintained deployment automation for global enterprise systems, with attention to reliability, documentation, and cross-team coordination.",
    impact: [
      "Reduced deployment time through optimized automation pipelines.",
      "Improved cross-team alignment through standardized documentation.",
      "Crafted automation scripts to support high-availability global services.",
    ],
    skills: ["Automation", "CI/CD", "Data Analysis", "Enterprise Scale", "Agile", "Technical Writing"],
    accent: "blue",
  },
  {
    id: "google",
    company: "Google Cloud, Internship",
    role: "Developer Relations Engineer",
    location: "New York, NY",
    duration: "Jun 2020 to Aug 2020",
    description:
      "Owned a documentation feature for open-source client-library tooling, moving from user research through implementation and release.",
    impact: [
      "Owned a feature from user research through coding and open-source release.",
      "Automated library documentation updates for hundreds of APIs via generated API client tooling.",
      "Practiced the craft of explaining technical systems clearly to developer audiences.",
    ],
    skills: ["Technical Writing", "Automation", "Open Source", "GitHub", "User Research", "Web Development", "Product Strategy", "Developer Advocacy"],
    testimonial: {
      text: "She is an excellent technical communicator... Alexa was great to have as a team member and I would happily recommend her for any position.",
      author: "Billy J.",
      title: "Sr. Developer Advocate @ Google",
    },
    artifactImage: {
      src: "/images/google-synthtool-card.png",
      alt: "GitHub repository card for googleapis synthtool",
      caption: "Open-source / googleapis synthtool",
      fit: "contain",
    },
    featured: true,
    accent: "green",
  },
  {
    id: "visa",
    company: "Visa, Internship",
    role: "Software Engineer",
    location: "Austin, TX",
    duration: "May 2021 to Aug 2021",
    description:
      "Built public-facing web and search capabilities for financial education products where clarity, access, and trust shaped the work.",
    impact: [
      "Built public-facing features across a global financial education ecosystem.",
      "Developed modular semantic search components using NLP and Elasticsearch to reduce maintenance burden.",
      "Worked on a public-facing financial education product where distribution, clarity, and trust mattered as much as the feature itself.",
    ],
    skills: ["Web Development", "Semantic Search", "UX Design", "Globalization", "Human Impact", "Enterprise Scale", "Full Stack"],
    testimonial: {
      text: "Alexa was very patient [...] but also pushed to move things forward. Alexa is a very professional presenter; she explains material concisely and captured her project well.",
      author: "Sandesh K.",
      title: "Sr. Director @ Visa",
    },
    accent: "violet",
  },
  {
    id: "nexus",
    company: "Nexus Valley Solutions",
    role: "Product Builder, Robotics Education",
    location: "Scranton, PA",
    duration: "2018 to 2019",
    description:
      "Early product-building work focused on robotics education, STEAM curriculum, and product strategy.",
    impact: [
      "Worked across strategy, UX, research, and go-to-market needs in a startup environment.",
      "Designed and launched a STEAM robotics curriculum by translating classroom needs into a product concept.",
      "Received the tecBRIDGE radio Business Plan Award for product strategy work.",
    ],
    skills: ["Product Strategy", "UX Design", "User Research", "GTM Strategy", "Stakeholder Management", "Technical Writing", "Robotics Education", "Client-facing"],
    artifactImage: {
      src: "/images/nexus-valley-robot-cars.jpg",
      alt: "Small colorful educational robots on a workshop table",
      caption: "3D Printed Robotics / STEAM curriculum",
    },
    featured: true,
    accent: "teal",
  },
  {
    id: "u-scranton",
    company: "University of Scranton",
    role: "Enterprise Web Developer",
    location: "Scranton, PA",
    duration: "2020 to 2022",
    description:
      "Architected and maintained digital systems for university audiences, balancing technical maintenance with user-facing improvements.",
    impact: [
      "Maintained digital tools and web experiences for university audiences.",
      "Migrated a CV Creator application from legacy ASP/Access to a modern PowerApps/SQL Server stack.",
      "Implemented automation scripts and widgets using Acalog API and Python to streamline site content.",
      "Resolved support tickets close to real users while maintaining production systems.",
    ],
    skills: ["Web Development", "Automation", "Full Stack", "Data Analysis"],
    type: "secondary",
    accent: "blue",
  },
  {
    id: "jefferson-volunteer",
    company: "Thomas Jefferson University Hospital",
    role: "Patient Assistance Volunteer",
    location: "Philadelphia, PA",
    duration: "2016",
    description:
      "Front-line volunteer work helping patients and families navigate hospital policies and surgical waiting-area procedures.",
    impact: [
      "Guided patients and families through hospital policies and surgical waiting-area procedures.",
      "Facilitated empathetic communication between medical staff and patient families.",
      "Built early sensitivity to how confusing systems become human problems at the point of care.",
    ],
    skills: ["Health", "Service Design", "Human Impact", "Communication", "User Research"],
    type: "secondary",
    accent: "green",
  },
  {
    id: "notion-enhanced",
    company: "Notion Enhancer",
    role: "Open Source Contributor & Developer Advocate",
    location: "Global",
    duration: "2020",
    description:
      "Contributed to an open-source customization suite for a productivity app, including extensions, themes, fixes, and community support.",
    impact: [
      "Added extensions, themes, bug fixes, and technical support for a customization suite used by productivity power users.",
      "Served as a regular contributor and Discord community moderator for the tool.",
      "Coded with CSS, JavaScript, and Node.js.",
    ],
    skills: ["Web Development", "UX Design", "GitHub", "Full Stack", "Open Source", "Developer Advocacy"],
    type: "secondary",
    accent: "violet",
  },
  {
    id: "manila-design",
    company: "Manila Science Alumni Org",
    role: "Graphic Designer",
    location: "Manila, Philippines",
    duration: "2015",
    description: "Created visual communication for scientific laboratory initiatives.",
    impact: [
      "Identified stakeholder needs through collaboration on technical research posters.",
      "Translated complex project specifications into clearer visual materials.",
    ],
    skills: ["UX Design", "Stakeholder Management", "Globalization", "Product Strategy", "Visual Communication"],
    type: "secondary",
    accent: "ochre",
  },
];

const workStory = ["Research", "Frame", "Build", "Communicate", "Learn"] as const;

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

const workAccentVars = {
  blue: { color: "var(--civic-blue)", soft: "var(--civic-blue-soft)" },
  teal: { color: "var(--system-teal)", soft: "var(--system-teal-soft)" },
  ochre: { color: "var(--field-ochre)", soft: "var(--field-ochre-soft)" },
  violet: { color: "var(--ai-violet)", soft: "var(--ai-violet-soft)" },
  green: { color: "var(--trust-green)", soft: "var(--trust-green-soft)" },
} as const;

const mobileWorkFilters = [
  { label: "Featured", skills: [] },
  { label: "AI product", skills: ["Product Strategy", "RAG Architecture", "Semantic Search", "Multi-Agent Systems"] },
  { label: "Launch", skills: ["GTM Strategy", "Stakeholder Management", "Client-facing", "Globalization"] },
  { label: "Engineering", skills: ["Automation", "CI/CD", "Full Stack", "Web Development"] },
  { label: "Human systems", skills: ["Human Impact", "Health", "Service Design", "User Research"] },
];

type WorkAccentStyle = CSSProperties & {
  "--work-accent": string;
  "--work-accent-soft": string;
};

type WorkCardStyle = WorkAccentStyle & {
  "--shuffle-index": number;
  "--work-stack-index"?: number;
};

function getWorkAccentStyle(accent: WorkAccent = "blue"): WorkAccentStyle {
  const vars = workAccentVars[accent] ?? workAccentVars.blue;
  return {
    "--work-accent": vars.color,
    "--work-accent-soft": vars.soft,
  };
}

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeMobileFilter, setActiveMobileFilter] = useState("Featured");
  const [openWorkIds, setOpenWorkIds] = useState<Set<string>>(() => new Set());
  const [credentialsOpen, setCredentialsOpen] = useState(false);

  const desktopRevealSkills = useMemo(() => {
    const all = experiences
      .filter((experience) => experience.type === "secondary")
      .flatMap((experience) => experience.skills);
    return Array.from(new Set(all)).sort();
  }, []);

  const filteredExperiences = useMemo(() => {
    const selectedMobileFilter = mobileWorkFilters.find((filter) => filter.label === activeMobileFilter);
    if (activeFilter) return experiences.filter((experience) => experience.skills.includes(activeFilter));
    if (selectedMobileFilter && selectedMobileFilter.skills.length > 0) {
      return experiences.filter((experience) =>
        selectedMobileFilter.skills.some((skill) => experience.skills.includes(skill))
      );
    }
    if (!activeFilter) return experiences.filter((experience) => experience.type !== "secondary");
    return experiences.filter((experience) => experience.skills.includes(activeFilter));
  }, [activeFilter, activeMobileFilter]);

  const mobileVisibleExperiences = filteredExperiences.slice(0, activeFilter || activeMobileFilter !== "Featured" ? 4 : 3);
  const mobileHiddenExperiences = filteredExperiences.slice(mobileVisibleExperiences.length);
  const filterMotionKey = activeFilter ?? activeMobileFilter;

  return (
    <SectionBand id="work">
      <div className="mx-auto max-w-5xl">
        <div className="work-visual-field mb-8">
          <div className="relative z-10">
            <SectionHeader
              marker="01"
              title="I work across the stack."
              description={<>Research, product, engineering, and communication form one iterative practice. Exploration finds possibilities.<CitationLink number={2} href="https://pubmed.ncbi.nlm.nih.gov/17395573/" citation="Cohen, J. D., McClure, S. M., & Yu, A. J. (2007). Should I stay or should I go? How the human brain manages the trade-off between exploitation and exploration. Philosophical Transactions of the Royal Society B, 362, 933–942." /> Iteration develops them.</>}
              className="max-w-2xl"
            />
            <ol className="work-storyline" aria-label="How the work moves">
              {workStory.map((stage, index) => (
                <li key={stage}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{stage}</strong>
                  {index === workStory.length - 1 && <RotateCcw aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
          <img
            src="/images/clip-operator-computing.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="work-operator-figure"
          />
        </div>
        <div className="work-mobile-controls mb-6">
          <span className="small-label mb-3 block">Filter work</span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {mobileWorkFilters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => {
                  setActiveFilter(null);
                  setActiveMobileFilter(filter.label);
                }}
                className={cn(
                  "mobile-filter-chip",
                  activeMobileFilter === filter.label && !activeFilter && "is-active"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="work-skill-cloud notched mb-10 border border-[var(--rule)] bg-[var(--paper-card)] p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="small-label">
              Filter by skill
            </span>
            {activeFilter && (
              <button
                onClick={() => {
                  setActiveFilter(null);
                  setActiveMobileFilter("Featured");
                }}
                className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.075em] text-[var(--revision-red)] hover:underline"
              >
                <X className="h-3 w-3" /> Reset
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {desktopRevealSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  setActiveFilter(activeFilter === skill ? null : skill);
                  setActiveMobileFilter("Featured");
                }}
                className={cn(
                  "work-filter-tag",
                  activeFilter === skill && "is-active"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="work-mobile-list" key={`mobile-${filterMotionKey}`}>
          {mobileVisibleExperiences.map((experience, index) => (
            <article
              key={`mobile-${experience.id}`}
              className="mobile-work-card"
              style={{
                ...getWorkAccentStyle(experience.accent),
                "--shuffle-index": index,
              } as WorkCardStyle}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="small-label mb-1 text-[var(--work-accent)]">{experience.company}</p>
                  <h3 className="text-lg leading-tight text-[var(--ink)]">{experience.role}</h3>
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-[var(--ink-muted)]">
                <span>{experience.duration}</span>
                <span>{experience.location}</span>
              </div>

              <details className="mobile-card-disclosure mt-4">
                <summary>Open case notes</summary>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">{experience.description}</p>
                <ol className="mt-3 space-y-2 text-sm leading-6 text-[var(--ink-muted)]">
                  {experience.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                {experience.links && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {experience.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--work-accent)] hover:underline"
                      >
                        {link.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </details>
            </article>
          ))}

          {mobileHiddenExperiences.length > 0 && (
            <details className="mobile-more-details">
              <summary>More work records ({mobileHiddenExperiences.length})</summary>
              <div className="mt-4 space-y-3">
                {mobileHiddenExperiences.map((experience) => (
                  <article
                    key={`mobile-hidden-${experience.id}`}
                    className="mobile-work-card"
                    style={getWorkAccentStyle(experience.accent)}
                  >
                    <p className="small-label mb-1 text-[var(--work-accent)]">{experience.company}</p>
                    <h3 className="text-base leading-tight text-[var(--ink)]">{experience.role}</h3>
                    <p className="mt-2 text-xs font-semibold text-[var(--ink-muted)]">{experience.duration}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">{experience.description}</p>
                  </article>
                ))}
              </div>
            </details>
          )}
        </div>

        <div className="work-desktop-list space-y-3" key={`desktop-${filterMotionKey}`}>
          {filteredExperiences.map((experience, index) => {
            const isOpen = openWorkIds.has(experience.id);

            return (
            <EditorialCard
              key={experience.id}
              important={experience.featured}
              style={{
                ...getWorkAccentStyle(experience.accent),
                "--shuffle-index": index,
                "--work-stack-index": index,
              } as WorkCardStyle}
              className={cn(
                "work-card group overflow-hidden p-0",
                experience.type === "secondary" && "border-dashed bg-[color-mix(in_srgb,var(--paper-card)_74%,var(--work-accent-soft))]"
              )}
            >
              <div className="work-punch-strip" aria-hidden="true" />
              <details
                className="work-record-disclosure relative z-10"
                open={isOpen}
                onToggle={(event) => {
                  const open = event.currentTarget.open;
                  setOpenWorkIds((current) => {
                    const next = new Set(current);
                    if (open) next.add(experience.id);
                    else next.delete(experience.id);
                    return next;
                  });
                }}
              >
                <summary className="work-record-summary">
                  <div className="work-record-identity">
                    <span className="small-label text-[var(--work-accent)]">{experience.company}</span>
                    <h3>{experience.role}</h3>
                  </div>
                  <div className="work-record-meta">
                    <span><Calendar aria-hidden="true" />{experience.duration}</span>
                    <span><MapPin aria-hidden="true" />{experience.location}</span>
                  </div>
                  <span className="work-record-open">{isOpen ? "Close" : "Case notes"}</span>
                </summary>

                {isOpen && <div className="work-record-expanded">
                  <div className="work-ad-body flow-root">
                  {experience.video && (
                    <figure className="work-ad-media notched border border-[var(--rule)] bg-[var(--paper-card)] p-3">
                      <div className="relative aspect-video overflow-hidden bg-black">
                      <iframe
                        src={`https://play.vidyard.com/${experience.video.id}?autoplay=1&muted=1&loop=1&v=4&type=inline`}
                        className="absolute inset-0 w-full h-full border-0"
                        title={experience.video.title}
                        allow="autoplay; fullscreen; picture-in-picture"
                      />
                      </div>
                      <figcaption className="mt-2 border-t border-[rgba(213,198,177,0.75)] pt-2 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--ink-muted)]">
                        Video artifact / {experience.video.title}
                      </figcaption>
                    </figure>
                  )}

                  {experience.artifactImage && (
                    <figure className="work-ad-media notched border border-[var(--rule)] bg-[var(--paper-card)] p-3">
                      <div className="work-artifact-frame">
                        <img
                          src={experience.artifactImage.src}
                          alt={experience.artifactImage.alt}
                          className={cn(
                            "work-artifact-image",
                            experience.artifactImage.fit === "contain" && "work-artifact-image-contain"
                          )}
                        />
                      </div>
                      <figcaption className="mt-2 border-t border-[rgba(213,198,177,0.75)] pt-2 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--ink-muted)]">
                        {experience.artifactImage.caption}
                      </figcaption>
                    </figure>
                  )}

                  <p className="work-ad-lede">
                    {experience.description}
                  </p>
                  {experience.links && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {experience.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--work-accent)] hover:underline"
                        >
                          {link.label} <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="mt-5">
                    <p className="small-label mb-3 text-[var(--work-accent)]">Impact</p>
                    <ol className="work-impact-list">
                      {experience.impact.map((item, index) => (
                        <li key={item}>
                          <span className="font-display text-2xl leading-none text-[var(--work-accent)]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {experience.testimonial && (
                    <blockquote className="mt-5 clear-both border-l-2 border-[var(--revision-red)] bg-[var(--revision-red-soft)] p-5">
                      <p className="mb-4 text-sm leading-7 text-[var(--ink-soft)]">“{experience.testimonial.text}”</p>
                      <cite className="text-xs not-italic font-extrabold uppercase tracking-[0.07em] text-[var(--revision-red)]">
                        {experience.testimonial.author}, {experience.testimonial.title}
                      </cite>
                    </blockquote>
                  )}
                  </div>
                </div>}
              </details>
            </EditorialCard>
            );
          })}
        </div>

        <aside id="resume" className="work-career-tools notched" aria-label="Résumé and credentials">
          <button
            type="button"
            className="work-credentials-toggle"
            aria-expanded={credentialsOpen}
            aria-controls="work-credentials-list"
            onClick={() => setCredentialsOpen((current) => !current)}
          >
            Education & selected credentials <span>{credentials.length} records</span>
          </button>
          <div className="work-career-actions">
            <img src="/images/clip-floppy-disk.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <DossierLink href="#contact" className="work-career-resume-link">
              Request résumé PDF
            </DossierLink>
            <a href="https://linkedin.com/in/alexathoennes" target="_blank" rel="noopener noreferrer">
              LinkedIn <ExternalLink aria-hidden="true" />
            </a>
          </div>
          {credentialsOpen && (
            <div id="work-credentials-list" className="resume-credentials-grid">
              {credentials.map((credential) => (
                <div key={`${credential.title}-${credential.org}`} className="resume-credential-row">
                  <p className="resume-credential-title">{credential.title}</p>
                  <p className="resume-credential-org">{credential.org}</p>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </SectionBand>
  );
}
