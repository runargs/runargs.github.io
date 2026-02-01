import { useState } from "react";
import { ChevronDown, User, Briefcase, Award, Heart, Users, Mic, Rocket, Palette, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    id: "about",
    label: "About",
    items: [
      { id: "bio", label: "Bio", icon: <User className="h-4 w-4" /> },
    ],
  },
  {
    id: "professional",
    label: "Professional",
    items: [
      { id: "work", label: "Work", icon: <Briefcase className="h-4 w-4" /> },
      { id: "accomplishments", label: "Accomplishments", icon: <Award className="h-4 w-4" /> },
      { id: "resume", label: "Resume", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    id: "community",
    label: "Community",
    items: [
      { id: "mentorship", label: "Mentorship & Outreach", icon: <Heart className="h-4 w-4" /> },
      { id: "community-building", label: "Community Building", icon: <Users className="h-4 w-4" /> },
      { id: "talks", label: "Talks", icon: <Mic className="h-4 w-4" /> },
    ],
  },
  {
    id: "creative",
    label: "Creative",
    items: [
      { id: "side-projects", label: "Side Projects", icon: <Rocket className="h-4 w-4" /> },
      { id: "art", label: "Art Galleries", icon: <Palette className="h-4 w-4" /> },
    ],
  },
];

const comingSoonItems: NavItem[] = [
  { id: "mentions", label: "Mentions", icon: <Clock className="h-4 w-4" /> },
  { id: "podcasts", label: "Podcasts", icon: <Clock className="h-4 w-4" /> },
  { id: "interviews", label: "Interviews", icon: <Clock className="h-4 w-4" /> },
  { id: "publications", label: "Publications", icon: <Clock className="h-4 w-4" /> },
  { id: "books", label: "Books", icon: <Clock className="h-4 w-4" /> },
];

interface PortfolioSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  showComingSoon?: boolean;
}

export function PortfolioSidebar({ 
  activeSection, 
  onSectionChange,
  showComingSoon = false 
}: PortfolioSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["about", "professional", "community", "creative"]);

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="h-full overflow-y-auto bg-sidebar border-r border-sidebar-border">
      {/* Logo / Name */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-display text-3xl text-primary">Portfolio</h1>
        <p className="text-sm text-muted-foreground mt-1 font-sans">Explore & Discover</p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <Accordion 
          type="multiple" 
          value={expandedGroups}
          onValueChange={setExpandedGroups}
          className="space-y-2"
        >
          {navGroups.map((group) => (
            <AccordionItem 
              key={group.id} 
              value={group.id}
              className="border-none"
            >
              <AccordionTrigger className="py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline rounded-md hover:bg-sidebar-accent transition-colors">
                {group.label}
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="space-y-1 pl-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                            : "text-sidebar-foreground"
                        )}
                      >
                        <span className={cn(
                          "transition-colors",
                          activeSection === item.id ? "text-primary" : "text-muted-foreground"
                        )}>
                          {item.icon}
                        </span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}

          {/* Coming Soon Section */}
          {showComingSoon && (
            <AccordionItem value="coming-soon" className="border-none opacity-50">
              <AccordionTrigger className="py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline rounded-md hover:bg-sidebar-accent transition-colors">
                Coming Soon
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="space-y-1 pl-2">
                  {comingSoonItems.map((item) => (
                    <li key={item.id}>
                      <span className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground/60 cursor-not-allowed">
                        {item.icon}
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </nav>

      {/* Footer flourish */}
      <div className="mt-auto p-6 text-center">
        <span className="font-flourish text-2xl text-primary/40">❧</span>
      </div>
    </aside>
  );
}
