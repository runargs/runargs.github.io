import React, { useEffect } from "react";

export default function ResumeOnePager() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black leading-normal" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="max-w-[8.5in] mx-auto p-6 md:p-10 print:p-0 print:max-w-full">

        <header className="text-center border-b-2 border-black pb-2 mb-3">
          <h1 className="text-3xl font-bold mb-0.5">Alexa Thoennes</h1>
          <p className="text-md font-bold text-gray-800 mb-1">Product Manager | GenAI & 0-to-1 Prototyping</p>
          <p className="text-[10px] font-medium text-gray-700">
            Open to Relocation &nbsp;|&nbsp; alexa.thoennes@gmail.com &nbsp;|&nbsp; (267) 397-6790 &nbsp;|&nbsp; linkedin.com/in/alexathoennes &nbsp;|&nbsp; runargs.github.io
          </p>
        </header>

        <section className="mb-3">
          <div className="grid grid-cols-3 gap-2 text-center border border-gray-200 p-2 rounded-sm bg-gray-50/50">
            <div>
              <p className="text-lg font-bold">~20K</p>
              <p className="text-[9px] text-gray-600 font-bold leading-tight">Monthly Active Users on Market Intelligence Platform</p>
            </div>
            <div className="border-x border-gray-200 px-1">
              <p className="text-lg font-bold">+30%</p>
              <p className="text-[9px] text-gray-600 font-bold leading-tight">Accuracy & Traceability Gain with RAG Chatbot</p>
            </div>
            <div>
              <p className="text-lg font-bold">+106%</p>
              <p className="text-[9px] text-gray-600 font-bold leading-tight">Growth in Site Search Engagement</p>
            </div>
          </div>
        </section>

        <section className="mb-3">
          <h2 className="text-[11px] font-bold border-b border-black mb-1 pb-0.5">Summary</h2>
          <p className="text-[11px] leading-snug italic text-gray-800">
            Product Manager with a full-stack and Developer Relations background, leading 0-to-1 enterprise GenAI products and features. Launched a net-new GPT-4.1 chatbot with 80+ enterprise organizations requesting early access pre-GA. Experienced with multi-agent systems, RAG architecture, and LLM governance in production, including hallucination mitigation via RAG.
          </p>
        </section>

        <section className="mb-3">
          <h2 className="text-[11px] font-bold border-b border-black mb-1.5 pb-0.5">Experience</h2>

          <div className="mb-2.5">
            <div className="flex justify-between items-baseline mb-0">
              <h3 className="font-bold text-[12px]">Global Product Manager II</h3>
              <span className="text-[10px] font-bold">Jan 2024 - Present</span>
            </div>
            <div className="flex justify-between text-[10px] italic text-gray-700 mb-0.5 font-semibold">
              <span>Mastercard Insights & Intelligence</span>
              <span>Newtown, PA, United States (Remote)</span>
            </div>
            <ul className="list-disc ml-4 text-[10px] space-y-0 text-gray-900 leading-tight">
              <li><strong>GenAI Innovation:</strong> Led development of Mastercard's first enterprise <strong>GPT-4.1 / RAG chatbot</strong> using multi-agent architecture; improved accuracy/traceability by <strong>30%</strong> and established evaluation pipelines for LLM benchmarking and human-in-the-loop testing.</li>
              <li><strong>Portfolio Growth:</strong> Integrated 10+ products (<strong>50%+ portfolio increase</strong>) on a market intelligence platform serving <strong>20K MAU</strong> and enabling multi-million dollar annual revenue.</li>
              <li><strong>Search Transformation:</strong> Orchestrated search redesign resulting in <strong>+106% search engagement</strong> and increasing Monthly NPS to <strong>79 (+18pp MoM)</strong> via enhanced vector embeddings.</li>
              <li><strong>Operational Scale:</strong> Authored 130-page technical governance guide; streamlined partner onboarding by <strong>40% (6 to 3 weeks)</strong> for 15+ global teams via self-service documentation.</li>
              <li><strong>Execution:</strong> Exceeded activation targets by <strong>14%</strong>, driving a <strong>230% YoY increase</strong> in user opt-ins. Collaborate across global hubs (Dublin, London, Singapore) to align OKRs.</li>
            </ul>
          </div>

          <div className="mb-2.5">
            <div className="flex justify-between items-baseline mb-0">
              <h3 className="font-bold text-[12px]">Automation Engineer I (BizOps/DevOps)</h3>
              <span className="text-[10px] font-bold">Jan 2022 - Jan 2024</span>
            </div>
            <div className="flex justify-between text-[10px] italic text-gray-700 mb-0.5 font-semibold">
              <span>Mastercard</span>
              <span>New York, NY, United States</span>
            </div>
            <ul className="list-disc ml-4 text-[10px] space-y-0 leading-tight">
              <li>Optimized automation pipelines for 100+ applications, reducing deployment time by <strong>~50%</strong>.</li>
              <li>Standardized documentation and aligned requirements across global teams, reducing alignment time by <strong>42%</strong>.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold border-b border-gray-200 mb-1 text-gray-500">Previous Experience</h4>
            <div className="text-[10px] space-y-0.5 leading-tight">
              <p><strong>Software Engineer Intern</strong>, Visa, Austin, TX. <span className="ats-only">May 2021 - Aug 2021.</span> Built multilingual React SPA deployed across 1,600+ partner sites.</p>
              <p><strong>Developer Relations Engineer Intern</strong>, Google, New York, NY. <span className="ats-only">Jun 2020 - Aug 2020.</span> Contributed to open-source Python automation (Synthtool) and UX research.</p>
              <p><strong>Product Manager</strong>, Nexus Valley Solutions, United States. <span className="ats-only">Oct 2018 - Mar 2019.</span> EdTech startup; robotics curriculum. tecBridge Strategic Business Plan Award 2018.</p>
            </div>
          </div>
        </section>

        <section className="mb-3">
          <h2 className="text-[11px] font-bold border-b border-black mb-1 pb-0.5">Technical Skills & Competencies</h2>
          <div className="grid grid-cols-3 gap-3 text-[9px] leading-tight">
            <div>
              <p className="font-bold text-gray-600 mb-0.5">Product</p>
              <p>GTM Strategy, User Analytics, MVP Development, Roadmap Planning, OKRs/KPIs, Market Research, Agile, Stakeholder Management.</p>
            </div>
            <div>
              <p className="font-bold text-gray-600 mb-0.5">Technical</p>
              <p>GenAI, RAG, Python, SQL, React, CI/CD, LLM Benchmarking, Prompt Engineering, Semantic Search (Vector Embeddings), Vibe Coding, Multi-Agent Systems.</p>
            </div>
            <div>
              <p className="font-bold text-gray-600 mb-0.5">Tools</p>
              <p>Azure AI, OpenAI, Gemini, Claude, Lovable, Jira, Git, Mixpanel, Figma (Incl. Make), Qualtrics, Salesforce, Elasticsearch, Jinja, Google Cloud Platform.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-6 mb-3">
          <section>
            <h2 className="text-[11px] font-bold border-b border-black mb-1 pb-0.5">Education</h2>
            <div className="text-[10px]">
              <p className="font-bold">University of Scranton</p>
              <p>B.S. Applied Computing (Business Analytics)</p>
              <p className="italic font-semibold text-gray-700">Magna Cum Laude</p>
            </div>
          </section>
          <section>
            <h2 className="text-[11px] font-bold border-b border-black mb-1 pb-0.5">Executive Education</h2>
            <ul className="text-[10px] space-y-0">
              <li>(WIP) <strong>ETH Zürich ETHx:</strong> Beyond Systems Thinking</li>
              <li><strong>UVA Darden:</strong> Compelling Data Stories</li>
              <li><strong>Wharton:</strong> Influencing with Diplomacy</li>
              <li><strong>Jeff Gothelf:</strong> Lean Product Management</li>
            </ul>
          </section>
        </div>

        <section>
          <h2 className="text-[11px] font-bold border-b border-black mb-1 pb-0.5">Appearances</h2>
          <div className="text-[9px] font-medium flex justify-between">
            <p><strong>21CCCS (2026):</strong> Mastery Learning Outcomes</p>
            <p><strong>BCCC (2024):</strong> Early Career Roadmapping</p>
            <p><strong>INFORMS (2021):</strong> Forecasting Product Matches (AI/ML)</p>
          </div>
        </section>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: letter;
            margin: 0.25in;
          }
          body {
            -webkit-print-color-adjust: exact;
            font-synthesis: none !important;
            text-rendering: optimizeLegibility !important;
          }
          .min-h-screen { padding: 0 !important; }
          .ats-only { font-size: 0 !important; line-height: 0 !important; display: inline !important; }
          * {
            letter-spacing: normal !important;
            line-height: 1.4 !important;
            text-shadow: none !important;
            -webkit-font-smoothing: antialiased !important;
            font-family: Arial, Helvetica, sans-serif !important;
            print-color-adjust: exact;
          }
        }
      `}} />
    </div>
  );
}
