import { useMemo, useState } from "react";
import { Calendar, ExternalLink, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  EditorialCard,
  EvidenceMeta,
  LedgerList,
  PunchcardFilter,
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
    location: "Remote",
    duration: "2024 to Present",
    description:
      "Leading product work on AI research assistant and market-intelligence workflows at Mastercard, with focus areas including conversational analytics, synthesis, personalization, evaluation, and user adoption.",
    links: [
      {
        label: "Explore the live platform",
        url: "https://mbi.mastercardservices.com/",
      },
    ],
    impact: [
      "Launched AI-assisted research tools and enhanced search using vector embeddings.",
      "Improved data-retrieval accuracy and traceability via privacy-respecting RAG.",
      "Streamlined onboarding through standardized documentation and RACI frameworks.",
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
  },
  {
    id: "mc-devops",
    company: "Mastercard",
    role: "Automation / DevOps Engineer I",
    location: "New York, NY",
    duration: "2022 to 2024",
    description:
      "Automated CI/CD pipelines and managed global deployment automation for 100+ core enterprise applications.",
    impact: [
      "Reduced deployment time through optimized automation pipelines.",
      "Improved cross-team alignment through standardized documentation.",
      "Crafted automation scripts to support high-availability global services.",
    ],
    skills: ["Automation", "CI/CD", "Data Analysis", "Enterprise Scale", "Agile", "Technical Writing"],
  },
  {
    id: "google",
    company: "Google Cloud, Internship",
    role: "Developer Relations Engineer",
    location: "New York, NY (Remote)",
    duration: "Jun 2020 to Aug 2020",
    description:
      "Owned the development lifecycle for a documentation-creation feature in Google’s open-source client library management tooling.",
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
    featured: true,
  },
  {
    id: "visa",
    company: "Visa, Internship",
    role: "Software Engineer",
    location: "Austin, TX (Remote)",
    duration: "May 2021 to Aug 2021",
    description:
      "Scaled customer-facing web architecture and engineered semantic search capabilities for Practical Money Skills, a financial education platform.",
    impact: [
      "Built features for 18 Visa websites and 1,600+ partner sites serving roughly 100K monthly users.",
      "Developed modular semantic search components using NLP and Elasticsearch to reduce maintenance burden.",
      "Worked on a public-facing financial education product where distribution, clarity, and trust mattered as much as the feature itself.",
    ],
    skills: ["Web Development", "Semantic Search", "UX Design", "Globalization", "Human Impact", "Enterprise Scale", "Full Stack"],
    testimonial: {
      text: "Alexa was very patient [...] but also pushed to move things forward. Alexa is a very professional presenter; she explains material concisely and captured her project well.",
      author: "Sandesh K.",
      title: "Sr. Director @ Visa",
    },
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
    featured: true,
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
      "Serviced digital tools and web experiences for 6,000+ students and 100K+ monthly visitors.",
      "Migrated a CV Creator application from legacy ASP/Access to a modern PowerApps/SQL Server stack.",
      "Implemented automation scripts and widgets using Acalog API and Python to streamline site content.",
      "Resolved support tickets close to real users while maintaining production systems.",
    ],
    skills: ["Web Development", "Automation", "Full Stack", "Data Analysis"],
    type: "secondary",
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
      "Served as a Discord community moderator and #3 ranked contributor for the tool.",
      "Coded with CSS, JavaScript, and Node.js.",
    ],
    skills: ["Web Development", "UX Design", "GitHub", "Full Stack", "Open Source", "Developer Advocacy"],
    type: "secondary",
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
  },
];

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const globalSkills = useMemo(() => {
    const all = experiences.flatMap((experience) => experience.skills);
    return Array.from(new Set(all)).sort();
  }, []);

  const filteredExperiences = useMemo(() => {
    if (!activeFilter) return experiences.filter((experience) => experience.type !== "secondary");
    return experiences.filter((experience) => experience.skills.includes(activeFilter));
  }, [activeFilter]);

  return (
    <SectionBand id="work">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          marker="02"
          eyebrow="Selected work"
          title="Product and technical work, filed as evidence."
          description="Product and technical work across AI research assistants, enterprise automation, developer tools, search, education, and financial capability."
          className="mb-10"
        />

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
        <div className="notched mb-10 border border-[var(--rule)] bg-[var(--paper-card)] p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="small-label">
              Punchcard filter / skill evidence
            </span>
            {activeFilter && (
              <button onClick={() => setActiveFilter(null)} className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.075em] text-[var(--revision-red)] hover:underline">
                <X className="h-3 w-3" /> Reset
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {globalSkills.map((skill) => (
              <PunchcardFilter
                key={skill}
                onClick={() => setActiveFilter(activeFilter === skill ? null : skill)}
                active={activeFilter === skill}
              >
                {skill}
              </PunchcardFilter>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {filteredExperiences.map((experience) => (
            <EditorialCard
              key={experience.id}
              important={experience.featured}
              className={cn(
                "group",
                experience.type === "secondary" && "border-dashed bg-[color-mix(in_srgb,var(--paper-card)_74%,var(--system-teal-soft))]"
              )}
            >
              {experience.featured && (
                <div className="absolute -right-3 -top-3 z-10">
                  <StampBadge tone="green">Selected</StampBadge>
                </div>
              )}

              <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-2xl leading-tight transition-colors group-hover:text-[var(--civic-blue)] md:text-3xl">
                      {experience.role}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="small-label text-[var(--civic-blue)]">{experience.company}</span>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)]">
                        <Calendar className="h-3.5 w-3.5" /> {experience.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)]">
                        <MapPin className="h-3.5 w-3.5" /> {experience.location}
                      </div>
                    </div>
                  </div>
                  {experience.type === "secondary" && (
                    <StampBadge tone="muted" className="text-[var(--system-teal)] bg-[var(--system-teal-soft)]">Related</StampBadge>
                  )}
                </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-6">
                    <div className="border-l-2 border-[var(--civic-blue)] bg-[var(--civic-blue-soft)] p-5">
                      <p className="text-sm leading-7 text-[var(--ink-soft)]">
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
                              className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--civic-blue)] hover:underline"
                            >
                              {link.label} <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {experience.video && (
                      <figure className="notched border border-[var(--rule)] bg-[var(--paper-card)] p-3">
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
                  </div>

                  <div className="space-y-4">
                    <p className="small-label">Proof rows</p>
                    <LedgerList items={experience.impact} />
                  </div>
                </div>

                {experience.testimonial && (
                  <blockquote className="border-l-2 border-[var(--revision-red)] bg-[var(--revision-red-soft)] p-5">
                    <p className="mb-4 text-sm leading-7 text-[var(--ink-soft)]">“{experience.testimonial.text}”</p>
                    <cite className="text-xs not-italic font-extrabold uppercase tracking-[0.07em] text-[var(--revision-red)]">
                      {experience.testimonial.author}, {experience.testimonial.title}
                    </cite>
                  </blockquote>
                )}

                <EvidenceMeta>
                  <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <StampBadge
                      key={skill}
                      tone={activeFilter === skill ? "blue" : "muted"}
                      className={cn(
                        "cursor-default",
                        activeFilter === skill && "border-[var(--civic-blue)]"
                      )}
                    >
                      {skill}
                    </StampBadge>
                  ))}
                </div>
                </EvidenceMeta>
              </div>
            </EditorialCard>
          ))}
        </div>
      </div>
    </SectionBand>
  );
}
