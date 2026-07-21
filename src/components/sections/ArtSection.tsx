import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { DossierLink, ImageFrame, SectionBand, SectionHeader } from "@/components/design-system/Dossier";

const practices = [
  { title: "Food & private dining", image: "/images/flavors-of-iloilo-plate.jpg" },
  { title: "Ceramics", image: "/images/ceramic-ginkgo-sgraffito-bowl.jpg" },
  { title: "Fashion", image: "/media/art/linen-top-hair-stick.jpg", video: "/media/art/linen-top-hair-stick.mp4" },
  { title: "Flow arts", image: "/media/art/flow-arts-fire.jpg", dark: true },
  { title: "Modeling & image-making", image: "/images/portrait-study-red-light.jpg" },
];

export function ArtSection() {
  return (
    <SectionBand id="art">
      <div className="mx-auto max-w-6xl">
        <SectionHeader marker="04" eyebrow="Creative practice" title="Haruhay Studio" description="My renaissance atelier for ceramics, food, modeling, fashion, and flow arts." className="mb-10" />
        <div className="art-home-practice-strip notched">
          {practices.map((practice) => (
            <Link key={practice.title} to="/art" className={`art-home-practice-card group ${practice.dark ? "is-flow" : ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]`}>
              {practice.video ? (
                <figure className="notched border border-[var(--rule)] bg-[var(--paper-card)] p-3">
                  <div className="aspect-[4/5] overflow-hidden bg-[var(--paper-soft)]">
                    <video className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" autoPlay muted loop playsInline preload="metadata">
                      <source src={practice.video} type="video/mp4" />
                    </video>
                  </div>
                  <figcaption className="mt-2 border-t border-[rgba(213,198,177,0.75)] pt-2 text-xs font-extrabold uppercase leading-snug tracking-[0.07em] text-[var(--ink-muted)]">{practice.title}</figcaption>
                </figure>
              ) : (
                <ImageFrame src={practice.image} alt="" caption={practice.title} mediaClassName="aspect-[4/5]" imgClassName="transition-transform duration-300 group-hover:scale-[1.03]" grayscale={false} />
              )}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/art" className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--ink-soft)] bg-[var(--ink-soft)] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--paper)] shadow-[2px_2px_0_rgba(45,40,31,0.10)] transition hover:-translate-y-0.5 hover:bg-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]">
            Explore the creative portfolio <ArrowRight className="h-4 w-4" />
          </Link>
          <DossierLink href="#contact" className="min-h-[44px] gap-2">
            Ask about commissions & private dining <Mail className="h-4 w-4" />
          </DossierLink>
        </div>
      </div>
    </SectionBand>
  );
}
