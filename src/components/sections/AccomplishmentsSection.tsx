import { Award, Star, Trophy, ExternalLink } from "lucide-react";

interface Accomplishment {
  id: string;
  title: string;
  organization: string;
  year: string;
  icon: "award" | "star" | "trophy";
}

const accomplishments: Accomplishment[] = [
  { id: "1", title: "Design Excellence Award", organization: "Design Association", year: "2024", icon: "trophy" },
  { id: "2", title: "Top 40 Under 40", organization: "Industry Publication", year: "2023", icon: "star" },
  { id: "3", title: "Best Product Design", organization: "Product Awards", year: "2023", icon: "award" },
  { id: "4", title: "Community Leadership", organization: "Tech Community", year: "2022", icon: "star" },
  { id: "5", title: "Merit Scholarship", organization: "University", year: "2018", icon: "award" },
  { id: "6", title: "Dean's List", organization: "University", year: "2017", icon: "star" },
];

const iconMap = {
  award: Award,
  star: Star,
  trophy: Trophy,
};

export function AccomplishmentsSection() {
  return (
    <section id="accomplishments" className="py-16 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Honors & Recognition</h2>
          <p className="text-muted-foreground text-sm italic">Selected milestones and industry awards</p>
        </div>

        <div className="border-t border-muted">
          {accomplishments.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div 
                key={item.id} 
                className="group flex items-center justify-between py-4 border-b border-muted/50 hover:bg-muted/5 transition-colors px-2"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-[10px] font-bold text-primary tabular-nums w-8">
                    {item.year}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 min-w-0">
                    <span className="font-medium text-sm text-foreground truncate">
                      {item.title}
                    </span>
                    <span className="hidden md:block text-muted-foreground/30">•</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {item.organization}
                    </span>
                  </div>
                </div>
                
                <Icon className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 ml-4" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
