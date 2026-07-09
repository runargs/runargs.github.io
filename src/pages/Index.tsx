import { useState, useEffect } from "react";
import { PortfolioSidebar } from "@/components/layout/PortfolioSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { LightsOffToggle } from "@/components/design-system/Dossier";
import { BioSection } from "@/components/sections/BioSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { MentorshipSection } from "@/components/sections/MentorshipSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { TalksSection } from "@/components/sections/TalksSection";
import { SideProjectsSection } from "@/components/sections/SideProjectsSection";
import { ArtSection } from "@/components/sections/ArtSection";
import { ResumeSection } from "@/components/sections/ResumeSection";

const sectionIds = [
  "bio",
  "work",
  "talks",
  "community-building",
  "mentorship",
  "art",
  "side-projects",
  "resume",
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("bio");
  
  // States for timing and visibility
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle the delay and fade-in
  useEffect(() => {
    const appearanceTimer = setTimeout(() => {
      setIsRendered(true);
      // Small micro-delay to allow the DOM to catch up before changing opacity
      setTimeout(() => setIsVisible(true), 50);
    }, 10000);

    return () => clearTimeout(appearanceTimer);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full relative">
      <LightsOffToggle />

      <MobileNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="page-shell">
        <div className="page-inner">
          <BioSection />
          <PortfolioSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <div className="hatch-band" aria-hidden="true" />
          <WorkSection />
          <TalksSection />
          <CommunitySection />
          <MentorshipSection />
          <ArtSection />
          <SideProjectsSection />
          <ResumeSection />

          <footer className="grid gap-6 border-t border-[var(--rule)] bg-[var(--paper)] px-6 py-8 md:grid-cols-[1fr_260px] md:px-11">
            <div>
              <p className="font-serif text-2xl leading-none text-[var(--ink)]">Alexa Thoennes</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--ink-muted)]">
                Human-first responsible technology, AI product judgment, and field notes on systems that need to work for people.
              </p>
            </div>
            <div className="space-y-1 text-xs text-[var(--ink-faint)] md:text-right">
              <p>Built with generative AI assistance</p>
              <p>Lovable, GitHub Copilot, Gemini, Claude, GPT-5</p>
              <p>© 2026</p>
            </div>
          </footer>
        </div>
      </main>

      {/* Clippy stays as a vintage computing contact artifact. */}
      {isRendered && (
        <div 
          className={`fixed bottom-6 right-6 z-50 hidden md:flex flex-col items-end pointer-events-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Tooltip */}
          <div className="pointer-events-auto mb-2 relative max-w-[210px] border-2 border-[var(--ink)] bg-[var(--paper-card)] p-3 text-[11px] leading-tight text-[var(--ink)] shadow-[3px_3px_0_var(--civic-blue)]">
            <button 
              onClick={() => setIsVisible(false)} // Fade out first
              onTransitionEnd={() => !isVisible && setIsRendered(false)} // Remove from DOM after fade
              className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center border border-[var(--ink)] bg-[var(--paper-soft)] text-[10px] hover:bg-[var(--field-ochre-soft)]"
              aria-label="Dismiss Clippy contact prompt"
            >
              ✕
            </button>

            <p className="pr-2">
              It looks like you're enjoying exploring this portfolio. Would you like to get in touch?
            </p>
            <a 
              href="mailto:alexa.thoennes@gmail.com" 
              className="block mt-2 font-bold underline text-blue-800 hover:text-blue-600"
            >
              Click here to contact.
            </a>
            
            <div className="absolute -bottom-[9px] right-6 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[var(--ink)]">
               <div className="absolute -left-[7px] -top-[9px] h-0 w-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-[var(--paper-card)]" />
            </div>
          </div>

          <img 
            src="/images/clippy-karl-klammer.gif" 
            alt="Clippy" 
            className="w-16 h-16 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Index;
