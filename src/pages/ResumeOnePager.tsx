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
      {/* Container forced to standard US Letter width (8.5 inches) */}
      <div className="max-w-[8.5in] mx-auto p-6 md:p-10 print:p-0 print:max-w-full">
        
        {/* HEADER - Compressed padding */}
        <header className="text-center border-b-2 border-black pb-2 mb-3">
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-0.5">Alexa Thoennes</h1>
          <p className="text-md font-bold text-gray-800 mb-1.5">Product Manager | Enterprise GenAI & Platform Enablement</p>
          
          <div className="flex flex-wrap justify-center gap-x-4 text-[10px] font-medium text-gray-700">
            <span className="flex items-center gap-1"><MapPin size={10} /> Open to Relocation </span>
            <span className="flex items-center gap-1"><Mail size={10} /> alexa.thoennes@gmail.com</span>
            <span className="flex items-center gap-1"><Phone size={10} /> +1 (267) 397-6790</span>
            <span className="flex items-center gap-1"><Linkedin size={10} /> linkedin.com/in/alexathoennes</span>
            <span className="flex items-center gap-1"><Globe size={10} /> alexathoennes.com</span>
          </div>
        </header>

        {/* KEY IMPACT HIGHLIGHTS - Grid padding reduced */}
        <section className="mb-4">
          <div className="grid grid-cols-3 gap-2 text-center border border-gray-200 p-2 rounded-sm bg-gray-50/50">
            <div>
              <p className="text-lg font-bold">≈20K</p>
              <p className="text-[9px] uppercase text-gray-600 font-bold leading-tight text-balance">Monthly Active Users on GenAI Platform</p>
            </div>
            <div className="border-x border-gray-200 px-1">
              <p className="text-lg font-bold">+30%</p>
              <p className="text-[9px] uppercase text-gray-600 font-bold leading-tight text-balance">Accuracy & Traceability Gain in RAG Chatbot</p>
            </div>
            <div>
              <p className="text-lg font-bold">+106%</p>
              <p className="text-[9px] uppercase text-gray-600 font-bold leading-tight text-balance">Growth in Site Search Engagement</p>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-1.5 pb-0.5">Professional Summary</h2>
          <p className="text-[11px] leading-snug italic text-gray-800">
            AI Product Manager with a multidisciplinary technical background in Fullstack Engineering and Developer Relations. Specializing in Enterprise GenAI orchestration, multi-agent systems, and RAG architecture. Experienced in leading early-phase AI initiatives to external launch, implementing intelligence layers into product in tandem with platform scaling.
          </p>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-2 pb-0.5">Professional Experience</h2>

          {/* Mastercard PM II */}
          <div className="mb-3.5">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="font-bold text-[12px]">Product Manager II | Insights & Intelligence</h3>
              <span className="text-[10px] font-bold">Jan 2024 — Present</span>
            </div>
            <div className="flex justify-between text-[10px] italic text-gray-700 mb-0.5 font-semibold">
              <span>Mastercard</span>
              <span>Remote / Global</span>
            </div>
            <ul className="list-disc ml-4 text-[10px] space-y-0.5 text-gray-900 leading-tight">
              <li><strong>GenAI Innovation:</strong> Led development of Mastercard's first enterprise <strong>GPT-4.1 / RAG chatbot</strong> using multi-agent architecture; improved accuracy/traceability by <strong>30%</strong> and established evaluation pipelines for LLM benchmarking and human-in-the-loop testing.</li>
              <li><strong>Portfolio Growth:</strong> Integrated 10+ products (<strong>50%+ portfolio increase</strong>) on a market intelligence platform serving <strong>20K MAU</strong> and enabling multi-million dollar annual revenue.</li>
              <li><strong>Search Transformation:</strong> Orchestrated search redesign resulting in <strong>+106% search engagement</strong> and increasing Monthly NPS to <strong>79 (+18pp MoM)</strong> via enhanced vector embeddings.</li>
              <li><strong>Operational Scale:</strong> Authored 130-page technical governance guide; streamlined partner onboarding by <strong>40% (6 to 3 weeks)</strong> for 15+ global teams via self-service documentation.</li>
              <li><strong>Execution:</strong> Exceeded activation targets by <strong>14%</strong>, driving a <strong>230% YoY increase</strong> in user opt-ins. Collaborate across global hubs (Dublin, London, Singapore) to align OKRs.</li>
            </ul>
          </div>

          {/* Mastercard DevOps */}
          <div className="mb-3">
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="font-bold text-[12px]">DevOps Engineer I</h3>
              <span className="text-[10px] font-bold">Jan 2022 — Jan 2024</span>
            </div>
            <p className="text-[10px] font-bold text-gray-700 italic mb-0.5">Mastercard | New York, NY</p>
            <ul className="list-disc ml-4 text-[10px] space-y-0.5 leading-tight">
              <li>Optimized automation pipelines for 100+ applications, reducing deployment time by <strong>~50%</strong>.</li>
              <li>Standardized documentation and aligned requirements across global teams, reducing alignment time by <strong>42%</strong>.</li>
            </ul>
          </div>

          {/* Earlier Experience */}
          <div className="mb-2">
            <h4 className="text-[10px] font-bold border-b border-gray-100 mb-1 uppercase text-gray-500">Previous Experience</h4>
            <div className="grid grid-cols-1 gap-0.5 text-[10px]">
              <p><strong>Visa:</strong> Software Engineer (2021) — Built multilingual React SPA deployed across 1,600+ partner sites.</p>
              <p><strong>Google:</strong> DevRel Engineer Intern (2020) — Contributed to open-source Python automation (Synthtool) and UX research.</p>
              <p><strong>Nexus Valley Solutions:</strong> Product (2018-2019) — EdTech startup involving robotics curriculum.</p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-1.5 pb-0.5">Technical Skills & Competencies</h2>
          <div className="grid grid-cols-3 gap-3 text-[9px] leading-tight">
            <div>
              <p className="font-bold uppercase text-gray-600 mb-0.5">Product</p>
              <p>GTM Strategy, User Analytics, MVP Development, Roadmap Planning, OKRs/KPIs, Market Research, Agile, Stakeholder Management.</p>
            </div>
            <div>
              <p className="font-bold uppercase text-gray-600 mb-0.5">Technical</p>
              <p>GenAI, Multi-Agent Systems, RAG, Vector Databases, Python, SQL, React, APIs, CI/CD, LLM Benchmarking, Prompt Engineering.</p>
            </div>
            <div>
              <p className="font-bold uppercase text-gray-600 mb-0.5">Tools</p>
              <p>Azure AI, OpenAI, Jira, Git, Mixpanel, Figma, Qualtrics, Salesforce, Elasticsearch, Jinja, Google Cloud Platform.</p>
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-1.5 pb-0.5">Education</h2>
            <div className="text-[10px]">
              <p className="font-bold">University of Scranton</p>
              <p>B.S. Applied Computing (Business Analytics focus)</p>
              <p className="italic font-semibold text-gray-700">Magna Cum Laude</p>
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-1.5 pb-0.5">Executive Education</h2>
            <ul className="text-[10px] space-y-0.5">
              <li><strong>Wharton Executive Education:</strong> Machine Learning for Business</li>
              <li><strong>Wharton Executive Education:</strong> Influencing with Diplomacy</li>
              <li><strong>Jeff Gothelf:</strong> Lean Product Management</li>
            </ul>
          </section>
        </div>

        {/* ADDITIONAL */}
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-widest border-b border-black mb-1.5 pb-0.5">Guest Speaking</h2>
          <div className="text-[9px] flex justify-between font-medium">
            <p><strong>21CCCS (2026):</strong> Mastery Learning Outcomes</p>
            <p><strong>BCCC (2024):</strong> Early Career Roadmapping</p>
            <p><strong>INFORMS (2021):</strong> Forecasting Product Match</p>
          </div>
        </section>

      </div>

      {/* Print-only styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: letter;
            margin: 0.25in;
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
