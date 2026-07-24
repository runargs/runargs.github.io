import { useState, type ReactNode } from "react";
import { CitationLink, SectionBand, SectionHeader } from "@/components/design-system/Dossier";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface NoteOrProject {
  id: string;
  title: string;
  description: string;
  detail: ReactNode;
}

const notesAndProjects: NoteOrProject[] = [
  {
    id: "consumption",
    title: "Human Data Curation",
    description: "Everyone knows the saying about LLMs: “garbage in, garbage out.” The most sophisticated neural net we have is sitting behind our eyes. What are we watching?",
    detail: "What we watch, read, and repeatedly attend to becomes training data for our own perception. Human data curation is the practice of choosing those inputs with the same care we expect from the systems we build.",
  },
  {
    id: "memory",
    title: "Analog + AI systems",
    description: "How can AI make the raw material of life easier to capture while acknowledging that the processing itself is the highest-value part for humans to own?",
    detail: "AI can lower the friction of collecting fragments, memories, and observations without taking over the meaning-making. The useful boundary may be simple: let the system help capture the material, then preserve interpretation, reflection, and judgment as human work.",
  },
  {
    id: "behavior",
    title: "Behavior change",
    description: "How can products support durable behavior change, from self-efficacy to agency?",
    detail: <>Durable change is more than a streak, reminder, or moment of motivation. A product can help people build evidence that they are capable<CitationLink number={4} href="https://doi.org/10.1037/0033-295X.84.2.191" citation="Bandura, A. (1977). Self-efficacy: Toward a unifying theory of behavioral change. Psychological Review, 84(2), 191–215." />, make choices that feel like their own, and gradually turn self-efficacy into agency.</>,
  },
  {
    id: "humangeo",
    title: "The environment <> people loop",
    description: "How do the places and environments we live in shape who we are, how we behave, and how our societies develop?",
    detail: "Places shape our habits, relationships, opportunities, and sense of what is possible. People then reshape those places through use, policy, maintenance, and neglect. The interesting unit is the loop, not either side in isolation.",
  },
  {
    id: "contradictions",
    title: "Holding contradictions",
    description: "Maybe emotional depth is the ability to hold conflicting truths without flattening them. What if multidimensional models are better at that than we expect?",
    detail: "Emotional depth may be the ability to hold contradictions: motivated and burnt out, grateful and grieving, overwhelmed and numb, joyous and sad, without flattening any of it. A model’s multidimensional embeddings may force it to hold those contradictions, potentially more deeply than most humans. Yet our instinct is to flatten both ourselves and the model, to organize away whatever interferes.",
  },
];

export function SideProjectsSection() {
  const [selectedNote, setSelectedNote] = useState<NoteOrProject | null>(null);

  return (
    <SectionBand id="side-projects">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          marker="05"
          title="Marginalia"
          className="mb-5"
        />

        <div className="marginalia-field">
          <img src="/images/clip-robot-scribe.png" alt="" aria-hidden="true" loading="lazy" decoding="async" className="marginalia-scribe" />
          <div className="marginalia-grid">
            {notesAndProjects.map((item, index) => {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedNote(item)}
                  className="marginalia-card"
                  aria-label={`Read more about ${item.title}`}
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
                </button>
              );
            })}
          </div>
        </div>

        <Dialog
          open={selectedNote !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedNote(null);
          }}
        >
          <DialogContent className="w-[calc(100%_-_2rem)] max-w-xl border-[var(--rule)] bg-[var(--paper-card)] p-6 [&>button]:inline-flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center sm:p-8">
            {selectedNote && (
              <div>
                <DialogTitle className="pr-12 font-display text-2xl leading-tight text-[var(--ink)]">
                  {selectedNote.title}
                </DialogTitle>
                <DialogDescription className="mt-4 text-base leading-7 text-[var(--ink-muted)]">
                  {selectedNote.detail}
                </DialogDescription>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SectionBand>
  );
}
