import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SideProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "active" | "archived" | "experiment";
  image: string;
}

const sideProjects: SideProject[] = [
  {
    id: "1",
    title: "Haruhay Studio",
    description: "Creative and culinary explorations. IG: @haruhay.studio",
    tags: ["Ceramic art", "Culinary", "Portfolio"],
    status: "experiment",
    image: "/images/haruhayicon.jpg",
  },
  {
    id: "2",
    title: "Portfolio Management Hub & Ledger",
    description: "Proactive, zero-based budgeting application and comprehensive net worth tracking, supporting complex asset-weighted portfolio forecasting simulations (Monte Carlo), alternative assets, itemized payslip tracking, connector imports.",
    tags: ["Finance", "Automation", "Database", "AI-Assisted Coding", "Postgres DB", "Supabase", "Grafana", "Anthropic Claude"],
    status: "active",
    image: "/images/finance.jpg",
  },
  {
    id: "3",
    title: "This Website",
    description: "Quite meta.",
    tags: ["Lovable AI", "Web Development"],
    status: "active"
  },
];
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

        {/* Projects list - Changed to 1 col to prevent cramped text */}
        <div className="grid grid-cols-1 gap-6 stagger-fade-in">
          {sideProjects.map((project) => (
            <Card 
              key={project.id} 
              className="card-hover border-gold-hover group cursor-pointer flex flex-col sm:flex-row overflow-hidden min-h-[160px]"
            >
              {/* Left Side Thumbnail */}
              <div className="w-full sm:w-48 md:w-64 shrink-0 relative overflow-hidden bg-muted/30 border-b sm:border-b-0 sm:border-r">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
                    <span className="font-flourish text-4xl text-primary/20">❧</span>
                  </div>
                )}
              </div>

              {/* Right Side Content */}
              <div className="flex-1 flex flex-col p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors mb-1">
                      {project.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="bg-sidebar-accent text-sidebar-foreground text-[10px]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize shrink-0 ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </Badge>
                </div>

                <CardDescription className="text-sm md:text-base leading-relaxed text-muted-foreground mb-4">
                  {project.description}
                </CardDescription>

                <div className="mt-auto flex justify-end gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
