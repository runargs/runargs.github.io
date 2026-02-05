import React, { useEffect } from "react";
import { Mail, Linkedin, MapPin, Globe } from "lucide-react";

export default function ResumeOnePager() {
  useEffect(() => {
    // Hidden from search engines
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-0 sm:p-8 font-sans">
      {/* Print-specific wrapper: 
        Standard Letter Size (8.5 x 11) focus for ATS & Print 
      */}
      <div className="max-w-[8.5in] mx-auto p-[0.5in] bg-white print:p-0 print:w-full">
        
        {/* HEADER */}
        <header className="border-b-2 border-black pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-tight">Alexa Thoennes</h1>
          <p className="text-lg font-semibold text-gray-700">Technical Product Manager — AI & Agentic Systems</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1"><Mail size={14} /> alexa.thoennes@gmail.com</span>
            <span className="flex items-center gap-1"><Linkedin size={14} /> linkedin.com/in/alexathoennes</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> New York / Remote</span>
            <span className="flex items-center gap-1"><Globe size={14} /> alexathoennes.com</span>
          </div>
        </header>

        {/* SUMMARY */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 text-gray-800">Professional Summary</h2>
          <p className="text-sm leading-relaxed">
            Technical Product Manager with 4+ years of experience in **Agentic System Design**, RAG architecture, and automation orchestration. 
            Proven track record of scaling AI-native tools at enterprise scale (Mastercard) and contributing to open-source ecosystems. 
            Expertise in bridging engineering execution with product vision to deliver 30-40% gains in operational efficiency and data accuracy.
          </p>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-3 text-gray-800">Professional Experience</h2>

          {/* Mastercard PM */}
          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">Product Manager, Insights & Intelligence</h3>
              <span className="text-sm">2024 — Present</span>
            </div>
            <div className="flex justify-between italic text-sm text-gray-700 mb-1">
              <span>Mastercard</span>
              <span>Remote</span>
            </div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Directing product strategy for **multi-agent RAG chatbots** and AI-native CMS workflows to transform global market intelligence.</li>
              <li>Improved data-retrieval accuracy and traceability by **30%** via privacy-respecting Retrieval-Augmented Generation (RAG).</li>
              <li>Streamlined internal onboarding by **40%** through standardized technical documentation and RACI frameworks.</li>
              <li>Managing global stakeholder alignment and OKRs for product launches across diverse regional requirements.</li>
            </ul>
          </div>

          {/* Mastercard Automation */}
          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">Automation Engineer</h3>
              <span className="text-sm">2022 — 2024</span>
            </div>
            <div className="flex justify-between italic text-sm text-gray-700 mb-1">
              <span>Mastercard</span>
              <span>St. Louis, MO</span>
            </div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Automated CI/CD pipelines for **100+ core enterprise applications**, reducing deployment latency by approximately 50%.</li>
              <li>Orchestrated technical workflows to ensure high availability and scalability for financial intelligence systems.</li>
            </ul>
          </div>

          {/* Google */}
          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">Developer Relations Engineer (Intern)</h3>
              <span className="text-sm">2020</span>
            </div>
            <div className="flex justify-between italic text-sm text-gray-700 mb-1">
              <span>Google (Cloud Platform)</span>
              <span>Remote</span>
            </div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Owned the full development cycle of a documentation feature from initial research through open-source release.</li>
              <li>Automated library documentation updates for hundreds of APIs via the GAPIC Generator, ensuring real-time accuracy for developers.</li>
            </ul>
          </div>
        </section>

        {/* SKILLS */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 text-gray-800">Core Competencies</h2>
          <div className="grid grid-cols-2 gap-x-8 text-sm">
            <div>
              <p><strong>Product:</strong> RAG Architecture, Multi-Agent Systems, GTM Strategy, Agile, OKRs, Roadmap Planning</p>
            </div>
            <div>
              <p><strong>Technical:</strong> AI Orchestration, CI/CD, Semantic Search, Vector Embeddings, System Design</p>
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 text-gray-800">Education</h2>
            <div className="text-sm">
              <p className="font-bold">B.S. Applied Computing</p>
              <p>University of Scranton — Business Analytics</p>
              <p className="italic text-gray-600 italic">Magna Cum Laude</p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 text-gray-800">Certifications</h2>
            <ul className="text-sm space-y-0.5">
              <li>**Wharton:** ML for Business; Influencing with Diplomacy</li>
              <li>**Jeff Gothelf:** Lean Product Management</li>
              <li>**Mastercard:** Product Management E2E</li>
            </ul>
          </section>
        </div>

        {/* NOTABLE HIGHLIGHTS */}
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2 text-gray-800">Selected Technical Contributions</h2>
          <div className="text-sm space-y-1">
            <p><strong>INFORMS Conference (2021):</strong> Presented "Amazon Reviews to Forecast Product Match" — applied AI/ML to market analysis.</p>
            <p><strong>Open Source (2020):</strong> Core Contributor (Rank #3) to **Notion Enhancer**, specializing in developer advocacy and customization.</p>
          </div>
        </section>

      </div>

      {/* CSS to force print quality */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          .min-h-screen { padding: 0 !important; margin: 0 !important; }
          header { border-bottom-color: black !important; }
          @page { margin: 0.5in; }
        }
      `}} />
    </div>
  );
}
