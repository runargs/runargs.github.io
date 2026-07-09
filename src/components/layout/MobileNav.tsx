import { cn } from "@/lib/utils";
import { navItems } from "./navItems";

interface MobileNavProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  const handleQuickNav = (sectionId: string) => {
    onSectionChange(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className="fixed bottom-0 left-0 right-0 z-50 flex h-[var(--mobile-bottom-nav-height)] overflow-x-auto border-t border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper-quiet)_96%,transparent)] shadow-[0_-8px_28px_rgba(45,40,31,0.10)] backdrop-blur md:hidden"
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => handleQuickNav(item.id)}
          className={cn(
            "relative flex min-w-[86px] items-center justify-center border-r border-[rgba(213,198,177,0.8)] px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.07em]",
            "text-[var(--ink-muted)] transition duration-150 hover:bg-[var(--civic-blue-soft)] hover:text-[var(--ink)]",
            "before:absolute before:left-1/2 before:top-0 before:h-[7px] before:w-px before:-translate-x-1/2 before:bg-[var(--rule)] before:content-['']",
            activeSection === item.id && "bg-[var(--civic-blue-soft)] text-[var(--ink)] shadow-[inset_0_3px_0_var(--civic-blue)]",
          )}
          aria-current={activeSection === item.id ? "true" : undefined}
        >
          {item.shortLabel}
        </button>
      ))}
    </nav>
  );
}
