import React, { useState, useMemo } from "react";
import { Award, Star, Trophy, Sparkles, X, Target, Cpu, GraduationCap, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Accomplishment {
  id: string;
  title: string;
  organization: string;
  year: string;
  icon: "award" | "star" | "trophy";
  category: "Technical" | "Strategy" | "Leadership" | "Academic";
}

const accomplishments: Accomplishment[] = [
  { id: "1", title: "Strategic Business Plan Award", organization: "tecBRIDGE radio", year: "2018", icon: "award", category: "Strategy" },
  { id: "2", title: "Excellence in Applied Computing (Magna Cum Laude)", organization: "University of Scranton", year: "2021", icon: "award", category: "Technical" },
  { id: "3", title: "First Place: Autonomous Maze-Solving Robotics", organization: "University of Scranton", year: "2018", icon: "trophy", category: "Technical" },
  { id: "4", title: "Technical Finalist: SumoBot Engineering", organization: "IEEE Hackathon", year: "2019", icon: "star", category: "Technical" },
  { id: "5", title: "Ronald Reagan Leadership Award", organization: "Reagan Foundation", year: "2015", icon: "star", category: "Leadership" },
  { id: "6", title: "Grand Champion Fundraiser", organization: "Walk to End Alzheimer’s", year: "2017", icon: "trophy", category: "Leadership" },
  { id: "7", title: "Exemplary Leadership Award", organization: "21st Century Cyber Charter", year: "2018", icon: "star", category: "Leadership" },
  { id: "8", title: "Regional Leadership Recognition", organization: "NBC10 / Widener University", year: "2018", icon: "award", category: "Leadership" },
  { id: "9", title: "Graphic Design Competition Runner-Up", organization: "Instructables.com", year: "2015", icon: "star", category: "Strategy" },
  { id: "10", title: "Scholastic Art & Writing Silver Key", organization: "Greater Philadelphia Region", year: "2015", icon: "award", category: "Strategy" },
  { id: "11", title: "Academic Excellence: Top 3% of Class", organization: "21st Century Cyber Charter", year: "2018", icon: "star", category: "Academic" },
  { id: "12", title: "Dean’s List for Academic Achievement", organization: "University of Scranton", year: "2021", icon: "star", category: "Academic" },
  { id: "13", title: "University Merit Grant", organization: "University of Scranton", year: "2018", icon: "award", category: "Academic" },
  { id: "14", title: "Freedom Credit Union Grant", organization: "Freedom Credit Union", year: "2018", icon: "award", category: "Academic" },
  { id: "15", title: "Cecilia Moy Yep Award", organization: "Asian American Women's Coalition", year: "2018", icon: "award", category: "Leadership" }
];

const iconMap = { award: Award, star: Star, trophy: Trophy };
const categories = ["Technical", "Strategy", "Leadership", "Academic"] as const;

export function AccomplishmentsSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return activeFilter 
      ? accomplishments.filter(item => item.category === activeFilter)
      : accomplishments;
  }, [activeFilter]);

  return (
    <section id="accomplishments" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 italic">Honors & Recognition</h2>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
            Milestones in leadership, technical excellence, and strategic thinking.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                activeFilter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/40"
              )}
            >
              {cat}
            </button>
          ))}
          {activeFilter && (
            <button 
              onClick={() => setActiveFilter(null)}
              className="px-2 py-1.5 text-[10px] font-bold text-primary flex items-center gap-1 hover:opacity-70"
            >
              <X className="h-3 w-3" /> RESET
            </button>
          )}
        </div>

        {/* List */}
        <div className="relative border-t border-muted/60">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div 
                  key={item.id} 
                  className="group flex items-center justify-between py-5 border-b border-muted/30 hover:bg-primary/[0.01] transition-all duration-300 px-2 animate-in fade-in slide-in-from-left-2"
                >
                  <div className="flex items-center gap-6 min-w-0">
                    <span className="text-[10px] font-bold text-primary/60 tabular-nums w-10 shrink-0">
                      {item.year}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-[13px] md:text-sm text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground/60 mt-0.5">
                        {item.organization}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 ml-4 shrink-0">
                    <span className="hidden group-hover:block text-[9px] font-bold text-primary/40 uppercase tracking-tighter transition-all">
                      {item.category}
                    </span>
                    <Icon className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:scale-110 transition-all" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center text-muted-foreground italic text-sm">
              No matching honors found.
            </div>
          )}
        </div>

        {/* Subtle Footer Note */}
        <p className="mt-8 text-[10px] text-muted-foreground/40 italic text-center">
          * Additional regional awards and academic grants available upon request.
        </p>
      </div>
    </section>
  );
}
