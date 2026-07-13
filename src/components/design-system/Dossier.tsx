import { useEffect, useRef, useState } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/*
 * Dossier contains the portfolio's editorial primitives. These components
 * encode the archival civic-publication system; keep visual hierarchy changes
 * here deliberate so badges, metadata, cards, and links do not drift apart.
 */
export interface SectionHeaderProps {
  marker: string;
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: string;
  className?: string;
}

export function SectionHeader({ marker, title, description, eyebrow, className }: SectionHeaderProps) {
  return (
    <header className={cn("grid gap-5 md:grid-cols-[116px_minmax(0,1fr)] md:gap-8", className)}>
      <div className="font-display text-[3rem] leading-none text-[var(--civic-blue)] md:text-[3.75rem]" aria-hidden="true">
        {marker}
      </div>
      <div className="max-w-3xl">
        {eyebrow && <p className="small-label mb-3">{eyebrow}</p>}
        <h2 className="text-[1.75rem] leading-tight text-[var(--ink)] md:text-[2.45rem]">{title}</h2>
        {description && <p className="mt-3 max-w-[var(--measure)] text-sm leading-7 text-[var(--ink-muted)]">{description}</p>}
      </div>
    </header>
  );
}

export function SectionBand({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("section-band", className)} {...props}>
      {children}
    </section>
  );
}

export function EditorialCard({
  children,
  important = false,
  notched = true,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { important?: boolean; notched?: boolean }) {
  return (
    <article
      className={cn(
        "relative border border-[var(--rule)] bg-[var(--paper-card)] p-5 text-[var(--ink)]",
        "transition-[border-color,box-shadow,transform] duration-200 hover:-rotate-[0.18deg] hover:-translate-y-1 hover:border-[var(--rule-strong)] hover:shadow-[5px_6px_0_rgba(45,40,31,0.10)]",
        important && "shadow-[inset_0_0_0_4px_rgba(53,111,128,0.045)]",
        notched && "notched",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}

export function StampBadge({
  children,
  tone = "blue",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "blue" | "red" | "green" | "ochre" | "violet" | "muted" }) {
  /*
   * Strong stamp styling is reserved for status or rare emphasis. Plain dates,
   * locations, organizations, descriptive skills, and actions should use quieter
   * metadata/link treatments instead of this component.
   */
  const toneClass = {
    blue: "text-[var(--civic-blue)] bg-[var(--civic-blue-soft)]",
    red: "text-[var(--revision-red)] bg-[var(--revision-red-soft)]",
    green: "text-[var(--trust-green)] bg-[var(--trust-green-soft)]",
    ochre: "text-[var(--field-ochre)] bg-[var(--field-ochre-soft)]",
    violet: "text-[var(--ai-violet)] bg-[var(--ai-violet-soft)]",
    muted: "text-[var(--ink-muted)] bg-transparent",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex min-h-[25px] items-center border border-current px-3 py-1 text-[0.68rem] font-extrabold uppercase leading-none tracking-[0.075em]",
        "bg-[repeating-linear-gradient(-45deg,transparent,transparent_5px,rgba(45,40,31,0.055)_5px,rgba(45,40,31,0.055)_6px)]",
        "shadow-[1px_1px_0_rgba(45,40,31,0.08)]",
        toneClass,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function EvidenceMeta({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(213,198,177,0.85)] pt-3 text-xs text-[var(--ink-faint)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function LedgerList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul className={cn("border-y border-[var(--rule)]", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 border-b border-[rgba(213,198,177,0.72)] py-3 last:border-b-0"
        >
          <span className="font-display text-2xl text-[var(--civic-blue)]">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-sm leading-6 text-[var(--ink-muted)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DossierButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "min-h-[38px] border border-[var(--rule)] bg-[var(--paper-card)] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--ink)]",
        "shadow-[2px_2px_0_rgba(45,40,31,0.10)] transition duration-150 hover:-rotate-[0.6deg] hover:-translate-y-0.5 hover:border-[var(--ink-faint)] hover:shadow-[3px_4px_0_rgba(45,40,31,0.13)] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_rgba(45,40,31,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DossierLink({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "inline-flex min-h-[38px] items-center justify-center border border-[var(--rule)] bg-[var(--paper-card)] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.07em] text-[var(--ink)]",
        "shadow-[2px_2px_0_rgba(45,40,31,0.10)] transition duration-150 hover:-rotate-[0.6deg] hover:-translate-y-0.5 hover:border-[var(--ink-faint)] hover:shadow-[3px_4px_0_rgba(45,40,31,0.13)] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_rgba(45,40,31,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function ImageFrame({
  src,
  alt,
  caption,
  className,
  mediaClassName,
  imgClassName,
  grayscale = true,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
  mediaClassName?: string;
  imgClassName?: string;
  grayscale?: boolean;
}) {
  return (
    <figure className={cn("notched border border-[var(--rule)] bg-[var(--paper-card)] p-3", className)}>
      <div className={cn("overflow-hidden bg-[var(--paper-soft)]", mediaClassName)}>
        <img
          src={src}
          alt={alt}
          className={cn(
            "block h-full w-full object-cover",
            grayscale && "grayscale contrast-[1.08] sepia-[0.10]",
            imgClassName,
          )}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 border-t border-[rgba(213,198,177,0.75)] pt-2 text-xs font-extrabold uppercase leading-snug tracking-[0.07em] text-[var(--ink-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function LightsOffToggle() {
  const [isDark, setIsDark] = useState(false);
  const [supportsHover, setSupportsHover] = useState(() => (
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false
  ));
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const themeParam = new URLSearchParams(window.location.search).get("theme");
    const stored = window.localStorage.getItem("site-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const requestedTheme = themeParam === "dark" || themeParam === "light" ? themeParam : null;
    const nextIsDark = requestedTheme ? requestedTheme === "dark" : stored ? stored === "dark" : prefersDark;

    setIsDark(nextIsDark);
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    if (requestedTheme) {
      window.localStorage.setItem("site-theme", requestedTheme);
    }
  }, []);

  useEffect(() => {
    const hoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverSupport = () => setSupportsHover(hoverPointer.matches);

    updateHoverSupport();
    hoverPointer.addEventListener("change", updateHoverSupport);

    return () => hoverPointer.removeEventListener("change", updateHoverSupport);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!isDark || !supportsHover || reducedMotion.matches) {
      document.documentElement.classList.remove("has-pointer-light");
      document.documentElement.style.removeProperty("--pointer-x");
      document.documentElement.style.removeProperty("--pointer-y");
      return;
    }

    // The candlelight field follows hover-capable precise pointers only; touch
    // screens and reduced-motion preferences keep the static dark theme.
    let animationFrame = 0;
    const updatePointer = (event: PointerEvent) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
        document.documentElement.classList.add("has-pointer-light");
      });
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.classList.remove("has-pointer-light");
    };
  }, [isDark, supportsHover]);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    window.localStorage.setItem("site-theme", nextIsDark ? "dark" : "light");

    const audio = clickAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => {
        // Browsers may block audio in edge cases; the visual toggle still works.
      });
    }
  };

  const toggleLabel = isDark ? "Lights on" : "Lights off";
  const lampImage = isDark ? "/images/lamp-theme-on.png" : "/images/lamp-theme-off.png";
  const toggleButton = (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label="Toggle lights-off mode"
    >
      <img
        src={lampImage}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="theme-toggle-lamp"
      />
      <audio ref={clickAudioRef} src="/audio/lamp-click.m4a" preload="auto" />
    </button>
  );

  if (!supportsHover) {
    return toggleButton;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
      <TooltipContent side="left" align="center" className="theme-toggle-tooltip">
        {toggleLabel}
      </TooltipContent>
    </Tooltip>
  );
}
