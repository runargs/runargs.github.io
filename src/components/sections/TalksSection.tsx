import { Video, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Talk {
  id: string;
  title: string;
  event: string;
  date: string;
  location: string;
  topics: string[];
  hasVideo?: boolean;
}

const talks: Talk[] = [
  {
    id: "1",
    title: "The Art of Systematic Design",
    event: "Design Conference 2024",
    date: "March 2024",
    location: "San Francisco, CA",
    topics: ["Design Systems", "Scale"],
    hasVideo: true,
  },
  {
    id: "2",
    title: "Building for Accessibility First",
    event: "Tech Summit",
    date: "January 2024",
    location: "Virtual",
    topics: ["Accessibility", "Inclusion"],
    hasVideo: true,
  },
  {
    id: "3",
    title: "From Side Project to Startup",
    event: "Indie Hackers Meetup",
    date: "November 2023",
    location: "New York, NY",
    topics: ["Entrepreneurship", "Product"],
  },
  {
    id: "4",
    title: "Creative Leadership in Tech",
    event: "Leadership Forum",
    date: "September 2023",
    location: "Austin, TX",
    topics: ["Leadership", "Culture"],
    hasVideo: true,
  },
];

export function TalksSection() {
  return (
    <section id="talks" className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Talks</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sharing ideas and stories at conferences and events
          </p>
        </div>

        {/* Talks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-fade-in">
          {talks.map((talk) => (
            <Card 
              key={talk.id} 
              className="card-hover border-gold-hover group cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-serif text-lg group-hover:text-primary transition-colors">
                    {talk.title}
                  </CardTitle>
                  {talk.hasVideo && (
                    <Video className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </div>
                <CardDescription className="font-medium">
                  {talk.event}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {talk.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {talk.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {talk.topics.map((topic) => (
                    <Badge 
                      key={topic} 
                      variant="outline"
                      className="text-xs border-primary/30 text-primary"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
