import { ExternalLink, Target, Zap, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  outcome: string; 
  skills: string[];
  url?: string;
}

const experiences: Experience[] = [
  {
    id: "1",
    company: "Mastercard Insights & Intelligence",
    role: "Global Platform Product Specialist, PM II",
    location: "Remote, United States",
    duration: "Jan 2024 - Present",
    description: "Driving product strategy for AI-native intelligence platforms supporting a broad portfolio of analytics and advisory products for financial institutions. Modernizing core platform experiences in a complex, multi-product ecosystem.",
    outcome: "Launched enterprise AI products from concept to production, shipping AI-assisted discovery workflows that materially improved usability and insight generation.",
    skills: ["AI Strategy", "Enterprise Product Management", "Product Analytics", "Cross-functional Leadership"],
    url: "http://mbi.mastercardservices.com/about-us"
  },
  // You can add your previous roles here following the same structure
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Work</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto italic">
            Strategic product leadership and outcomes delivered across the digital landscape
          </p>
        </div>

        {/* Experience grid */}
        <div className="grid grid-cols-1 gap-8 stagger-fade-in">
          {experiences.map((exp) => (
            <Card 
              key={exp.id} 
              className="group card-hover border-gold-hover transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">
                      {exp.company}
                    </CardTitle>
                    <p className="text-primary font-medium text-sm tracking-wide uppercase">
                      {exp.role}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-muted-foreground">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3 w-3" /> {exp.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </div>
                    </div>
                  </div>
                  {exp.url && (
                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
                      <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Description & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <Target className="h-3 w-3" /> The Focus
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                      <Zap className="h-3 w-3" /> Key Impact
                    </div>
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {exp.outcome}
                    </p>
                  </div>
                </div>

                {/* Skill Pills */}
                <div className="pt-4 border-t border-muted/50 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="rounded-full px-3 py-0.5 bg-sidebar-accent/30 text-muted-foreground border border-transparent group-hover:border-primary/20 group-hover:text-primary transition-all duration-300 text-[10px]"
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
