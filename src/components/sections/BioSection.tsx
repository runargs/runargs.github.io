import { ArrowRight, FileText, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { DossierLink } from "@/components/design-system/Dossier";

export function BioSection() {
  return (
    <section
    id="bio"
    className="hero-console relative overflow-hidden border-b border-[var(--rule)] bg-[var(--paper-card)] px-6 pb-10 pt-10 md:px-11 md:pb-12 md:pt-14"
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[31rem] opacity-[0.16] mix-blend-multiply dark:opacity-[0.12] md:h-[27rem] lg:h-[18rem]">
      <img
        src="/images/punch-card-reference.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover object-center"
      />
    </div>

      <div className="relative z-10">
        <div className="hero-intro-panel mb-8 border-b border-[var(--rule)] pb-7 md:pb-9">
          <div className="hero-identity-lockup">
            <div className="flex items-center gap-5 md:gap-6">
              <img
                src="/images/pixel-portrait.png"
                alt=""
                aria-hidden="true"
                className="h-28 w-28 shrink-0 object-contain [filter:none!important] dark:[filter:none!important] md:h-32 md:w-32"
              />

              <div className="font-display text-[3.15rem] leading-[0.86] text-[var(--civic-blue)] md:text-[4.2rem] lg:whitespace-nowrap">
                Alexa Thoennes
                <div className="hero-kicker small-label mb-5 text-[var(--ink-muted)]">
                  Responsible AI + Human Judgment
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <article className="hero-article border border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper-card)_88%,var(--paper-soft))] p-5 md:p-7">
          <h1 className="hero-headline max-w-5xl text-[2.55rem] leading-tight text-[var(--ink)] md:text-[4rem]">
            I build <span className="hero-headline-pixel">AI</span> tools that expand what people can do without outsourcing compassion.
          </h1>

          <div className="mt-7 flow-root">
            <figure className="hero-photo-wrap notched border border-[var(--rule)] bg-[var(--paper-card)] p-3">
              <div className="aspect-[16/9] overflow-hidden bg-[var(--paper-soft)]">
                <img
                  src="/images/ai-product-launch-talk.jpg"
                  alt="Alexa Thoennes speaking to a seated audience"
                  className="block h-full w-full object-cover object-[50%_52%]"
                />
              </div>
              <figcaption className="mt-2 border-t border-[rgba(213,198,177,0.75)] pt-2 text-xs font-extrabold uppercase leading-snug tracking-[0.07em] text-[var(--ink-muted)]">
                AI product launch 2026
              </figcaption>
            </figure>

            <div className="hero-intro-copy text-[var(--ink-muted)]">
              <p className="text-lg text-[var(--ink-soft)] leading-8">
                I work broadly, test what I learn, and build AI that gives people more agency.
              </p>

              <blockquote className="mt-4 border-l-2 border-[var(--civic-blue)] pl-4">
                <p className="font-display text-[1.35rem] leading-[1.18] text-[var(--ink-soft)]">
                  “There are times when the world is in flux and the right voice in the right place can move the world.”
                </p>
                <cite className="mt-3 block text-[0.68rem] not-italic font-extrabold uppercase leading-none tracking-[0.07em] text-[var(--civic-blue)]">
                  Peter Wiggin, Ender’s Game
                </cite>
              </blockquote>

              <div className="mt-4 flex flex-wrap gap-3">
                <DossierLink href="#contact" className="bg-[var(--ink-soft)] text-[var(--paper)] hover:bg-[var(--ink)]">
                  Contact <ArrowRight className="ml-2 h-4 w-4" />
                </DossierLink>
                <DossierLink href="#resume">
                  <FileText className="mr-2 h-4 w-4" /> Résumé PDF
                </DossierLink>
                <Link
                  to="/art"
                  className="inline-flex min-h-[44px] items-center justify-center border border-[var(--rule)] bg-[var(--paper-card)] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--ink)] shadow-[2px_2px_0_rgba(45,40,31,0.10)] transition duration-150 hover:-translate-y-0.5 hover:border-[var(--field-ochre)] hover:text-[var(--field-ochre)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]"
                >
                  <Palette className="mr-2 h-4 w-4" /> Creative work
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
