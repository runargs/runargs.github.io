import { cn, scrollToSection } from "@/lib/utils";
import { navItems } from "./navItems";
import type { CSSProperties } from "react";

interface MobileNavProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === activeSection)
  );

  const handleQuickNav = (sectionId: string) => {
    onSectionChange(sectionId);
    scrollToSection(sectionId);
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className="mobile-portfolio-nav fixed bottom-0 left-0 right-0 z-50 h-[var(--mobile-bottom-nav-height)] overflow-x-auto border-t border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper-quiet)_96%,transparent)] shadow-[0_-8px_28px_rgba(45,40,31,0.10)] backdrop-blur md:hidden"
    >
      <div
        className="mobile-portfolio-nav-track"
        style={{
          "--active-index": activeIndex,
        } as CSSProperties}
      >
        <span className="mobile-portfolio-nav-indicator" aria-hidden="true" />
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleQuickNav(item.id)}
            className={cn(
              "mobile-portfolio-nav-button relative flex items-center justify-center border-r border-[rgba(213,198,177,0.8)] px-2 py-2 text-[0.66rem] font-extrabold uppercase tracking-[0.045em]",
              "text-[var(--ink-muted)] transition duration-150 hover:text-[var(--ink)]",
              "before:absolute before:left-1/2 before:top-0 before:h-[7px] before:w-px before:-translate-x-1/2 before:bg-[var(--rule)] before:content-['']",
              activeSection === item.id && "is-active text-[var(--ink)]",
            )}
            aria-current={activeSection === item.id ? "true" : undefined}
          >
            {item.shortLabel}
          </button>
        ))}
      </div>
    </nav>
  );
}
