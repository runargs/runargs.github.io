import React, { useEffect } from "react";
import { Mail, Linkedin, MapPin, Globe, Phone } from "lucide-react";

export default function ResumeOnePager() {
  useEffect(() => {
    // Prevent SEO indexing of this unlisted page
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans leading-normal">
      {/* Container forced to standard US Letter width (8.5 inches) 
        Centering it on screen, but removing all styling on print.
      */}
      <div className="max-w-[8.5in] mx-auto p-8 md:p-12 print:p-0 print:max-w-full">
        
        {/* HEADER */}
        <header className="text-center border-b-2 border-black pb-4 mb-4">
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">Alexa Thoennes</h1>
          <p className="text-lg font-bold text-gray-800 mb-2">Product Manager | Enterprise GenAI & Platform Enablement</p>
          
          <div className="flex flex-wrap justify-center gap-x-4 text-[11px] font-medium text-gray-700">
            <span className="flex items-center gap-1"><MapPin size={12} /> Newtown, PA / Remote</span>
            <span className="flex items-center gap-1"><Mail size={12} /> alexa.thoennes@gmail.com</span>
            <span className="flex items-center gap-1"><Phone size={12} /> +1 (267) 397-6790</span>
            <span className="flex items-center gap-1"><Linkedin size={12} /> linkedin.com/in/alexathoennes</span>
            <span className="flex items-center gap-1"><Globe size={12} /> alexathoennes.com</span>
          </div>
        </header>

        {/* KEY IMPACT HIGHLIGHTS - GRID */}
        <section className="mb-6">
          <div className="grid grid-cols-3 gap-4 text-center border border-gray-200 p-3 rounded-sm bg-gray-50/50">
            <div>
              <p className="text-xl font-bold">≈20K</p>
              <p className="text-[10px] uppercase text-gray-600 font-bold leading-tight">Monthly Active Users (MAU) on GenAI Platform</p>
            </div>
            <div className="border-x border-gray-200 px-2">
              <p className="text-xl font-bold">+30%</p>
              <p className="text-[10px] uppercase text-gray-600 font-bold leading-tight">Accuracy & Traceability Gain in RAG Chatbot</p>
            </div>
            <div>
              <p className="text-xl font-bold">+106%</p>
              <p className="text-[10px] uppercase text-gray-600 font-bold leading-tight">Growth in Site Search Engagement</p>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-2 pb-0.5">Professional Summary</h2>
          <p className="text-[12px] leading-relaxed italic text-gray-800">
            Product Manager with a multidisciplinary technical background in Fullstack Engineering and DevRel. Specializing in **Enterprise GenAI orchestration**, multi-agent systems, and RAG architecture. Experienced in leading 0-to-1 MVP developments and scaling platform products for global financial institutions.
          </p>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-3 pb-0.5">Professional Experience</h2>

          {/* Mastercard PM II */}
          <div className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-[13px]">Product Manager II | Insights & Intelligence</h3>
              <span className="text-[11px] font-bold">Jan 2024 — Present</span>
            </div>
            <p className="text-[11px] font-bold text-gray-700 italic mb-1">Mastercard | Remote</p>
            <ul className="list-disc ml-4 text-[11px] space-y-1 text-gray-900">
              <li><strong>GenAI Leadership:</strong> Led the development of Mastercard's first enterprise **GPT-4 / RAG chatbot** using multi-agent architecture from ideation to global launch. Improved data-retrieval accuracy and traceability by 30%.</li>
              <li><strong>Platform Scale:</strong> Directing over 10 product integrations, increasing platform portfolio by 50%+. Serving ≈20K MAUs and enabling multi-million dollar annual revenue across 30+ data and analytics products.</li>
              <li><strong>Search & Discovery:</strong> Orchestrated a search redesign resulting in a **+106% increase in engagement** via enhanced semantic search and vector embeddings.</li>
              <li><strong>Operational Excellence:</strong> Streamlined partner onboarding by 40% (from 6 to 3 weeks) for 15+ integration teams through self-service documentation and automated analytics dashboards.</li>
              <li><strong>Governance:</strong> Implemented prompt sanitization, PII redaction, and bias monitoring to meet global enterprise standards.</li>
            </ul>
          </div>

          {/* Mastercard DevOps */}
          <div className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-[13px]">DevOps Engineer I</h3>
              <span className="text-[11px] font-bold">Jan 2022 — Jan 2024</span>
            </div>
            <p className="text-[11px] font-bold text-gray-700 italic mb-1">Mastercard | New York, NY</p>
            <ul className="list-disc ml-4 text-[11px] space-y-1 text-gray-900">
              <li>Optimized automation pipelines for **100+ applications**, reducing deployment time by ~50%.</li>
              <li>Standardized documentation and aligned requirements across global teams, reducing alignment time by 42%.</li>
            </ul>
          </div>

          {/* Earlier Experience */}
          <div className="mb-4">
            <h4 className="text-[11px] font-bold border-b border-gray-100 mb-2">Previous Experience</h4>
            <div className="grid grid-cols-1 gap-1 text-[11px]">
              <p><strong>Visa:</strong> Software Engineer (2021) — Built multilingual React SPA deployed across 1,600+ partner sites.</p>
              <p><strong>Google:</strong> DevRel Engineer Intern (2020) — Contributed to open-source Python automation (Synthtool) and UX research.</p>
              <p><strong>Nexus Valley Solutions:</strong> Product (2018-2019) — Educational technology startup involving robotics curriculum.</p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-2 pb-0.5">Technical Skills & Competencies</h2>
          <div className="grid grid-cols-3 gap-4 text-[10px] leading-tight">
            <div>
              <p className="font-bold uppercase text-gray-600 mb-1">Product</p>
              <p>GTM Strategy, User Analytics, MVP Development, Roadmap Planning, OKRs/KPIs, Market Research, Agile, Stakeholder Management.</p>
            </div>
            <div>
              <p className="font-bold uppercase text-gray-600 mb-1">Technical</p>
              <p>GenAI, Multi-Agent Systems, RAG, Vector Databases, Python, SQL, React, APIs, CI/CD, LLM Benchmarking, Prompt Engineering.</p>
            </div>
            <div>
              <p className="font-bold uppercase text-gray-600 mb-1">Tools</p>
              <p>Azure AI, OpenAI, Jira, Git, Mixpanel, Figma, Qualtrics, Salesforce, Elasticsearch, Jinja, Google Cloud Platform.</p>
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-2 pb-0.5">Education</h2>
            <div className="text-[11px]">
              <p className="font-bold text-[12px]">University of Scranton</p>
              <p>B.S. Computer Information Systems</p>
              <p className="italic">Business Analytics Focus | Magna Cum Laude</p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-2 pb-0.5">Executive Education</h2>
            <ul className="text-[11px] space-y-0.5">
              <li><strong>Wharton Executive Education:</strong> Machine Learning for Business</li>
              <li><strong>Wharton Executive Education:</strong> Influencing with Diplomacy</li>
              <li><strong>Jeff Gothelf:</strong> Lean Product Management</li>
              <li><strong>Mastercard:</strong> Product Management E2E Certification</li>
            </ul>
          </section>
        </div>

        {/* ADDITIONAL */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black mb-2 pb-0.5">Speaking & Advisory</h2>
          <div className="text-[10px] flex justify-between">
            <p><strong>INFORMS (2021):</strong> "AI Product Prototype" Speaker</p>
            <p><strong>BCCC (2024):</strong> "Early Career Roadmapping" Speaker</p>
            <p><strong>Open Source:</strong> #3 Contributor, Notion Enhancer</p>
          </div>
        </section>

      </div>

      {/* Print-only styles to ensure it matches the 8.5x11 format exactly 
        removes headers, footers, and forces white background.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact;
          }
          .min-h-screen { padding: 0 !important; }
        }
      `}} />
    </div>
  );
}
