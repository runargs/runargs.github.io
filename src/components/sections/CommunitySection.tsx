import { Link as LinkIcon, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Community {
  id: string;
  name: string;
  role: string;
  description: string;
  period?: string;
  url?: string;
}

const communities: Community[] = [
  {
    id: "product-research",
    name: "Ōura, Manta Sleep, Bearable, Atlassian, Canva, Dynamo AI, Koinly + more",
    role: "Beta testing and research participation",
    description:
      "Beta testing and research participation across wellness hardware, productivity software, AI tools, and finance products. It keeps my product judgment close to friction, onboarding, and everyday use.",
    period: "2022–Present",
  },
  {
    id: "moral-ambition",
    name: "Moral Ambition Community",
    role: "Member",
    description:
      "A community for people applying ambition to high-stakes problems. I’m interested in the practical side: incentives, institutions, tradeoffs, and follow-through.",
    period: "2026–Present",
    url: "https://www.moralambition.org/",
  },
  {
    id: "ikap",
    name: "I Know a Place Culinary Agency",
    role: "Advisory consultant and private chef",
    description:
      "Independent and collaborative culinary work across menus, event concepts, operations, and hosting. A practical place to think about culture, constraint, pacing, service, and whether people feel taken care of.",
    period: "2024–Present",
    url: "https://iknowaplace.agency/",
  },
  {
    id: "aid",
    name: "Local aid, grants, and fundraising",
    role: "Volunteer and organizer",
    description:
      "Earlier community work across meal delivery, grants, and Alzheimer’s research fundraising.",
    period: "2015–2018",
    url: "https://catholicphilly.com/2017/08/photo-features/st-william-parishs-youths-help-needy-philadelphians/",
  },
];

export function CommunitySection() {
  return (
    <section id="community-building" className="py-24 px-6 md:px-12 bg-background/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold mb-3">
            Community
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground tracking-tight italic">Community and product practice</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            A few contexts that inform how I think about products: wellness tools, public-interest work, food culture, service, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-fade-in">
          {communities.map((community) => (
            <Card key={community.id} className="card-hover border-gold-hover group transition-all duration-300 flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="space-y-1">
                  <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                    {community.name}
                  </CardTitle>
                  <CardDescription className="text-primary text-xs font-semibold uppercase tracking-wide">
                    {community.role}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow">
                <p className="text-sm text-foreground/80 leading-relaxed mb-4 flex-grow">
                  {community.description}
                </p>

                <div className="space-y-3 mt-auto">
                  {community.period && (
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{community.period}</span>
                    </div>
                  )}

                  {community.url && (
                    <a
                      href={community.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-bold group-hover:text-primary transition-colors pt-3 border-t border-muted w-full"
                    >
                      <LinkIcon className="h-3 w-3" />
                      Open link
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
