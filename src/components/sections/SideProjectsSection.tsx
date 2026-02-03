import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
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
    id: "4",
    title: "Traveler & Hiker",
    description: "Sometimes with my dog. Norway, Sweden, Netherlands, Iceland, New Zealand, Austalia.",
    tags: ["Globetrotter"],
    status: "active",
    image: "/images/puppy.jpg",
  },
  {
    id: "5",
    title: "This Website",
    description: "Quite meta.",
    tags: ["Lovable AI", "Typescript", "Web Development"],
    status: "active"
  },
];

// Ensure statusColors is defined to prevent reference errors
const statusColors: Record<string, string> = {
  completed: "border-green-500/50 text-green-500",
  ongoing: "border-blue-500/50 text-blue-500",
  planned: "border-muted text-muted-foreground",
};

export function SideProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section id="side-projects" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Side Projects</h2>
          <p className="text-muted-foreground text-lg">Experiments and tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sideProjects.map((project) => (
            <Card 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="card-hover border-gold-hover group cursor-pointer flex flex-row items-center overflow-hidden h-28"
            >
              <div className="w-24 h-full shrink-0 relative overflow-hidden bg-muted/30 border-r">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-flourish text-2xl text-primary/20">❧</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 p-4">
                <CardTitle className="font-serif text-base truncate">{project.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2 mt-1">{project.description}</CardDescription>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-gold">
            <VisuallyHidden>
              <DialogTitle>{selectedProject?.title || "Project Detail"}</DialogTitle>
            </VisuallyHidden>
            
            {selectedProject && (
              <div className="flex flex-col">
                <div className="aspect-video relative overflow-hidden border-b shrink-0">
                  {selectedProject.image ? (
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                      <span className="font-flourish text-7xl text-primary/20">❧</span>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-3">
                        <h3 className="font-serif text-2xl md:text-3xl break-words">{selectedProject.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags?.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-[10px] whitespace-nowrap">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed break-words">{selectedProject.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
