import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Calendar, ExternalLink, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  EditorialCard,
  SectionBand,
  SectionHeader,
  StampBadge,
} from "@/components/design-system/Dossier";

/*
const evidenceTiles = [
  {
    label: "Current focus",
    value: "AI research assistants",
    detail: "Conversation, synthesis, personalization, evaluation, and adoption.",
  },
  {
    label: "How I work",
    value: "Product + technical translation",
    detail: "Ambiguous workflows turned into scoped, testable product decisions.",
  },
  {
    label: "Adoption lens",
    value: "Trust and repeat use",
    detail: "Quality, feedback loops, and whether the product becomes part of a real workflow.",
  },
];
*/

const experiences = [
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
      src: "/images/google-synthtool.png",
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
      src: "/images/nexus-valley-robots.jpg",
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

type AccentName = keyof typeof workAccentVars;
type WorkAccentStyle = CSSProperties & {
  "--work-accent": string;
  "--work-accent-soft": string;
};

function getWorkAccentStyle(accent?: string): WorkAccentStyle {
  const vars = workAccentVars[(accent as AccentName) || "blue"] ?? workAccentVars.blue;
  return {
    "--work-accent": vars.color,
    "--work-accent-soft": vars.soft,
  };
}

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeMobileFilter, setActiveMobileFilter] = useState("Featured");

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

  return (
    <SectionBand id="work">
      <div className="mx-auto max-w-5xl">
        <div className="work-visual-field mb-8">
          <div className="relative z-10">
            <SectionHeader
              marker="02"
              title="Professional experience"
              description="A rotation through a breath of technical, care, and community work. Collapsed experiences surface depending on filter lens below."
              className="max-w-2xl"
            />
          </div>
          <img
            src="/images/clip-operator-computing.png"
            alt=""
            aria-hidden="true"
            className="work-operator-figure"
          />
        </div>

{/*
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {evidenceTiles.map((tile) => (
            <div key={tile.label} className="rounded-2xl border border-border/50 bg-card/30 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">{tile.label}</p>
              <p className="font-serif text-xl text-foreground mb-2">{tile.value}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{tile.detail}</p>
            </div>
          ))}
        </div>
*/}
        <div className="work-mobile-controls mb-6">
          <span className="small-label mb-3 block">Scan by lens</span>
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

        <div className="work-mobile-list">
          {mobileVisibleExperiences.map((experience) => (
            <article
              key={`mobile-${experience.id}`}
              className="mobile-work-card"
              style={getWorkAccentStyle(experience.accent)}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="small-label mb-1 text-[var(--work-accent)]">{experience.company}</p>
                  <h3 className="text-lg leading-tight text-[var(--ink)]">{experience.role}</h3>
                </div>
                {experience.featured && (
                  <StampBadge tone="muted" className="shrink-0 border-[var(--work-accent)] bg-[var(--work-accent-soft)] text-[var(--work-accent)]">
                    Selected
                  </StampBadge>
                )}
              </div>

              <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-[var(--ink-muted)]">
                <span>{experience.duration}</span>
                <span>{experience.location}</span>
              </div>

              <p className="text-sm leading-6 text-[var(--ink-muted)]">{experience.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {experience.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="stamp-tag text-[var(--ink-muted)]">
                    {skill}
                  </span>
                ))}
                {experience.skills.length > 3 && (
                  <span className="stamp-tag text-[var(--ink-faint)]">+{experience.skills.length - 3}</span>
                )}
              </div>

              <details className="mobile-card-disclosure mt-4">
                <summary>View details</summary>
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

        <div className="work-desktop-list space-y-10">
          {filteredExperiences.map((experience) => (
            <EditorialCard
              key={experience.id}
              important={experience.featured}
              style={getWorkAccentStyle(experience.accent)}
              className={cn(
                "work-card group overflow-hidden p-0",
                experience.type === "secondary" && "border-dashed bg-[color-mix(in_srgb,var(--paper-card)_74%,var(--work-accent-soft))]"
              )}
            >
              <div className="work-punch-strip" aria-hidden="true" />

              <div className="relative z-10 p-5 md:p-7">
                <div className="mb-6 flex flex-col gap-5 border-b border-[var(--rule)] pb-5 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="small-label text-[var(--work-accent)]">{experience.company}</span>
                      {experience.featured && (
                        <StampBadge tone="muted" className="border-[var(--work-accent)] bg-[var(--work-accent-soft)] text-[var(--work-accent)]">
                          Selected
                        </StampBadge>
                      )}
                      {experience.type === "secondary" && (
                        <StampBadge tone="muted" className="bg-[var(--work-accent-soft)] text-[var(--work-accent)]">
                          Related
                        </StampBadge>
                      )}
                    </div>
                    <h3 className="text-2xl leading-tight transition-colors group-hover:text-[var(--work-accent)] md:text-3xl">
                      {experience.role}
                    </h3>
                  </div>

                  <div className="grid min-w-[210px] gap-2 border border-[var(--rule)] bg-[var(--paper)] p-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)]">
                        <Calendar className="h-3.5 w-3.5" /> {experience.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)]">
                        <MapPin className="h-3.5 w-3.5" /> {experience.location}
                      </div>
                  </div>
                </div>

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

                <div className="mt-7 border-t border-[rgba(213,198,177,0.85)] pt-4">
                  <div className="flex flex-wrap gap-1.5">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "stamp-tag work-card-skill-tag",
                        activeFilter === skill
                          ? "border-[var(--work-accent)] bg-[var(--work-accent-soft)] text-[var(--work-accent)]"
                          : ""
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              </div>
            </EditorialCard>
          ))}
        </div>
      </div>
    </SectionBand>
  );
}
