import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { DossierLink, ImageFrame, SectionBand, SectionHeader } from "@/components/design-system/Dossier";

const practices = [
  { title: "Food & private dining", image: "/images/flavors-of-iloilo-plate.jpg", note: "Menus, gatherings, and tables shaped around place, memory, and how people feel together." },
  { title: "Ceramics", image: "/images/ceramic-ginkgo-sgraffito-bowl.jpg", note: "Wheel-thrown vessels, carved surfaces, and useful objects made for everyday ritual." },
  { title: "Flow arts", image: "/images/portrait-study-red-light.jpg", note: "A growing movement practice, with space being made for film and performance studies." },
];

export function ArtSection() {
  return (
    <SectionBand id="art">
      <div className="mx-auto max-w-6xl">
        <SectionHeader marker="04" eyebrow="Creative practice" title="Art, food & movement" description="A working studio practice spanning private dining, ceramics, visual collaborations, and a new exploration of flow arts." className="mb-10" />
        <div className="grid gap-4 md:grid-cols-3">
          {practices.map((practice) => (
            <Link key={practice.title} to="/art" className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]">
              <ImageFrame src={practice.image} alt="" caption={practice.title} mediaClassName="aspect-[4/3]" imgClassName="transition-transform duration-300 group-hover:scale-[1.03]" grayscale={false} />
              <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">{practice.note}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/art" className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--ink-soft)] bg-[var(--ink-soft)] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--paper)] shadow-[2px_2px_0_rgba(45,40,31,0.10)] transition hover:-translate-y-0.5 hover:bg-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]">
            Explore the creative portfolio <ArrowRight className="h-4 w-4" />
          </Link>
          <DossierLink href="mailto:alexa.thoennes@gmail.com?subject=Creative%20work%20inquiry" className="min-h-[44px] gap-2">
            Ask about commissions & private dining <Mail className="h-4 w-4" />
          </DossierLink>
        </div>
      </div>
    </SectionBand>
  );
}
