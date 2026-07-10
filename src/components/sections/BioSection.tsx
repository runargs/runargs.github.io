import { ArrowRight, FileText } from "lucide-react";
import { DossierLink, StampBadge } from "@/components/design-system/Dossier";

export function BioSection() {
  return (
    <section
    id="bio"
    className="hero-console relative overflow-hidden border-b border-[var(--rule)] bg-[var(--paper-card)] px-6 pb-10 pt-16 md:px-11 md:pb-12 md:pt-20"
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[31rem] opacity-[0.16] mix-blend-multiply dark:opacity-[0.12] md:h-[27rem] lg:h-[18rem]">
      <img
        src="/images/punchcard-reference.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover object-center"
      />
    </div>

      <div className="relative z-10">
        <div className="hero-intro-panel mb-8 grid gap-6 border-b border-[var(--rule)] pb-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div>
            <div className="flex items-center gap-5 md:gap-6">
              <img
                src="/images/pixel_portrait.png"
                alt=""
                aria-hidden="true"
                className="h-28 w-28 shrink-0 object-contain [filter:none!important] dark:[filter:none!important] md:h-32 md:w-32"
              />

              <div className="font-display text-[3.15rem] leading-[0.86] text-[var(--civic-blue)] md:text-[4.2rem] lg:whitespace-nowrap">
                Alexa Thoennes
                <div className="hero-kicker small-label mb-5 text-[var(--ink-muted)]">
                  Human-First + AI-Forward
                </div>
              </div>
              
            </div>
          </div>

          <div className="hero-mission-panel border-t border-[var(--rule)] pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            <StampBadge tone="blue" className="hero-values-stamp">
              Empathy • Agency • Discernment
            </StampBadge>

            <p className="hero-mission-copy mt-3 max-w-[34rem] text-sm leading-6 text-[var(--ink-muted)] lg:max-w-none">
              Systems, rituals, and technology should help life flourish, preserve culture and craft, and treat intelligence, care, and beauty as rare responsibilities in a vast universe.
            </p>
          </div>
        </div>

        <article className="hero-article border border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper-card)_88%,var(--paper-soft))] p-5 md:p-7">
          <h1 className="hero-headline max-w-5xl text-[2.55rem] leading-tight text-[var(--ink)] md:text-[4rem]">
            I build <span className="hero-headline-pixel">AI</span> products for evidence, judgment, and responsible use.
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
              <p></p>
              <p className="text-lg text-[var(--ink-soft)] leading-8">
                I’m a product manager focused on AI tools that help people make sense of complex information without losing uncertainty, context, or accountability.
              </p>
              <p></p>
            </div>
            <div className="flex flex-wrap gap-3">
            <DossierLink href="mailto:alexa.thoennes@gmail.com?subject=Website%20Inquiry" className="bg-[var(--ink-soft)] text-[var(--paper)] hover:bg-[var(--ink)]">
              Contact <ArrowRight className="ml-2 h-4 w-4" />
            </DossierLink>
            <DossierLink href="mailto:alexa.thoennes@gmail.com?subject=Resume%20PDF%20Request">
              <FileText className="mr-2 h-4 w-4" /> Résumé PDF
            </DossierLink>
                          <p className="text-xl leading-8 font-display">
                “There are times when the world is rearranging itself, and at times like that, the right words can change the world.”<br></br><small>- Ender's Game</small>
                </p>
          </div>
          </div>

          
        </article>
      </div>
    </section>
  );
}
