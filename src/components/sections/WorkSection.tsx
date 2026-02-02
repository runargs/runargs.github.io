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
];export function WorkSection() {
  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Experience</h2>
          <p className="text-muted-foreground text-sm md:text-base italic leading-tight">
            Leading AI-driven product strategy and global platform integration
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card 
              key={exp.id} 
              className="group border-gold-hover transition-all duration-300 bg-card/50 overflow-hidden"
            >
              <CardHeader className="pb-4 bg-muted/5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle className="font-serif text-xl md:text-2xl group-hover:text-primary transition-colors">
                      {exp.company}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-primary font-semibold text-[10px] md:text-xs uppercase tracking-wider">
                        {exp.role}
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
                {/* Compact Description */}
                <p className="text-xs md:text-sm text-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-4">
                  {exp.description}
                </p>
                
                {/* Outcomes Grid */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest opacity-70">
                    <Zap className="h-3 w-3" /> Key Outcomes
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {exp.impact.map((point, i) => (
                      <li key={i} className="text-[11px] md:text-xs text-muted-foreground leading-snug flex gap-2">
                        <span className="text-primary shrink-0">•</span> {point}
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
                      className="rounded-full px-2 py-0 text-[9px] md:text-[10px] font-medium border-muted-foreground/20 text-muted-foreground group-hover:border-primary/30 transition-colors"
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
