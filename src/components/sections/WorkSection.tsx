import { ExternalLink, Target, Zap, MapPin, Calendar, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    id: "mc-pm",
    company: "Mastercard Insights & Intelligence",
    role: "Product Manager II",
    location: "Remote",
    duration: "Jan 2024 - Present",
    description: "Driving product strategy for Mastercard Business Intelligence's AI ecosystem, featuring a multi-agent RAG chatbot and an AI-native CMS workflows to transformed insight generation for global market intelligence.",
    impact: [
      "Launched AI-assisted deep research tools for end-users and enhanced search using vector embeddings.",
      "Improved data-retrieval accuracy and traceability by 30% via privacy-respecting RAG development.",
      "Streamlined product onboarding by 40% (6→3 weeks) through standardized documentation and RACI frameworks.",
      "Led integration of 10+ products, scaling the platform portfolio by 50% and achieving 80 NPS."
    ],
    skills: ["Agentic Commerce", "AI/ML", "Roadmapping", "RAG Architecture", "SQL/Mixpanel", "GTM Strategy", "Agile Hybrid"]
  },
  {
    id: "mc-devops",
    company: "Mastercard",
    role: "DevOps Engineer I",
    location: "Hybrid · New York, NY",
    duration: "Jan 2022 - Jan 2024",
    description: "Standardizing delivery pipelines and documentation practices for high-scale enterprise applications.",
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
  { company: "Nexus Valley Solutions", role: "Product", year: "2018" }
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg italic leading-tight">
            Leading AI-driven product strategy and global platform integration
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-0 md:pl-8 border-l-0 md:border-l border-muted/50">
              {/* Desktop Timeline Dot */}
              <div className="hidden md:block absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
              
              <Card className="group card-hover border-gold-hover transition-all duration-300 bg-card/50">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary md:hidden" />
                        <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">
                          {exp.company}
                        </CardTitle>
                      </div>
                      <p className="text-primary font-medium text-sm tracking-wide uppercase">
                        {exp.role}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-1 text-muted-foreground">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <Calendar className="h-3 w-3" /> {exp.duration}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <MapPin className="h-3 w-3" /> {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                        <Target className="h-3 w-3" /> The Scope
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">
                        {exp.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                        <Zap className="h-3 w-3" /> Key Outcomes
                      </div>
                      <ul className="space-y-2">
                        {exp.impact.map((point, i) => (
                          <li key={i} className="text-sm font-medium text-foreground leading-snug flex gap-2">
                            <span className="text-primary">•</span> {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-muted/30 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="rounded-full px-3 py-0.5 bg-sidebar-accent/30 text-muted-foreground border-none group-hover:bg-primary/10 group-hover:text-primary transition-all text-[10px]"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Earlier Experience Footer */}
          <div className="pt-8 border-t border-muted/50">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6 text-center">
              Selected Earlier Experience
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {earlierExperience.map((prev, i) => (
                <div key={i} className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-muted/5">
                  <span className="text-foreground font-serif font-medium">{prev.company}</span>
                  <span className="text-xs text-muted-foreground">{prev.role}</span>
                  <span className="text-[10px] text-primary/60 font-bold mt-1">{prev.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
