import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ArtPage from "@/pages/ArtPage";
import { ProjectMediaDetail } from "@/components/art/ArtMedia";
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

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/art"]}>
      <Routes><Route path="/art" element={<ArtPage />} /></Routes>
    </MemoryRouter>,
  );
}

describe("ArtPage", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { callback(0); return 1; });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("renders the motion story in order with persistent shortcuts", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: /haruhay studio/i })).toBeInTheDocument();
    expect(screen.getByText(/this is my renaissance atelier; of/i)).toBeInTheDocument();
    const chapterHeadings = screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent);
    expect(chapterHeadings.slice(0, 6)).toEqual([
      "Ceramics",
      "Food & gatherings",
      "Modeling & image-making",
      "Fashion",
      "Flow arts",
      "Browse the work",
    ]);
    expect(screen.getByRole("button", { name: "Browse work" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Work with me" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /follow on instagram/i })).toHaveAttribute("href", "https://www.instagram.com/haruhay.studio/");
  });

  it("derives filters from project data and starts with a single practice selected", async () => {
    renderPage();
    expect(screen.queryByRole("button", { name: "All work" })).not.toBeInTheDocument();
    for (const practice of practices) {
      expect(screen.getByRole("button", { name: practiceLabels[practice] })).toBeInTheDocument();
    }

    const ceramicCount = artProjects.filter((project) => project.practice === "ceramics").length;
    expect(screen.getByText(`${ceramicCount} projects`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open ginkgo biloba/i })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("button", { name: /open gallery tasting series/i })).not.toBeInTheDocument());
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

  it("opens the previewed project from the Open project control", () => {
    renderPage();
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

  it("keeps an Instagram reel poster visible and opens the canonical post", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /open siopao-shaped salt jar/i }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).queryByRole("iframe")).not.toBeInTheDocument();
    const reelLink = within(dialog).getByRole("link", { name: /play reel/i });
    expect(reelLink).toHaveAttribute("href", "https://www.instagram.com/reel/DDZ-xGbPUJ6/");
    expect(reelLink).toHaveAttribute("target", "_blank");
    expect(within(dialog).getByRole("img", { name: /siopao-shaped ceramic salt jar/i })).toBeInTheDocument();
  });

  it("omits generic metadata and uses a piece-specific inquiry action", () => {
    renderPage();
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
    expect(albayMug?.media[0]).toMatchObject({
      kind: "instagram",
      url: "https://www.instagram.com/p/DbBvavGFHb0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    });
    expect(artProjects.every((project) => !("accession" in project))).toBe(true);
    expect(artProjects.every((project) => project.year !== "Year not listed")).toBe(true);
  });
});
