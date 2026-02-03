import React, { useState, useMemo } from "react";
import { Zap, MapPin, Calendar, Sparkles, X, Quote, Star, Info } from "lucide-react";
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
      "Streamlined onboarding by 40% through standardized documentation and RACI frameworks."
    ],
    skills: ["Product Strategy", "RAG Architecture", "Multi-Agent Systems", "Semantic Search", "Data Analysis", "Client-facing", "Technical Writing", "Globalization", "User Research", "Enterprise Scale", "Stakeholder Management", "Automation", "Agile"],
    video: { id: "p5qGELspVKa4FTSDXezEyM", title: "Mastercard Business Intelligence" },
    featured: true
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
      "Improved cross-team alignment by 42% through standardized documentation.",
      "Standardized automation scripts to support high-availability global services."
    ],
    skills: ["Automation", "CI/CD", "Data Analysis", "Enterprise Scale", "Agile", "Technical Writing"]
  },
  {
    id: "u-scranton",
    company: "University of Scranton",
    role: "Enterprise Web Developer",
    location: "Scranton, PA",
    duration: "2020 - 2022",
    description: "Architected digital solutions servicing 6,000+ students and 100k+ monthly visitors.",
    impact: [
      "Migrated CV Creator Application from legacy ASP/Access to a modern PowerApps/SQL Server stack.",
      "Implemented automation scripts and widgets using Acalog API and Python to streamline site content.",
      "Resolved IT support tickets, balancing technical maintenance with feature development."
    ],
    skills: ["Web Development", "Automation", "Full Stack", "Data Analysis"],
    type: "secondary"
  },
  {
    id: "visa",
    company: "Visa - Internship",
    role: "Software Engineer",
    location: "Austin, TX (Remote)",
    duration: "May 2021 - Aug 2021",
    description: "Scaled customer-facing web architecture and engineered semantic search capabilities for Practical Money Skills which offers interactive tools and educational resources to help individuals and communities build stronger financial futures.",
    impact: [
      "Built features for 18 Visa websites and 1,600+ partner sites serving ~100K monthly users using Java.",
      "Developed modular semantic search components using NLP (Elasticsearch) to optimize maintenance."
    ],
    skills: ["Web Development", "AI/ML", "Semantic Search", "UX Design", "Architecture", "Globalization", "Humanist", "Enterprise Scale", "Full Stack"]
  },
  {
    id: "google",
    company: "Google (GCP) - Internship",
    role: "DevRel Engineer",
    location: "New York, NY (Remote)",
    duration: "Jun 2020 - Aug 2020",
    description: "Owned the development lifecycle for Google's open-source API management tooling (Synthtool).",
    impact: [
      "Owned full dev-cycle of a feature from user research through coding and open-source release.",
      "Automated library documentation updates for hundreds of APIs, significantly reducing manual effort."
    ],
    skills: ["Technical Writing", "Automation", "Open Source", "GitHub", "User Research", "Web Development", "Product Strategy", "Developer Advocacy"],
    testimonial: {
      text: "She is an excellent technical communicator... Alexa was great to have as a team member and I would happily recommend her for any position.",
      author: "Billy Jacobson",
      title: "Senior Developer Advocate"
    },
    featured: true
  },
  {
    id: "nexus",
    company: "Nexus Valley Solutions",
    role: "Associate Technical Product Manager",
    location: "Scranton, PA",
    duration: "Oct 2018 - Mar 2019",
    description: "Foundational technical product role focused on STEAM education platform design and award-winning product strategy.",
    impact: [
      "Designed and launched a STEAM curriculum, translating classroom needs into an award-winning concept.",
      "Recipient of the tecBRIDGE radio Business Plan Award for excellence in product strategy."
    ],
    skills: ["Product Strategy", "UX Design", "User Research", "GTM Strategy", "Stakeholder Management", "Technical Writing", "Curriculum Development", "Client-facing"],
    featured: true
  },
  {
    id: "manila-design",
    company: "Manila Science Alumni Org",
    role: "Graphic Designer",
    location: "Manila, Philippines",
    duration: "July 2015",
    description: "Visual communication for scientific laboratory initiatives.",
    impact: [
      "Identified stakeholder needs through collaboration for technical research posters.",
      "Translated complex project specifications into high-impact visual narratives."
    ],
    skills: ["UX Design", "Stakeholder Management", "Globalization", "Product Strategy"],
    type: "secondary"
  },
  {
    id: "jefferson-volunteer",
    company: "Thomas Jefferson University Hospital",
    role: "Patient Assistance Volunteer",
    location: "Philadelphia, PA",
    duration: "2016",
    description: "Front-line patient advocacy and hospital policy guidance.",
    impact: [
      "Guided patients and families through hospital policies and surgical waiting room procedures.",
      "Facilitated empathetic communication between medical staff and patient families."
    ],
    skills: ["Humanist", "User Research"],
    type: "secondary"
  },
  {
    id: "notion-enhanced",
    company: "Notion Enhancer",
    role: "Open Source Contributor & Developer Advocate",
    location: "Global",
    duration: "2020",
    description: "Open source software contributor",
    impact: [
      "Top productivity app’s customization suite: added new extensions, themes, bug fixes, community technical support Discord moderator.",
      "Multi-faceted role as #3 ranked top contributor for this tool.",
      "Coded with CSS, Javascript, and Node.js."
    ],
    skills: ["Web Development", "UX Design", "GitHub", "Full Stack", "Open Source", "Developer Advocacy"],
    type: "secondary"
  }
];

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Dynamically generate unique skill list from all experiences
  const globalSkills = useMemo(() => {
    const all = experiences.flatMap(e => e.skills);
    return Array.from(new Set(all)).sort();
  }, []);

  const filteredExperiences = useMemo(() => {
    if (!activeFilter) return experiences.filter(e => e.type !== "secondary");
    return experiences.filter(exp => exp.skills.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 italic">Professional Journey</h2>
          <p className="text-muted-foreground text-sm tracking-widest font-medium">
            Select experiences demonstrating technical expertise, humanitarian skill, and strategic design.
          </p>
        </div>

        {/* DYNAMIC FILTER BAR */}
        <div className="mb-12 p-6 bg-card/30 border border-border/40 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Expertise Matrix
            </span>
            {activeFilter && (
              <button onClick={() => setActiveFilter(null)} className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1">
                <X className="h-3 w-3" /> RESET
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

        {/* EXPERIENCE LIST */}
        <div className="space-y-12">
          {filteredExperiences.map((exp) => (
            <Card key={exp.id} className={cn(
                "relative animate-in fade-in slide-in-from-bottom-6 duration-700 bg-card/40 border-border/40 hover:border-primary/20 transition-all group shadow-none",
                exp.type === "secondary" && "border-dashed border-primary/20 bg-primary/[0.01]"
              )}>
              
              {/* KEY TENURE BADGE */}
              {exp.featured && (
                <div className="absolute -top-3 -right-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 backdrop-blur-md flex gap-1 items-center px-3 py-1">
                    <Star className="h-3 w-3 fill-primary/20" />
                    <span className="text-[9px] uppercase tracking-tighter font-bold">Key Tenure</span>
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-serif text-2xl md:text-3xl mb-1 group-hover:text-primary transition-colors">
                      {exp.role}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      <span className="text-primary font-bold text-xs uppercase tracking-[0.15em]">{exp.company}</span>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                        <Calendar className="h-3.5 w-3.5" /> {exp.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                        <MapPin className="h-3.5 w-3.5" /> {exp.location}
                      </div>
                    </div>
                  </div>
                  {exp.type === "secondary" && (
                    <div className="flex items-center gap-1 text-[9px] font-bold text-primary/60 uppercase italic">
                      <Info className="h-3 w-3" /> Additional Context
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic border-l-4 border-primary/10 pl-5">
                      {exp.description}
                    </p>
                    
                    {exp.video && (
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-primary/10 bg-black shadow-2xl">
                        <iframe
                          src={`https://play.vidyard.com/${exp.video.id}?autoplay=1&muted=1&loop=1&v=4&type=inline`}
                          className="absolute inset-0 w-full h-full border-0"
                          title={exp.video.title}
                        />
                      </div>
                    )}
                  </div>
                
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.25em]">
                      <Zap className="h-4 w-4" /> Strategic Impact
                    </div>
                    <ul className="space-y-4">
                      {exp.impact.map((point, i) => (
                        <li key={i} className="text-[11px] md:text-s text-muted-foreground leading-snug flex gap-3">
                          <span className="text-primary mt-1 select-none">✦</span>
                          <span dangerouslySetInnerHTML={{ __html: point }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {exp.testimonial && (
                  <div className="p-6 bg-primary/[0.03] border-l-4 border-primary/40 rounded-r-2xl italic">
                    <p className="text-s md:text-sm text-foreground/90 leading-relaxed mb-4">"{exp.testimonial.text}"</p>
                    <cite className="text-[10px] not-italic font-extrabold text-primary uppercase tracking-widest">— {exp.testimonial.author}, {exp.testimonial.title}</cite>
                  </div>
                )}

                {/* DYNAMIC PILL BADGES */}
                <div className="pt-6 border-t border-muted/20 flex flex-wrap gap-2">
                  {exp.skills.map(s => (
                    <Badge 
                      key={s} 
                      variant="outline" 
                      className={cn(
                        "rounded-full px-3 py-1 text-[9px] font-bold transition-all duration-300",
                        activeFilter === s 
                          ? "bg-primary text-primary-foreground border-primary scale-110" 
                          : "border-muted-foreground/20 text-muted-foreground/50 hover:border-primary/40"
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
