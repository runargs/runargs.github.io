import React from "react";
import { Video, FileText, Calendar, MapPin, ExternalLink, Mic2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * TYPES & MOCK DATA
 */
type AppearanceType = "talk" | "publication" | "video" | "article";

interface Appearance {
  id: string;
  type: AppearanceType;
  title: string;
  venue?: string;
  date?: string;
  location?: string;
  topics?: string[];
  url?: string;
  imageUrl?: string;
}

const appearances: Appearance[] = [
  // Example data structure
  {
    id: "1",
    type: "talk",
    title: "The Future of AI Interfaces",
    venue: "Design Conf 2025",
    date: "Oct 2025",
    location: "San Francisco, CA",
    topics: ["AI", "UX Design"],
    url: "https://example.com",
    imageUrl: "/api/placeholder/400/225"
  },
  {
    id: "2",
    type: "publication",
    title: "Latent Spaces in Modern Architecture",
    venue: "Journal of Tech",
    date: "Aug 2025",
    topics: ["Architecture", "Research"],
    url: "https://example.com"
  }
];

/**
 * SUB-COMPONENT: Icon Selector
 * Fixed: Added "talk" case and updated icons for better semantics
 */
function TypeIcon({ type }: { type: AppearanceType }) {
  const iconProps = "h-4 w-4 text-muted-foreground shrink-0";
  switch (type) {
    case "video":
      return <Video className={iconProps} />;
    case "talk":
      return <Mic2 className={iconProps} />;
    case "publication":
    case "article":
      return <FileText className={iconProps} />;
    default:
      return null;
  }
}

/**
 * MAIN COMPONENT
 */
export function SpeakingPublicationsSection() {
  return (
    <section id="speaking-publications" className="py-20 px-6 md:px-12 bg-background">
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

        {/* Masonry layout using CSS Columns */}
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {appearances.map((item) => {
            const isLink = Boolean(item.url);
            
            // Wrap in an anchor if a URL exists, otherwise a div
            const Wrapper = isLink ? 'a' : 'div';
            const wrapperProps = isLink 
              ? { href: item.url, target: "_blank", rel: "noopener noreferrer" } 
              : {};

            return (
              <div key={item.id} className="break-inside-avoid">
                <Wrapper 
                  {...wrapperProps} 
                  className={`block group outline-none focus-visible:ring-2 ring-primary rounded-xl transition-all ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <Card className="h-full border-muted hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
                    {/* Optional image with aspect ratio control */}
                    {item.imageUrl && (
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={item.imageUrl}
                          alt={`Thumbnail for ${item.title}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
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
                      {/* Metadata: Date and Location */}
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

                      {/* Topics/Badges */}
                      {item.topics && item.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.topics.map((topic) => (
                            <Badge
                              key={topic}
                              variant="secondary"
                              className="text-[10px] uppercase tracking-wider font-semibold bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Subtle Call to Action */}
                      {isLink && (
                        <div className="text-xs font-bold text-primary flex items-center gap-1 pt-2 border-t border-border/50">
                          <span>View {item.type === 'video' ? 'Recording' : 'Material'}</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Wrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
