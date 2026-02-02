import React, { useState } from "react";
import { Zap, MapPin, Calendar, Code2, Sparkles, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: "mc-pm",
    company: "Mastercard Insights & Intelligence",
    role: "AI Product Manager",
    location: "Remote",
    duration: "Jan 2024 - Present",
    description: "Driving product strategy for a multi-agent RAG chatbot and AI-native CMS workflows to transform global market intelligence.",
    impact: [
      "Launched AI-assisted research tools and enhanced search using vector embeddings.",
      "Improved data-retrieval accuracy and traceability by 30% via privacy-respecting RAG.",
      "Streamlined onboarding by 40% through standardized documentation and RACI frameworks.",
      "Achieved 80 NPS while scaling the platform portfolio by 50%."
    ],
    skills: ["AI/ML", "RAG Architecture", "Agentic Systems", "Roadmapping", "SQL/Mixpanel", "GTM Strategy", "Agile Hybrid"],
    video: {
      id: "p5qGELspVKa4FTSDXezEyM",
      title: "Mastercard AI-Native Intelligence Platform"
    }
  },
  {
    id: "mc-devops",
    company: "Mastercard",
    role: "Automation Engineer",
    location: "New York, NY",
    duration: "Jan 2022 - Jan 2024",
    description: "Architected CI/CD pipelines and managed global deployment automation for 100+ core enterprise applications.",
    impact: [
      "Reduced deployment time by ~50% via optimized automation pipelines.",
      "Improved cross-team alignment by 42% through standardized documentation."
    ],
    skills: ["CI/CD", "Automation", "Backend development", "Scripting", "Stakeholder Management", "Infrastructure"]
  },
  {
    id: "visa",
    company: "Visa",
    role: "Software Engineer",
    location: "Foster City, CA",
    duration: "2021",
    description: "Built and shipped global merchant APIs and full-stack cloud services within the payment processing ecosystem.",
    impact: [
      "Architected RESTful APIs for merchant onboarding and transaction processing.",
      "Developed frontend and backend modules for high-availability cloud services."
    ],
    skills: ["APIs", "Cloud Services", "Backend development", "Node.js", "React"]
  },
  {
    id: "google",
    company: "Google",
    role: "Developer Relations Engineer",
    location: "Mountain View, CA",
    duration: "2020",
    description: "Developed GCP cloud services, SDKs, and developer tools to improve the developer experience for the Google Cloud Platform team.",
    impact: [
      "Authored technical SDKs and developer tools used by global GCP partners.",
      "Engineered cloud-native services to demonstrate platform scalability."
    ],
    skills: ["GCP", "SDKs", "Developer Experience", "APIs", "TypeScript", "Cloud Services"]
  },
  {
    id: "nexus",
    company: "Nexus Valley Solutions",
    role: "Product Strategy",
    location: "Hybrid",
    duration: "2018",
    description: "Led curriculum development and product-led growth strategy for an early-stage education technology startup.",
    impact: [
      "Engineered the initial product curriculum framework.",
      "Developed growth strategies that accelerated early user adoption."
    ],
    skills: ["Curriculum Development", "Strategy", "User Research", "GTM Strategy"]
  }
];

// Deduplicated skills for the cloud
const globalSkills = Array.from(new Set(experiences.flatMap(e => e.skills))).sort();

export function WorkSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Experience</h2>
          <p className="font-serif text-base md:text-lg text-muted-foreground italic leading-tight">
            Connecting technical orchestration to AI-driven product strategy.
          </p>
        </div>

        {/* INTERACTIVE SKILL CLOUD */}
        <div className="mb-12 p-6 bg-card/30 border border-border/40 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4">
            <Sparkles className="h-3 w-3" /> Skill Experience Matrix
          </div>
          <div className="flex flex-wrap gap-2">
            {globalSkills.map((skill) => (
              <button
                key={skill}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={cn(
                  "px-3 py-1 rounded-full text-[9px] md:text-[10px] font-medium transition-all duration-300 border",
                  hoveredSkill === skill 
                    ? "bg-primary text-primary-foreground border-primary scale-105 shadow-md"
                    : "bg-background text-muted-foreground border-border/60 hover:border-primary/40"
                )}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* EXPERIENCE CARDS */}
        <div className="space-y-6">
          {experiences.map((exp) => {
            const isHighlighted = hoveredSkill ? exp.skills.includes(hoveredSkill) : true;
            const isDimmed = hoveredSkill && !exp.skills.includes(hoveredSkill);

            return (
              <Card 
                key={exp.id} 
                className={cn(
                  "transition-all duration-500 bg-card/50 overflow-hidden border-border/40",
                  isHighlighted && hoveredSkill ? "border-primary/60 ring-1 ring-primary/20 shadow-lg scale-[1.01] bg-primary/[0.01]" : "",
                  isDimmed ? "opacity-25 grayscale-[0.8] scale-[0.99]" : "opacity-100"
                )}
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <CardTitle className="font-serif text-xl md:text-2xl group-hover:text-primary transition-colors tracking-tight">
                        {exp.role}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest">
                          {exp.company}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Calendar className="h-3 w-3" /> {exp.duration}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <p className="text-xs md:text-sm text-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-4 italic">
                        {exp.description}
                      </p>
                      {exp.video && (
                        <div className="relative aspect-video overflow-hidden rounded-lg border border-primary/10 bg-black shadow-lg max-w-[250px]">
                          <iframe
                            src={`https://play.vidyard.com/${exp.video.id}?autoplay=1&muted=1&loop=1&v=4&type=inline`}
                            allow="autoplay; fullscreen"
                            className="absolute inset-0 w-full h-full border-0"
                            title={exp.video.title}
                          />
                        </div>
                      )}
                    </div>
                  
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em] opacity-80">
                        <Zap className="h-3 w-3" /> Impact
                      </div>
                      <ul className="space-y-2">
                        {exp.impact.map((point, i) => (
                          <li key={i} className="text-[10px] md:text-[11px] text-muted-foreground leading-snug flex gap-2">
                            <span className="text-primary/60 shrink-0">•</span> {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-muted/30 flex flex-wrap gap-1.5">
                    {exp.skills.map(s => (
                      <Badge 
                        key={s} 
                        variant="outline" 
                        className={cn(
                          "rounded-full px-2 py-0 text-[9px] transition-all duration-300",
                          hoveredSkill === s 
                            ? "bg-primary text-primary-foreground border-primary" 
                            : "border-muted-foreground/20 text-muted-foreground"
                        )}
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
