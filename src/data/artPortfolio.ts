export type ArtPractice = "ceramics" | "food" | "collaboration" | "fashion" | "movement";
export type ArtLayout = "standard" | "wide" | "tall" | "feature";

export type ArtMedia =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | {
      kind: "video";
      sources: Array<{ src: string; type: "video/mp4" | "video/webm" }>;
      poster: string;
      alt: string;
      width: number;
      height: number;
      captions?: { src: string; label: string; language: string };
    }
  | {
      kind: "instagram";
      url: string;
      poster: string;
      postType: "post" | "reel";
      sources?: Array<{ src: string; type: "video/mp4" | "video/webm" }>;
      alt: string;
      width: number;
      height: number;
    };

export interface ArtProject {
  id: string;
  title: string;
  practice: ArtPractice;
  medium: string;
  media: ArtMedia[];
  layout: ArtLayout;
  year?: string;
  description?: string;
  credit?: string;
  featured?: boolean;
  storyOrder?: number;
  galleryOrder?: number;
  source?: { label: string; url: string };
}

export const practiceLabels: Record<ArtPractice, string> = {
  food: "Food & gatherings",
  ceramics: "Ceramics",
  fashion: "Fashion",
  movement: "Cirque arts",
  collaboration: "Modeling & image-making",
};

const image = (src: string, alt: string, width: number, height: number): ArtMedia => ({
  kind: "image", src, alt, width, height,
});

const instagram = (
  url: string,
  poster: string,
  alt: string,
  width: number,
  height: number,
  postType: "post" | "reel" = "post",
  previewSrc?: string,
): ArtMedia => ({
  kind: "instagram",
  url,
  poster,
  alt,
  width,
  height,
  postType,
  sources: previewSrc ? [{ src: previewSrc, type: "video/mp4" }] : undefined,
});

export const artProjects: ArtProject[] = [
  {
    id: "linen-top-hair-stick",
    title: "Linen top & ceramic hair stick",
    practice: "fashion",
    medium: "Hand-sewn linen & ceramic accessory",
    description: "A linen top and ceramic hair stick I made and styled. The lyocell pants shown in the video were not made by me.",
    media: [
      {
        kind: "video",
        sources: [{ src: "/media/art/linen-top-hair-stick.mp4", type: "video/mp4" }],
        poster: "/media/art/linen-top-hair-stick.jpg",
        alt: "Linen top and ceramic hair stick in motion",
        width: 720,
        height: 1280,
      },
    ],
    layout: "tall",
    featured: true,
    storyOrder: 1,
    source: { label: "View the ceramic hair stick set", url: "https://www.instagram.com/p/DYHmGMfDt9U/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  },
  {
    id: "led-poi-practice",
    title: "LED poi practice",
    practice: "movement",
    medium: "LED poi",
    description: "An outdoor LED poi practice at dusk.",
    media: [
      {
        kind: "video",
        sources: [{ src: "/media/art/flow-art.mp4", type: "video/mp4" }],
        poster: "/media/art/led-poi.jpg",
        alt: "LED poi practice in motion",
        width: 1080,
        height: 1920,
      },
    ],
    layout: "tall",
    featured: true,
    storyOrder: 1,
  },
  {
    id: "aerial-movement",
    title: "Aerial silks study",
    practice: "movement",
    medium: "Aerial silks",
    media: [image("/media/art/aerial-movement.jpg", "Aerial silks movement silhouetted against the sky", 720, 1280)],
    layout: "tall",
    featured: true,
    storyOrder: 2,
  },
  {
    id: "albay-mug",
    title: "Albay mug",
    practice: "ceramics",
    medium: "Ceramic mug",
    description: "A ceramic mug in an Albay-inspired image composition.",
    media: [instagram("https://www.instagram.com/p/DbBvavGFHb0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "/media/art/albay-mug.jpg", "Ceramic mug in an Albay-inspired image composition", 1013, 1800)],
    layout: "tall",
    featured: true,
    storyOrder: 4,
  },
  {
    id: "appa-mug",
    title: "Appa mug",
    practice: "ceramics",
    medium: "Ceramic mug",
    media: [instagram("https://www.instagram.com/p/DZvdWI8FKB8/", "/media/art/instagram-appa-mug.jpg", "Handmade Appa ceramic mug", 936, 1170)],
    layout: "tall",
  },
  {
    id: "ceramic-bangles",
    title: "Ceramic bangles",
    practice: "fashion",
    medium: "Wearable ceramics",
    media: [instagram("https://www.instagram.com/p/DZ5prZ_FMdY/", "/media/art/instagram-ceramic-bangles-full.jpg", "Handmade ceramic bangles", 941, 1166)],
    layout: "tall",
  },
  {
    id: "ceramic-hair-stick-set",
    title: "Ceramic hair stick set",
    practice: "fashion",
    medium: "Wearable ceramics",
    media: [instagram("https://www.instagram.com/p/DYHmGMfDt9U/", "/media/art/instagram-ceramic-hair-stick-set-full.jpg", "Handmade ceramic hair stick set", 1080, 1440)],
    layout: "tall",
  },
  {
    id: "altered-apron",
    title: "Altered apron",
    practice: "fashion",
    medium: "Altered clothing",
    media: [instagram("https://www.instagram.com/reel/DbzgxGuuP-d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "/media/art/altered-apron-reel-poster.jpg", "Altered apron in motion", 360, 640, "reel")],
    layout: "tall",
  },
  {
    id: "ceramic-matcha-cup",
    title: "Ceramic matcha cup",
    practice: "ceramics",
    medium: "Ceramic cup",
    media: [instagram("https://www.instagram.com/p/DMgY8VoApRp/", "/media/art/instagram-ceramic-matcha-cup-full.jpg", "Handmade ceramic matcha cup", 1080, 1350)],
    layout: "tall",
  },
  {
    id: "siopao-salt-jar",
    title: "Siopao-shaped salt jar",
    practice: "ceramics",
    medium: "Ceramic salt jar",
    media: [instagram("https://www.instagram.com/reel/DDZ-xGbPUJ6/", "/media/art/instagram-siopao-salt-jar.jpg", "Handmade siopao-shaped ceramic salt jar", 360, 640, "reel", "/media/art/instagram-reel-DDZ-xGbPUJ6.mp4")],
    layout: "tall",
  },
  {
    id: "dog-charm",
    title: "Dog charm",
    practice: "ceramics",
    medium: "Ceramic charm",
    media: [instagram("https://www.instagram.com/reel/DApRi9kAzI3/", "/media/art/instagram-dog-charm.jpg", "Handmade ceramic dog charm", 360, 640, "reel", "/media/art/instagram-reel-DApRi9kAzI3.mp4")],
    layout: "tall",
  },
  {
    id: "vineyard-dinner",
    title: "Vineyard dinner",
    practice: "food",
    medium: "Live-fire cooking",
    year: "2026",
    description: "A live-fire vineyard dinner I assisted with as part of a three-person culinary team.",
    galleryOrder: 1,
    media: [
      image("/media/art/vineyard-dinner-leaf-wrapped-fish.jpg", "Leaf-wrapped fish hanging beside grapes and onions in golden-hour light", 3264, 4912),
      image("/media/art/vineyard-dinner-place-setting.jpg", "Colorful vineyard dinner place setting with menu, flowers, glassware, and a wax-dripped bottle", 3264, 4912),
      image("/media/art/vineyard-dinner-charred-grapes.jpg", "Charred grapes being served from a silver coupe", 3264, 4912),
      {
        kind: "video",
        sources: [{ src: "/media/art/vineyard-dinner-toast.m4v", type: "video/mp4" }],
        poster: "/media/art/vineyard-dinner-toast-poster.png",
        alt: "Guests raising glasses in a toast across the vineyard dinner table",
        width: 720,
        height: 1280,
      },
      image("/media/art/vineyard-dinner-team.jpg", "Three-person culinary team beside the live-fire setup after assisting with the vineyard dinner", 4912, 3264),
    ],
    layout: "feature",
  },
  {
    id: "farm-supper-club",
    title: "Farm supper club",
    practice: "food",
    medium: "Private dining",
    galleryOrder: 2,
    media: [instagram("https://www.instagram.com/reel/DbAEJ64unUR/", "/media/art/instagram-farm-supper-club.jpg", "Farm supper club dinner service", 360, 640, "reel", "/media/art/instagram-reel-DbAEJ64unUR.mp4")],
    layout: "tall",
  },
  {
    id: "outdoor-dinner-service",
    title: "Outdoor dinner experience",
    practice: "food",
    medium: "Event dining",
    description: "An outdoor gathering from anticipation and service through dinner after dark.",
    galleryOrder: 3,
    media: [
      image("/media/art/outdoor-dinner-tables.png", "Tables and chairs arranged beneath a flower-lined canopy before an outdoor dinner", 1086, 1358),
      image("/media/art/outdoor-dinner-service.jpg", "Platters of grilled vegetables and rice prepared for outdoor dinner service", 1439, 1800),
      image("/media/art/outdoor-dinner-night.png", "Guests sharing an outdoor dinner beneath a canopy at night", 1074, 1464),
      instagram("https://www.instagram.com/p/Da-y3pKjvY_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "/media/art/outdoor-dinner-salmon.jpg", "Plating salmon for outdoor dinner service", 1440, 1800),
    ],
    layout: "feature",
    featured: true,
    storyOrder: 5,
    source: { label: "Watch the farm supper club", url: "https://www.instagram.com/reel/DbAEJ64unUR/?igsh=bnFxYWlpN2U3bmR0" },
  },
  {
    id: "gallery-tasting",
    title: "Gallery tasting series",
    practice: "food",
    medium: "Event dining",
    year: "2024–2025",
    description: "Filipino-inspired small bites for ArtWRKD, designed for a room full of people moving through art.",
    galleryOrder: 4,
    media: [
      image("/images/gallery-tasting-service.jpeg", "Preparing Filipino-inspired small bites during gallery service", 1179, 1179),
      image("/images/gallery-tasting-plate.jpeg", "A plated bite from the gallery tasting series", 2000, 2666),
      instagram("https://www.instagram.com/reel/C-QerP7A8tI/", "/media/art/instagram-art-gallery-catering.jpg", "Catering for an art gallery event", 360, 640, "reel", "/media/art/instagram-reel-C-QerP7A8tI.mp4"),
    ],
    layout: "feature",
    featured: true,
    storyOrder: 1,
    source: { label: "Watch the gallery catering", url: "https://www.instagram.com/reel/C-QerP7A8tI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  },
  {
    id: "sesame-cookies",
    title: "Chocolate sesame cookies",
    practice: "food",
    medium: "Limited baking drop",
    description: "Chocolate sesame cookies made with roasted sesame oil.",
    galleryOrder: 7,
    media: [instagram("https://www.instagram.com/reel/DJP0syfA4RF/", "/media/art/instagram-sesame-cookies.jpg", "Chocolate sesame and roasted sesame oil cookies", 360, 640, "reel", "/media/art/instagram-reel-DJP0syfA4RF.mp4")],
    layout: "tall",
  },
  {
    id: "private-dining",
    title: "In-home private dining",
    practice: "food",
    medium: "Private dining",
    year: "2024–present",
    description: "Local venue and in-home private dining, from the menu and prep to the feeling of being hosted well.",
    galleryOrder: 8,
    media: [image("/images/private-dining-kitchen.jpg", "Private dining preparation in a home kitchen", 2119, 3000)],
    layout: "feature",
    featured: true,
    storyOrder: 4,
  },
  {
    id: "triple-sun-catering",
    title: "Triple Sun Spirits catering",
    practice: "food",
    medium: "Event catering",
    year: "2025",
    description: "A Mediterranean dining experience for a private event at Triple Sun Spirits Distillery & Speakeasy.",
    galleryOrder: 9,
    media: [image("/images/catering-triple-sun-spread.jpg", "Mediterranean catering spread at Triple Sun Spirits", 1179, 1472)],
    layout: "wide",
  },
  {
    id: "filipino-suman",
    title: "Filipino suman",
    practice: "food",
    medium: "Filipino food",
    galleryOrder: 10,
    media: [instagram("https://www.instagram.com/p/DMGmzOnubv6/", "/media/art/instagram-filipino-suman-full.jpg", "Filipino suman", 1080, 1350)],
    layout: "tall",
  },
  {
    id: "ginkgo-bowl",
    title: "Ginkgo biloba sgraffito bowl",
    practice: "ceramics",
    medium: "Wheel-thrown stoneware",
    year: "2024",
    description: "Wheel-thrown ceramic work with a hand-carved botanical surface design.",
    media: [image("/images/ceramic-ginkgo-sgraffito-bowl.jpg", "Wheel-thrown bowl with a carved ginkgo biloba design", 1179, 1215)],
    layout: "standard",
    featured: true,
    storyOrder: 1,
  },
  {
    id: "flavors-of-iloilo",
    title: "Flavors of Iloilo",
    practice: "food",
    medium: "Food & ceramic serviceware",
    year: "2025",
    description: "Filipino cuisine and handmade ceramic serviceware, treating food, object, memory, and table together.",
    galleryOrder: 5,
    media: [instagram("https://www.instagram.com/p/DEv2ddPAVal/", "/images/flavors-of-iloilo-plate.jpg", "Filipino dish presented on handmade ceramic serviceware", 1440, 1800)],
    layout: "tall",
    featured: true,
    storyOrder: 2,
  },
  {
    id: "teapot",
    title: "Teapot",
    practice: "ceramics",
    medium: "Wheel-thrown ceramic",
    year: "2025",
    description: "Wheel-thrown teapot made by hand, from body and lid to handle and spout.",
    media: [instagram("https://www.instagram.com/p/DOH53lpDoK2/", "/images/ceramic-brown-teapot.jpg", "Brown handmade ceramic teapot", 1440, 1918)],
    layout: "tall",
    featured: true,
    storyOrder: 2,
  },
  {
    id: "place-setting",
    title: "Place setting",
    practice: "collaboration",
    medium: "Editorial photography",
    credit: "Photography by @delarosa_jr",
    media: [image("/images/place-setting-candle-study.jpg", "Alexa lighting a candle at a dining table", 2001, 3000)],
    layout: "tall",
    featured: true,
    storyOrder: 2,
  },
  {
    id: "happening-women",
    title: "Happening Women Awards",
    practice: "food",
    medium: "Interactive chef’s table",
    year: "2025",
    description: "Interactive canapé chef’s table for the Happening Women Award Ceremony.",
    galleryOrder: 6,
    media: [image("/images/happening-women-awards-chefs-table.jpg", "Interactive canapé chef's table at the awards ceremony", 1200, 800)],
    layout: "wide",
    source: { label: "Read the event feature", url: "https://www.happeningmag.com/happening-women-2025/" },
  },
  {
    id: "mixed-pottery",
    title: "Mixed pottery",
    practice: "ceramics",
    medium: "Mixed ceramic vessels",
    year: "2025",
    description: "A group of hand-built and wheel-thrown ceramic vessels.",
    media: [
      instagram("https://www.instagram.com/p/DN6Akntjo3y/", "/images/ceramic-mixed-vessels-overhead.jpg", "Mixed handmade ceramic vessels viewed from above", 1440, 1918),
      instagram("https://www.instagram.com/p/DN6Akntjo3y/", "/images/ceramic-green-table-setting.jpg", "Green glazed ceramic table setting", 1440, 1918),
    ],
    layout: "tall",
    featured: true,
    storyOrder: 3,
  },
  {
    id: "red-light-portrait",
    title: "Red light portrait",
    practice: "collaboration",
    medium: "Portrait photography",
    credit: "Photography by @visualsbykaitlyn",
    media: [instagram("https://www.instagram.com/p/CNAOVNKn4DJ/", "/images/portrait-study-red-light.jpg", "Portrait under saturated red light", 1080, 1350)],
    layout: "tall",
    featured: true,
    storyOrder: 1,
  },
  {
    id: "herb-garden",
    title: "Herb garden",
    practice: "collaboration",
    medium: "Editorial photography",
    credit: "Photography by @delarosa_jr",
    media: [image("/images/herb-garden-study.jpg", "Alexa gathering herbs in a garden", 2002, 3000)],
    layout: "tall",
    featured: true,
    storyOrder: 3,
  },
  {
    id: "haruhay-studio",
    title: "Haruhay Studio",
    practice: "ceramics",
    medium: "Studio identity",
    year: "2025",
    description: "A studio for ceramic work, table objects, and the small rituals around making.",
    media: [image("/images/haruhay-studio-card.jpg", "Haruhay Studio identity card", 855, 855)],
    layout: "standard",
  },
  {
    id: "magenta-portrait",
    title: "Magenta light portrait",
    practice: "collaboration",
    medium: "Portrait photography",
    credit: "Photography by @photography_by_nadia",
    media: [image("/images/portrait-study-magenta-light.jpg", "Portrait under magenta light", 3265, 4898)],
    layout: "tall",
    featured: true,
    storyOrder: 4,
  },
  {
    id: "seated-portrait",
    title: "Seated portrait",
    practice: "collaboration",
    medium: "Portrait photography",
    credit: "Photography by @visualsbykaitlyn",
    media: [instagram("https://www.instagram.com/p/CNH3F4GHG8P/", "/images/portrait-study-seated-shadow.jpg", "Seated portrait in directional shadow", 1080, 1350)],
    layout: "tall",
  },
  {
    id: "san-francisco",
    title: "San Francisco portrait",
    practice: "collaboration",
    medium: "Portrait photography",
    credit: "Photography by @alexander.aperture",
    media: [instagram("https://www.instagram.com/p/DCiDW_cJwZR/", "/images/san-francisco-portrait-study.jpg", "Portrait made in San Francisco", 1440, 1800)],
    layout: "standard",
  },
  {
    id: "green-dress",
    title: "Green dress portrait",
    practice: "collaboration",
    medium: "Portrait photography",
    media: [image("/images/green-dress-portrait.jpg", "Portrait in a green dress outdoors", 2128, 3000)],
    layout: "tall",
  },
  {
    id: "streamside-companion",
    title: "Streamside companion",
    practice: "collaboration",
    medium: "Personal photography",
    media: [image("/images/streamside-puppy.jpg", "A puppy beside a stream", 1254, 1224)],
    layout: "standard",
  },
];

export const practices = (Object.keys(practiceLabels) as ArtPractice[])
  .filter((practice) => artProjects.some((project) => project.practice === practice));

export function projectsForStory(practice: ArtPractice) {
  return artProjects
    .filter((project) => project.practice === practice && project.featured)
    .sort((a, b) => (a.storyOrder ?? 99) - (b.storyOrder ?? 99));
}
