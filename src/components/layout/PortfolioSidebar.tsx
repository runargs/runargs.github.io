import { useState } from "react";
import type { ReactNode } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  Compass,
  FileText,
  HeartHandshake,
  Home,
  Mic,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";
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
  icon: ReactNode;
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    id: "start",
    label: "Overview",
    items: [
      { id: "bio", label: "Overview", icon: <Home className="h-4 w-4" /> },
    ],
  },
  {
    id: "work",
    label: "Product",
    items: [
      { id: "work", label: "Selected work", icon: <Briefcase className="h-4 w-4" /> },
      { id: "resume", label: "Résumé + contact", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    id: "thinking",
    label: "Notes",
    items: [
      { id: "side-projects", label: "Notes & artifacts", icon: <BookOpen className="h-4 w-4" /> },
      { id: "talks", label: "Public links", icon: <Mic className="h-4 w-4" /> },
    ],
  },
  {
    id: "food-culture",
    label: "Food + culture",
    items: [
      { id: "art", label: "Artisan gallery", icon: <Palette className="h-4 w-4" /> },
      { id: "community-building", label: "Product context", icon: <Users className="h-4 w-4" /> },
      { id: "mentorship", label: "Contact", icon: <HeartHandshake className="h-4 w-4" /> },
    ],
  },
  {
    id: "background",
    label: "Background",
    items: [
      { id: "accomplishments", label: "Selected honors", icon: <Award className="h-4 w-4" /> },
    ],
  },
];

const comingSoonItems: NavItem[] = [
  { id: "public-notes", label: "Notes", icon: <Sparkles className="h-4 w-4" /> },
  { id: "diagrams", label: "Diagrams", icon: <Compass className="h-4 w-4" /> },
  { id: "archive", label: "Archive", icon: <BookOpen className="h-4 w-4" /> },
];

interface PortfolioSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  showComingSoon?: boolean;
}

export function PortfolioSidebar({
  activeSection,
  onSectionChange,
  showComingSoon = false,
}: PortfolioSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "start",
    "work",
    "thinking",
    "food-culture",
    "background",
  ]);

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="h-full overflow-y-auto bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Nameplate */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-display text-3xl text-primary">Alexa Thoennes</h1>
        <p className="text-xs text-muted-foreground mt-2 font-sans leading-relaxed">
          AI product for research, synthesis, and decision-making
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1">
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
              <AccordionTrigger className="py-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground hover:no-underline rounded-md hover:bg-sidebar-accent transition-colors">
                {group.label}
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ul className="space-y-1 pl-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200 text-left",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                            : "text-sidebar-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "transition-colors shrink-0",
                            activeSection === item.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}

          {showComingSoon && (
            <AccordionItem value="coming-soon" className="border-none opacity-60">
              <AccordionTrigger className="py-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground hover:no-underline rounded-md hover:bg-sidebar-accent transition-colors">
                Add later
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
      <div className="p-6 text-center border-t border-sidebar-border/60">
        <span className="font-flourish text-2xl text-primary/40">❧</span>
      </div>
    </aside>
  );
}
