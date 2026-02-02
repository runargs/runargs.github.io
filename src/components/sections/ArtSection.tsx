import { useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type GalleryType = "culinary" | "ceramics" | "fashion design";

interface ArtPiece {
  id: string;
  title: string;
  date: string;
  description?: string;
  gallery: GalleryType;
  image?: string;
}

const artPieces: ArtPiece[] = [
  // Culinary
  { id: "s1", title: "Gallery Tasting Series", date: "2024-2025", description: "Small bites for ArtWrkd, a full service art consortium that houses Artists in Residence, Workshops and a revolving Gallery.", gallery: "culinary", image: "/images/gallerytasting.jpeg"},
  { id: "s2", title: "Happening Women 2025", date: "2025", description: "Interactive canapé chef's table for Happening Women Award Ceremony. https://www.happeningmag.com/happening-women-2025/", gallery: "culinary", image: "/images/bucksawards.JPG"},
  // Ceramics
  { id: "c1", title: "Ginkgo Biloga Sgraffito Bowl", date: "2024", description: "Hand-thrown stoneware with natural ash glaze", gallery: "ceramics", image: "/images/IMG_8418.jpg"},
  // Photography
  { id: "p1", title: "TBA", date: "2026", description: "Visuals coming soon", gallery: "fashion design", image: "/images/IMG_8420.jpg"},
];

const galleries: { id: GalleryType; label: string }[] = [
  { id: "culinary", label: "Culinary" },
  { id: "ceramics", label: "Ceramic" },
  { id: "fashion design", label: "Other" },
];

export function ArtSection() {
  const [activeGallery, setActiveGallery] = useState<GalleryType>("culinary");
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

  const filteredPieces = artPieces.filter((piece) => piece.gallery === activeGallery);

  return (
    <section id="art" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Artisan Gallery</h2>
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
              <div className="aspect-square relative overflow-hidden">
                {piece.image ? (
                  <img
                    src={piece.image}
                    alt={piece.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
                    <span className="font-flourish text-3xl text-primary/20">❧</span>
                  </div>
                )}
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
                <div className="aspect-[4/3] relative overflow-hidden">
                  {selectedPiece.image ? (
                    <img
                      src={selectedPiece.image}
                      alt={selectedPiece.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
                      <span className="font-flourish text-8xl text-primary/20">❧</span>
                    </div>
                  )}
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
