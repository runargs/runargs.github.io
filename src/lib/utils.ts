import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const smoothstep = (progress: number) => progress * progress * (3 - 2 * progress);
const filmRollEase = (progress: number) => {
  const immediatePull = progress;
  const softMomentum = smoothstep(progress);

  return immediatePull * 0.36 + softMomentum * 0.64;
};

let activeScrollFrame = 0;
let activeScrollCleanup: number | undefined;

export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startY = window.scrollY;
  const navOffset = window.matchMedia("(max-width: 900px)").matches ? 12 : 54;
  const targetY = Math.max(target.getBoundingClientRect().top + startY - navOffset, 0);
  const distance = targetY - startY;

  if (reducedMotion || Math.abs(distance) < 16) {
    window.scrollTo({ top: targetY });
    return;
  }

  const duration = Math.min(Math.max(Math.abs(distance) * 0.3, 340), 720);
  const startedAt = window.performance.now() - 28;

  window.cancelAnimationFrame(activeScrollFrame);
  if (activeScrollCleanup) window.clearTimeout(activeScrollCleanup);

  document.documentElement.classList.add("film-roll-scrolling");

  const finish = () => {
    document.documentElement.classList.remove("film-roll-scrolling");
    window.cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = 0;
    activeScrollCleanup = undefined;
  };

  const step = (now: number) => {
    const elapsed = now - startedAt;
    const progress = Math.min(elapsed / duration, 1);
    const eased = filmRollEase(progress);

    window.scrollTo({ top: startY + distance * eased });

    if (progress < 1) {
      activeScrollFrame = window.requestAnimationFrame(step);
      return;
    }

    window.scrollTo({ top: targetY });
    finish();
  };

  activeScrollCleanup = window.setTimeout(finish, duration + 120);
  activeScrollFrame = window.requestAnimationFrame(step);
}
