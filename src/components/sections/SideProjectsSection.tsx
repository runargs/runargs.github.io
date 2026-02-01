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
    title: "Color Palette Generator",
    description: "A playful tool that generates harmonious color palettes inspired by Art Nouveau patterns and natural forms.",
    tags: ["Web App", "Design Tool", "Open Source"],
    status: "active",
  },
  {
    id: "2",
    title: "Daily Sketch Bot",
    description: "A Twitter bot that posts daily creative prompts for designers, complete with reference images and challenges.",
    tags: ["Bot", "Automation", "Community"],
    status: "active",
  },
  {
    id: "3",
    title: "Typography Experiments",
    description: "A collection of kinetic typography experiments exploring motion, interaction, and legibility on the web.",
    tags: ["Animation", "Typography", "WebGL"],
    status: "experiment",
  },
  {
    id: "4",
    title: "Ceramic Glaze Calculator",
    description: "A specialized tool for ceramicists to calculate and adjust glaze recipes based on available materials.",
    tags: ["Utility", "Ceramics", "Niche"],
    status: "archived",
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
              className="card-hover border-gold-hover group cursor-pointer"
            >
              {/* Decorative placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl text-primary/15">✦</span>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="font-serif text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-sidebar-accent text-sidebar-foreground text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Github className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                    <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
