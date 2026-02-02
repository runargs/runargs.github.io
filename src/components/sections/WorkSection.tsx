import { Target, Zap, MapPin, Calendar, ExternalLink } from "lucide-react";
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
          <p className="text-muted-foreground text-sm italic leading-tight">
            Leading AI-driven product strategy and global platform integration
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card key={exp.id} className="group border-gold-hover transition-all duration-300 bg-card/50 overflow-hidden">
              <CardHeader className="pb-4 bg-muted/5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    {/* Role is now the Title */}
                    <CardTitle className="font-serif text-xl md:text-2xl group-hover:text-primary transition-colors">
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

              <CardContent className="pt-5 space-y-5">
                <p className="text-xs md:text-sm text-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-4 italic">
                  {exp.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em] opacity-80">
                    <Zap className="h-3 w-3" /> Key Outcomes
                  </div>
                  {/* Two column grid for KPIs to save space */}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
                    {exp.impact.map((point, i) => (
                      <li key={i} className="text-[10px] md:text-[11px] text-muted-foreground leading-snug flex gap-2">
                        <span className="text-primary/60 shrink-0">•</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-muted/30 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="rounded-full px-2 py-0 text-[9px] font-medium border-muted-foreground/20 text-muted-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Earlier Experience - Simplified Footer */}
          <div className="mt-12 pt-8 border-t border-muted/50">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6 text-center">
              Selected Earlier Experience
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {earlierExperience.map((prev, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-3 rounded-lg border border-border/40 bg-muted/5 text-center">
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
