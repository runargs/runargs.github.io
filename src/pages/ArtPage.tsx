import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, BookHeart, Camera, CookingPot, ExternalLink, Flame, GripHorizontal, Instagram, LayoutGrid, Mail, Mic2, Palette, Scissors, Sparkles, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProjectMediaDetail } from "@/components/art/ArtMedia";
import { CitationLink, DossierLink, LightsOffToggle } from "@/components/design-system/Dossier";
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
import { PortfolioFooter } from "@/components/layout/PortfolioFooter";

type Filter = ArtPractice;

const inquiryBase = "mailto:alexa.thoennes@gmail.com";
const chapterCopy: Record<ArtPractice, string> = {
  ceramics: "I make ceramics for everyday use, including homeware, culinary vessels, experimental jewelry, and hair accessories.",
  food: "I cook for galleries, events, and supper clubs.",
  collaboration: "I model and sometimes make images of my own.",
  fashion: "I style, sew, and refashion clothes, often using thrifted pieces and deadstock fabric.",
  movement: "I practice LED poi and have trained in aerial silks.",
};

const storyPractices: ArtPractice[] = ["food", "ceramics", "fashion", "collaboration", "movement"];
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const sources = media.kind === "video" ? media.sources : media.kind === "instagram" ? media.sources : undefined;

  if (sources?.length) {
    return (
      <video ref={videoRef} aria-label={alt || undefined} autoPlay={!reduced} muted loop playsInline preload="auto" poster={media.poster} onCanPlay={() => {
        if (!reduced) videoRef.current?.play()?.catch(() => undefined);
      }}>
        {sources.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
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
  headerAction?: React.ReactNode;
}

function PaperWindow({ children, className, label, dragEnabled, constraints, zIndex, onRaise, headerAction }: PaperWindowProps) {
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
        <span className="art-window-tools">
          {headerAction}
          <GripHorizontal aria-hidden="true" />
        </span>
      </header>
      {children}
    </motion.section>
  );
}

const creativePracticeFlow = [
  {
    label: "Cooking",
    bridge: { label: "responsiveness to materials", citation: 1, href: "https://www.kenjilopezalt.com/books", source: "López-Alt, J. K. (2015). The Food Lab: Better Home Cooking Through Science. W. W. Norton." },
  },
  {
    label: "Ceramics",
    bridge: { label: "shape / connected form", citation: 2, href: "https://www.hachette.co.uk/titles/tomoko-nakamichi/pattern-magic/9781529429909/", source: "Nakamichi, T. (2010). Pattern Magic. Laurence King Publishing." },
  },
  {
    label: "Sewing, fashion & modeling",
    bridge: { label: "using the body in the work", citation: 3, href: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1510409", source: "Lundström, A. (2020). Body Movement as Material: Designing Temporal Expressions. University of Borås." },
  },
  { label: "Cirque arts" },
] as const;

function OpeningScene({ reduced, soundEnabled, onSoundChange }: { reduced: boolean; soundEnabled: boolean; onSoundChange: (enabled: boolean) => void }) {
  const [activePractice, setActivePractice] = useState<ArtPractice>("food");
  const [resetKey, setResetKey] = useState(0);
  const [layerOrder, setLayerOrder] = useState({ media: 4, practices: 3, note: 2 });
  const stageRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
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
        <PaperWindow
          key={`media-${resetKey}`}
          className="art-media-window"
          label={`${practiceLabels[activePractice]} // open`}
          dragEnabled={desktopDrag}
          constraints={stageRef}
          zIndex={layerOrder.media}
          onRaise={() => raise("media")}
          headerAction={media?.kind === "video" ? (
            <button
              type="button"
              className="art-sound-toggle"
              aria-pressed={soundEnabled}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => {
                const next = !soundEnabled;
                onSoundChange(next);
                if (heroVideoRef.current) {
                  heroVideoRef.current.muted = !next;
                  if (next) heroVideoRef.current.play()?.catch(() => undefined);
                }
              }}
            >
              {soundEnabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
              {soundEnabled ? "Sound on" : "Sound off"}
            </button>
          ) : undefined}
        >
          <div className="art-hero-media-stage">
            <AnimatePresence mode="wait" initial={false}>
              {media?.kind === "video" ? (
                <motion.video
                  ref={heroVideoRef}
                  key={featured.id}
                  aria-label={media.alt}
                  autoPlay={!reduced}
                  muted={!soundEnabled}
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
          <footer><span>{featured?.title ?? "Cirque arts in progress"}</span><span>{featured?.year ?? "new practice"}</span></footer>
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

        <PaperWindow key={`note-${resetKey}`} className="art-note-window" label="read-me.md" dragEnabled={desktopDrag} constraints={stageRef} zIndex={layerOrder.note} onRaise={() => raise("note")}>
          <div className="art-hero-note-copy">
            <h3>One thing leads to another.</h3>
            <p>
              Knowledge networks compound across domains. One practice changes what I notice in another, creating a continuous loop of attention, experimentation, and craft.
            </p>
            <ol className="art-practice-flow" aria-label="How my creative practices overlap">
              {creativePracticeFlow.map((step) => (
                <li key={step.label}>
                  <span className="is-practice">{step.label}</span>
                  {"bridge" in step && (
                    <span className="art-practice-bridge">
                      <ArrowDown aria-hidden="true" />
                      <span>
                        {step.bridge.label}
                        {"citation" in step.bridge && <CitationLink number={step.bridge.citation} href={step.bridge.href} citation={step.bridge.source} />}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ol>
            {desktopDrag && <button type="button" onClick={() => { setResetKey((key) => key + 1); setLayerOrder({ media: 4, practices: 3, note: 2 }); }}><RotateCcw aria-hidden="true" /> Reset windows</button>}
          </div>
        </PaperWindow>
      </div>

      <button type="button" onClick={() => scrollToId("story-food")} className="art-scroll-cue">
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
  const isPair = projects.length === 2;
  const x = useTransform(
    progress,
    isPair ? [0.08, 0.35, 0.88] : [0.08, 0.88],
    projects.length === 1
      ? ["-50%", "-50%"]
      : isPair
        ? reduced ? ["-50%", "-50%", "-50%"] : ["-30%", "-50%", "-70%"]
        : reduced ? ["0%", "0%"] : ["7%", projects.length > 3 ? "-58%" : "-36%"],
  );
  const reveal = useTransform(progress, [0, 0.18, 0.82, 1], reduced ? [1, 1, 1, 1] : [0, 1, 1, 0]);

  return (
    <motion.div className={cn("art-chapter-track", projects.length === 1 && "is-single", isPair && "is-pair")} style={{ x, y: "-50%", opacity: reveal }}>
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
          {practice === "movement" && (
            <p>
              Movement keeps sequence, timing, and space embodied in the practice. Research on motor imagery gives me a language for how imagined and executed movement inform each other.
              <CitationLink number={4} href="https://www.pnas.org/doi/10.1073/pnas.2423642122" citation="Gippert, M., Shih, P. C., Heed, T., Howard, I. S., Jamshidi Idaji, M., Villringer, A., Sehm, B., & Nikulin, V. V. (2025). Motor imagery enhances performance beyond the imagined action. Proceedings of the National Academy of Sciences, 122(20), e2423642122." />
            </p>
          )}
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

      const archiveWindow = layout.closest<HTMLElement>(".art-archive-sticky");
      const navigation = document.querySelector<HTMLElement>(".art-motion-nav");
      if (!archiveWindow || window.innerWidth <= 900) return;
      const stickyTop = (navigation?.getBoundingClientRect().bottom ?? 0) + 12;
      if (archiveWindow.getBoundingClientRect().top > stickyTop + 2) {
        wheelDeltaRef.current = 0;
        return;
      }

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
                <span className="art-archive-mobile-media">
                  <img
                    src={itemMedia.kind === "image" ? itemMedia.src : itemMedia.poster}
                    alt=""
                    width={itemMedia.width}
                    height={itemMedia.height}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
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
  soundEnabled: boolean;
}

const inquiryTypes = [
  ["Custom ceramics", "blue", Palette],
  ["Private dining & catering", "ochre", CookingPot],
  ["Modeling & creative shoots", "violet", Camera],
  ["Custom clothing & styling", "green", Scissors],
  ["Flow art booking", "blue", Flame],
  ["Speaking & workshops", "ochre", Mic2],
  ["Creative collaboration", "violet", Sparkles],
] as const;

const projectStages = ["Exploring an idea", "Brief ready", "Date confirmed", "Venue confirmed"];
type InquiryPreview = { message: string; organization: string; timeframe: string; location: string; budget: string; stages: string[] };

function ContactForm({ idPrefix = "footer", title }: { idPrefix?: string; title?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [receipt, setReceipt] = useState({ name: "", email: "" });
  const [step, setStep] = useState(0);
  const [inquiryTypesSelected, setInquiryTypesSelected] = useState<string[]>([]);
  const [selectionError, setSelectionError] = useState(false);
  const [briefPreview, setBriefPreview] = useState<InquiryPreview>({ message: "", organization: "", timeframe: "", location: "", budget: "", stages: [] });
  const formRef = useRef<HTMLFormElement>(null);
  const id = (field: string) => `${idPrefix}-art-contact-${field}`;

  const moveForward = () => {
    if (step === 0 && inquiryTypesSelected.length === 0) {
      setSelectionError(true);
      return;
    }
    const panel = formRef.current?.querySelector<HTMLElement>(`[data-contact-step="${step}"]`);
    const controls = Array.from(panel?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea") ?? []);
    const invalid = controls.find((control) => !control.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    if (step === 1 && formRef.current) {
      const data = new FormData(formRef.current);
      setBriefPreview({
        message: String(data.get("message") ?? ""),
        organization: String(data.get("organization") ?? ""),
        timeframe: String(data.get("timeframe") ?? ""),
        location: String(data.get("location") ?? ""),
        budget: String(data.get("budget") ?? ""),
        stages: data.getAll("project_stage[]").map(String),
      });
    }
    setStep((current) => Math.min(2, current + 1));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/alexa.thoennes@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Form submission failed");
      setReceipt({ name: String(data.get("name") ?? ""), email: String(data.get("email") ?? "") });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form ref={formRef} className="art-contact-form notched" onSubmit={submit}>
      <input type="hidden" name="_subject" value="New Haruhay Studio inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input className="art-contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {title && <h2 className="art-contact-form-title">{title}</h2>}
      {status === "sent" && <div className="art-contact-sent-note" role="status"><strong>Thanks{receipt.name ? `, ${receipt.name}` : ""}.</strong> Your inquiry was sent. I’ll reply to {receipt.email}.</div>}
        <ol className="art-contact-progress" aria-label="Inquiry progress">
          {["Choose", "Shape", "Connect"].map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined}><span>0{index + 1}</span>{label}</li>)}
        </ol>

        <section className="art-contact-step" data-contact-step="0" hidden={step !== 0}>
          <div className="art-contact-prompt"><p className="font-pixel">Let’s start here.</p><h3>What are you planning?</h3></div>
          <fieldset className="art-inquiry-cards">
            <legend className="sr-only">Inquiry type</legend>
            {inquiryTypes.map(([type, tone, Icon], index) => (
              <label key={type}>
                <input
                  type="checkbox"
                  name="inquiry_type[]"
                  value={type}
                  disabled={status === "sent"}
                  checked={inquiryTypesSelected.includes(type)}
                  onChange={() => {
                    setInquiryTypesSelected((current) => current.includes(type) ? current.filter((item) => item !== type) : [...current, type]);
                    setSelectionError(false);
                  }}
                />
                <span className={cn("evidence-link-badge", tone)}><small>0{index + 1}</small><Icon aria-hidden="true" /><strong>{type}</strong></span>
              </label>
            ))}
          </fieldset>
          {selectionError && <p className="art-contact-choice-error" role="alert">Select at least one.</p>}
        </section>

        <section className="art-contact-step" data-contact-step="1" hidden={step !== 1}>
          <div className="art-contact-prompt"><p className="font-pixel">A rough brief works.</p><h3>What should I know?</h3></div>
          <div className="art-contact-field art-contact-message">
            <label htmlFor={id("message")}>Project details</label>
            <textarea id={id("message")} name="message" rows={5} placeholder="Scale, quantity, guests, or deliverables" required disabled={status === "sent"} />
          </div>
          <div className="art-contact-fields-grid">
            <div className="art-contact-field">
              <label htmlFor={id("organization")}>Organization or project</label>
              <input id={id("organization")} name="organization" type="text" autoComplete="organization" placeholder="Studio, company, or personal" disabled={status === "sent"} />
            </div>
            <div className="art-contact-field">
              <label htmlFor={id("timeframe")}>Date or timeframe</label>
              <input id={id("timeframe")} name="timeframe" type="text" placeholder="Date or flexible window" disabled={status === "sent"} />
            </div>
            <div className="art-contact-field">
              <label htmlFor={id("location")}>Location or venue</label>
              <input id={id("location")} name="location" type="text" autoComplete="street-address" placeholder="City, venue, or remote" disabled={status === "sent"} />
            </div>
            <div className="art-contact-field">
              <label htmlFor={id("budget")}>Budget range <span>(optional)</span></label>
              <input id={id("budget")} name="budget" type="text" inputMode="decimal" placeholder="Approximate range" disabled={status === "sent"} />
            </div>
          </div>
          <fieldset className="art-contact-stage-tags">
            <legend>Project stage <span>(select any)</span></legend>
            <div>{projectStages.map((stage) => <label key={stage}><input type="checkbox" name="project_stage[]" value={stage} disabled={status === "sent"} /><span className="evidence-link-badge blue">{stage}</span></label>)}</div>
          </fieldset>
        </section>

        <section className="art-contact-step" data-contact-step="2" hidden={step !== 2}>
          <div className="art-contact-prompt"><p className="font-pixel">Last thing.</p><h3>Where should I reply?</h3></div>
          <div className="art-contact-fields-grid">
            <div className="art-contact-field">
              <label htmlFor={id("name")}>Name</label>
              <input id={id("name")} name="name" type="text" autoComplete="name" placeholder="Your name" required disabled={status === "sent"} />
            </div>
            <div className="art-contact-field">
              <label htmlFor={id("email")}>Email</label>
              <input id={id("email")} name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={status === "sent"} />
            </div>
          </div>
          <div className="art-contact-summary">
            <p><strong>{inquiryTypesSelected.join(", ")}</strong></p>
            <blockquote>{briefPreview.message}</blockquote>
            <dl>
              {briefPreview.organization && <div><dt>Organization or project</dt><dd>{briefPreview.organization}</dd></div>}
              {briefPreview.timeframe && <div><dt>Date or timeframe</dt><dd>{briefPreview.timeframe}</dd></div>}
              {briefPreview.location && <div><dt>Location or venue</dt><dd>{briefPreview.location}</dd></div>}
              {briefPreview.budget && <div><dt>Budget range</dt><dd>{briefPreview.budget}</dd></div>}
              {briefPreview.stages.length > 0 && <div><dt>Project stage</dt><dd>{briefPreview.stages.join(", ")}</dd></div>}
            </dl>
          </div>
        </section>

        <div className="art-contact-actions">
          {step > 0 && <button className="art-contact-back" type="button" disabled={status === "sent"} onClick={() => setStep((current) => current - 1)}><ArrowLeft aria-hidden="true" /> Back</button>}
          {step < 2 ? (
            <button type="button" onClick={moveForward}>Continue <ArrowRight aria-hidden="true" /></button>
          ) : (
            <button type="submit" disabled={status === "sending" || status === "sent"}><Mail aria-hidden="true" /> {status === "sending" ? "Sending…" : status === "sent" ? "Inquiry sent" : "Send inquiry"}</button>
          )}
          <DossierLink className="art-contact-follow" href="https://www.instagram.com/haruhay.studio/" target="_blank" rel="noopener noreferrer"><Instagram /> Follow Haruhay Studio</DossierLink>
        </div>
        <p className="art-contact-status" role="status" aria-live="polite">{status === "error" && "Could not send. Please try again."}</p>
    </form>
  );
}

function ContactDock() {
  const [open, setOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("art-inquiry");
    if (!footer || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button className={cn("art-contact-nav-trigger", footerVisible && "is-hidden")} type="button" onClick={() => setOpen(true)} aria-hidden={footerVisible} tabIndex={footerVisible ? -1 : 0}><Mail aria-hidden="true" /><span className="art-nav-label">Start an inquiry</span></button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="art-contact-drawer">
          <DialogTitle className="sr-only">Start an inquiry</DialogTitle>
          <DialogDescription className="sr-only">Tell me about a commission, booking, speaking engagement, or collaboration.</DialogDescription>
          <ContactForm idPrefix="drawer" title="Start an inquiry" />
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProjectViewer({ project, projects, onSelect, soundEnabled }: ProjectViewerProps) {
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
                  soundEnabled={soundEnabled}
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
  const [soundEnabled, setSoundEnabled] = useState(() => typeof window !== "undefined" && window.sessionStorage.getItem("haruhay-media-sound") === "on");
  const reduced = Boolean(useReducedMotion());
  const filteredProjects = useMemo(
    () => artProjects
      .filter((project) => project.practice === filter)
      .sort((a, b) => (a.galleryOrder ?? 99) - (b.galleryOrder ?? 99)),
    [filter],
  );

  const updateSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
    window.sessionStorage.setItem("haruhay-media-sound", enabled ? "on" : "off");
  };

  useEffect(() => {
    const previousTitle = document.title;
    const entryScrollY = window.scrollY;
    document.body.classList.add("art-page-active");
    window.scrollTo(0, 0);
    document.title = "Creative work | Alexa Thoennes";
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
            <button type="button" aria-label="Guestbook" onClick={() => scrollToId("art-guestbook")}><BookHeart aria-hidden="true" /><span className="art-nav-label">Guestbook</span></button>
            <ContactDock />
            <LightsOffToggle />
          </div>
        </nav>

        <main>
          <OpeningScene reduced={reduced} soundEnabled={soundEnabled && !selectedProject} onSoundChange={updateSound} />
          {storyPractices.map((practice, index) => <StoryChapter key={practice} practice={practice} index={index} reduced={reduced} />)}

          <section id="work-index" className="art-work-index" aria-labelledby="work-index-title" tabIndex={-1}>
            <header className="art-index-header">
              <div>
                <p className="font-pixel">the work / growing</p>
                <h2 id="work-index-title">Browse the work</h2>
                <p>Archive keeps experiments visible beside finished work.</p>
              </div>
            </header>

            <div className="art-archive-scroll-region">
              <div className="art-archive-sticky">
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
                <ArchiveBrowser key={filter} projects={filteredProjects} onSelect={setSelectedProject} reduced={reduced} />
              </div>
            </div>
          </section>

          <section id="art-inquiry" className="art-motion-footer" tabIndex={-1}>
            <div>
              <h2>Interested in working together?</h2>
            </div>
            <ContactForm />
          </section>
          <PortfolioFooter page="art" guestbookId="art-guestbook" />
        </main>

        <ProjectViewer project={selectedProject} projects={filteredProjects} onSelect={setSelectedProject} soundEnabled={soundEnabled} />
      </div>
    </LayoutGroup>
  );
}
