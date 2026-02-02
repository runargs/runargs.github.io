import { Globe, MessageCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Community {
  id: string;
  name: string;
  role: string;
  description: string;
  members?: string;
  url?: string; // Optional general link (talk, article, mention, etc.)
}

const communities: Community[] = [
  {
    id: "1",
    name: "I Know a Place Culinary Agency",
    role: "Advisory Board & Private Chef",
    description: "Community building and cultural education through food-based experiences.",
    members: "2024-Present",
  },
  {
    id: "2",
    name: "Notion Enhancement - GitHub Open Source Community",
    role: "Core Contributor",
    description: "Developer advocacy and #3 code contributor for notion enhancer, an all-in-one customizer for Notion workspace.",
    members: "2020",
    url: "https://notion-enhancer.github.io/"
  },
  {
    id: "3",
    name: "Aid for Friends - 600+ meals provided",
    role: "Organizer - 2017",
    description: "Partnered with Aid for Friends and organized local youth to provide nutritional meals for senion shut-ins.",
    members: "2017",
    url: "https://catholicphilly.com/2017/08/photo-features/st-william-parishs-youths-help-needy-philadelphians/"
  },
  {
    id: "4",
    name: "Walk to End Alzheimers - Raised $1k+",
    role: "Fundraiser/Grants Specialist",
    description: "Partnered with Aid for Friends and organized local youth to provide nutritional meals for senion shut-ins.",
    members: "2017",
    url: "https://act.alz.org/"
  }
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

              {/* Optional CTA link */}
                {community.url && (
                  <a
                    href={community.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                  >
                    <Sparkles className="w-4 h-4" />
                    Learn More
                  </a>
                )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
