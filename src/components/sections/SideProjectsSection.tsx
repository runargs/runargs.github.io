import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
    image: "/images/finance.JPG",
  },
  {
    id: "3",
    title: "This Website",
    description: "Quite meta.",
    tags: ["Lovable AI", "Web Development"],
    status: "active"
  },
];

const statusColors = {
  active: "bg-forest/10 text-forest border-forest/30",
  archived: "bg-muted text-muted-foreground border-muted",
  experiment: "bg-terracotta/10 text-terracotta border-terracotta/30",
};

export function SideProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section id="side-projects" className="py-20 px-6 md:px-12 bg-sidebar/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Side Projects</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Experiments, tools, and creative explorations
          </p>
        </div>

        {/* Projects grid - Back to 2 columns with tiny thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-fade-in">
          {sideProjects.map((project) => (
            <Card 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="card-hover border-gold-hover group cursor-pointer flex flex-row items-center overflow-hidden h-28"
            >
              {/* Small Thumbnail on the left */}
              <div className="w-24 h-full shrink-0 relative overflow-hidden bg-muted/30 border-r">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
                    <span className="font-flourish text-2xl text-primary/20">❧</span>
                  </div>
                )}
              </div>

              {/* Quick Info (Truncated) */}
              <div className="flex-1 min-w-0 p-4">
                <CardTitle className="font-serif text-base group-hover:text-primary transition-colors truncate">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-2 mt-1">
                  {project.description}
                </CardDescription>
              </div>
            </Card>
          ))}
        </div>

        {/* Project Detail Dialog (The Pop-up) */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-gold">
            <VisuallyHidden>
              <DialogTitle>{selectedProject?.title || "Project Detail"}</DialogTitle>
            </VisuallyHidden>
            
            {selectedProject && (
              <div className="flex flex-col">
                {/* Hero Image in Dialog */}
                <div className="aspect-video relative overflow-hidden border-b">
                  {selectedProject.image ? (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
                      <span className="font-flourish text-7xl text-primary/20">❧</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${statusColors[selectedProject.status]} backdrop-blur-md`}>
                      {selectedProject.status}
                    </Badge>
                  </div>
                </div>

                {/* Content in Dialog */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-3xl text-foreground mb-2">{selectedProject.title}</h3>
                      <div className="flex gap-2">
                        {selectedProject.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] uppercase tracking-wider">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {/* <div className="flex gap-4">
                      <a href={selectedProject.github} target="_blank" rel="noreferrer">
                        <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                      </a>
                      <a href={selectedProject.link} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                      </a>
                    </div> */}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
