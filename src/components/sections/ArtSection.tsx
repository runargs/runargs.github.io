import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ImageFrame, PunchcardFilter, SectionBand, SectionHeader } from "@/components/design-system/Dossier";

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
    <SectionBand id="art">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          marker="07"
          eyebrow="Food, hosting, and sensory detail"
          title="Image studies as human-system evidence."
          description="Food and hosting make the abstract concrete: ingredients, timing, constraint, memory, culture, and whether people feel taken care of."
          className="mb-10"
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {galleries.map((gallery) => (
            <PunchcardFilter
              key={gallery.id}
              onClick={() => setActiveGallery(gallery.id)}
              active={activeGallery === gallery.id}
            >
              {gallery.label}
            </PunchcardFilter>
          ))}
        </div>

        <div className="border border-[var(--rule)] bg-[var(--paper-soft)] p-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {filteredPieces.map((piece) => (
            <button
              key={piece.id}
              onClick={() => setSelectedPiece(piece)}
              className="group block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]"
            >
                {piece.image ? (
                  <ImageFrame
                    src={piece.image}
                    alt={piece.title}
                    caption={`${piece.title} / ${piece.date}`}
                    mediaClassName="aspect-square"
                    className="h-full transition-colors group-hover:border-[var(--civic-blue)]"
                    grayscale={piece.gallery !== "culinary"}
                  />
                ) : (
                  <div className="notched flex aspect-square items-center justify-center border border-[var(--rule)] bg-[var(--paper-card)]">
                    <span className="font-display text-3xl text-[var(--civic-blue)]">IMG</span>
                  </div>
                )}
            </button>
          ))}
        </div>
        </div>

        <Dialog open={!!selectedPiece} onOpenChange={() => setSelectedPiece(null)}>
          <DialogContent className="max-w-3xl overflow-hidden border-[var(--rule)] bg-[var(--paper-card)] p-0">
            <VisuallyHidden>
              <DialogTitle>{selectedPiece?.title || "Art piece"}</DialogTitle>
            </VisuallyHidden>
            {selectedPiece && (
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-soft)]">
                  {selectedPiece.image ? (
                    <img
                      src={selectedPiece.image}
                      alt={selectedPiece.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-8xl text-[var(--civic-blue)]">IMG</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="mb-1 text-2xl">{selectedPiece.title}</h3>
                  <p className="small-label mb-3">{selectedPiece.date}</p>
                  {selectedPiece.description && (
                    <p className="leading-7 text-[var(--ink-muted)]">{selectedPiece.description}</p>
                  )}
                  {selectedPiece.url && (
                    <a
                      href={selectedPiece.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--civic-blue)] hover:underline"
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
    </SectionBand>
  );
}
