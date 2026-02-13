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
    name: "Atlassian, Dynamo AI, Canva, Ōura, Koinly, Manta Sleep, Bearable + more",
    role: "Beta Testing/Research Participation",
    description: "Bridging the gap between product and customer by acting as a power-user and research subject for leading software and hardware. Immersing myself in these feedback loops (from technical beta testing to deep-dive interviews) refines my ability to spot friction and advocate for the user, ensuring my own PM practice remains grounded in a customer-first perspective.",
    members: "2022-Present"
  },
  {
    id: "2",
    name: "Moral Ambition Community",
    role: "Member",
    description: "Engaging with a global network of social entrepreneurs to redefine success through societal contribution. Focused on applying moral ambitiom to product ethics, ensuring that building for the user also means building for the greater good. Moral ambition redefines success: not by what we accumulate, but by what we contribute.",
    members: "2026-Present",
    url: "https://www.moralambition.org/"
  },
  {
    id: "3",
    name: "I Know a Place Culinary Agency",
    role: "Advisory Board & Private Chef",
    description: "Driving community engagement and cultural education through curated culinary experiences. Leveraging sensory storytelling and hospitality to understand diverse human needs.",
    members: "2024-Present",
    url: "https://iknowaplace.agency/"
  },
  {
    id: "4",
    name: "Fundraiser/Grants Specialist",
    role: "Various",
    description: "Scaled local aid operations to deliver 600+ nutritional meals to homebound seniors and achieved Grand Champion status for Alzheimer’s research fundraising. Proven record of mobilizing resources and advocating for those vulnerable in our communities while under tight constraints.",
    members: "2015-2018",
    url: "https://catholicphilly.com/2017/08/photo-features/st-william-parishs-youths-help-needy-philadelphians/"
  }
];

export function CommunitySection() {
  return (
    <section id="community-building" className="py-20 px-6 md:px-12 bg-background/50">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight italic">Community</h2>
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
