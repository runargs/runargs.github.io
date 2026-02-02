import { ExternalLink, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  outcome: string; // PM-focused impact statement
  skills: string[]; // Skill pills
  url?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Project Alpha",
    role: "Lead Product Manager",
    description: "Spearheaded a comprehensive design system overhaul to unify brand experience across mobile and web platforms.",
    outcome: "Increased development velocity by 30% and reduced UI debt across 4 product lines.",
    skills: ["Product Strategy", "Cross-functional Leadership", "Design Ops"],
    url: "#"
  },
  {
    id: "2",
    title: "Project Beta",
    role: "Senior PM",
    description: "Led the end-to-end redesign of the flagship SaaS dashboard based on deep user research and cohort analysis.",
    outcome: "Achieved a 40% lift in Day-30 user retention and boosted CSAT scores by 15 points.",
    skills: ["User Research", "Data Analysis", "Retention Strategy"],
    url: "#"
  },
  {
    id: "3",
    title: "Project Gamma",
    role: "Product Lead",
    description: "Conceptualized and launched an AI-driven workflow tool to automate repetitive creative tasks for enterprise teams.",
    outcome: "Scaled from 0 to 10k monthly active users (MAU) within the first 6 months of launch.",
    skills: ["GTM Strategy", "AI/ML Roadmap", "SaaS Metrics"],
  }
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Work</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Strategic product leadership and outcomes delivered across the digital landscape
          </p>
        </div>

        {/* Project grid - Removed images for a clean, resume-style look */}
        <div className="grid grid-cols-1 gap-6 stagger-fade-in">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="group card-hover border-gold-hover transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-primary font-medium text-sm tracking-wide uppercase">
                      {project.role}
                    </p>
                  </div>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Description & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                      <Target className="h-3 w-3" /> The Challenge
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-tighter">
                      <Zap className="h-3 w-3" /> Key Outcome
                    </div>
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                {/* Skill Pills - Restyled as requested */}
                <div className="pt-4 border-t border-muted flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="rounded-full px-3 py-0.5 bg-sidebar-accent/50 text-muted-foreground border border-transparent group-hover:border-primary/20 group-hover:text-primary transition-all duration-300 text-[11px]"
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
