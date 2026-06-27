import { useState } from "react";
import { ArrowUpRight, BookOpen, ClipboardList, Compass, Layers, Search, Sparkles } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
  {
    id: "triage",
    title: "TRIAGE, intelligent budgeting",
    description: "A personal finance project for rolling-forward, action-oriented budgeting instead of passive net-worth tracking.",
    detail:
      "A personal project around budgeting as a decision-support system: what needs attention, what can wait, what changed, and what action should happen next.",
    tags: ["Finance", "Decision Systems", "Personal Project"],
    kind: "project",
    icon: BookOpen,
    image: "/images/finance.JPG",
    url: "https://github.com/runargs/budget-triage/tree/main",
  },
];

const kindLabel: Record<NoteOrProject["kind"], string> = {
  note: "Note",
  project: "Project",
};

export function SideProjectsSection() {
  const [selectedItem, setSelectedItem] = useState<NoteOrProject | null>(null);

  return (
    <section id="side-projects" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold mb-3">
            Notes & projects
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground tracking-tight italic">
            Notes and projects
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            A few threads I keep returning to: memory, synthesis, evaluation, behavior change, decision tools, and products that have to work in the real world.
          </p>
        </div>

        <div className="rounded-3xl border border-primary/15 bg-primary/[0.03] p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6 items-start">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-3">Analog + AI</p>
              <h3 className="font-serif text-2xl md:text-3xl italic text-foreground">Analog + AI memory systems</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              I’m interested in the space between analog thinking and AI assistance: handwritten notes, commonplace books, journaling, multimedia capture, tagging, resurfacing, and recall. The useful question is how AI can handle the clerical layer around memory without flattening the human work of synthesis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notesAndProjects.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="card-hover border-gold-hover group cursor-pointer overflow-hidden bg-card/40"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-[9px] uppercase tracking-widest text-muted-foreground border-muted-foreground/20">
                      {kindLabel[item.kind]}
                    </Badge>
                  </div>
                  <CardTitle className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-gold">
            <VisuallyHidden>
              <DialogTitle>{selectedItem?.title || "Note or project"}</DialogTitle>
            </VisuallyHidden>

            {selectedItem && (
              <div className="flex flex-col">
                {selectedItem.image && (
                  <div className="aspect-video relative overflow-hidden border-b shrink-0">
                    <img src={selectedItem.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-3">
                        <Badge variant="outline" className="text-[9px] uppercase tracking-widest text-muted-foreground border-muted-foreground/20 w-fit">
                          {kindLabel[selectedItem.kind]}
                        </Badge>
                        <h3 className="font-serif text-2xl md:text-3xl break-words">{selectedItem.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedItem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px] whitespace-nowrap">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed break-words">{selectedItem.detail}</p>
                  {selectedItem.url && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-6 text-[10px] uppercase tracking-widest text-primary font-bold hover:underline"
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
    </section>
  );
}
