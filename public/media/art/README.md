# Art video files

Put locally hosted art videos, posters, and captions in this folder, then add the project to `src/data/artPortfolio.ts`. There is no upload screen in the site.

Use lowercase, descriptive, hyphenated names. Vertical video should normally be 9:16 at 1080 × 1920 or 720 × 1280. Every video needs a local poster; meaningful speech also needs a WebVTT captions file.

```text
flow-study-silk-fans-2026.mp4
flow-study-silk-fans-2026.webm
flow-study-silk-fans-2026-poster.webp
flow-study-silk-fans-2026-captions.vtt
```

Keep short videos around 3–8 MB when possible. Use H.264 MP4 for broad support and add a VP9 WebM version when convenient. Include `faststart` metadata in MP4 exports.

```ts
{
  id: "silk-fan-flow",
  title: "Silk fan flow",
  practice: "movement",
  medium: "Cirque / moving image",
  year: "2026",
  description: "A silk fan flow sequence.",
  featured: true,
  storyOrder: 1,
  layout: "tall",
  media: [{
    kind: "video",
    sources: [
      { src: "/media/art/flow-study-silk-fans-2026.webm", type: "video/webm" },
      { src: "/media/art/flow-study-silk-fans-2026.mp4", type: "video/mp4" },
    ],
    poster: "/media/art/flow-study-silk-fans-2026-poster.webp",
    alt: "Alexa practicing a silk fan flow sequence",
    width: 1080,
    height: 1920,
    captions: {
      src: "/media/art/flow-study-silk-fans-2026-captions.vtt",
      label: "English",
      language: "en",
    },
  }],
}
```

Videos remain posters until the visitor chooses Play.

## Instagram

Instagram projects also require a local poster. The site never loads an Instagram iframe; it shows the poster and links to the original post or Reel.

```ts
media: [{
  kind: "instagram",
  url: "https://www.instagram.com/reel/REPLACE_WITH_REAL_CODE/",
  postType: "reel",
  poster: "/media/art/flow-reel-2026-poster.webp",
  alt: "Portrait poster frame from a flow sequence",
  width: 1080,
  height: 1920,
}]
```
