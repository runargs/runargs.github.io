import React, { useState, useMemo } from "react";
import { Zap, MapPin, Calendar, Sparkles, X, Filter, Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: "mc-pm",
    company: "Mastercard Insights & Intelligence",
    role: "Product Manager",
    location: "Remote",
    duration: "Jan 2024 - Present",
    description: "Driving product strategy for a multi-agent RAG chatbot and AI-native CMS workflows to transform global market intelligence.",
    impact: [
      "Launched AI-assisted research tools and enhanced search using vector embeddings.",
      "Improved data-retrieval accuracy and traceability by 30% via privacy-respecting RAG.",
      "Streamlined onboarding by 40% through standardized documentation and RACI frameworks.",
      "Achieved 80 NPS while scaling the platform portfolio by 50%."
    ],
    skills: ["AI/ML", "RAG Architecture", "Agentic Systems", "Roadmapping", "SQL/Mixpanel", "GTM Strategy"],
    video: {
      id: "p5qGELspVKa4FTSDXezEyM",
      title: "Mastercard Business Intelligence"
    } 
  },
  {
    id: "mc-devops",
    company: "Mastercard",
    role: "Automation Engineer",
    location: "New York, NY",
    duration: "2022 - 2024",
    description: "Architected CI/CD pipelines and managed global deployment automation for 100+ core enterprise applications.",
    impact: [
      "Reduced deployment time by ~50% via optimized automation pipelines.",
      "Improved cross-team alignment by 42% through standardized documentation."
    ],
    skills: ["CI/CD", "Automation", "Backend development", "Scripting", "Infrastructure"]
  },
  {
    id: "visa",
    company: "Visa",
    role: "Software Engineer — Intern",
    location: "Austin, TX (Remote)",
    duration: "May 2021 - Aug 2021",
    description: "Scaled customer-facing web architecture and engineered semantic search capabilities for Practical Money Skills.",
    impact: [
      "Built a web features used across 18 Visa websites and 1,600+ partner sites, serving ~100K monthly users in 5 languages.",
      "Developed a modular semantic search (Elasticsearch/NLP) component, optimizing international site maintenance.",
      "Interactive tools and educational resources to help individuals and communities build stronger financial futures."
    ],
    skills: ["AI/NLP", "Semantic Search", "Frontend", "Localization", "Architecture"]
  },
  {
    id: "google",
    company: "Google Cloud",
    role: "Developer Relations Engineer — Intern",
    location: "New York, NY (Remote)",
    duration: "Jun 2020 - Aug 2020",
    description: "Owned the development lifecycle for Google's open-source API management tooling within the Google Cloud ecosystem.",
    impact: [
      "Owned the full dev-cycle of a feature for <a href='https://github.com/googleapis/synthtool' target='_blank' class='text-primary underline'>Synthtool</a>, from user research through coding and open-source release.",
      "Automated library documentation for hundreds of APIs, significantly reducing manual engineering overhead and improving data accuracy.",
      "Presented feature at a Google developer showcase to drive adoption; active member of Asian Googler & Women@Google networks."
    ],
    skills: ["GCP", "SDKs", "Open Source", "User Research", "Python", "Automation"],
    testimonial: {
      text: "She is an excellent technical communicator [...] Alexa was great to have as a team member and I would happily recommend her for any position.",
      author: "Billy Jacobson",
      title: "Senior Developer Advocate"
    },
  },
  {
    id: "nexus",
    company: "Nexus Valley Solutions",
    role: "Associate Product Manager — Technical",
    location: "Scranton, PA",
    duration: "Oct 2018 - Mar 2019",
    description: "Foundational technical product role focused on STEAM education platform design and award-winning product strategy.",
    impact: [
      "Designed and launched a STEAM platform with an agile team, translating classroom needs into an award-winning product concept.",
      "Recipient of the <strong><a href='https://www.youtube.com/watch?v=xAeTsDBL950' target='_blank' class='text-primary underline'>tecBRIDGE radio Business Plan Competition Award</a></strong> for excellence in product strategy.",
      "Balanced UX testing and stakeholder pitching, building a versatile foundation for technical product management."
    ],
    skills: ["Product Strategy", "UX Testing", "Agile", "STEAM EdTech"]
  }
];

const globalSkills = Array.from(new Set(experiences.flatMap(e => e.skills))).sort();

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredExperiences = useMemo(() => {
    if (!activeFilter) return experiences;
    return experiences.filter(exp => exp.skills.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 italic">Experience</h2>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
            A career defined by the intersection of engineering and strategic vision.
          </p>
        </div>

        {/* INTERACTIVE SKILL FILTER */}
        <div className="mb-10 p-6 bg-card/30 border border-border/40 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
              <Sparkles className="h-3 w-3" /> Filter by Capability
            </div>
            {activeFilter && (
              <button 
                onClick={() => setActiveFilter(null)}
                className="text-[10px] font-bold text-primary hover:opacity-70 flex items-center gap-1 transition-all"
              >
                <X className="h-3 w-3" /> RESET TIMELINE
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {globalSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => setActiveFilter(activeFilter === skill ? null : skill)}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-medium transition-all border",
                  activeFilter === skill 
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-background text-muted-foreground border-border/60 hover:border-primary/40"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* EXPERIENCE LIST */}
        <div className="space-y-8 min-h-[500px]">
          {filteredExperiences.map((exp) => (
            <Card 
              key={exp.id} 
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-card/40 border-border/40 shadow-sm overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div>
                    <CardTitle className="font-serif text-xl md:text-2xl mb-1">{exp.role}</CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="text-primary font-bold text-[11px] uppercase tracking-widest">
                        {exp.company}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {exp.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-foreground/70 leading-relaxed italic border-l-2 border-primary/20 pl-4">
                      {exp.description}
                    </p>
                    
                    {/* Optional Video Component for Mastercard */}
                    {"video" in exp && exp.video && (
                      <div className="relative aspect-video overflow-hidden rounded-lg border border-primary/10 bg-black max-w-[280px] shadow-lg">
                        <iframe
                          src={`https://play.vidyard.com/${(exp.video as any).id}?autoplay=1&muted=1&loop=1&v=4&type=inline`}
                          className="absolute inset-0 w-full h-full border-0"
                          title={(exp.video as any).title}
                        />
                      </div>
                    )}
                  </div>
                
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                      <Zap className="h-3 w-3" /> Key Impact
                    </div>
                    <ul className="space-y-2.5">
                      {exp.impact.map((point, i) => (
                        <li key={i} className="text-[10px] md:text-[11px] text-muted-foreground leading-snug flex gap-2">
                          <span className="text-primary/60 shrink-0 mt-0.5 text-[8px]">✦</span>
                          <span dangerouslySetInnerHTML={{ __html: point }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Testimonial Section */}
                {exp.testimonial && (
                  <div className="mt-4 p-5 bg-primary/[0.03] border-l-2 border-primary/30 rounded-r-lg italic relative overflow-hidden">
                    <Quote className="absolute right-4 top-4 h-12 w-12 text-primary/5 -z-10" />
                    <p className="text-[11px] md:text-xs text-foreground/80 leading-relaxed mb-3 relative z-10">
                      "{exp.testimonial.text}"
                    </p>
                    <cite className="text-[10px] not-italic font-bold text-primary flex items-center gap-2">
                      — {exp.testimonial.author}, <span className="font-medium opacity-70">{exp.testimonial.title}</span>
                    </cite>
                  </div>
                )}

                <div className="pt-4 border-t border-muted/20 flex flex-wrap gap-1.5">
                  {exp.skills.map(s => (
                    <Badge 
                      key={s} 
                      variant="outline" 
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[9px] font-semibold transition-all",
                        activeFilter === s 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "border-muted-foreground/10 text-muted-foreground/60"
                      )}
                    >
                      {s}
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
