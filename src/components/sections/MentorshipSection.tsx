import { Heart, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Initiative {
  id: string;
  title: string;
  description: string;
  impact: string;
  icon: "heart" | "users" | "book";
}

const initiatives: Initiative[] = [
  {
    id: "1",
    title: "Design Mentorship Program",
    description: "One-on-one mentoring for early-career designers, focusing on portfolio development, career navigation, and skill building.",
    impact: "50+ mentees supported",
    icon: "heart",
  },
  {
    id: "2",
    title: "Workshop Series",
    description: "Regular workshops on design fundamentals, career growth, and emerging technologies for underrepresented groups in tech.",
    impact: "500+ participants",
    icon: "book",
  },
  {
    id: "3",
    title: "Open Office Hours",
    description: "Weekly open sessions for anyone to drop in and discuss design challenges, career questions, or portfolio reviews.",
    impact: "100+ sessions hosted",
    icon: "users",
  },
];

const iconMap = {
  heart: Heart,
  users: Users,
  book: BookOpen,
};

export function MentorshipSection() {
  return (
    <section id="mentorship" className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Mentorship & Outreach</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Growing the next generation of designers and builders
          </p>
        </div>

        {/* Philosophy statement */}
        <div className="mb-12 p-8 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-lg text-center font-serif italic text-foreground/80">
            "I believe that sharing knowledge and lifting others is the greatest contribution 
            we can make to our craft. Every designer I mentor today might inspire hundreds tomorrow."
          </p>
        </div>

        {/* Initiative cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-fade-in">
          {initiatives.map((initiative) => {
            const Icon = iconMap[initiative.icon];
            return (
              <Card 
                key={initiative.id} 
                className="card-hover border-gold-hover text-center"
              >
                <CardHeader>
                  <div className="mx-auto p-4 rounded-full bg-primary/10 text-primary mb-2">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-serif text-lg">{initiative.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {initiative.description}
                  </CardDescription>
                  <p className="text-sm font-medium text-primary">
                    {initiative.impact}
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
