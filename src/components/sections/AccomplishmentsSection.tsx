import { Award, Star, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Accomplishment {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: "award" | "star" | "trophy";
}

const accomplishments: Accomplishment[] = [
  {
    id: "1",
    title: "Design Excellence Award",
    organization: "Design Association",
    year: "2024",
    description: "Recognized for outstanding contribution to the design community and innovative approach to user experience.",
    icon: "trophy",
  },
  {
    id: "2",
    title: "Top 40 Under 40",
    organization: "Industry Publication",
    year: "2023",
    description: "Selected among the industry's most influential young professionals shaping the future of design.",
    icon: "star",
  },
  {
    id: "3",
    title: "Best Product Design",
    organization: "Product Awards",
    year: "2023",
    description: "Awarded for exceptional product design that demonstrated both innovation and user-centered thinking.",
    icon: "award",
  },
  {
    id: "4",
    title: "Community Leadership",
    organization: "Tech Community",
    year: "2022",
    description: "Honored for fostering growth, mentorship, and inclusivity within the design and tech community.",
    icon: "star",
  },
];

const iconMap = {
  award: Award,
  star: Star,
  trophy: Trophy,
};

export function AccomplishmentsSection() {
  return (
    <section id="accomplishments" className="py-20 px-6 md:px-12 bg-sidebar/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Accomplishments</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Recognition and milestones along the journey
          </p>
        </div>

        {/* Timeline-style cards */}
        <div className="space-y-6 stagger-fade-in">
          {accomplishments.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Card 
                key={item.id} 
                className="card-hover border-gold-hover relative overflow-hidden"
              >
                {/* Year indicator */}
                <div className="absolute top-4 right-4 text-sm font-medium text-primary">
                  {item.year}
                </div>

                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="font-serif text-lg pr-16">{item.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {item.organization}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pl-[4.5rem]">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
