import { DossierButton, ImageFrame, StampBadge } from "@/components/design-system/Dossier";

export function BioSection() {
  const paths = [
    { label: "Product work", id: "work", note: "AI research assistants, search, automation, and product delivery" },
    { label: "Notes & projects", id: "side-projects", note: "AI evaluation, memory systems, decision tools, and experiments" },
    { label: "Food & gathering", id: "art", note: "Culinary work, ceramics, hosting, and sensory detail" },
    { label: "Résumé & contact", id: "resume", note: "PDF, credentials, and ways to reach me" },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="bio"
      className="relative overflow-hidden border-b border-[var(--rule)] bg-[var(--paper-card)] px-6 pb-10 pt-16 md:px-11 md:pb-12 md:pt-20"
    >
      <div className="mb-10 grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
        <div className="font-display text-[2.6rem] leading-none text-[var(--civic-blue)] md:text-[3.5rem]">
          Alexa Thoennes
        </div>
        <div className="border-l border-[var(--rule)] pl-5">
          <StampBadge tone="blue">Human-first responsible technology</StampBadge>
          <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
            AI product for research, synthesis, responsible decision-making, and the human systems around technical work.
          </p>
        </div>
      </div>

      <div className="grid gap-9 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
        <ImageFrame
          src="/images/profile.JPG"
          alt="Alexa Thoennes speaking to a seated audience"
          caption="Speaking engagement / product judgment in a room"
          className="order-2 lg:order-1"
          mediaClassName="aspect-video"
          imgClassName="object-[50%_52%]"
          grayscale={false}
        />

        <div className="order-1 lg:order-2">
          <h1 className="max-w-3xl text-[2.35rem] leading-tight text-[var(--ink)] md:text-[3rem]">
            I build AI products for research, synthesis, and better decision-making.
          </h1>

          <div className="mt-7 max-w-2xl space-y-4 text-[var(--ink-muted)]">
            <p className="text-lg leading-8 text-[var(--ink-soft)]">
              I’m a product manager interested in tools that help people turn complex information into judgment: what to trust, what to remember, and what to do next.
            </p>
            <p className="text-base leading-7">
              My work spans AI research assistants, product strategy, evaluation, behavior change, and adoption. I’m drawn to products where good intentions are not enough, because trust, quality, distribution, and execution determine whether the work matters.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <DossierButton type="button" onClick={() => scrollToSection("resume")} className="bg-[var(--ink-soft)] text-[var(--paper)] hover:bg-[var(--ink)]">
              View résumé
            </DossierButton>
            <DossierButton type="button" onClick={() => scrollToSection("work")}>
              See selected work
            </DossierButton>
            <DossierButton type="button" onClick={() => scrollToSection("side-projects")}>
              See notes
            </DossierButton>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-3 md:grid-cols-4">
        {paths.map((path, index) => (
          <button
            key={path.label}
            type="button"
            onClick={() => scrollToSection(path.id)}
            className="notched relative block w-full cursor-pointer border border-[var(--rule)] bg-[var(--paper-card)] p-5 text-left text-[var(--ink)] transition-colors duration-150 hover:border-[color-mix(in_srgb,var(--civic-blue)_45%,var(--rule))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]"
          >
            <p className="font-display text-2xl text-[var(--civic-blue)]">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-lg leading-tight">{path.label}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{path.note}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
