import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type GalleryType = "culinary" | "ceramics" | "image studies";

interface ArtPiece {
  id: string;
  title: string;
  date: string;
  description?: string;
  gallery: GalleryType;
  image?: string;
  url?: string;
}

const artPieces: ArtPiece[] = [
  {
    id: "s1",
    title: "Gallery tasting series",
    date: "2024–2025",
    description:
      "Filipino-inspired small bites for ArtWRKD, a full-service art consortium with artists in residence, workshops, and a rotating gallery. Pictured: adobo tapenade bites and peach-mango tartlets with coconut glaze.",
    gallery: "culinary",
    image: "/images/gallerytasting.jpeg",
  },
  {
    id: "s2",
    title: "Gallery tasting series",
    date: "2024–2025",
    description:
      "A second view from the gallery tasting series: small bites built around timing, texture, and how food behaves in a room full of people moving through art.",
    gallery: "culinary",
    image: "/images/tasting.jpeg",
  },
  {
    id: "s3",
    title: "Happening Women 2025",
    date: "2025",
    description: "Interactive canapé chef’s table for the Happening Women Award Ceremony.",
    gallery: "culinary",
    image: "/images/bucksawards.JPG",
    url: "https://www.happeningmag.com/happening-women-2025/",
  },
  {
    id: "s4",
    title: "Flavors of Iloilo",
    date: "2025",
    description: "Filipino cuisine and handmade ceramic serviceware, with food, object, memory, and table treated together.",
    gallery: "culinary",
    image: "/images/iloilo.jpg",
    url: "https://www.instagram.com/p/DEv2ddPAVal/",
  },
  {
    id: "s5",
    title: "Grilled octopus at Triple Sun Spirits",
    date: "2025",
    description: "Part of a Mediterranean dining experience for private events at Triple Sun Spirits Distillery & Speakeasy.",
    gallery: "culinary",
    image: "/images/IMG_8416.jpg",
  },
  {
    id: "s6",
    title: "The Bond Experience",
    date: "2025",
    description: "A collaboration with The Bond Experience and Newtown Theatre. The aim: slow down and enjoy yourself.",
    gallery: "culinary",
    image: "/images/puff.jpg",
    url: "https://www.instagram.com/p/DNe3tH2AEX1/",
  },
  {
    id: "p3",
    title: "In-home private dining",
    date: "2024–Present",
    description: "Local venue and in-home private dining: menus, pacing, prep systems, and the feeling of being hosted well.",
    gallery: "culinary",
    image: "/images/kitchen.JPG",
  },
  {
    id: "c1",
    title: "Ginkgo biloba sgraffito bowl",
    date: "2024",
    description: "Wheel-thrown ceramic work with hand-carved surface design.",
    gallery: "ceramics",
    image: "/images/IMG_8418.jpg",
  },
  {
    id: "c2",
    title: "Teapot",
    date: "2025",
    description: "A study in form, handle, pour, and proportion.",
    gallery: "ceramics",
    image: "/images/teapot.jpg",
    url: "https://www.instagram.com/p/DOH53lpDoK2/",
  },
  {
    id: "c3",
    title: "Mixed pottery",
    date: "2025",
    description: "Ceramic work across shape, glaze, constraint, and use.",
    gallery: "ceramics",
    image: "/images/comp_pottery1.jpg",
    url: "https://www.instagram.com/p/DN6Akntjo3y/",
  },
  {
    id: "c4",
    title: "Mixed pottery",
    date: "2025",
    description: "Another study in vessel language and surface treatment.",
    gallery: "ceramics",
    image: "/images/comp_pottery2.jpg",
    url: "https://www.instagram.com/p/DN6Akntjo3y/",
  },
  {
    id: "p1",
    title: "Place setting study",
    date: "@delarosa_jr",
    description: "Image study for I Know a Place Agency: table, gesture, material, and mood.",
    gallery: "image studies",
    image: "/images/placesetting.JPEG",
  },
  {
    id: "p2",
    title: "Herb study",
    date: "@delarosa_jr",
    description: "Image study for I Know a Place Agency: sensory detail as atmosphere.",
    gallery: "image studies",
    image: "/images/herbs.JPEG",
  },
  {
    id: "p4",
    title: "Portrait study",
    date: "@visualsbykaitlyn",
    description: "A visual reference point for restraint, light, and editorial mood.",
    gallery: "image studies",
    image: "/images/photoshoot1.jpg",
    url: "https://www.instagram.com/p/CNH3F4GHG8P/",
  },
  {
    id: "p5",
    title: "Portrait study",
    date: "@visualsbykaitlyn",
    description: "A second visual reference point for composition and atmosphere.",
    gallery: "image studies",
    image: "/images/photoshoot2.jpg",
    url: "https://www.instagram.com/p/CNAOVNKn4DJ/",
  },
  {
    id: "p6",
    title: "Portrait study",
    date: "@photography_by_nadia",
    description: "A study in styling, silhouette, and visual tone.",
    gallery: "image studies",
    image: "/images/photoshoot3.jpg",
  },
  {
    id: "p7",
    title: "San Francisco image study",
    date: "@alexander.aperture",
    description: "Urban light, texture, and composition.",
    gallery: "image studies",
    image: "/images/sf.jpg",
    url: "https://www.instagram.com/p/DCiDW_cJwZR/",
  },
];

const galleries: { id: GalleryType; label: string }[] = [
  { id: "culinary", label: "Food & hosting" },
  { id: "ceramics", label: "Ceramics" },
  { id: "image studies", label: "Image studies" },
];

export function ArtSection() {
  const [activeGallery, setActiveGallery] = useState<GalleryType>("culinary");
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

  const filteredPieces = artPieces.filter((piece) => piece.gallery === activeGallery);

  return (
    <section id="art" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary font-bold mb-3">
            Food, hosting, and sensory detail
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground tracking-tight italic">Artisan gallery</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Food and hosting make the abstract concrete: ingredients, timing, constraint, memory, culture, and whether people feel taken care of.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-fade-in">
          {filteredPieces.map((piece) => (
            <Card
              key={piece.id}
              onClick={() => setSelectedPiece(piece)}
              className="card-hover border-gold-hover cursor-pointer overflow-hidden group"
            >
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

                <div className="p-6">
                  <h3 className="font-serif text-2xl mb-1">{selectedPiece.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedPiece.date}</p>
                  {selectedPiece.description && (
                    <p className="text-foreground/80 leading-relaxed">{selectedPiece.description}</p>
                  )}
                  {selectedPiece.url && (
                    <a
                      href={selectedPiece.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-5 text-[10px] uppercase tracking-widest text-primary font-bold hover:underline"
                    >
                      View reference <ExternalLink className="h-3 w-3" />
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
