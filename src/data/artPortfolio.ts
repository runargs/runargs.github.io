export type ArtPractice = "ceramics" | "food" | "collaboration" | "movement";
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
  source?: { label: string; url: string };
}

export const practiceLabels: Record<ArtPractice, string> = {
  ceramics: "Ceramics",
  food: "Food & gatherings",
  collaboration: "Photography & image",
  movement: "Movement",
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
): ArtMedia => ({ kind: "instagram", url, poster, alt, width, height, postType });

export const artProjects: ArtProject[] = [
  {
    id: "gallery-tasting",
    title: "Gallery tasting series",
    practice: "food",
    medium: "Event dining",
    year: "2024–2025",
    description: "Filipino-inspired small bites for ArtWRKD, designed for a room full of people moving through art.",
    media: [
      image("/images/gallery-tasting-service.jpeg", "Preparing Filipino-inspired small bites during gallery service", 1179, 1179),
      image("/images/gallery-tasting-plate.jpeg", "A plated bite from the gallery tasting series", 2000, 2666),
    ],
    layout: "feature",
    featured: true,
    storyOrder: 1,
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
    id: "antipasti-table",
    title: "Antipasti table",
    practice: "food",
    medium: "Table composition",
    year: "2025",
    description: "An antipasti table arranged for a shared gathering.",
    media: [image("/images/catering-antipasti-table.jpg", "An abundant antipasti table arranged for a gathering", 1179, 1414)],
    layout: "standard",
    storyOrder: 3,
  },
  {
    id: "bond-experience",
    title: "The Bond Experience",
    practice: "food",
    medium: "Collaborative dining experience",
    year: "2025",
    description: "A collaboration with The Bond Experience and Newtown Theatre.",
    media: [instagram("https://www.instagram.com/p/DNe3tH2AEX1/", "/images/bond-experience-pastry.jpg", "Pastry from The Bond Experience dining collaboration", 1440, 1920)],
    layout: "standard",
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
    id: "private-dining",
    title: "In-home private dining",
    practice: "food",
    medium: "Private dining",
    year: "2024–present",
    description: "Local venue and in-home private dining, from the menu and prep to the feeling of being hosted well.",
    media: [image("/images/private-dining-kitchen.jpg", "Private dining preparation in a home kitchen", 2119, 3000)],
    layout: "feature",
    featured: true,
    storyOrder: 4,
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
    id: "triple-sun-spirits",
    title: "Triple Sun Spirits",
    practice: "food",
    medium: "Event catering",
    year: "2025",
    description: "A Mediterranean dining experience for a private event at Triple Sun Spirits Distillery & Speakeasy.",
    media: [image("/images/catering-triple-sun-spread.jpg", "Mediterranean catering spread at Triple Sun Spirits", 1179, 1472)],
    layout: "wide",
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
