import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, GripHorizontal, Instagram, LayoutGrid, Mail, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProjectMediaDetail } from "@/components/art/ArtMedia";
import { DossierLink, LightsOffToggle } from "@/components/design-system/Dossier";
import {
  artProjects,
  practiceLabels,
  practices,
  projectsForStory,
  type ArtMedia,
  type ArtPractice,
  type ArtProject,
} from "@/data/artPortfolio";
import { cn } from "@/lib/utils";

type Filter = ArtPractice;

const inquiryBase = "mailto:alexa.thoennes@gmail.com";
const chapterCopy: Record<ArtPractice, string> = {
  ceramics: "I make ceramics for everyday use, including homeware, culinary vessels, experimental jewelry, and hair accessories.",
  food: "I cook for galleries, events, and supper clubs.",
  collaboration: "I model and sometimes make images of my own.",
  fashion: "I style, sew, and refashion clothes, often using thrifted pieces and deadstock fabric.",
  movement: "I practice flow arts and aerial movement.",
};

const storyPractices: ArtPractice[] = ["ceramics", "food", "collaboration", "fashion", "movement"];
const practiceTagTone: Record<ArtPractice, string> = {
  ceramics: "blue",
  food: "ochre",
  collaboration: "violet",
  fashion: "green",
  movement: "blue",
};

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  target.focus({ preventScroll: true });
}

function MovingMediaPreview({ media, reduced, alt = "" }: { media: ArtMedia; reduced: boolean; alt?: string }) {
  if (media.kind === "video") {
    return (
      <video aria-label={alt || undefined} autoPlay={!reduced} muted loop playsInline preload="metadata" poster={media.poster}>
        {media.sources.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
      </video>
    );
  }
  const source = media.kind === "image" ? media.src : media.poster;
  return <img src={source} alt={alt} width={media.width} height={media.height} loading="lazy" decoding="async" />;
}

function useDesktopDrag() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 901px) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return enabled;
}

interface PaperWindowProps {
  children: React.ReactNode;
  className: string;
  label: string;
  dragEnabled: boolean;
  constraints: React.RefObject<HTMLDivElement>;
  zIndex: number;
  onRaise: () => void;
}

function PaperWindow({ children, className, label, dragEnabled, constraints, zIndex, onRaise }: PaperWindowProps) {
  return (
    <motion.section
      className={cn("art-paper-window", className)}
      drag={dragEnabled}
      dragConstraints={constraints}
      dragMomentum={false}
      onPointerDown={onRaise}
      onFocusCapture={onRaise}
      style={{ zIndex }}
      initial={{ opacity: 0, clipPath: "inset(48% 48% 48% 48%)" }}
      animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.58, ease: [0.2, 0.8, 0.2, 1] }}
      aria-label={label}
    >
      <header className="art-window-bar">
        <span>{label}</span>
        <GripHorizontal aria-hidden="true" />
      </header>
      {children}
    </motion.section>
  );
}

function OpeningScene({ reduced }: { reduced: boolean }) {
  const [activePractice, setActivePractice] = useState<ArtPractice>("ceramics");
  const [resetKey, setResetKey] = useState(0);
  const [layerOrder, setLayerOrder] = useState({ media: 4, practices: 3, note: 2 });
  const stageRef = useRef<HTMLDivElement>(null);
  const desktopDrag = useDesktopDrag() && !reduced;
  const featured = projectsForStory(activePractice)[0];
  const media = featured?.media[0];
  const raise = (windowName: keyof typeof layerOrder) => setLayerOrder((current) => ({ ...current, [windowName]: Math.max(...Object.values(current)) + 1 }));

  return (
    <section className={cn("art-desktop-hero", `hero-practice-${activePractice}`)} aria-labelledby="art-page-title">
      <div className="art-desktop-title">
        <p>This is my renaissance atelier; of</p>
        <h1 id="art-page-title">Haruhay <span>Studio</span></h1>
      </div>

      <img
        className="art-hero-pixel-model"
        src="/images/pixel-art-model-transparent.png"
        alt=""
        aria-hidden="true"
        width="821"
        height="1915"
      />

      <div ref={stageRef} className="art-desktop-stage">
        <PaperWindow key={`media-${resetKey}`} className="art-media-window" label={`${practiceLabels[activePractice]} // open`} dragEnabled={desktopDrag} constraints={stageRef} zIndex={layerOrder.media} onRaise={() => raise("media")}>
          <div className="art-hero-media-stage">
            <AnimatePresence mode="wait" initial={false}>
              {media?.kind === "video" ? (
                <motion.video
                  key={featured.id}
                  aria-label={media.alt}
                  autoPlay={!reduced}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  initial={{ clipPath: "inset(0 50% 0 50%)", scale: 1.08 }}
                  animate={{ clipPath: "inset(0 0% 0 0%)", scale: 1 }}
                  exit={{ clipPath: "inset(50% 0 50% 0)", scale: 1.03 }}
                  transition={{ duration: reduced ? 0 : 0.48, ease: [0.22, 0.78, 0.2, 1] }}
                >
                  {media.sources.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
                </motion.video>
              ) : media ? (
                <motion.img
                  key={featured.id}
                  src={media.kind === "image" ? media.src : media.poster}
                  alt={media.alt}
                  width={media.width}
                  height={media.height}
                  initial={{ clipPath: "inset(0 50% 0 50%)", scale: 1.08 }}
                  animate={{ clipPath: "inset(0 0% 0 0%)", scale: 1 }}
                  exit={{ clipPath: "inset(50% 0 50% 0)", scale: 1.03 }}
                  transition={{ duration: reduced ? 0 : 0.48, ease: [0.22, 0.78, 0.2, 1] }}
                />
              ) : activePractice === "fashion" ? (
                <motion.div key="fashion-field" className="art-fashion-field" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <img src="/images/atelier-diagram-texture.jpg" alt="" />
                  <span className="fashion-pattern fashion-pattern-one" />
                  <span className="fashion-pattern fashion-pattern-two" />
                </motion.div>
              ) : (
                <motion.div key="movement-field" className="art-hero-movement" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span /><span /><span />
                  <img src="/images/clip-circuit-board-engraving.png" alt="" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <footer><span>{featured?.title ?? "Flow arts in progress"}</span><span>{featured?.year ?? "new practice"}</span></footer>
        </PaperWindow>

        <PaperWindow key={`practices-${resetKey}`} className="art-practice-window" label="practice.select" dragEnabled={desktopDrag} constraints={stageRef} zIndex={layerOrder.practices} onRaise={() => raise("practices")}>
          <div className="art-practice-menu" role="group" aria-label="Choose a creative practice">
            {storyPractices.map((practice, index) => (
              <button key={practice} type="button" aria-pressed={activePractice === practice} onClick={() => setActivePractice(practice)}>
                <span>0{index + 1}</span>{practiceLabels[practice]}
              </button>
            ))}
          </div>
        </PaperWindow>

        <PaperWindow key={`note-${resetKey}`} className="art-note-window" label="read-me.txt" dragEnabled={desktopDrag} constraints={stageRef} zIndex={layerOrder.note} onRaise={() => raise("note")}>
          <div className="art-hero-note-copy">
            <p>I make ceramics, cook for gatherings, sew and refashion clothes, model, and practice flow arts.</p>
            <p>This is a growing collection of finished work, experiments, and moments from the process.</p>
            {desktopDrag && <button type="button" onClick={() => { setResetKey((key) => key + 1); setLayerOrder({ media: 4, practices: 3, note: 2 }); }}><RotateCcw aria-hidden="true" /> Reset windows</button>}
          </div>
        </PaperWindow>
      </div>

      <button type="button" onClick={() => scrollToId("story-ceramics")} className="art-scroll-cue">
        Enter the work <ArrowDown aria-hidden="true" />
      </button>
    </section>
  );
}

interface ChapterTrackProps {
  projects: ArtProject[];
  progress: MotionValue<number>;
  reduced: boolean;
}

function ChapterTrack({ projects, progress, reduced }: ChapterTrackProps) {
  const x = useTransform(
    progress,
    [0.08, 0.88],
    projects.length === 1 ? ["-50%", "-50%"] : reduced ? ["0%", "0%"] : ["7%", projects.length > 3 ? "-58%" : "-36%"],
  );
  const reveal = useTransform(progress, [0, 0.18, 0.82, 1], reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]);

  return (
    <motion.div className={cn("art-chapter-track", projects.length === 1 && "is-single")} style={{ x, y: "-50%", opacity: reveal }}>
      {projects.map((project, index) => {
        const media = project.media[0];
        return (
          <figure className={cn("art-track-frame", "notched", index % 2 === 1 && "is-lower")} key={project.id}>
            <div className="art-track-image-wrap">
              <MovingMediaPreview media={media} reduced={reduced} alt={media.alt} />
            </div>
            <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{project.title}</figcaption>
          </figure>
        );
      })}
    </motion.div>
  );
}

function MovementField({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  const rotate = useTransform(progress, [0, 1], reduced ? [0, 0] : [-18, 42]);
  const scale = useTransform(progress, [0, 0.5, 1], reduced ? [1, 1, 1] : [0.6, 1, 1.25]);
  const opacity = useTransform(progress, [0, 0.18, 0.86, 1], reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]);

  return (
    <motion.div className="art-flow-field" style={{ rotate, scale, opacity }} aria-hidden="true">
      <span className="flow-orbit flow-orbit-one" />
      <span className="flow-orbit flow-orbit-two" />
      <span className="flow-orbit flow-orbit-three" />
      <img src="/images/clip-circuit-board-engraving.png" alt="" />
    </motion.div>
  );
}

function FashionField() {
  return (
    <div className="art-fashion-story-field" aria-hidden="true">
      <img src="/images/atelier-diagram-texture.jpg" alt="" />
      <span className="fashion-pattern fashion-pattern-one" />
      <span className="fashion-pattern fashion-pattern-two" />
      <span className="fashion-stitch-line" />
    </div>
  );
}

function StoryChapter({ practice, index, reduced }: { practice: ArtPractice; index: number; reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const projects = projectsForStory(practice).slice(0, 4);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 0.42, 0.72, 1], reduced ? [0, 0, 0, 0] : [70, 0, -10, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id={`story-${practice}`} className={cn("art-story-chapter", `chapter-${practice}`)} aria-labelledby={`story-title-${practice}`} tabIndex={-1}>
      <div className="art-scene-sticky art-chapter-stage">
        <motion.div className="art-chapter-copy notched" style={{ y: copyY, opacity: copyOpacity }}>
          <span className="font-pixel">0{index + 1}</span>
          <h2 id={`story-title-${practice}`}>{practiceLabels[practice]}</h2>
          <p>{chapterCopy[practice]}</p>
        </motion.div>

        <div className="art-chapter-composition">
          {projects.length > 0 && <ChapterTrack projects={projects} progress={scrollYProgress} reduced={reduced} />}
          {projects.length === 0 && practice === "fashion" && <FashionField />}
          {projects.length === 0 && practice === "movement" && <MovementField progress={scrollYProgress} reduced={reduced} />}
        </div>
        <div className="art-chapter-rule" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>
      </div>
    </section>
  );
}

function projectAction(project: ArtProject, activeMedia: ArtMedia) {
  const instagram = activeMedia.kind === "instagram" ? activeMedia : undefined;
  if (instagram?.kind === "instagram") {
    return {
      label: instagram.postType === "reel" ? "Watch on Instagram" : "View post on Instagram",
      url: instagram.url,
    };
  }
  if (project.source) return project.source;
  if (project.practice === "ceramics") {
    return { label: "Ask about a commission", url: `${inquiryBase}?subject=${encodeURIComponent(`Ceramics inquiry: ${project.title}`)}` };
  }
  if (project.practice === "food") {
    return { label: "Plan a dinner or event", url: `${inquiryBase}?subject=${encodeURIComponent(`Food and event inquiry: ${project.title}`)}` };
  }
  return null;
}

function ArchiveBrowser({ projects, onSelect, reduced }: { projects: ArtProject[]; onSelect: (project: ArtProject) => void; reduced: boolean }) {
  const [previewId, setPreviewId] = useState(projects[0]?.id ?? "");
  const wheelDeltaRef = useRef(0);
  const archiveLayoutRef = useRef<HTMLDivElement>(null);
  const preview = projects.find((project) => project.id === previewId) ?? projects[0];

  useEffect(() => {
    if (!projects.some((project) => project.id === previewId)) setPreviewId(projects[0]?.id ?? "");
  }, [previewId, projects]);

  const previewMedia = preview?.media[0];

  useEffect(() => {
    const layout = archiveLayoutRef.current;
    if (!layout || projects.length < 2) return;

    const handleListWheel = (event: WheelEvent) => {
      const normalizedDelta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 120 : 1);
      if (normalizedDelta === 0) return;

      const direction = normalizedDelta > 0 ? 1 : -1;
      const currentIndex = Math.max(0, projects.findIndex((project) => project.id === previewId));
      const atBoundary = (direction > 0 && currentIndex === projects.length - 1) || (direction < 0 && currentIndex === 0);
      if (atBoundary) {
        wheelDeltaRef.current = 0;
        return;
      }

      event.preventDefault();
      wheelDeltaRef.current += normalizedDelta;
      if (Math.abs(wheelDeltaRef.current) < 32) return;

      const nextIndex = Math.min(projects.length - 1, Math.max(0, currentIndex + direction));
      wheelDeltaRef.current = 0;
      setPreviewId(projects[nextIndex].id);
    };

    layout.addEventListener("wheel", handleListWheel, { passive: false });
    return () => layout.removeEventListener("wheel", handleListWheel);
  }, [previewId, projects]);

  const resetWheelGesture = () => {
    wheelDeltaRef.current = 0;
  };

  return (
    <section className="art-archive-window notched" aria-label="Creative projects">
      <header className="art-window-bar"><span>creative-work.db</span><span>{projects.length} records</span></header>
      {projects.length === 0 ? (
        <div className="art-archive-empty">
          <img src="/images/atelier-diagram-texture.jpg" alt="" />
          <div><p className="font-pixel">Fashion</p><h3>Photos are coming.</h3></div>
        </div>
      ) : (
      <div ref={archiveLayoutRef} className="art-archive-layout" onMouseLeave={resetWheelGesture}>
        <div className="art-archive-list">
          {projects.map((project, index) => {
            const itemMedia = project.media[0];
            return (
              <motion.button
                layout
                key={project.id}
                type="button"
                className="art-archive-row"
                aria-label={`Open ${project.title}`}
                aria-current={preview?.id === project.id ? "true" : undefined}
                onMouseEnter={() => setPreviewId(project.id)}
                onFocus={() => setPreviewId(project.id)}
                onClick={() => onSelect(project)}
              >
                <span className="art-archive-mobile-media"><MovingMediaPreview media={itemMedia} reduced={reduced} /></span>
                <span className="art-archive-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="art-archive-title">{project.title}</span>
                <span className="art-archive-practice">{practiceLabels[project.practice]}</span>
                <span className="art-archive-year">{project.year ?? ""}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="art-archive-preview" aria-live="polite">
          <div className="art-archive-preview-stage">
            <AnimatePresence mode="wait" initial={false}>
              {preview && previewMedia && (
                <motion.button
                  key={preview.id}
                  type="button"
                  onClick={() => onSelect(preview)}
                  aria-label={`Open ${preview.title}`}
                  initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0.4 }}
                  animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
                  exit={{ clipPath: "inset(50% 0 50% 0)", opacity: 0.2 }}
                  transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.76, 0.2, 1] }}
                >
                  <MovingMediaPreview media={previewMedia} reduced={reduced} alt={previewMedia.alt} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          {preview && (
            <footer>
              <div><h3>{preview.title}</h3><p>{preview.medium}</p></div>
              <button type="button" onClick={() => onSelect(preview)}>
                Open project <ArrowRight aria-hidden="true" />
              </button>
            </footer>
          )}
        </div>
      </div>
      )}
    </section>
  );
}

interface ProjectViewerProps {
  project: ArtProject | null;
  projects: ArtProject[];
  onSelect: (project: ArtProject | null) => void;
}

function ProjectViewer({ project, projects, onSelect }: ProjectViewerProps) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const projectIndex = project ? projects.findIndex((item) => item.id === project.id) : -1;

  useEffect(() => {
    setMediaIndex(0);
    setActiveVideoId(null);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && projectIndex > 0) onSelect(projects[projectIndex - 1]);
      if (event.key === "ArrowRight" && projectIndex < projects.length - 1) onSelect(projects[projectIndex + 1]);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onSelect, project, projectIndex, projects]);

  const media = project?.media[mediaIndex];
  const action = project && media ? projectAction(project, media) : null;

  return (
    <Dialog open={Boolean(project)} onOpenChange={(open) => !open && onSelect(null)}>
      <DialogContent className="art-project-viewer notched">
        {project && media && (
          <div className="art-viewer-grid">
            <div className="art-viewer-media-column">
              <motion.div className="art-viewer-media" layoutId={reduced ? undefined : `art-project-${project.id}`}>
                <ProjectMediaDetail
                  media={media}
                  mediaId={`${project.id}-${mediaIndex}`}
                  activeVideoId={activeVideoId}
                  onActivateVideo={setActiveVideoId}
                />
              </motion.div>
              {project.media.length > 1 && (
                <div className="art-media-thumbnails" aria-label="Choose project image">
                  {project.media.map((item, index) => {
                    const src = item.kind === "image" ? item.src : item.poster;
                    return (
                      <button key={`${project.id}-${index}`} type="button" aria-pressed={mediaIndex === index} onClick={() => { setMediaIndex(index); setActiveVideoId(null); }}>
                        <img src={src} alt="" />
                        <span className="sr-only">Media {index + 1}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="art-viewer-copy">
              <DialogTitle>{project.title}</DialogTitle>
              <p className="art-viewer-meta">{[project.year, project.medium].filter(Boolean).join(" · ")}</p>
              <DialogDescription className={project.description ? undefined : "sr-only"}>
                {project.description ?? `${project.medium} project.`}
              </DialogDescription>
              {project.credit && <p className="art-viewer-credit">{project.credit}</p>}
              {action && (
                <a href={action.url} target={action.url.startsWith("http") ? "_blank" : undefined} rel={action.url.startsWith("http") ? "noopener noreferrer" : undefined} className="art-viewer-action">
                  {action.label} {action.url.startsWith("http") && <ExternalLink aria-hidden="true" />}
                </a>
              )}
              <div className="art-viewer-pagination">
                <button type="button" onClick={() => projectIndex > 0 && onSelect(projects[projectIndex - 1])} disabled={projectIndex <= 0} aria-label="Previous project"><ArrowLeft /></button>
                <span>{projectIndex + 1} / {projects.length}</span>
                <button type="button" onClick={() => projectIndex < projects.length - 1 && onSelect(projects[projectIndex + 1])} disabled={projectIndex >= projects.length - 1} aria-label="Next project"><ArrowRight /></button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function ArtPage() {
  const [filter, setFilter] = useState<Filter>("ceramics");
  const [selectedProject, setSelectedProject] = useState<ArtProject | null>(null);
  const [navCompact, setNavCompact] = useState(false);
  const reduced = Boolean(useReducedMotion());
  const filteredProjects = useMemo(
    () => artProjects.filter((project) => project.practice === filter),
    [filter],
  );

  useEffect(() => {
    const previousTitle = document.title;
    const entryScrollY = window.scrollY;
    document.body.classList.add("art-page-active");
    window.scrollTo(0, 0);
    document.title = "Creative work — Alexa Thoennes";
    return () => {
      document.title = previousTitle;
      document.body.classList.remove("art-page-active");
      window.requestAnimationFrame(() => window.scrollTo(0, entryScrollY));
    };
  }, []);

  useEffect(() => {
    const updateNavigation = () => setNavCompact(window.scrollY > 96);
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => window.removeEventListener("scroll", updateNavigation);
  }, []);

  return (
    <LayoutGroup>
      <div className="art-motion-page">
        <nav className={cn("art-motion-nav", navCompact && "is-compact")} aria-label="Creative work navigation">
          <Link to="/" aria-label="Back to Alexa Thoennes"><ArrowLeft aria-hidden="true" /><span className="art-nav-label">Alexa</span></Link>
          <div>
            <button type="button" aria-label="Browse gallery" onClick={() => scrollToId("work-index")}><LayoutGrid aria-hidden="true" /><span className="art-nav-label">Browse gallery</span></button>
            <button type="button" aria-label="Work with me" onClick={() => scrollToId("art-inquiry")}><Mail aria-hidden="true" /><span className="art-nav-label">Inquiry</span></button>
            <LightsOffToggle />
          </div>
        </nav>

        <main>
          <OpeningScene reduced={reduced} />
          {storyPractices.map((practice, index) => <StoryChapter key={practice} practice={practice} index={index} reduced={reduced} />)}

          <section id="work-index" className="art-work-index" aria-labelledby="work-index-title" tabIndex={-1}>
            <header className="art-index-header">
              <div>
                <p className="font-pixel">the work / growing</p>
                <h2 id="work-index-title">Browse the work</h2>
              </div>
              <p>Images, meals, objects, collaborations, and moving work live together here.</p>
            </header>

            <div className="art-filter-row" role="group" aria-label="Filter creative work">
              {practices.map((practice) => (
                <button
                  key={practice}
                  type="button"
                  aria-pressed={filter === practice}
                  className={cn("evidence-link-badge", practiceTagTone[practice], filter === practice && "is-active")}
                  onClick={() => setFilter(practice)}
                >
                  {practiceLabels[practice]}
                </button>
              ))}
              <span aria-live="polite">{filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}</span>
            </div>

            <div className="art-archive-scroll-region">
              <ArchiveBrowser projects={filteredProjects} onSelect={setSelectedProject} reduced={reduced} />
            </div>
          </section>

          <footer id="art-inquiry" className="art-motion-footer" tabIndex={-1}>
            <div>
              <p className="font-pixel">commissions / private dining / collaborations</p>
              <h2>Interested in working together?</h2>
            </div>
            <div>
              <DossierLink href={`${inquiryBase}?subject=Creative%20work%20inquiry`} className="art-footer-primary"><Mail /> Send an email</DossierLink>
              <DossierLink href="https://www.instagram.com/haruhay.studio/" target="_blank" rel="noopener noreferrer"><Instagram /> Follow on Instagram</DossierLink>
            </div>
          </footer>
        </main>

        <ProjectViewer project={selectedProject} projects={filteredProjects} onSelect={setSelectedProject} />
      </div>
    </LayoutGroup>
  );
}
