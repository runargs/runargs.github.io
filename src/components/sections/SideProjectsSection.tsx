import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SideProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "active" | "archived" | "experiment";
}

const sideProjects: SideProject[] = [
  {
    id: "1",
    title: "Haruhay Studio",
    description: "Creative and culinary explorations. IG: @haruhay.studio",
    tags: ["Ceramic art", "Culinary", "Portfolio"],
    status: "experiment",
  },
  {
    id: "2",
    title: "Portfolio Management Hub & Ledger",
    description: "Proactive, zero-based budgeting application and comprehensive net worth tracking, supporting complex asset-weighted portfolio forecasting simulations (Monte Carlo), alternative assets, itemized payslip tracking, connector imports. Postgres + Supabase for backend, Grafana for intuitive visualizations.",
    tags: ["Bot", "Automation", "Community"],
    status: "active",
  },
];

const statusColors = {
  active: "bg-forest/10 text-forest border-forest/30",
  archived: "bg-muted text-muted-foreground border-muted",
  experiment: "bg-terracotta/10 text-terracotta border-terracotta/30",
};

export function SideProjectsSection() {
  return (
    <section id="side-projects" className="py-20 px-6 md:px-12 bg-sidebar/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Side Projects</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Experiments, tools, and creative explorations
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-fade-in">
          {sideProjects.map((project) => (
            <Card 
              key={project.id} 
              className="card-hover border-gold-hover group cursor-pointer flex flex-row items-center overflow-hidden"
            >
              {/* Left Side Thumbnail */}
              <div className="w-24 h-24 md:w-32 md:h-full shrink-0 relative overflow-hidden border-r bg-muted/30">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
                    <span className="font-flourish text-2xl text-primary/20">❧</span>
                  </div>
                )}
              </div>

              {/* Right Side Content */}
              <div className="flex-1 flex flex-col min-w-0">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-serif text-base md:text-lg group-hover:text-primary transition-colors truncate">
                      {project.title}
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-[10px] uppercase tracking-wider shrink-0 ${statusColors[project.status]}`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs md:text-sm line-clamp-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4 px-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="bg-sidebar-accent text-sidebar-foreground text-[10px] px-1.5 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Github className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
