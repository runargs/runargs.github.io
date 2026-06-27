import { Calendar, Link as LinkIcon, MapPin, Mic2, PenLine, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ArtifactType = "talk" | "video" | "note";

interface Artifact {
  id: string;
  type: ArtifactType;
  title: string;
  venue?: string;
  date?: string;
  location?: string;
  topics?: string[];
  url: string;
  summary?: string;
  imageUrl?: string;
}

const artifacts: Artifact[] = [
  {
    id: "ami-linkedin",
    type: "note",
    title: "Ask Mastercard Intelligence public post",
    venue: "LinkedIn",
    date: "2026",
    location: "New York, NY",
    topics: ["AI Product", "Research Assistants", "Conversational Intelligence"],
    summary: "Public post on AI research assistant work and conversational market intelligence.",
    url: "https://www.linkedin.com/posts/alexathoennes_intelligence-is-becoming-fast-conversational-ugcPost-7460767669449867264-Swie/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB3WfnwBG2V5aCsXyXW2XIxZ5ze9Iksy2fA",
  },
  {
    id: "alumni-feature",
    type: "video",
    title: "Mastery learning and professional outcomes",
    venue: "21st Century Cyber Charter alumni spotlight",
    date: "February 2026",
    location: "Downingtown, PA",
    topics: ["Education", "Career Path", "Technical Learning"],
    summary: "A public feature on education, early technical development, and professional trajectory.",
    url: "https://www.linkedin.com/posts/alexathoennes_21cccsalumni-classof2018-alumnispotlight-activity-7424802530242506752-15Qf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB3WfnwBG2V5aCsXyXW2XIxZ5ze9Iksy2fA",
  },
  {
    id: "women-in-stem",
    type: "talk",
    title: "Early-career roadmapping",
    venue: "Bucks County Community College — Women in STEM",
    date: "2024",
    location: "Newtown, PA",
    topics: ["Mentorship", "Career Design", "Women in Tech"],
    summary: "Guest session on early career choices, technical confidence, and navigating ambiguous paths.",
    url: "https://www.bucks.edu/",
  },
  {
    id: "informs",
    type: "talk",
    title: "Amazon reviews to forecast product match",
    venue: "INFORMS Annual Meeting",
    date: "2021",
    location: "Anaheim, CA",
    topics: ["AI/ML", "E-commerce", "Product Match"],
    summary: "Earlier work on using review data to understand product fit and purchasing signals.",
    url: "https://meetings.informs.org/wordpress/anaheim2021/#ready",
  },
];

function TypeIcon({ type }: { type: ArtifactType }) {
  const iconProps = "h-4 w-4 text-muted-foreground shrink-0";
  switch (type) {
    case "video":
      return <Video className={iconProps} />;
    case "talk":
      return <Mic2 className={iconProps} />;
    case "note":
      return <PenLine className={iconProps} />;
    default:
      return null;
  }
}

export function TalksSection() {
  return (
    <section id="talks" className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold mb-3">
            Public links
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground tracking-tight italic">
            Selected links
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Public material with a little more context: AI product work, selected speaking, education, and earlier technical work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-fade-in">
          {artifacts.map((item) => (
            <Card
              key={item.id}
              className="card-hover border-gold-hover group cursor-pointer transition-all duration-300"
              onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
            >
              {item.imageUrl && (
                <div className="w-full overflow-hidden rounded-t-xl bg-muted border-b border-gold-hover/20">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-serif text-lg group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </CardTitle>
                  <TypeIcon type={item.type} />
                </div>
                {item.venue && (
                  <CardDescription className="font-medium text-foreground/80">
                    {item.venue}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent>
                {(item.date || item.location) && (
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    {item.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    )}
                  </div>
                )}

                {item.summary && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.summary}
                  </p>
                )}

                {item.topics && (
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs border-primary/30 text-primary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-muted flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground font-bold group-hover:text-primary transition-colors">
                  <LinkIcon className="h-3 w-3" />
                  View material
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
