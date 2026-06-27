import { useMemo, useState } from "react";
import { Calendar, ExternalLink, Info, MapPin, Sparkles, Star, X, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const evidenceTiles = [
  {
    label: "Current focus",
    value: "AI research assistants",
    detail: "Conversation, synthesis, personalization, evaluation, and adoption.",
  },
  {
    label: "Operating mode",
    value: "Product + technical translation",
    detail: "Turning ambiguous workflows into scoped, testable product decisions.",
  },
  {
    label: "Impact lens",
    value: "Useful enough to become habit",
    detail: "Quality, trust, feedback loops, and the mechanics of real adoption.",
  },
];

const experiences = [
  {
    id: "mc-pm",
    company: "Mastercard Insights & Intelligence",
    role: "Global Product Manager II — AI, Platform, Market Intelligence",
    location: "Remote",
    duration: "2024 — Present",
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
      "Improved data-retrieval accuracy and traceability by 30% via privacy-respecting RAG.",
      "Streamlined onboarding by 40% through standardized documentation and RACI frameworks.",
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
    duration: "2022 — 2024",
    description:
      "Automated CI/CD pipelines and managed global deployment automation for 100+ core enterprise applications before moving formally into product.",
    impact: [
      "Reduced deployment time by roughly 50% through optimized automation pipelines.",
      "Improved cross-team alignment by 42% through standardized documentation.",
      "Crafted automation scripts to support high-availability global services.",
    ],
    skills: ["Automation", "CI/CD", "Data Analysis", "Enterprise Scale", "Agile", "Technical Writing"],
  },
  {
    id: "google",
    company: "Google Cloud — Internship",
    role: "Developer Relations Engineer",
    location: "New York, NY (Remote)",
    duration: "Jun 2020 — Aug 2020",
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
    company: "Visa — Internship",
    role: "Software Engineer",
    location: "Austin, TX (Remote)",
    duration: "May 2021 — Aug 2021",
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
    role: "Product Manager",
    location: "Scranton, PA",
    duration: "2018 — 2019",
    description:
      "Foundational product role focused on STEAM education platform design, curriculum development, and product strategy.",
    impact: [
      "First product role in a startup environment, working across strategy, UX, research, and go-to-market needs.",
      "Designed and launched a STEAM curriculum by translating classroom needs into a product concept.",
      "Received the tecBRIDGE radio Business Plan Award for product strategy work.",
    ],
    skills: ["Product Strategy", "UX Design", "User Research", "GTM Strategy", "Stakeholder Management", "Technical Writing", "Curriculum Development", "Client-facing"],
    featured: true,
  },
  {
    id: "u-scranton",
    company: "University of Scranton",
    role: "Enterprise Web Developer",
    location: "Scranton, PA",
    duration: "2020 — 2022",
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
      "Front-line volunteer work helping patients and families navigate hospital policies and surgical waiting-room procedures.",
    impact: [
      "Guided patients and families through hospital policies and surgical waiting-room procedures.",
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
    <section id="work" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold mb-3">
            Selected work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 italic">Selected work</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Product and technical work across AI research assistants, enterprise automation, developer experience, search, education, and financial capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {evidenceTiles.map((tile) => (
            <div key={tile.label} className="rounded-2xl border border-border/50 bg-card/30 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">{tile.label}</p>
              <p className="font-serif text-xl text-foreground mb-2">{tile.value}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{tile.detail}</p>
            </div>
          ))}
        </div>

        <div className="mb-12 p-5 bg-card/30 border border-border/40 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4 gap-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Filter by skill or context
            </span>
            {activeFilter && (
              <button onClick={() => setActiveFilter(null)} className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1">
                <X className="h-3 w-3" /> Reset
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {globalSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => setActiveFilter(activeFilter === skill ? null : skill)}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider transition-all border",
                  activeFilter === skill
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-background text-muted-foreground border-border/60 hover:border-primary/40 hover:text-primary"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {filteredExperiences.map((experience) => (
            <Card
              key={experience.id}
              className={cn(
                "relative animate-in fade-in slide-in-from-bottom-6 duration-700 bg-card/40 border-border/40 hover:border-primary/20 transition-all group shadow-none",
                experience.type === "secondary" && "border-dashed border-primary/20 bg-primary/[0.01]"
              )}
            >
              {experience.featured && (
                <div className="absolute -top-3 -right-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 backdrop-blur-md flex gap-1 items-center px-3 py-1">
                    <Star className="h-3 w-3 fill-primary/20" />
                    <span className="text-[9px] uppercase tracking-tighter font-bold">Selected</span>
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-6">
                  <div>
                    <CardTitle className="font-serif text-2xl md:text-3xl mb-1 group-hover:text-primary transition-colors">
                      {experience.role}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      <span className="text-primary font-bold text-xs uppercase tracking-[0.15em]">{experience.company}</span>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                        <Calendar className="h-3.5 w-3.5" /> {experience.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                        <MapPin className="h-3.5 w-3.5" /> {experience.location}
                      </div>
                    </div>
                  </div>
                  {experience.type === "secondary" && (
                    <div className="hidden sm:flex items-center gap-1 text-[9px] font-bold text-primary/60 uppercase italic">
                      <Info className="h-3 w-3" /> Context
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <div className="space-y-6">
                    <div className="space-y-4 border-l-4 border-primary/10 pl-5">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {experience.description}
                      </p>
                      {experience.links && (
                        <div className="flex flex-wrap gap-3">
                          {experience.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary font-bold hover:underline"
                            >
                              {link.label} <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {experience.video && (
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-primary/10 bg-black shadow-2xl">
                        <iframe
                          src={`https://play.vidyard.com/${experience.video.id}?autoplay=1&muted=1&loop=1&v=4&type=inline`}
                          className="absolute inset-0 w-full h-full border-0"
                          title={experience.video.title}
                          allow="autoplay; fullscreen; picture-in-picture"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.25em]">
                      <Zap className="h-4 w-4" /> Work details
                    </div>
                    <ul className="space-y-4">
                      {experience.impact.map((point, index) => (
                        <li key={index} className="text-[11px] md:text-sm text-muted-foreground leading-snug flex gap-3">
                          <span className="text-primary mt-1 select-none">✦</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {experience.testimonial && (
                  <div className="p-6 bg-primary/[0.03] border-l-4 border-primary/40 rounded-r-2xl italic">
                    <p className="text-sm text-foreground/90 leading-relaxed mb-4">“{experience.testimonial.text}”</p>
                    <cite className="text-[10px] not-italic font-extrabold text-primary uppercase tracking-widest">
                      — {experience.testimonial.author}, {experience.testimonial.title}
                    </cite>
                  </div>
                )}

                <div className="pt-6 border-t border-muted/20 flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-1 text-[9px] font-bold transition-all duration-300",
                        activeFilter === skill
                          ? "bg-primary text-primary-foreground border-primary scale-110"
                          : "border-muted-foreground/20 text-muted-foreground/50 hover:border-primary/40"
                      )}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
