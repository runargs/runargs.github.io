import { useState } from "react";
import { ArrowUpRight, ClipboardList, Compass, Layers, Search, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { EditorialCard, ImageFrame, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

interface NoteOrProject {
  id: string;
  title: string;
  description: string;
  detail: string;
  tags: string[];
  kind: "note" | "project";
  icon: typeof Search;
  image?: string;
  url?: string;
}

const notesAndProjects: NoteOrProject[] = [
  {
    id: "synthesis",
    title: "AI for synthesis and sensemaking",
    description: "How can AI help people move from more information to better understanding, not just faster summaries?",
    detail:
      "The product layer between retrieval and judgment is where the hard decisions live: what gets surfaced, what gets compressed, what remains uncertain, and how the user can inspect sources without drowning in them.",
    tags: ["AI Product", "Sensemaking", "Decision-making"],
    kind: "note",
    icon: Search,
  },
  {
    id: "memory",
    title: "Analog + AI memory systems",
    description: "How can AI make the raw material of life easier to capture and revisit while keeping interpretation in human hands?",
    detail:
      "I’m interested in the space between analog thinking and AI assistance: handwritten notes, commonplace books, journaling, multimedia capture, tagging, resurfacing, and recall. The useful question is how AI can handle the clerical layer around memory without flattening the human work of synthesis.",
    tags: ["Memory", "Analog Workflows", "AI Assistance"],
    kind: "note",
    icon: Layers,
  },
  {
    id: "evaluation",
    title: "Evaluation and LLM-as-judge",
    description: "How do we build scalable quality systems for AI products without pretending judgment is simple?",
    detail:
      "LLM-as-judge is a real opportunity for scalable product quality. It gets weak when teams treat judgment as objective, context-free, or magically solved. I’m interested in evaluation systems that make uncertainty visible and improve with use.",
    tags: ["Evaluation", "Quality", "LLM-as-judge"],
    kind: "note",
    icon: ClipboardList,
  },
  {
    id: "behavior",
    title: "Behavior change and healthspan",
    description: "How can longitudinal products support durable behavior change without turning self-tracking into anxiety?",
    detail:
      "Healthspan and wellness products often have better sensors than behavior loops. The product question is not only what can be measured, but what should be made salient, when, and with what kind of intervention.",
    tags: ["Healthspan", "Wearables", "Behavior Change"],
    kind: "note",
    icon: Compass,
  },
  {
    id: "impact",
    title: "Impact product mechanics",
    description: "What makes a mission-driven product actually work: incentives, adoption, trust, distribution, and feedback loops?",
    detail:
      "I’m drawn to products where the stakes are real: health, food systems, climate, education, financial resilience, and public-interest infrastructure. The interesting part is whether adoption, incentives, quality, and operations make the intended outcome durable.",
    tags: ["Impact", "Systems", "Adoption"],
    kind: "note",
    icon: Sparkles,
  },
];

const kindLabel: Record<NoteOrProject["kind"], string> = {
  note: "Note",
  project: "Project",
};

export function SideProjectsSection() {
  const [selectedItem, setSelectedItem] = useState<NoteOrProject | null>(null);

  return (
    <SectionBand id="side-projects">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          marker="08"
          eyebrow="Notes & projects"
          title="Notes"
          description="Marginalia, experiments, and recurring questions around memory, synthesis, evaluation, behavior change, and products that need to work in the real world."
          className="mb-6"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {notesAndProjects.map((item) => {
            const Icon = item.icon;
            return (
              <EditorialCard
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer overflow-hidden"
              >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--rule)] bg-[var(--paper-soft)]">
                      <Icon className="h-4 w-4 text-[var(--civic-blue)]" />
                    </div>
                    <StampBadge tone={item.kind === "project" ? "violet" : "blue"}>
                      {kindLabel[item.kind]}
                    </StampBadge>
                  </div>
                  <h3 className="mb-2 text-xl leading-tight transition-colors group-hover:text-[var(--civic-blue)]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-[var(--ink-muted)]">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <StampBadge key={tag} tone="muted">
                        {tag}
                      </StampBadge>
                    ))}
                  </div>
              </EditorialCard>
            );
          })}
        </div>

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl overflow-hidden border-[var(--rule)] bg-[var(--paper-card)] p-0">
            <VisuallyHidden>
              <DialogTitle>{selectedItem?.title || "Note or project"}</DialogTitle>
            </VisuallyHidden>

            {selectedItem && (
              <div className="flex flex-col">
                {selectedItem.image && (
                  <ImageFrame
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    caption={`${selectedItem.title} / project image`}
                    mediaClassName="aspect-video"
                    className="border-0 border-b"
                    grayscale={false}
                  />
                )}

                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-3">
                        <StampBadge tone={selectedItem.kind === "project" ? "violet" : "blue"}>
                          {kindLabel[selectedItem.kind]}
                        </StampBadge>
                        <h3 className="break-words text-2xl md:text-3xl">{selectedItem.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedItem.tags.map((tag) => (
                            <StampBadge key={tag} tone="muted" className="whitespace-nowrap">
                              {tag}
                            </StampBadge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="break-words leading-7 text-[var(--ink-muted)]">{selectedItem.detail}</p>
                  {selectedItem.url && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--civic-blue)] hover:underline"
                    >
                      Open project <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SectionBand>
  );
}
