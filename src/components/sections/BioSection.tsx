export function BioSection() {
  const paths = [
    { label: "Product work", id: "work", note: "AI research assistants, search, automation, and product delivery" },
    { label: "Notes & projects", id: "side-projects", note: "AI evaluation, memory systems, decision tools, and experiments" },
    { label: "Food & gathering", id: "art", note: "Culinary work, ceramics, hosting, and sensory detail" },
    { label: "Résumé & contact", id: "resume", note: "PDF, credentials, and ways to reach me" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="bio"
      className="min-h-screen flex flex-col justify-center py-10 px-6 md:px-12 fade-in"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center max-w-6xl mx-auto w-full">
        <div className="order-2 lg:order-1">
          <img
            src="/images/profile.JPG"
            alt="Alexa Thoennes"
            className="w-full h-auto rounded-2xl object-cover border border-border/50 shadow-warm"
          />
        </div>

        <div className="order-1 lg:order-2 text-center lg:text-left">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold mb-5">
            Product manager working on AI research tools
          </p>

          <h1 className="font-flourish text-6xl md:text-8xl lg:text-9xl text-gold-gradient mb-4 leading-none">
            Alexa Thoennes
          </h1>

          <h2 className="font-serif text-3xl md:text-5xl text-foreground tracking-tight italic max-w-3xl mx-auto lg:mx-0">
            I build AI products for research, synthesis, and better decision-making.
          </h2>

          <div className="mt-7 space-y-4 max-w-2xl mx-auto lg:mx-0">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
              I’m a product manager interested in tools that help people turn complex information into judgment: what to trust, what to remember, and what to do next.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              My work spans AI research assistants, product strategy, evaluation, behavior change, and adoption. I’m drawn to products where good intentions are not enough, because trust, quality, distribution, and execution determine whether the work matters.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
            <button type="button" onClick={() => scrollToSection("resume")} className="px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              View résumé
            </button>
            <button type="button" onClick={() => scrollToSection("work")} className="px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
              See selected work
            </button>
            <button type="button" onClick={() => scrollToSection("side-projects")} className="px-5 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
              See notes & projects
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full mt-14 pt-8 border-t border-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {paths.map((path) => (
            <button
              key={path.label}
              type="button"
              onClick={() => scrollToSection(path.id)}
              className="group rounded-2xl border border-border/50 bg-card/30 p-4 text-left hover:border-primary/30 hover:bg-card/60 transition-all"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">
                {path.label}
              </p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {path.note}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mt-14">
        <div className="inline-flex items-center gap-4">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
          <span className="font-flourish text-2xl text-primary/40">✦</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </section>
  );
}
