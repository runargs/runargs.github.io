import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Project Alpha",
    description: "A comprehensive design system that unified the brand experience across multiple platforms and increased development velocity.",
    tags: ["Design Systems", "React", "Figma"],
  },
  {
    id: "2",
    title: "Project Beta",
    description: "Led the redesign of a flagship product, resulting in a 40% improvement in user engagement and satisfaction scores.",
    tags: ["UX Design", "Research", "Prototyping"],
  },
  {
    id: "3",
    title: "Project Gamma",
    description: "Built an innovative tool that streamlines creative workflows for teams, now used by thousands of designers worldwide.",
    tags: ["Product Design", "SaaS", "TypeScript"],
  },
  {
    id: "4",
    title: "Project Delta",
    description: "Crafted an immersive digital experience for a cultural institution, blending art and technology seamlessly.",
    tags: ["Interactive", "WebGL", "Storytelling"],
  },
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Work</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Selected projects that showcase my approach to design and development
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-fade-in">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="group card-hover border-gold-hover cursor-pointer overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-card to-sidebar-accent relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-flourish text-6xl text-primary/20">❧</span>
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="bg-sidebar-accent text-sidebar-foreground text-xs"
                    >
                      {tag}
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
