import React, { useState } from 'react';
import { Trophy, Star, Award } from 'lucide-react';

// Data strictly organized by PM relevance (Strategy & Tech first)
const accomplishments = [
  { 
    id: "1", 
    title: "Strategic Business Plan Award", 
    organization: "tecBRIDGE radio", 
    year: "2018", 
    icon: "award" 
  },
  { 
    id: "2", 
    title: "Award for Excellence in Applied Computing (Magna Cum Laude)", 
    organization: "University of Scranton", 
    year: "2021", 
    icon: "award" 
  },
  { 
    id: "3", 
    title: "First Place: Autonomous Maze-Solving Robotics Competition", 
    organization: "University of Scranton", 
    year: "2018", 
    icon: "trophy" 
  },
  { 
    id: "4", 
    title: "Technical Competition Finalist: SumoBot Engineering", 
    organization: "IEEE Hackathon", 
    year: "2019", 
    icon: "star" 
  },
  { 
    id: "5", 
    title: "Ronald Reagan Leadership Award", 
    organization: "The Ronald Reagan Presidential Foundation & Institute", 
    year: "2015", 
    icon: "star" 
  },
  { 
    id: "6", 
    title: "Philanthropic Leadership: Grand Champion Fundraiser", 
    organization: "Walk to End Alzheimer’s", 
    year: "2017", 
    icon: "trophy" 
  },
  { 
    id: "7", 
    title: "Exemplary Leadership Award", 
    organization: "21st Century Cyber Charter", 
    year: "2018", 
    icon: "star" 
  },
  { 
    id: "8", 
    title: "Regional Leadership Recognition", 
    organization: "NBC10 / Widener University", 
    year: "2018", 
    icon: "award" 
  },
  { 
    id: "9", 
    title: "Graphic Design Competition Runner-Up", 
    organization: "Instructables.com", 
    year: "2015", 
    icon: "star" 
  },
  { 
    id: "10", 
    title: "Scholastic Art & Writing Silver Key", 
    organization: "Greater Philadelphia Region", 
    year: "2015", 
    icon: "award" 
  },
  { 
    id: "11", 
    title: "Academic Excellence: Top 3% of Class (3.98 GPA)", 
    organization: "21st Century Cyber Charter", 
    year: "2018", 
    icon: "star" 
  },
  { 
    id: "12", 
    title: "Dean’s List for Academic Achievement", 
    organization: "University of Scranton", 
    year: "2021", 
    icon: "star" 
  },
  { 
    id: "13", 
    title: "University Merit Grant", 
    organization: "University of Scranton", 
    year: "2018", 
    icon: "award" 
  },
  { 
    id: "14", 
    title: "Freedom Credit Union Grant", 
    organization: "Freedom Credit Union", 
    year: "2018", 
    icon: "award" 
  },
  { 
    id: "15", 
    title: "Cecilia Moy Yep Award", 
    organization: "AAWC (Asian American Women's Coalition)", 
    year: "2018", 
    icon: "award" 
  }
];

const iconMap = {
  trophy: Trophy,
  star: Star,
  award: Award,
};

export function AccomplishmentsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Configuration
  const initialLimit = 6;
  const visibleList = isExpanded ? accomplishments : accomplishments.slice(0, initialLimit);
  
  // Dynamic Calculations
  const totalCount = accomplishments.length;
  const remainingCount = totalCount - initialLimit;
  const yearSpan = new Set(accomplishments.map(a => a.year)).size;

  return (
    <section id="accomplishments" className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        
        {/* Header with Dynamic Metadata */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight italic">
              Honors & Recognition
            </h2>
            <p className="text-muted-foreground text-sm mt-2 opacity-80">
              Technical excellence and leadership across {yearSpan} years
            </p>
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 border-l border-muted pl-4">
            {totalCount} Total Recognitions
          </div>
        </header>

        {/* Accomplishments List */}
        <div className="border-t border-muted/40">
          {visibleList.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div 
                key={item.id} 
                className="group flex items-center justify-between py-4 border-b border-muted/20 hover:bg-muted/5 transition-all duration-300 px-1"
              >
                <div className="flex flex-col min-w-0 pr-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-medium text-[14px] md:text-base text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground/50 font-mono tracking-tighter">
                      {item.year}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground/70 mt-0.5">
                    {item.organization}
                  </span>
                </div>
                
                <Icon className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary/60 transition-colors shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Professional Minimalist Footer */}
        {!isExpanded && remainingCount > 0 && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all py-3 px-8 border border-muted/60 hover:border-foreground rounded-full"
            >
              Show {remainingCount} Additional Milestones
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
