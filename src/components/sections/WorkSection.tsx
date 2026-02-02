import React, { useState, useMemo } from "react";
import { Zap, MapPin, Calendar, Sparkles, X, Filter, Quote, Heart, Palette, Play } from "lucide-react";
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
    skills: ["AI/ML", "Strategy", "Data Analysis", "Product Management", "Web Development"],
    video: { id: "p5qGELspVKa4FTSDXezEyM", title: "Mastercard Business Intelligence" } 
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
    skills: ["Automation", "CI/CD", "Infrastructure", "Python", "Web Development", "Strategy"]
  },
  {
    id: "visa",
    company: "Visa",
    role: "Software Engineering - Intern",
    location: "Austin, TX (Remote)",
    duration: "May 2021 - Aug 2021",
    description: "Scaled customer-facing web architecture and engineered semantic search capabilities for Practical Money Skills.",
    impact: [
      "Built features for 18 Visa websites and 1,600+ partner sites serving ~100K monthly users.",
      "Developed modular semantic search components using NLP (Elasticsearch) to optimize international site maintenance."
    ],
    skills: ["AI/ML", "Web Development", "UX/Design", "Architecture", "Localization"]
  },
  {
    id: "google",
    company: "Google Cloud",
    role: "Developer Relations Engineering - Intern",
    location: "New York, NY (Remote)",
    duration: "Jun 2020 - Aug 2020",
    description: "Owned the development lifecycle for Google's open-source API management tooling (Synthtool).",
    impact: [
      "Owned full dev-cycle of a feature from user research through coding and open-source release.",
      "Automated library documentation updates for hundreds of APIs, significantly reducing manual effort."
    ],
    testimonial: {
      text: "She is an excellent technical communicator... Alexa was great to have as a team member and I would happily recommend her for any position.",
      author: "Billy Jacobson",
      title: "Senior Developer Advocate"
    },
    skills: ["Automation", "Strategy", "Web Development", "Open Source", "User Research"]
  },
  {
    id: "u-scranton",
    company: "University of Scranton",
    role: "Enterprise Web Developer",
    location: "Scranton, PA",
    duration: "Aug 2020 - 2022",
    description: "Architected digital solutions servicing 6,000+ students and 100k+ monthly visitors.",
    impact: [
      "Migrated CV Creator Application from legacy ASP/Access to a modern PowerApps/SQL Server stack.",
      "Implemented automation scripts and widgets using Acalog API and Python to streamline site content.",
      "Resolved high-volume IT support tickets, balancing technical maintenance with feature development."
    ],
    skills: ["Web Development", "Python", "SQL", "Automation", "Technical Support"]
  },
  {
    id: "nexus",
    company: "Nexus Valley Solutions",
    role: "Associate Product Manager - Technical",
    location: "Scranton, PA",
    duration: "Oct 2018 - Mar 2019",
    description: "Foundational technical product role focused on STEAM education platform design and award-winning product strategy.",
    impact: [
      "Designed and launched a STEAM platform with an agile team, translating classroom needs into an award-winning product concept.",
      "Recipient of the <strong>tecBRIDGE radio Business Plan Award</strong> for excellence in product strategy."
    ],
    skills: ["Product Management", "Strategy", "UX/Design", "Agile"]
  },
  {
    id: "manila-design",
    company: "Manila Science Alumni Org",
    role: "Graphic Designer",
    location: "Philippines",
    duration: "July 2015",
    description: "Visual communication for scientific laboratory initiatives.",
    impact: [
      "Identified stakeholder needs through virtual collaboration for technical research posters.",
      "Translated complex project specifications into high-impact visual narratives."
    ],
    skills: ["UX/Design", "Visual Communication"],
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
    skills: ["Humanist", "User Research", "Advocacy"],
    type: "secondary"
  }
];

const globalSkills = Array.from(new Set(experiences.flatMap(e => e.skills))).sort();

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredExperiences = useMemo(() => {
    // Show secondary roles ONLY when their specific skills are clicked
    if (!activeFilter) return experiences.filter(e => e.type !== "secondary");
    return experiences.filter(exp => exp.skills.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 italic">Experience</h2>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
            Bridging technical orchestration and human-centered strategy.
          </p>
        </div>

        {/* SKILL DIRECTORY */}
        <div className="mb-10 p-6 bg-card/30 border border-border/40 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
              <Sparkles className="h-3 w-3" /> Skill Experience Matrix
            </div>
            {activeFilter && (
              <button onClick={() => setActiveFilter(null)} className="text-[10px] font-bold text-primary flex items-center gap-1">
                <X className="h-3 w-3" /> CLEAR FILTER
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
                    ? "bg-primary text-primary-foreground border-primary scale-105"
                    : "bg-background text-muted-foreground border-border/60 hover:border-primary/40"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-8 min-h-[600px]">
          {filteredExperiences.map((exp) => (
            <Card key={exp.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-card/40 border-border/40 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-serif text-xl md:text-2xl">{exp.role}</CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="text-primary font-bold text-[11px] uppercase tracking-widest">{exp.company}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {exp.duration}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </span>
                    </div>
                  </div>
                  {exp.type === "secondary" && (
                     <Badge variant="outline" className="text-[8px] uppercase border-primary/30 text-primary">Hidden Context</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm text-foreground/70 leading-relaxed italic border-l-2 border-primary/20 pl-4">
                      {exp.description}
                    </p>
                    {exp.video && (
                      <div className="relative aspect-video overflow-hidden rounded-lg border border-primary/10 bg-black max-w-[280px]">
                        <iframe
                          src={`https://play.vidyard.com/${exp.video.id}?autoplay=1&muted=1&loop=1&v=4&type=inline`}
                          className="absolute inset-0 w-full h-full border-0"
                          title={exp.video.title}
                        />
                      </div>
                    )}
                  </div>
                
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                      <Zap className="h-3 w-3" /> Impact
                    </div>
                    <ul className="space-y-2.5">
                      {exp.impact.map((point, i) => (
                        <li key={i} className="text-[10px] md:text-[11px] text-muted-foreground flex gap-2">
                          <span className="text-primary/60 shrink-0 mt-1 text-[8px]">✦</span>
                          <span dangerouslySetInnerHTML={{ __html: point }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {exp.testimonial && (
                  <div className="p-4 bg-primary/[0.03] border-l-2 border-primary/30 italic rounded-r-lg">
                    <p className="text-[11px] md:text-xs text-foreground/80 mb-2">"{exp.testimonial.text}"</p>
                    <cite className="text-[10px] not-italic font-bold text-primary">— {exp.testimonial.author}, {exp.testimonial.title}</cite>
                  </div>
                )}

                {/* RESTORED PILL BADGES */}
                <div className="pt-4 border-t border-muted/20 flex flex-wrap gap-1.5">
                  {exp.skills.map(s => (
                    <Badge 
                      key={s} 
                      variant="outline" 
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[9px] font-semibold transition-all",
                        activeFilter === s 
                          ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                          : "border-muted-foreground/10 text-muted-foreground/60 hover:border-primary/30"
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
