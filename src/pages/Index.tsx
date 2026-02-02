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
    <div className="min-h-screen flex w-full">
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
            <br><small><em>(Lovable, Github Copilot, Gemini, Claude, GPT-5)</em></small>
            <br>© 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
