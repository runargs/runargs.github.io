import { Video, FileText, Calendar, MapPin, Link as LinkIcon, Mic2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AppearanceType = "talk" | "publication" | "video" | "article";

interface Appearance {
  id: string;
  type: AppearanceType;
  title: string;
  venue?: string;         // mapped from your 'event'
  date?: string;
  location?: string;
  topics?: string[];
  url?: string;           // talk video, article, paper, etc.
  imageUrl?: string;      // optional thumbnail
}

const appearances: Appearance[] = [
  {
    id: "1",
    type: "video",
    title: "Mastery Learning and Profesional Outcomes",
    venue: "21st Century Cyber Charter",
    date: "February 2026",
    location: "Downingtown, PA",
    topics: ["Mastery Pedagogy", "Educational Technology (EdTech)"]
  },
  {
    id: "2",
    type: "talk",
    title: "Early Career Roadmapping",
    venue: "Bucks County Community College - Hosted by Women in STEM",
    date: "2024",
    location: "Newtown, PA",
    topics: ["Mentorship", "Career Guidance", "Women in Tech"]
  },
  {
    id: "3",
    type: "talk",
    title: "Amazon Reviews to Forecast Product Match",
    venue: "INFORMS (Institute for Operations Research and the Management Sciences)",
    date: "2021",
    location: "Anaheim, CA",
    topics: ["AI/ML", "LLMs", "e-Commerce AI", "Agentic Commerce"],
    url: "https://www.scranton.edu/faculty/gomaa/publications.shtml"
  },
];

function TypeIcon({ type }: { type: AppearanceType }) {
  const iconProps = "h-4 w-4 text-muted-foreground shrink-0";
  switch (type) {
    case "video": return <Video className={iconProps} />;
    case "talk": return <Mic2 className={iconProps} />;
    case "publication":
    case "article": return <FileText className={iconProps} />;
    default: return null;
  }
}

export function TalksSection() {
  return (
    <section id="talks" className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section header - Restored font styles */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Talks & Publications
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sharing ideas and stories at conferences and through writing
          </p>
        </div>

        {/* Layout - Restored your Grid and Animation class */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-fade-in">
          {appearances.map((item) => {
            const hasLink = Boolean(item.url);

            return (
              <Card
                key={item.id}
                // Restored your exact accent classes: card-hover and border-gold-hover
                className={`card-hover border-gold-hover group transition-all duration-300 ${
                  hasLink ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() => {
                  if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
                }}
              >
                {/* Optional Image - Added with standard rounded corners */}
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
                  {/* Metadata - Restored your specific layout */}
                  {(item.date || item.location) && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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

                  {/* Topics - Restored your specific Badge styling */}
                  {item.topics && (
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="outline"
                          className="text-xs border-primary/30 text-primary"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Optional CTA for links */}
                  {hasLink && (
                    <div className="mt-4 pt-4 border-t border-muted flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground font-bold group-hover:text-primary transition-colors">
                      <LinkIcon className="h-3 w-3" />
                      View Material
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
