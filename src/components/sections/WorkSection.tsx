import React from "react";
import { Target, Zap, MapPin, Calendar, Play, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  impact: string[];
  skills: string[];
  video?: {
    url: string;
    thumbnail: string;
    title: string;
  };
}

const experiences = [
  {
    id: "mc-pm",
    company: "Mastercard Insights & Intelligence",
    role: "Building AI Ecosystems · Product Manager",
    location: "Remote",
    duration: "Jan 2024 - Present",
    description: "Driving product strategy for Mastercard Business Intelligence's AI ecosystem, featuring a multi-agent RAG chatbot and an AI-native CMS workflows to transformed insight generation for global market intelligence.",
    impact: [
      "Launched AI-assisted deep research tools for end-users and enhanced search using vector embeddings.",
      "Improved data-retrieval accuracy and traceability by 30% via privacy-respecting RAG development.",
      "Streamlined product onboarding by 40% (6→3 weeks) through standardized documentation and RACI frameworks.",
      "Led integration of 10+ products, scaling the platform portfolio by 50% and achieving 80 NPS."
    ],
    skills: ["Agentic Commerce", "AI/ML", "Roadmapping", "RAG Architecture", "SQL/Mixpanel", "GTM Strategy", "Agile Hybrid"],
    video: {
      url: "https://mastercardservices.hubs.vidyard.com/watch/p5qGELspVKa4FTSDXezEyM",
      thumbnail: "https://play.vidyard.com/p5qGELspVKa4FTSDXezEyM.jpg",
      title: "Mastercard AI-Native Intelligence Platform"
    }
  },
  {
    id: "mc-devops",
    company: "Mastercard",
    role: "Streamlining Global Product Deployment · Automation Engineer",
    location: "Hybrid · New York, NY",
    duration: "Jan 2022 - Jan 2024",
    description: "Architected and managed CI/CD pipelines for core global products, ensuring stable deployment cycles and standardized automation across the enterprise.",
    impact: [
      "Optimized automation pipelines for 100+ applications, reducing deployment time by ~50%.",
      "Improved cross-team alignment time by 42% through standardized documentation practices."
    ],
    skills: ["CI/CD", "Automation", "Stakeholder Management", "Scripting", "Backend development"]
  }
];

const earlierExperience = [
  { company: "Visa", role: "Software Engineer", year: "2021" },
  { company: "Google", role: "Developer Relations Engineer", year: "2020" },
  { company: "Nexus Valley Solutions", role: "Product (Startup)", year: "2018" }
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Experience</h2>
          <p className="font-serif text-base md:text-lg text-muted-foreground italic leading-tight">
            Leading AI-driven product strategy and global platform integration
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <Card key={exp.id} className="group border-gold-hover transition-all duration-300 bg-card/50 overflow-hidden">
              <CardHeader className="pb-4 bg-muted/5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    {/* Role headline */}
                    <CardTitle className="font-serif text-xl md:text-2xl group-hover:text-primary transition-colors tracking-tight">
                      {exp.role}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest">
                        {exp.company}
                      </span>
                      <span className="hidden md:inline text-muted-foreground/30">•</span>
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

              <CardContent className="pt-5 space-y-6">
                <p className="text-xs md:text-sm text-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-4 italic">
                  {exp.description}
                </p>

                {/* Optional Video Demo */}
                {exp.video && (
                  <div className="group/video relative aspect-video overflow-hidden rounded-lg border border-primary/10 bg-black max-w-2xl mx-auto">
                    <a 
                      href={exp.video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                    >
                      <img 
                        src={exp.video.thumbnail} 
                        alt={exp.video.title}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover/video:scale-105 group-hover/video:opacity-100"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover/video:bg-black/30 transition-colors">
                        <div className="flex items-center gap-2 bg-primary/95 text-primary-foreground px-4 py-2 rounded-full shadow-2xl transform transition-transform group-hover/video:scale-110">
                          <Play className="h-3 w-3 fill-current" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Watch Demo</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="text-[10px] text-white/90 font-medium italic">
                          Product Showcase: {exp.video.title}
                        </span>
                      </div>
                    </a>
                  </div>
                )}
                
                {/* Outcomes Grid */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em] opacity-80">
                    <Zap className="h-3 w-3" /> Key Outcomes
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {exp.impact.map((point, i) => (
                      <li key={i} className="text-[10px] md:text-[11px] text-muted-foreground leading-snug flex gap-2">
                        <span className="text-primary/60 shrink-0">•</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Skills */}
                <div className="pt-4 border-t border-muted/30 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="rounded-full px-2 py-0 text-[9px] font-medium border-muted-foreground/20 text-muted-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Earlier Experience Footer */}
          <div className="mt-12 pt-8 border-t border-muted/50">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6 text-center">
              Selected Earlier Experience
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {earlierExperience.map((prev, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-3 rounded-lg border border-border/40 bg-muted/5 text-center transition-colors hover:bg-muted/10">
                  <span className="text-foreground font-serif text-sm font-medium">{prev.company}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">{prev.role}</span>
                  <span className="text-[9px] text-primary/70 font-bold mt-1 uppercase">{prev.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
