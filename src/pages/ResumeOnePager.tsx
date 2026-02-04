import React from "react";
import { 
  Mail, 
  Linkedin, 
  Globe, 
  Download, 
  Zap, 
  Star, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen,
  Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResumeOnePager() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12 print:p-0 print:bg-white">
      {/* Container to constrain width for a "paper" feel */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-primary/10 pb-8">
          <h1 className="font-flourish text-5xl md:text-7xl text-gold-gradient">
            Alexa Thoennes
          </h1>
          <p className="font-serif text-xl md:text-2xl text-primary italic">
            AI-Enabled Product · Artist · Empiricist
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <a href="mailto:alexa.thoennes@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="h-3.5 w-3.5" /> alexa.thoennes@gmail.com
            </a>
            <a href="https://linkedin.com/in/alexathoennes" target="_blank" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/alexathoennes
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> New York / Remote
            </span>
          </div>
        </header>

        {/* EXECUTIVE SUMMARY */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1 flex justify-center">
             <img
                src="/images/profile.JPG"
                alt="Profile"
                className="w-32 h-32 rounded-xl object-cover border-2 border-primary/20"
              />
          </div>
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-serif text-2xl italic text-foreground">Executive Summary</h2>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <li className="flex gap-2">
                <span className="text-primary text-[10px] mt-1">✦</span>
                <span>4+ years bridging execution, orchestration and product vision to build and ship technical products.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary text-[10px] mt-1">✦</span>
                <span>Leveraging an engineering background and low-code ecosystems to prototype and validate unconventional solutions.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary text-[10px] mt-1">✦</span>
                <span>Domain expertise in agentic system design, specializing in multi-agent research tools and AI assistants.</span>
              </li>
            </ul>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: EXPERIENCE */}
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-primary/10 pb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-2xl italic">Professional Journey</h2>
              </div>

              {/* Mastercard PM */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl">Product Manager</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Mastercard Insights & Intelligence</p>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">2024 - Present</span>
                </div>
                <p className="text-xs italic text-foreground/80">Driving strategy for multi-agent RAG chatbots and AI-native CMS workflows.</p>
                <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                  <li className="flex gap-2"><span>✦</span> <span>Launched AI-assisted research tools using vector embeddings.</span></li>
                  <li className="flex gap-2"><span>✦</span> <span>Improved data-retrieval accuracy and traceability by 30% via privacy-respecting RAG.</span></li>
                  <li className="flex gap-2"><span>✦</span> <span>Streamlined onboarding by 40% through standardized documentation and RACI.</span></li>
                </ul>
              </div>

              {/* Mastercard Automation */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl">Automation Engineer</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Mastercard</p>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">2022 - 2024</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                  <li className="flex gap-2"><span>✦</span> <span>Automated CI/CD pipelines for 100+ core enterprise applications.</span></li>
                  <li className="flex gap-2"><span>✦</span> <span>Reduced deployment time by ~50% via optimized automation pipelines.</span></li>
                </ul>
              </div>

              {/* Google */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl">DevRel Engineer (Intern)</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Google (GCP)</p>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">2020</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                  <li className="flex gap-2"><span>✦</span> <span>Owned full dev-cycle of a documentation feature from research through open-source release.</span></li>
                  <li className="flex gap-2"><span>✦</span> <span>Automated library documentation updates for hundreds of APIs via GAPIC Generator.</span></li>
                </ul>
              </div>

              {/* Nexus Valley */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl">Assoc. Tech Product Manager</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Nexus Valley Solutions</p>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">2018 - 2019</span>
                </div>
                <p className="text-[11px] text-muted-foreground italic">
                  Designed award-winning STEAM curriculum, translating classroom needs into product strategy.
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: EDUCATION, SKILLS, TALKS */}
          <div className="space-y-8">
            
            {/* EDUCATION */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-primary/10 pb-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2 className="font-serif text-xl italic">Education</h2>
              </div>
              <div>
                <p className="text-xs font-bold">B.S. Applied Computing</p>
                <p className="text-[10px] text-primary uppercase tracking-wider">Business Analytics • Magna Cum Laude</p>
                <p className="text-[9px] text-muted-foreground mt-1 italic">University of Scranton</p>
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b border-primary/10 pb-2">
                <Award className="h-4 w-4 text-primary" />
                <h2 className="font-serif text-lg italic">Credentials</h2>
              </div>
              <div className="space-y-2">
                {[
                  { t: "Influencing with Diplomacy", o: "Wharton" },
                  { t: "ML for Business", o: "Wharton" },
                  { t: "Lean Product Management", o: "Jeff Gothelf" },
                  { t: "Product Management E2E", o: "Mastercard" }
                ].map((c, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold leading-tight">{c.t}</p>
                    <p className="text-[9px] text-muted-foreground uppercase">{c.o}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CORE SKILLS */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b border-primary/10 pb-2">
                <Star className="h-4 w-4 text-primary" />
                <h2 className="font-serif text-lg italic">Expertise</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Product Strategy", "RAG Architecture", "Multi-Agent Systems", 
                  "Semantic Search", "GTM Strategy", "User Research", 
                  "Stakeholder Management", "Agile", "Automation"
                ].map((skill) => (
                  <Badge key={skill} variant="outline" className="text-[9px] border-primary/20 text-primary px-2 py-0">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            {/* NOTABLE TALKS/COMMUNITY */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b border-primary/10 pb-2">
                <Users className="h-4 w-4 text-primary" />
                <h2 className="font-serif text-lg italic">Highlights</h2>
              </div>
              <div className="space-y-3 text-[10px] text-muted-foreground">
                <div>
                  <p className="font-bold text-foreground italic">Amazon Reviews to Forecast Product Match</p>
                  <p>INFORMS (AI/ML/LLMs) — 2021</p>
                </div>
                <div>
                  <p className="font-bold text-foreground italic">Notion Enhancer</p>
                  <p>#3 Core Contributor — 2020</p>
                </div>
                <div>
                  <p className="font-bold text-foreground italic">Culinary Advisory Board</p>
                  <p>I Know a Place Agency — 2024</p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* FOOTER FLOURISH */}
        <footer className="pt-8 border-t border-primary/10 text-center">
          <span className="font-flourish text-2xl text-primary/30">❧ ✦ ❧</span>
          <p className="text-[9px] text-muted-foreground mt-2 uppercase tracking-[0.3em]">
            Generated via Portfolio Orchestration v2026
          </p>
        </footer>
      </div>
    </div>
  );
}