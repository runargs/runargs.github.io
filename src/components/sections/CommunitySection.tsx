import { Globe, MessageCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Community {
  id: string;
  name: string;
  role: string;
  description: string;
  members?: string;
}

const communities: Community[] = [
  {
    id: "1",
    name: "Design Systems Collective",
    role: "Co-founder & Organizer",
    description: "A community of practice for design systems practitioners to share knowledge, challenges, and solutions.",
    members: "2,000+ members",
  },
  {
    id: "2",
    name: "Local Tech Meetup",
    role: "Lead Organizer",
    description: "Monthly gatherings bringing together designers, developers, and product folks for talks, workshops, and networking.",
    members: "500+ active members",
  },
  {
    id: "3",
    name: "Inclusion in Design",
    role: "Advisory Board Member",
    description: "Advocating for diversity and inclusion in design education and hiring practices across the industry.",
  },
];

export function CommunitySection() {
  return (
    <section id="community-building" className="py-20 px-6 md:px-12 bg-sidebar/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Community Building</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Creating spaces where ideas flourish and connections thrive
          </p>
        </div>

        {/* Community cards */}
        <div className="space-y-6 stagger-fade-in">
          {communities.map((community, index) => (
            <Card 
              key={community.id} 
              className="card-hover border-gold-hover"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-serif text-xl mb-1">{community.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {community.role}
                    </CardDescription>
                  </div>
                  {community.members && (
                    <span className="text-sm text-muted-foreground bg-sidebar-accent px-3 py-1 rounded-full">
                      {community.members}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {community.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
