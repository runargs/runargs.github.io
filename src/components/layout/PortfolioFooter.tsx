import { Guestbook } from "@/components/feedback/Guestbook";
import { cn } from "@/lib/utils";

interface PortfolioFooterProps {
  page: string;
  guestbookId: string;
  className?: string;
}

export function PortfolioFooter({ page, guestbookId, className }: PortfolioFooterProps) {
  return (
    <footer className={cn("site-footer", className)}>
      <div className="portfolio-footer">
        <div className="portfolio-footer-identity" tabIndex={0} aria-describedby="portfolio-identity-note">
          <div className="portfolio-footer-mark">
            <img
              src="/images/footer-miso-full.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="portfolio-footer-image"
            />
          </div>
          <div className="portfolio-footer-copy">
            <p className="portfolio-footer-name">Alexa Thoennes</p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">You made it to the end. Stay curious.</p>
          </div>
          <span id="portfolio-identity-note" className="portfolio-identity-tooltip" role="tooltip">
            Systems, rituals, and technology should help life flourish, preserve culture and craft, and treat intelligence, care, and beauty as rare responsibilities in a vast universe.
          </span>
        </div>
        <Guestbook id={guestbookId} page={page} className={page === "art" ? "art-guestbook" : undefined} />
        <div className="portfolio-footer-meta">
          <p>
            Built with a crew of AI agents.{" "}
            <a
              href="https://github.com/runargs/runargs.github.io/tree/main"
              className="text-[var(--civic-blue)] underline decoration-[var(--rule-strong)] underline-offset-[0.18em] transition-colors hover:decoration-[var(--civic-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--civic-blue)]"
            >
              View the README.
            </a>
          </p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  );
}
