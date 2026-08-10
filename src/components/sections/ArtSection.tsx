import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CitationLink, ImageFrame, SectionBand, SectionHeader } from "@/components/design-system/Dossier";

const practices = [
  { title: "Food & private dining", image: "/media/art/vineyard-dinner-place-setting.jpg", section: "food" },
  { title: "Ceramics", image: "/images/ceramic-ginkgo-sgraffito-bowl.jpg", section: "ceramics" },
  { title: "Fashion", image: "/media/art/linen-top-hair-stick-first-frame.jpg", section: "fashion" },
  { title: "Cirque arts", image: "/media/art/led-poi.jpg", section: "movement", dark: true },
  { title: "Modeling & image-making", image: "/images/place-setting-candle-study.jpg", section: "collaboration" },
];

export function ArtSection() {
  return (
    <SectionBand id="art">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          marker="04"
          title="Haruhay Studio"
          description={<>Each practice changes what I notice in the others. I treat breadth, depth, and integration as one creative practice.<CitationLink number={3} href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12941731/" citation="Trofimova, I. N., & Araki, M. E. (2026). Beyond grades: Temperament and interests, but not school grades, highlight distinct polymathic learning abilities. Journal of Intelligence, 14(2), 26." /></>}
          className="mb-10"
        />
        <div className="art-home-practice-strip notched">
          {practices.map((practice) => (
            <Link key={practice.title} to={`/art?section=${practice.section}`} className={`art-home-practice-card group ${practice.dark ? "is-flow" : ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]`}>
              <ImageFrame src={practice.image} alt="" caption={practice.title} mediaClassName="aspect-[4/5]" imgClassName="transition-transform duration-300 group-hover:scale-[1.03]" grayscale={false} />
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/art" className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--ink-soft)] bg-[var(--ink-soft)] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--paper)] shadow-[2px_2px_0_rgba(45,40,31,0.10)] transition hover:-translate-y-0.5 hover:bg-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]">
            Explore the creative portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionBand>
  );
}
