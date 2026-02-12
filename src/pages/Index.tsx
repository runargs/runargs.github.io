import { useState, useEffect } from "react";
import { PortfolioSidebar } from "@/components/layout/PortfolioSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { BioSection } from "@/components/sections/BioSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AccomplishmentsSection } from "@/components/sections/AccomplishmentsSection";
import { MentorshipSection } from "@/components/sections/MentorshipSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { TalksSection } from "@/components/sections/TalksSection";
import { SideProjectsSection } from "@/components/sections/SideProjectsSection";
import { ArtSection } from "@/components/sections/ArtSection";
import { ResumeSection } from "@/components/sections/ResumeSection";

const sectionIds = [
  "bio",
  "work",
  "accomplishments",
  "mentorship",
  "community-building",
  "talks",
  "side-projects",
  "art",
  "resume",
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("bio");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showClippy, setShowClippy] = useState(true); // State for dismissal

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
    <div className="min-h-screen flex w-full relative">
      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 shrink-0 sticky top-0 h-screen">
        <PortfolioSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Mobile navigation */}
      <MobileNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sidebarOpen={sidebarOpen}
        onSidebarOpenChange={setSidebarOpen}
      />

      {/* Main content */}
      <main className="flex-1 pt-14 pb-20 md:pt-0 md:pb-0">
        <BioSection />
        <WorkSection />
        <AccomplishmentsSection />
        <TalksSection />
        <CommunitySection />
        <MentorshipSection />
        <ArtSection />
        <SideProjectsSection />
        <ResumeSection />

        {/* Footer */}
        <footer className="py-12 px-6 text-center border-t border-border">
          <div className="mb-4">
            <span className="font-flourish text-3xl text-primary/40">❧</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Crafted by Alexa, built with Generative AI assistance
            <br /> 
            <small><em>(Lovable, Github Copilot, Gemini, Claude, GPT-5)</em></small>
            <br />
            © 2026
          </p>
        </footer>
      </main>

      {/* Clippy Widget */}
      {showClippy && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
          {/* Tooltip Wrapper */}
          <div className="pointer-events-auto mb-2 relative bg-[#ffffcc] border border-black p-3 shadow-[2px_2px_0px_rgba(0,0,0,1)] max-w-[180px] text-[11px] font-sans text-black leading-tight">
            {/* Retro Close Button */}
            <button 
              onClick={() => setShowClippy(false)}
              className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-[#c0c0c0] border-t-white border-l-white border-b-gray-700 border-r-gray-700 border text-[10px] hover:bg-[#d0d0d0] active:border-t-gray-700 active:border-l-gray-700 active:border-b-white active:border-r-white"
            >
              ✕
            </button>

            <p className="pr-2">
              It looks like you're exploring this portfolio. Would you like to get in touch?
            </p>
            <a 
              href="mailto:alexa.thoennes@gmail.com" 
              className="block mt-2 font-bold underline text-blue-800 hover:text-blue-600"
            >
              Click here to contact.
            </a>
            
            {/* Speech Bubble Tail */}
            <div className="absolute -bottom-[9px] right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black">
               <div className="absolute -top-[9px] -left-[7px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-[#ffffcc]" />
            </div>
          </div>

          {/* Clippy GIF */}
          <img 
            src="/images/clippy.gif" 
            alt="Clippy" 
            className="w-16 h-16 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Index;
