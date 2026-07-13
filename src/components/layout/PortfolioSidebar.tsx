import { cn, scrollToSection } from "@/lib/utils";
import { navItems } from "./navItems";
import type { CSSProperties } from "react";

interface PortfolioSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function PortfolioSidebar({ activeSection, onSectionChange }: PortfolioSidebarProps) {
  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === activeSection)
  );

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    scrollToSection(sectionId);
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className="portfolio-nav sticky top-0 z-40 hidden min-h-[var(--sticky-nav-height)] border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper-quiet)_94%,transparent)] backdrop-blur md:flex"
      style={{
        "--nav-count": navItems.length,
        "--active-index": activeIndex,
      } as CSSProperties}
    >
      <span className="portfolio-nav-indicator" aria-hidden="true" />
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => handleNavClick(item.id)}
          className={cn(
            "portfolio-nav-button relative min-w-[96px] flex-1 border-r border-[rgba(213,198,177,0.8)] px-3 py-3 text-center text-[0.72rem] font-extrabold uppercase tracking-[0.07em]",
            "text-[var(--ink-muted)] transition duration-150 hover:text-[var(--ink)]",
            "after:absolute after:bottom-0 after:left-1/2 after:h-[7px] after:w-px after:-translate-x-1/2 after:bg-[var(--rule)] after:content-['']",
            activeSection === item.id && "is-active text-[var(--ink)]",
          )}
          aria-current={activeSection === item.id ? "true" : undefined}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
