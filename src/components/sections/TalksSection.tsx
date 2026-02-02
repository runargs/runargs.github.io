import { Video, FileText, Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AppearanceType = "talk" | "publication" | "video" | "article";

interface Appearance {
  id: string;
  type: AppearanceType;

  title: string;
  venue?: string;       // conference, journal, publication, platform
  date?: string;
  location?: string;

  topics?: string[];

  url?: string;         // talk video, article, paper, etc.
  imageUrl?: string;    // optional thumbnail / cover image
}

const appearances: Appearance[] = [
  {
    id: "designing-trust-systems",
    type: "talk",
    title: "Designing Trust in Distributed Communities",
    venue: "Open Systems Conference",
    date: "Oct 2024",
    location: "Berlin, DE",
    topics: ["Governance", "Communities", "Distributed Systems"],
    url: "https://example.com/designing-trust-talk",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },

  {
    id: "human-infrastructure-essay",
    type: "article",
    title: "Human Infrastructure Is the Hardest Part",
    venue: "Notion Blog",
    date: "Aug 2024",
    topics: ["Organizational Design", "Culture", "Systems Thinking"],
    url: "https://example.com/human-infrastructure",
  },

  {
    id: "community-scale-video",
    type: "video",
    title: "Community Doesn’t Scale the Way You Think It Does",
    venue: "YouTube",
    date: "Mar 2024",
    topics: ["Community Building", "Scale", "Social Systems"],
    url: "https://youtube.com/watch?v=example",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },

  {
    id: "academic-paper",
    type: "publication",
    title: "Informal Governance in Online Communities",
    venue: "Journal of Social Computing",
    date: "2023",
    topics: ["Governance", "Online Communities", "Research"],
    url: "https://example.com/informal-governance-paper",
  },

  {
    id: "panel-ai-ethics",
    type: "talk",
    title: "Who Is Responsible When Systems Fail?",
    venue: "AI Ethics Summit",
    date: "Nov 2023",
    location: "New York, NY",
    topics: ["AI", "Responsibility", "Institutional Design"],
  },

  {
    id: "short-link-mention",
    type: "article",
    title: "Building Communities Without Burning Out",
    venue: "The Pragmatist",
    url: "https://example.com/community-burnout",
  },
];

function TypeIcon({ type }: { type: AppearanceType }) {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4 text-muted-foreground shrink-0" />;
    case "publication":
    case "article":
      return <FileText className="h-4 w-4 text-muted-foreground shrink-0" />;
    default:
      return null;
  }
}

export function SpeakingPublicationsSection() {
  return (
    <section id="speaking-publications" className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Speaking & Publications
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sharing ideas through talks, writing, and media
          </p>
        </div>

        {/* Masonry layout */}
        <div className="columns-1 md:columns-2 gap-6 space-y-6 stagger-fade-in">
          {appearances.map((item) => {
            const clickable = Boolean(item.url);

            return (
              <Card
                key={item.id}
                className={[
                  "break-inside-avoid card-hover border-gold-hover group",
                  clickable ? "cursor-pointer" : "cursor-default",
                ].join(" ")}
                onClick={() => {
                  if (item.url) {
                    window.open(item.url, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                {/* Optional image */}
                {item.imageUrl && (
                  <div className="w-full overflow-hidden rounded-t-md bg-muted">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-serif text-lg leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <TypeIcon type={item.type} />
                  </div>

                  {item.venue && (
                    <CardDescription className="font-medium">
                      {item.venue}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent>
                  {/* Metadata */}
                  {(item.date || item.location) && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
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

                  {/* Topics */}
                  {item.topics && item.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
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

                  {/* Subtle CTA */}
                  {item.url && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <LinkIcon className="h-3 w-3" />
                      View
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
