import { SectionBand, SectionHeader } from "@/components/design-system/Dossier";

interface NoteOrProject {
  id: string;
  title: string;
  description: string;
}

const notesAndProjects: NoteOrProject[] = [
  {
    id: "consumption",
    title: "Human Data Curation",
    description: "Everyone knows the saying about LLMs: “garbage in, garbage out.” The most sophisticated neural net we have is sitting behind our eyes. What are we watching?",
  },
  {
    id: "memory",
    title: "Analog + AI systems",
    description: "How can AI make the raw material of life easier to capture while acknowledging that the processing itself is the highest-value part for humans to own?",
  },
  {
    id: "behavior",
    title: "Behavior change",
    description: "How can products support durable behavior change, from self-efficacy to agency?",
  },
  {
    id: "humangeo",
    title: "The environment <> people loop",
    description: "How do the places and environments we live in shape who we are, how we behave, and how our societies develop?",
  },
];

export function SideProjectsSection() {
  return (
    <SectionBand id="side-projects">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          marker="05"
          title="Marginalia"
          description="If you searched my desk, you'd find scraps of paper with scattered thoughts and collages."
          className="mb-5"
        />

        <div className="marginalia-field">
          <img src="/images/clip-robot-scribe.png" alt="" aria-hidden="true" className="marginalia-scribe" />
          <div className="marginalia-grid">
            {notesAndProjects.map((item, index) => {
              return (
                <article
                  key={item.id}
                  className="marginalia-card"
                >
                  <div className="mb-2 flex justify-end">
                    <span className="marginalia-card-index font-display text-xl leading-none" aria-hidden="true">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-left text-base leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-left text-[0.8rem] leading-5 text-[var(--ink-muted)]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </SectionBand>
  );
}
