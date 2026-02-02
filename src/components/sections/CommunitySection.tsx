import { Link as LinkIcon, Globe, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Community {
  id: string;
  name: string;
  role: string;
  description: string;
  members?: string;
  url?: string;
}

const communities: Community[] = [
  {
    id: "1",
    name: "I Know a Place Culinary Agency",
    role: "Advisory Board & Private Chef",
    description: "Community building and cultural education through food-based experiences.",
    members: "2024-Present",
    url: "https://iknowaplace.agency/"
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
    name: "Philadelphia Adaptive Rowing (PAR)",
    role: "Able-Bodied Tandem/Coach",
    description: "Coached and raced double scull (2x) and won first place partnering with Beth for the BAYADA Home Health Care annual regatta.",
    members: "2017",
    url: "https://www.facebook.com/100064163287087/posts/1444260922332590/"
  },
  {
    id: "4",
    name: "Fundraiser/Grants Specialist",
    role: "Various",
    description: "Aid for Friends - Organized locally to provide 600+ nutritional meals for senior shut-ins. | Walk to End Alzheimers - Raised $1k+ to support Alzheimer's research.",
    members: "2017",
    url: "https://catholicphilly.com/2017/08/photo-features/st-william-parishs-youths-help-needy-philadelphians/"
  }
];

export function CommunitySection() {
  return (
    <section id="community-building" className="py-20 px-6 md:px-12 bg-background/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Community</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Creating spaces where connections thrive
          </p>
        </div>

        {/* Compressed Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-fade-in">
          {communities.map((community) => (
            <Card 
              key={community.id} 
              className="card-hover border-gold-hover group transition-all duration-300 flex flex-col h-full"
            >
              <CardHeader className="pb-2">
                <div className="space-y-1">
                  {/* Reduced title size slightly for better fit */}
                  <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                    {community.name}
                  </CardTitle>
                  <CardDescription className="text-primary text-xs font-semibold uppercase tracking-wide">
                    {community.role}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow">
                {/* Community Description - smaller text for compression */}
                <p className="text-sm text-foreground/80 leading-snug mb-4 flex-grow">
                  {community.description}
                </p>
                
                <div className="space-y-3 mt-auto">
                  {/* Metadata moved here to save vertical space in header */}
                  {community.members && (
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{community.members}</span>
                    </div>
                  )}

                  {/* View Community Link */}
                  {community.url && (
                    <a
                      href={community.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-bold group-hover:text-primary transition-colors pt-3 border-t border-muted w-full"
                    >
                      <LinkIcon className="h-3 w-3" />
                      View Material
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
