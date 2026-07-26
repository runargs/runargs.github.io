import { useId, useState, type FormEvent } from "react";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { guestbookSnapshot } from "@/data/guestbook";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const visitorIntents = ["Work", "Creative practice", "Collaboration", "Curiosity"] as const;
const outcomes = ["Yes", "Partly", "Not yet"] as const;

interface GuestbookProps {
  page: string;
  id: string;
  className?: string;
}

export function Guestbook({ page, id, className }: GuestbookProps) {
  const fieldId = useId();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const kudosStorageKey = `portfolio-guestbook-kudos:${page}`;
  const [localKudosBaseline, setLocalKudosBaseline] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(kudosStorageKey);
    return stored === null ? null : Number(stored);
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle" && status !== "error") return;

    const data = new FormData(event.currentTarget);
    data.set("submitted_at", new Date().toISOString());
    data.set("page_path", window.location.hash || "/");
    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/alexa.thoennes@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Guestbook submission failed");
      window.localStorage.setItem(kudosStorageKey, String(guestbookSnapshot.totalKudos));
      setLocalKudosBaseline(guestbookSnapshot.totalKudos);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const hasPublishedSnapshot = guestbookSnapshot.totalKudos > 0;
  const pendingLocalKudos = localKudosBaseline !== null && guestbookSnapshot.totalKudos <= localKudosBaseline ? 1 : 0;
  const visibleKudos = guestbookSnapshot.totalKudos + pendingLocalKudos;

  return (
    <section id={id} className={cn("guestbook-section notched", className)} aria-labelledby={`${fieldId}-title`}>
      <div className="guestbook-heading">
        <h2 id={`${fieldId}-title`}>Guestbook</h2>
      </div>

      <form className="guestbook-form" onSubmit={submit} aria-label={`Sign the ${page} page guestbook`}>
        <input type="hidden" name="_subject" value={`New ${page} page guestbook entry`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="signal" value="kudos" />
        <input type="hidden" name="page" value={page} />
        <input type="hidden" name="schema_version" value="guestbook-v1" />
        <input type="hidden" name="site_release" value={import.meta.env.VITE_SITE_RELEASE ?? "local"} />
        <input className="art-contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        {status === "sent" ? (
          <div className="guestbook-receipt" role="status">
            <Sparkles aria-hidden="true" />
            <div><strong>Kudos received.</strong></div>
          </div>
        ) : (
          <>
            <div className="guestbook-quick-actions">
              <button type="submit" disabled={status === "sending"}>
                <Sparkles aria-hidden="true" /> {status === "sending" ? "Leaving kudos…" : "Leave kudos"}
              </button>
              <button className="guestbook-expand" type="button" aria-expanded={expanded} aria-controls={`${fieldId}-details`} onClick={() => setExpanded((current) => !current)}>
                <MessageSquare aria-hidden="true" /> {expanded ? "Keep it simple" : "Add a note"}
              </button>
            </div>

            <div id={`${fieldId}-details`} className="guestbook-details" hidden={!expanded}>
              <fieldset>
                <legend>What brought you here? <span>Optional</span></legend>
                <div className="guestbook-tags">
                  {visitorIntents.map((intent) => (
                    <label key={intent}>
                      <input type="radio" name="visitor_intent" value={intent} />
                      <span className="evidence-link-badge blue">{intent}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend>Did you find what you came for? <span>Optional</span></legend>
                <div className="guestbook-tags">
                  {outcomes.map((outcome) => (
                    <label key={outcome}>
                      <input type="radio" name="goal_success" value={outcome} />
                      <span className="evidence-link-badge green">{outcome}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="guestbook-note" htmlFor={`${fieldId}-note`}>
                <span>Leave a note <small>Optional</small></span>
                <textarea id={`${fieldId}-note`} name="note" rows={3} maxLength={500} placeholder="A thought, reaction, or hello" />
              </label>

              <button className="guestbook-sign" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Signing…" : "Sign the guestbook"} <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="guestbook-kudos-count" type="button" aria-live="polite">
              {visibleKudos} kudos
            </button>
          </TooltipTrigger>
          <TooltipContent className="citation-tooltip">
            Updated as of: {guestbookSnapshot.updatedAt}
          </TooltipContent>
        </Tooltip>

        <p className="guestbook-status" role="status" aria-live="polite">
          {status === "error" && "That did not go through. Please try once more."}
        </p>
      </form>

      {hasPublishedSnapshot && (
        <aside className="guestbook-published" aria-label="Published guestbook snapshot">
          <div className="guestbook-snapshot">
            <strong>{guestbookSnapshot.totalKudos} kudos</strong>
            {guestbookSnapshot.responses >= 20 && guestbookSnapshot.foundWhatTheyNeeded !== null && <span>{guestbookSnapshot.foundWhatTheyNeeded}% found what they came for</span>}
            {guestbookSnapshot.updatedAt && <small>Updated {guestbookSnapshot.updatedAt}</small>}
          </div>
          {guestbookSnapshot.notes.length > 0 && (
            <div className="guestbook-notes">
              {guestbookSnapshot.notes.map((note) => <blockquote key={`${note.quote}-${note.signature ?? "guest"}`}><p>“{note.quote}”</p>{note.signature && <cite>{note.signature}</cite>}</blockquote>)}
            </div>
          )}
        </aside>
      )}
    </section>
  );
}
