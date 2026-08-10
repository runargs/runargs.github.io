import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ArtPage from "@/pages/ArtPage";
import { ProjectMediaDetail } from "@/components/art/ArtMedia";
import { TooltipProvider } from "@/components/ui/tooltip";
import { artProjects, practiceLabels, practices, type ArtMedia } from "@/data/artPortfolio";

const localVideo: ArtMedia = {
  kind: "video",
  sources: [
    { src: "/media/art/test-study.webm", type: "video/webm" },
    { src: "/media/art/test-study.mp4", type: "video/mp4" },
  ],
  poster: "/media/art/test-study-poster.webp",
  alt: "A test portrait movement study",
  width: 1080,
  height: 1920,
  captions: { src: "/media/art/test-study.vtt", language: "en", label: "English" },
};

function renderPage(initialEntry = "/art") {
  return render(
    <TooltipProvider delayDuration={0}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes><Route path="/art" element={<ArtPage />} /></Routes>
      </MemoryRouter>
    </TooltipProvider>,
  );
}

describe("ArtPage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.stubGlobal("scrollTo", vi.fn());
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { callback(0); return 1; });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("keeps media muted until sound is explicitly enabled", () => {
    renderPage();
    const practiceMenu = screen.getByRole("group", { name: "Choose a creative practice" });
    fireEvent.click(within(practiceMenu).getByRole("button", { name: /cirque arts/i }));
    const soundToggle = screen.getByRole("button", { name: "Sound off" });
    expect(soundToggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(soundToggle);
    expect(screen.getByRole("button", { name: "Sound on" })).toHaveAttribute("aria-pressed", "true");
    expect(window.sessionStorage.getItem("haruhay-media-sound")).toBe("on");
  });

  it("opens a linked practice at its story section", () => {
    renderPage("/art?section=fashion");
    expect(document.getElementById("story-fashion")?.scrollIntoView).toHaveBeenCalledWith({ block: "start" });
  });

  it("uses the vineyard toast video as the food hero", () => {
    renderPage();
    const heroVideo = screen.getByLabelText("Guests raising glasses in a toast across the vineyard dinner table");
    expect(heroVideo.tagName).toBe("VIDEO");
    expect(heroVideo.querySelector("source")).toHaveAttribute("src", "/media/art/vineyard-dinner-toast.m4v");
  });

  it("includes both Cirque arts projects in the story film roll", () => {
    renderPage();
    expect(screen.getAllByLabelText("LED poi practice in motion").length).toBeGreaterThan(0);
    expect(screen.getByAltText("Aerial silks movement silhouetted against the sky")).toBeInTheDocument();
  });

  it("renders the creative readme as linked source notes with full citation tooltips", async () => {
    renderPage();
    expect(screen.getByText("read-me.md")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source 3:.*Body Movement as Material/i })).toHaveAttribute(
      "href",
      "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1510409",
    );
    expect(screen.getByRole("list", { name: /how my creative practices overlap/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /source 1:.*the food lab/i })).toHaveAttribute("href", "https://www.kenjilopezalt.com/books");
    expect(screen.getByText(/knowledge networks compound across domains/i)).toBeInTheDocument();
    const movementSource = screen.getByRole("link", { name: /source 4: gippert/i });
    expect(movementSource).toHaveAttribute("href", "https://www.pnas.org/doi/10.1073/pnas.2423642122");
    fireEvent.focus(movementSource);
    await waitFor(() => expect(screen.getAllByRole("tooltip").some((tooltip) => (
      tooltip.textContent?.includes("Motor imagery enhances performance beyond the imagined action")
    ))).toBe(true));
    expect(screen.getByText(/movement keeps sequence, timing, and space embodied/i)).toBeInTheDocument();
  });

  it("renders the motion story and guides a visitor through the inquiry brief", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: /haruhay studio/i })).toBeInTheDocument();
    expect(screen.getByText(/this is my renaissance atelier; of/i)).toBeInTheDocument();
    const practiceMenu = screen.getByRole("group", { name: "Choose a creative practice" });
    expect(within(practiceMenu).getAllByRole("button").map((button) => button.textContent)).toEqual([
      "01Food & gatherings",
      "02Ceramics",
      "03Fashion",
      "04Modeling & image-making",
      "05Cirque arts",
    ]);
    const chapterHeadings = screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent);
    expect(chapterHeadings.slice(0, 6)).toEqual([
      "Food & gatherings",
      "Ceramics",
      "Fashion",
      "Modeling & image-making",
      "Cirque arts",
      "Browse the work",
    ]);
    expect(screen.getByRole("button", { name: "Browse gallery" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start an inquiry" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /follow haruhay studio/i })).toHaveAttribute("href", "https://www.instagram.com/haruhay.studio/");
    expect(screen.getByRole("group", { name: "Inquiry type" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: /speaking & workshops/i }));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByRole("textbox", { name: "Organization or project" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Location or venue" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /budget range/i })).toBeInTheDocument();
    const details = screen.getByRole("textbox", { name: "Project details" });
    expect(details).toBeRequired();
    fireEvent.change(details, { target: { value: "A product leadership talk for our annual gathering." } });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByRole("textbox", { name: "Name" })).toBeRequired();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeRequired();
    expect(screen.getByText("Speaking & workshops", { selector: ".art-contact-summary strong" })).toBeInTheDocument();
  });

  it("derives filters from project data and starts with a single practice selected", async () => {
    renderPage();
    expect(screen.queryByRole("button", { name: "All work" })).not.toBeInTheDocument();
    for (const practice of practices) {
      expect(screen.getByRole("button", { name: practiceLabels[practice] })).toBeInTheDocument();
    }

    expect(screen.getAllByRole("button", { name: /open field and fire/i }).length).toBeGreaterThan(0);
    await waitFor(() => expect(screen.queryByRole("button", { name: /open ginkgo biloba/i })).not.toBeInTheDocument());
  });

  it("updates the archive preview media when a Fashion project is hovered", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Fashion" }));
    fireEvent.mouseEnter(screen.getByRole("button", { name: /open ceramic bangles/i }));
    await waitFor(() => expect(screen.getByRole("img", { name: "Handmade ceramic bangles" })).toHaveAttribute(
      "src",
      "/media/art/instagram-ceramic-bangles-full.jpg",
    ));
  });

  it("resets and updates the archive preview when a new practice is browsed", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Food & gatherings" }));
    fireEvent.mouseEnter(screen.getByRole("button", { name: /open outdoor dining/i }));
    await waitFor(() => expect(screen.getByRole("img", { name: /tables and chairs arranged/i })).toHaveAttribute(
      "src",
      "/media/art/outdoor-dinner-tables.png",
    ));
  });

  it("opens related food media from one hovered gallery record", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Food & gatherings" }));
    const vineyardDinner = screen.getAllByRole("button", { name: /open field and fire/i })
      .find((button) => button.classList.contains("art-archive-row"))!;
    fireEvent.mouseEnter(vineyardDinner);
    await waitFor(() => expect(screen.getAllByRole("img", { name: /leaf-wrapped fish/i }).some((image) => (
      image.getAttribute("src") === "/media/art/vineyard-dinner-leaf-wrapped-fish.jpg"
    ))).toBe(true));
    const mosaic = screen.getByLabelText("Field and Fire gallery, 5 items");
    expect(mosaic.querySelectorAll("img")).toHaveLength(4);
    expect(within(mosaic).getByRole("img", { name: /three-person culinary team/i })).toHaveClass("is-right-aligned");
    expect(within(mosaic).queryByRole("img", { name: /raising glasses/i })).not.toBeInTheDocument();
    expect(within(mosaic).getByText("+1")).toBeInTheDocument();
    fireEvent.click(vineyardDinner);
    expect(screen.getByRole("dialog").querySelector(".art-media-thumbnails")?.children).toHaveLength(5);
  });

  it("shows a thumbnail for every creative DB record", () => {
    const { container } = renderPage();
    const rows = Array.from(container.querySelectorAll(".art-archive-row"));
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((row) => row.querySelector(".art-archive-mobile-media img"))).toBe(true);
  });

  it("steps through archive previews when the project listing is wheeled", async () => {
    const { container } = renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Ceramics" }));
    const listing = container.querySelector(".art-archive-layout");
    const archiveWindow = container.querySelector<HTMLElement>(".art-archive-sticky");
    expect(listing).not.toBeNull();
    expect(archiveWindow).not.toBeNull();
    vi.spyOn(archiveWindow!, "getBoundingClientRect").mockReturnValue({ top: 240 } as DOMRect);
    fireEvent.wheel(listing!, { deltaY: 80, deltaMode: 0 });
    expect(screen.queryByRole("img", { name: "Handmade Appa ceramic mug" })).not.toBeInTheDocument();
    vi.spyOn(archiveWindow!, "getBoundingClientRect").mockReturnValue({ top: 0 } as DOMRect);
    fireEvent.wheel(listing!, { deltaY: 80, deltaMode: 0 });
    await waitFor(() => expect(screen.getByRole("img", { name: "Handmade Appa ceramic mug" })).toBeInTheDocument());
    fireEvent.mouseLeave(listing!);
    expect(screen.getByRole("img", { name: "Handmade Appa ceramic mug" })).toBeInTheDocument();
  });

  it("opens the previewed project from the Open project control", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Ceramics" }));
    fireEvent.click(screen.getByRole("button", { name: /open project/i }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: /albay mug/i })).toBeInTheDocument();
  });

  it("uses a local Instagram poster and a contextual link instead of an iframe", () => {
    renderPage();
    expect(screen.queryByRole("iframe")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Modeling & image-making" }));
    fireEvent.click(screen.getByRole("button", { name: /open red light portrait/i }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("img", { name: "Portrait under saturated red light" })).toHaveAttribute("src", "/images/portrait-study-red-light.jpg");
    expect(within(dialog).getByRole("link", { name: /view post on instagram/i })).toHaveAttribute("href", "https://www.instagram.com/p/CNAOVNKn4DJ/");
    expect(within(dialog).queryByRole("iframe")).not.toBeInTheDocument();
    expect(within(dialog).queryByText(/undated/i)).not.toBeInTheDocument();
  });

  it("plays an Instagram reel locally and keeps the canonical source link", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Ceramics" }));
    fireEvent.click(screen.getByRole("button", { name: /open siopao-shaped salt jar/i }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).queryByRole("iframe")).not.toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: /play reel/i }));
    const reel = within(dialog).getByLabelText(/siopao-shaped ceramic salt jar/i);
    expect(reel.tagName).toBe("VIDEO");
    expect(reel.querySelector("source")).toHaveAttribute("src", "/media/art/instagram-reel-DDZ-xGbPUJ6.mp4");
    expect(within(dialog).getByRole("link", { name: /watch on instagram/i })).toHaveAttribute("href", "https://www.instagram.com/reel/DDZ-xGbPUJ6/");
  });

  it("omits generic metadata and uses a piece-specific inquiry action", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Ceramics" }));
    fireEvent.click(screen.getByRole("button", { name: /open ginkgo biloba/i }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("2024 · Wheel-thrown stoneware")).toBeInTheDocument();
    expect(within(dialog).queryByText("Practice")).not.toBeInTheDocument();
    expect(within(dialog).queryByText("Source")).not.toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /ask about a commission/i }).getAttribute("href")).toContain("Ginkgo%20biloba%20sgraffito%20bowl");
  });

  it("keeps local video behind a poster until the visitor plays it", () => {
    const onActivate = vi.fn();
    const { rerender } = render(
      <ProjectMediaDetail media={localVideo} mediaId="test-video" activeVideoId={null} onActivateVideo={onActivate} />,
    );
    expect(screen.queryByLabelText("A test portrait movement study")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /play video/i }));
    expect(onActivate).toHaveBeenCalledWith("test-video");

    rerender(<ProjectMediaDetail media={localVideo} mediaId="test-video" activeVideoId="test-video" onActivateVideo={onActivate} />);
    const video = screen.getByLabelText("A test portrait movement study");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video.querySelectorAll("source")).toHaveLength(2);
    expect(video.querySelector("track[kind='captions']")).toBeInTheDocument();
  });

  it("supports multi-media projects without placeholder dates or archive identifiers", () => {
    const mixedPottery = artProjects.find((project) => project.id === "mixed-pottery");
    const fashionProject = artProjects.find((project) => project.id === "linen-top-hair-stick");
    const outdoorDinner = artProjects.find((project) => project.id === "outdoor-dinner-service");
    const albayMug = artProjects.find((project) => project.id === "albay-mug");
    expect(mixedPottery?.media).toHaveLength(2);
    expect(fashionProject?.media.some((media) => media.kind === "video")).toBe(true);
    expect(outdoorDinner?.media.find((media) => media.kind === "instagram")).toMatchObject({
      url: "https://www.instagram.com/p/Da-y3pKjvY_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    });
    const foodProjects = artProjects.filter((project) => project.practice === "food");
    const vineyardDinner = artProjects.find((project) => project.id === "vineyard-dinner");
    expect(foodProjects).toHaveLength(9);
    expect(new Set(foodProjects.map((project) => project.galleryOrder)).size).toBe(9);
    expect(outdoorDinner?.media).toHaveLength(5);
    expect(vineyardDinner?.media).toHaveLength(5);
    expect(vineyardDinner?.media.find((media) => media.kind === "video")).toMatchObject({
      sources: [{ src: "/media/art/vineyard-dinner-toast.m4v", type: "video/mp4" }],
    });
    expect(artProjects.find((project) => project.id === "altered-apron")?.media[0]).toMatchObject({
      kind: "instagram",
      url: "https://www.instagram.com/reel/DbzgxGuuP-d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      postType: "reel",
    });
    expect(albayMug?.media[0]).toMatchObject({
      kind: "instagram",
      url: "https://www.instagram.com/p/DbBvavGFHb0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    });
    expect(artProjects.every((project) => !("accession" in project))).toBe(true);
    expect(artProjects.every((project) => project.year !== "Year not listed")).toBe(true);
  });
});
