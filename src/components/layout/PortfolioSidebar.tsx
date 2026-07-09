import { cn } from "@/lib/utils";
import { navItems } from "./navItems";

interface PortfolioSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function PortfolioSidebar({ activeSection, onSectionChange }: PortfolioSidebarProps) {
  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className="sticky top-0 z-40 hidden min-h-[var(--sticky-nav-height)] border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper-quiet)_94%,transparent)] backdrop-blur md:flex"
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => handleNavClick(item.id)}
          className={cn(
            "relative min-w-[96px] flex-1 border-r border-[rgba(213,198,177,0.8)] px-3 py-3 text-center text-[0.72rem] font-extrabold uppercase tracking-[0.07em]",
            "text-[var(--ink-muted)] transition duration-150 hover:bg-[var(--civic-blue-soft)] hover:text-[var(--ink)]",
            "after:absolute after:bottom-0 after:left-1/2 after:h-[7px] after:w-px after:-translate-x-1/2 after:bg-[var(--rule)] after:content-['']",
            activeSection === item.id && "bg-[var(--civic-blue-soft)] text-[var(--ink)] shadow-[inset_0_-3px_0_var(--civic-blue)]",
          )}
          aria-current={activeSection === item.id ? "true" : undefined}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
