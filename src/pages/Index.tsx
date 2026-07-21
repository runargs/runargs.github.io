import { useState, useEffect, useRef } from "react";
import { PortfolioSidebar } from "@/components/layout/PortfolioSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { LightsOffToggle } from "@/components/design-system/Dossier";
import { BioSection } from "@/components/sections/BioSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { TalksSection } from "@/components/sections/TalksSection";
import { SideProjectsSection } from "@/components/sections/SideProjectsSection";
import { ArtSection } from "@/components/sections/ArtSection";
import { ProfessionalContactForm } from "@/components/contact/ProfessionalContactForm";
import { PortfolioFooter } from "@/components/layout/PortfolioFooter";

const sectionIds = [
  "bio",
  "work",
  "talks",
  "community-building",
  "art",
  "side-projects",
  "contact",
];

/*
 * Index owns the one-page document shell: active-section tracking, the
 * desktop/mobile navigation relationship, and scroll-fed section presence.
 * Keep the section IDs synchronized with navItems and the rendered order.
 */
const Index = () => {
  const [activeSection, setActiveSection] = useState("bio");
  const requestedSectionRef = useRef<string | null>(null);
  const requestedSectionTimerRef = useRef<number | null>(null);
  
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const appearanceTimer = setTimeout(() => {
      setIsRendered(true);
      // Small micro-delay to allow the DOM to catch up before changing opacity
      setTimeout(() => setIsVisible(true), 50);
    }, 10000);

    return () => clearTimeout(appearanceTimer);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    requestedSectionRef.current = sectionId;
    setActiveSection(sectionId);

    if (requestedSectionTimerRef.current) {
      window.clearTimeout(requestedSectionTimerRef.current);
    }

    requestedSectionTimerRef.current = window.setTimeout(() => {
      requestedSectionRef.current = null;
      requestedSectionTimerRef.current = null;
    }, 920);
  };

  const openInquiry = () => {
    handleSectionChange("contact");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsVisible(false);
    window.setTimeout(() => {
      document.querySelector<HTMLElement>("#contact .art-inquiry-cards input")?.focus();
    }, 650);
  };

  useEffect(() => {
    let frame = 0;
    let resizeTimer = 0;
    let sectionRanges: Array<{ id: string; top: number; bottom: number }> = [];

    const measureSections = () => {
      sectionRanges = sectionIds.flatMap((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return [];

        return [{
          id: sectionId,
          top: element.offsetTop,
          bottom: element.offsetTop + element.offsetHeight,
        }];
      });
    };

    const updateActiveSection = () => {
      frame = 0;
      if (requestedSectionRef.current) {
        return;
      }

      // The offset tracks the section whose content has entered the main
      // reading area, rather than the section that merely touches the viewport.
      const scrollPosition = window.scrollY + 200;
      const pageBottom = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= pageBottom - 8) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      let nearestSection = sectionRanges[0]?.id ?? "bio";

      for (const section of sectionRanges) {
        if (scrollPosition >= section.top) {
          nearestSection = section.id;
        }

        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          setActiveSection(section.id);
          return;
        }
      }

      setActiveSection(nearestSection);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    const requestMeasure = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measureSections();
        requestUpdate();
      }, 120);
    };

    measureSections();
    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestMeasure);
      if (requestedSectionTimerRef.current) {
        window.clearTimeout(requestedSectionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;
    let resizeTimer = 0;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".section-band[id]"));
    let focusLine = window.innerHeight * 0.42;
    let falloff = Math.max(window.innerHeight * 0.72, 420);

    const updateSectionPresence = () => {
      frame = 0;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionFocus = rect.top + Math.min(rect.height * 0.34, focusLine + window.innerHeight * 0.08);
        const distance = Math.abs(sectionFocus - focusLine);
        const presence = Math.min(Math.max(1 - distance / falloff, 0), 1);
        const feed = Math.round((rect.top - focusLine) * -0.08);

        // CSS consumes these variables for the subtle archival "feed" effect.
        // They are intentionally disabled for reduced-motion users above.
        const presenceValue = presence.toFixed(3);
        const feedValue = `${feed}px`;
        if (section.style.getPropertyValue("--section-presence") !== presenceValue) {
          section.style.setProperty("--section-presence", presenceValue);
        }
        if (section.style.getPropertyValue("--section-feed") !== feedValue) {
          section.style.setProperty("--section-feed", feedValue);
        }
        section.classList.toggle("section-in-view", presence > 0.54);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateSectionPresence);
    };

    const requestMeasure = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        focusLine = window.innerHeight * 0.42;
        falloff = Math.max(window.innerHeight * 0.72, 420);
        requestUpdate();
      }, 120);
    };

    updateSectionPresence();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestMeasure);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative">
      <LightsOffToggle />

      <MobileNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <main className="page-shell">
        <div className="page-inner">
          <BioSection />
          <PortfolioSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <div className="hatch-band" aria-hidden="true" />
          <WorkSection />
          <TalksSection />
          <CommunitySection />
          <ArtSection />
          <SideProjectsSection />
          <section id="contact" className="main-contact-section notched" aria-labelledby="main-contact-title">
            <div className="main-contact-intro">
              <p className="font-pixel">contact.txt</p>
              <h2 id="main-contact-title">Let’s work together</h2>
            </div>
            <ProfessionalContactForm />
          </section>

          <PortfolioFooter page="main" guestbookId="guestbook" />
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
              onClick={() => setIsVisible(false)}
              onTransitionEnd={() => !isVisible && setIsRendered(false)}
              className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center border border-[var(--ink)] bg-[var(--paper-soft)] text-[10px] hover:bg-[var(--field-ochre-soft)]"
              aria-label="Dismiss Clippy contact prompt"
            >
              ✕
            </button>

            <p className="pr-2">
              Want to talk about the work?
            </p>
            <button
              type="button"
              onClick={openInquiry}
              className="mt-2 block font-bold text-[var(--civic-blue)] underline hover:text-[var(--ink)]"
            >
              Click here to contact.
            </button>
            
            <div className="absolute -bottom-[9px] right-6 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[var(--ink)]">
               <div className="absolute -left-[7px] -top-[9px] h-0 w-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-[var(--paper-card)]" />
            </div>
          </div>

          <img 
            src="/images/clippy-assistant-pixel.png" 
            alt="Clippy" 
            className="clippy-assistant h-20 w-16 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Index;
