import { Menu, User, Briefcase, Palette, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PortfolioSidebar } from "./PortfolioSidebar";

interface MobileNavProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
}

const quickNavItems = [
  { id: "bio", label: "Bio", icon: User },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "art", label: "Art", icon: Palette },
  { id: "resume", label: "Resume", icon: FileText },
];

export function MobileNav({ 
  activeSection, 
  onSectionChange, 
  sidebarOpen, 
  onSidebarOpenChange 
}: MobileNavProps) {
  const handleQuickNav = (sectionId: string) => {
    onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top bar with menu trigger */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border md:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <Sheet open={sidebarOpen} onOpenChange={onSidebarOpenChange}>
            <SheetTrigger asChild>
              <button 
                className="p-2 -ml-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <PortfolioSidebar 
                activeSection={activeSection}
                onSectionChange={(id) => {
                  onSectionChange(id);
                  onSidebarOpenChange(false);
                }}
              />
            </SheetContent>
          </Sheet>

          <h1 className="font-display text-2xl text-primary">Portfolio</h1>
          
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {quickNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleQuickNav(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                  activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-transform",
                  activeSection === item.id && "scale-110"
                )} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
