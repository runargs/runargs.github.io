import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProjectMediaDetail, ProjectMediaPreview } from "@/components/art/ArtMedia";
import { DossierLink, LightsOffToggle } from "@/components/design-system/Dossier";
import {
  artProjects,
  practiceLabels,
  practices,
  projectsForStory,
  type ArtPractice,
  type ArtProject,
} from "@/data/artPortfolio";
import { cn } from "@/lib/utils";

type Filter = "all" | ArtPractice;

const inquiryBase = "mailto:alexa.thoennes@gmail.com";
const chapterCopy: Record<ArtPractice, string> = {
  ceramics: "I make wheel-thrown and hand-finished pieces for tables, rituals, and daily use.",
  food: "I cook for galleries, private homes, and events. The work includes the menu, the pacing, and the room around it.",
  collaboration: "I collaborate on portraits and editorial images, sometimes behind the idea and sometimes in front of the camera.",
  movement: "I recently began practicing flow arts. This chapter will grow as the movement is documented.",
};

const storyPractices: ArtPractice[] = ["ceramics", "food", "collaboration", "movement"];

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  target.focus({ preventScroll: true });
}

interface FloatingLayerProps {
  progress: MotionValue<number>;
  src: string;
  alt: string;
  className: string;
  index: number;
  reduced: boolean;
}

function FloatingLayer({ progress, src, alt, className, index, reduced }: FloatingLayerProps) {
  const directions = [
    { x: -120, y: 80 },
    { x: 130, y: -60 },
    { x: -70, y: -110 },
    { x: 90, y: 110 },
  ];
  const direction = directions[index % directions.length];
  const x = useTransform(progress, [0, 0.62, 1], reduced ? [0, 0, 0] : [direction.x, 0, direction.x * -0.16]);
  const y = useTransform(progress, [0, 0.62, 1], reduced ? [0, 0, 0] : [direction.y, 0, direction.y * -0.12]);
  const scale = useTransform(progress, [0, 0.62, 1], reduced ? [1, 1, 1] : [0.72, 1, 1.04]);
  const opacity = useTransform(progress, [0, 0.14, 0.84, 1], reduced ? [1, 1, 1, 1] : [0, 1, 1, 0.2]);
  const clipPath = useTransform(progress, [0, 0.42, 0.7], reduced ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(48% 48% 48% 48%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <motion.figure className={cn("art-floating-layer", className)} style={{ x, y, scale, opacity, clipPath }}>
      <img src={src} alt={alt} decoding="async" />
    </motion.figure>
  );
}

function OpeningScene({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const titleY = useTransform(scrollYProgress, [0, 0.75, 1], reduced ? [0, 0, 0] : [0, -34, -90]);
  const titleScale = useTransform(scrollYProgress, [0, 0.65], reduced ? [1, 1] : [1, 0.92]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.78, 1], reduced ? [1, 1, 1] : [1, 1, 0]);

  return (
    <section ref={sectionRef} className="art-opening" aria-labelledby="art-page-title">
      <div className="art-scene-sticky art-opening-stage">
        <div className="art-opening-grid" aria-hidden="true" />
        <FloatingLayer progress={scrollYProgress} index={0} className="opening-layer-one" src="/images/ceramic-ginkgo-sgraffito-bowl.jpg" alt="" reduced={reduced} />
        <FloatingLayer progress={scrollYProgress} index={1} className="opening-layer-two" src="/images/flavors-of-iloilo-plate.jpg" alt="" reduced={reduced} />
        <FloatingLayer progress={scrollYProgress} index={2} className="opening-layer-three" src="/images/portrait-study-red-light.jpg" alt="" reduced={reduced} />
        <FloatingLayer progress={scrollYProgress} index={3} className="opening-layer-four art-engraving-layer" src="/images/clip-operator-computing.png" alt="" reduced={reduced} />

        <motion.div className="art-opening-copy" style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}>
          <p className="font-pixel text-sm text-[var(--civic-blue)]">creative practice / ongoing</p>
          <h1 id="art-page-title">Art, food <span>& movement</span></h1>
          <p>I make ceramics, create meals and gatherings, collaborate on images, and recently began practicing flow arts. This is a growing collection of finished work, experiments, and moments from the process.</p>
        </motion.div>

        <button type="button" onClick={() => scrollToId("story-ceramics")} className="art-scroll-cue">
          Scroll through the practice <ArrowDown aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

interface ChapterTrackProps {
  projects: ArtProject[];
  progress: MotionValue<number>;
  reduced: boolean;
}

function ChapterTrack({ projects, progress, reduced }: ChapterTrackProps) {
  const x = useTransform(progress, [0.08, 0.88], reduced ? ["0%", "0%"] : ["7%", projects.length > 3 ? "-58%" : "-36%"]);
  const reveal = useTransform(progress, [0, 0.18, 0.82, 1], reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]);

  return (
    <motion.div className="art-chapter-track" style={{ x, y: "-50%", opacity: reveal }}>
      {projects.map((project, index) => {
        const media = project.media[0];
        const source = media.kind === "image" ? media.src : media.poster;
        return (
          <figure className={cn("art-track-frame", index % 2 === 1 && "is-lower")} key={project.id}>
            <div className="art-track-image-wrap">
              <img src={source} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" />
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

function StoryChapter({ practice, index, reduced }: { practice: ArtPractice; index: number; reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const projects = projectsForStory(practice).slice(0, 4);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 0.42, 0.72, 1], reduced ? [0, 0, 0, 0] : [70, 0, -10, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id={`story-${practice}`} className={cn("art-story-chapter", `chapter-${practice}`)} aria-labelledby={`story-title-${practice}`} tabIndex={-1}>
      <div className="art-scene-sticky art-chapter-stage">
        <motion.div className="art-chapter-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <span className="font-pixel">0{index + 1}</span>
          <h2 id={`story-title-${practice}`}>{practiceLabels[practice]}</h2>
          <p>{chapterCopy[practice]}</p>
        </motion.div>

        <div className="art-chapter-composition">
          {projects.length > 0 && <ChapterTrack projects={projects} progress={scrollYProgress} reduced={reduced} />}
          {practice === "movement" && <MovementField progress={scrollYProgress} reduced={reduced} />}
        </div>
        <div className="art-chapter-rule" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>
      </div>
    </section>
  );
}

function projectAction(project: ArtProject) {
  const instagram = project.media.find((media) => media.kind === "instagram");
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

function ProjectCard({ project, onSelect }: { project: ArtProject; onSelect: (project: ArtProject) => void }) {
  const context = project.year ?? project.medium;
  return (
    <motion.article layout className={cn("art-project-card", `layout-${project.layout}`)} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.24 }}>
      <button type="button" onClick={() => onSelect(project)} aria-label={`Open ${project.title}`}>
        <motion.div className="art-project-media" layoutId={`art-project-${project.id}`}>
          <ProjectMediaPreview project={project} />
        </motion.div>
        <div className="art-project-caption">
          <h3>{project.title}</h3>
          <p>{context}</p>
        </div>
      </button>
    </motion.article>
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

  const action = project ? projectAction(project) : null;
  const media = project?.media[mediaIndex];

  return (
    <Dialog open={Boolean(project)} onOpenChange={(open) => !open && onSelect(null)}>
      <DialogContent className="art-project-viewer">
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
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<ArtProject | null>(null);
  const reduced = Boolean(useReducedMotion());
  const filteredProjects = useMemo(
    () => filter === "all" ? artProjects : artProjects.filter((project) => project.practice === filter),
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

  return (
    <LayoutGroup>
      <div className="art-motion-page">
        <LightsOffToggle />
        <nav className="art-motion-nav" aria-label="Creative work navigation">
          <Link to="/"><ArrowLeft aria-hidden="true" /> Alexa Thoennes</Link>
          <div>
            <button type="button" onClick={() => scrollToId("work-index")}>Browse work</button>
            <button type="button" onClick={() => scrollToId("art-inquiry")}>Work with me</button>
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
              <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All work</button>
              {practices.map((practice) => (
                <button key={practice} type="button" aria-pressed={filter === practice} onClick={() => setFilter(practice)}>{practiceLabels[practice]}</button>
              ))}
              {filter !== "all" && <span aria-live="polite">{filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}</span>}
            </div>

            <motion.section layout className="art-project-grid" aria-label="Creative projects">
              <AnimatePresence initial={false}>
                {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />)}
              </AnimatePresence>
            </motion.section>
          </section>

          <footer id="art-inquiry" className="art-motion-footer" tabIndex={-1}>
            <div>
              <p className="font-pixel">commissions / private dining / collaborations</p>
              <h2>Interested in working together?</h2>
            </div>
            <div>
              <DossierLink href={`${inquiryBase}?subject=Creative%20work%20inquiry`} className="art-footer-primary"><Mail /> Send an email</DossierLink>
              <DossierLink href="https://www.instagram.com/haruhay_studio/" target="_blank" rel="noopener noreferrer"><Instagram /> Follow on Instagram</DossierLink>
            </div>
          </footer>
        </main>

        <ProjectViewer project={selectedProject} projects={filteredProjects} onSelect={setSelectedProject} />
      </div>
    </LayoutGroup>
  );
}
