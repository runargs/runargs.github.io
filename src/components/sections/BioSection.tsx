import { ArrowRight, FileText } from "lucide-react";
import { DossierLink, StampBadge } from "@/components/design-system/Dossier";

export function BioSection() {
  return (
    <section
      id="bio"
      className="hero-console relative overflow-hidden border-b border-[var(--rule)] bg-[var(--paper-card)] px-6 pb-10 pt-16 md:px-11 md:pb-12 md:pt-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 opacity-[0.16] mix-blend-multiply dark:opacity-[0.12]">
        <img
          src="/images/punchcard-reference.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="relative z-10">
        <div className="mb-8 grid gap-5 border-b border-[var(--rule)] pb-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <p className="small-label mb-3 text-[var(--ink-muted)]">Human-first responsible technology</p>
            <div className="font-display text-[2.75rem] leading-none text-[var(--civic-blue)] md:text-[4.2rem]">
              Alexa Thoennes
            </div>
          </div>
          <div className="border-l border-[var(--rule)] pl-5">
            <StampBadge tone="blue">AI product launch 2026</StampBadge>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
              Product judgment for research, synthesis, responsible decision-making, and the human systems around technical work.
            </p>
          </div>
        </div>

        <article className="hero-article border border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper-card)_88%,var(--paper-soft))] p-5 md:p-7">
          <h1 className="hero-headline max-w-5xl text-[2.55rem] leading-tight text-[var(--ink)] md:text-[4rem]">
            I build <span className="hero-headline-pixel">AI</span> products for{" "}
            <span className="hero-headline-editorial">research, synthesis,</span> and better decision-making.
          </h1>

          <div className="mt-7 flow-root">
            <figure className="hero-photo-wrap notched border border-[var(--rule)] bg-[var(--paper-card)] p-3">
              <div className="aspect-[16/9] overflow-hidden bg-[var(--paper-soft)]">
                <img
                  src="/images/profile.JPG"
                  alt="Alexa Thoennes speaking to a seated audience"
                  className="block h-full w-full object-cover object-[50%_52%]"
                />
              </div>
              <figcaption className="mt-2 border-t border-[rgba(213,198,177,0.75)] pt-2 text-xs font-extrabold uppercase leading-snug tracking-[0.07em] text-[var(--ink-muted)]">
                AI product launch 2026
              </figcaption>
            </figure>

            <div className="hero-intro-copy text-[var(--ink-muted)]">
              <p className="text-xl leading-8 text-[var(--ink-soft)]">
                I’m a product manager interested in tools that help people turn complex information into judgment: what to trust, what to remember, and what to do next.
              </p>
              <p>
                My work spans AI research assistants, product strategy, evaluation, behavior change, and adoption. I’m drawn to products where good intentions are not enough, because trust, quality, distribution, and execution determine whether the work matters.
              </p>
            </div>
          </div>

          <div className="mt-8 clear-both grid gap-2 border-y border-[var(--rule)] py-4 text-sm md:grid-cols-3">
            <div>
              <span className="small-label block text-[var(--civic-blue)]">Focus</span>
              <span className="data-text">AI research tools</span>
            </div>
            <div>
              <span className="small-label block text-[var(--civic-blue)]">Method</span>
              <span className="data-text">Evidence + adoption</span>
            </div>
            <div>
              <span className="small-label block text-[var(--civic-blue)]">Value</span>
              <span className="data-text">Human-first systems</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <DossierLink href="mailto:alexa.thoennes@gmail.com?subject=Website%20Inquiry" className="bg-[var(--ink-soft)] text-[var(--paper)] hover:bg-[var(--ink)]">
              Contact <ArrowRight className="ml-2 h-4 w-4" />
            </DossierLink>
            <DossierLink href="mailto:alexa.thoennes@gmail.com?subject=Resume%20PDF%20Request">
              <FileText className="mr-2 h-4 w-4" /> Résumé PDF
            </DossierLink>
          </div>
        </article>
      </div>
    </section>
  );
}
