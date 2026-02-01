import { useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type GalleryType = "ceramics" | "sketch" | "photography";

interface ArtPiece {
  id: string;
  title: string;
  date: string;
  description?: string;
  gallery: GalleryType;
}

const artPieces: ArtPiece[] = [
  // Ceramics
  { id: "c1", title: "Organic Form I", date: "2024", description: "Hand-thrown stoneware with natural ash glaze", gallery: "ceramics" },
  { id: "c2", title: "Botanical Bowl", date: "2024", description: "Porcelain with carved leaf patterns", gallery: "ceramics" },
  { id: "c3", title: "Earth Vessel", date: "2023", description: "Coil-built terracotta with burnished surface", gallery: "ceramics" },
  { id: "c4", title: "Flow Series", date: "2023", description: "Experimental glaze studies on stoneware", gallery: "ceramics" },
  // Sketches
  { id: "s1", title: "Urban Lines", date: "2024", description: "Ink on paper, architectural study", gallery: "sketch" },
  { id: "s2", title: "Portrait Study", date: "2024", description: "Graphite, observational drawing", gallery: "sketch" },
  { id: "s3", title: "Botanical Forms", date: "2023", description: "Mixed media, nature-inspired", gallery: "sketch" },
  { id: "s4", title: "Abstract Motion", date: "2023", description: "Charcoal, gestural exploration", gallery: "sketch" },
  // Photography
  { id: "p1", title: "Golden Hour, Kyoto", date: "2024", description: "Temple gardens at sunset", gallery: "photography" },
  { id: "p2", title: "Market Colors", date: "2024", description: "Marrakech spice market", gallery: "photography" },
  { id: "p3", title: "Nordic Light", date: "2023", description: "Arctic landscape, Norway", gallery: "photography" },
  { id: "p4", title: "Street Rhythm", date: "2023", description: "Urban life in Tokyo", gallery: "photography" },
];

const galleries: { id: GalleryType; label: string }[] = [
  { id: "ceramics", label: "Ceramics" },
  { id: "sketch", label: "Sketch" },
  { id: "photography", label: "Travel Photography" },
];

export function ArtSection() {
  const [activeGallery, setActiveGallery] = useState<GalleryType>("ceramics");
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

  const filteredPieces = artPieces.filter((piece) => piece.gallery === activeGallery);

  return (
    <section id="art" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Art Galleries</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Creative expressions beyond the screen
          </p>
        </div>

        {/* Gallery filter */}
        <div className="flex justify-center gap-2 mb-12">
          {galleries.map((gallery) => (
            <button
              key={gallery.id}
              onClick={() => setActiveGallery(gallery.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeGallery === gallery.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80"
              )}
            >
              {gallery.label}
            </button>
          ))}
        </div>

        {/* Art grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-fade-in">
          {filteredPieces.map((piece) => (
            <Card
              key={piece.id}
              onClick={() => setSelectedPiece(piece)}
              className="card-hover border-gold-hover cursor-pointer overflow-hidden group"
            >
              {/* Image placeholder */}
              <div className="aspect-square bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-flourish text-3xl text-primary/20 group-hover:scale-110 transition-transform duration-300">
                    ❧
                  </span>
                </div>
              </div>

              <CardContent className="p-3">
                <h3 className="font-serif text-sm font-medium truncate">{piece.title}</h3>
                <p className="text-xs text-muted-foreground">{piece.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox dialog */}
        <Dialog open={!!selectedPiece} onOpenChange={() => setSelectedPiece(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <VisuallyHidden>
              <DialogTitle>{selectedPiece?.title || "Art piece"}</DialogTitle>
            </VisuallyHidden>
            {selectedPiece && (
              <div>
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-flourish text-8xl text-primary/20">❧</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl mb-1">{selectedPiece.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedPiece.date}</p>
                  {selectedPiece.description && (
                    <p className="text-foreground/80">{selectedPiece.description}</p>
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
