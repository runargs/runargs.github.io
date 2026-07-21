import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CalendarDays, GraduationCap, Mail, MessageSquare, Mic2, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const contactTypes = [
  ["Product & AI collaboration", "blue", BriefcaseBusiness],
  ["Speaking & workshops", "ochre", Mic2],
  ["Mentorship & career guidance", "violet", GraduationCap],
  ["Community or event collaboration", "green", CalendarDays],
  ["Writing, press, or interview", "ochre", Newspaper],
  ["Something else", "blue", MessageSquare],
] as const;

type Preview = { message: string; organization: string; timing: string };

export function ProfessionalContactForm() {
  const [step, setStep] = useState(0);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectionError, setSelectionError] = useState(false);
  const [preview, setPreview] = useState<Preview>({ message: "", organization: "", timing: "" });
  const [receipt, setReceipt] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const next = () => {
    if (step === 0 && topics.length === 0) {
      setSelectionError(true);
      return;
    }
    const panel = formRef.current?.querySelector<HTMLElement>(`[data-contact-step="${step}"]`);
    const controls = Array.from(panel?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea") ?? []);
    const invalid = controls.find((control) => !control.checkValidity());
    if (invalid) return invalid.reportValidity();
    if (step === 1 && formRef.current) {
      const data = new FormData(formRef.current);
      setPreview({
        message: String(data.get("message") ?? ""),
        organization: String(data.get("organization") ?? ""),
        timing: String(data.get("timing") ?? ""),
      });
    }
    setStep((current) => Math.min(2, current + 1));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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

  const locked = status === "sent";

  return (
    <form ref={formRef} className="art-contact-form professional-contact-form notched" onSubmit={submit}>
      <input type="hidden" name="_subject" value="New portfolio message" />
      <input type="hidden" name="_template" value="table" />
      <input className="art-contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {locked && <div className="art-contact-sent-note" role="status"><strong>Thanks{receipt.name ? `, ${receipt.name}` : ""}.</strong> Message sent. I’ll reply to {receipt.email}.</div>}

      <ol className="art-contact-progress" aria-label="Message progress">
        {["Topic", "Context", "Reply"].map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined}><span>0{index + 1}</span>{label}</li>)}
      </ol>

      <section className="art-contact-step" data-contact-step="0" hidden={step !== 0}>
        <div className="art-contact-prompt"><h3>What brings you here?</h3></div>
        <fieldset className="art-inquiry-cards">
          <legend className="sr-only">Message topic</legend>
          {contactTypes.map(([label, tone, Icon], index) => (
            <label key={label}>
              <input
                type="checkbox"
                name="topic[]"
                value={label}
                disabled={locked}
                checked={topics.includes(label)}
                onChange={() => {
                  setTopics((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
                  setSelectionError(false);
                }}
              />
              <span className={cn("evidence-link-badge", tone)}><small>0{index + 1}</small><Icon aria-hidden="true" /><strong>{label}</strong></span>
            </label>
          ))}
        </fieldset>
        {selectionError && <p className="art-contact-choice-error" role="alert">Select at least one.</p>}
      </section>

      <section className="art-contact-step" data-contact-step="1" hidden={step !== 1}>
        <div className="art-contact-prompt"><h3>What should I know?</h3></div>
        <div className="art-contact-field art-contact-message">
          <label htmlFor="professional-contact-message">Message</label>
          <textarea id="professional-contact-message" name="message" rows={5} placeholder="Your idea, question, or request" required disabled={locked} />
        </div>
        <div className="art-contact-fields-grid">
          <div className="art-contact-field">
            <label htmlFor="professional-contact-organization">Organization <span>(optional)</span></label>
            <input id="professional-contact-organization" name="organization" type="text" autoComplete="organization" placeholder="Company, team, or project" disabled={locked} />
          </div>
          <div className="art-contact-field">
            <label htmlFor="professional-contact-timing">Timing <span>(optional)</span></label>
            <input id="professional-contact-timing" name="timing" type="text" placeholder="Date or flexible window" disabled={locked} />
          </div>
        </div>
      </section>

      <section className="art-contact-step" data-contact-step="2" hidden={step !== 2}>
        <div className="art-contact-prompt"><h3>Where should I reply?</h3></div>
        <div className="art-contact-fields-grid">
          <div className="art-contact-field">
            <label htmlFor="professional-contact-name">Name</label>
            <input id="professional-contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" required disabled={locked} />
          </div>
          <div className="art-contact-field">
            <label htmlFor="professional-contact-email">Email</label>
            <input id="professional-contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={locked} />
          </div>
        </div>
        <div className="art-contact-summary">
          <p><strong>{topics.join(", ")}</strong></p>
          <blockquote>{preview.message}</blockquote>
          <dl>
            {preview.organization && <div><dt>Organization</dt><dd>{preview.organization}</dd></div>}
            {preview.timing && <div><dt>Timing</dt><dd>{preview.timing}</dd></div>}
          </dl>
        </div>
      </section>

      <div className="art-contact-actions">
        {step > 0 && <button className="art-contact-back" type="button" disabled={locked} onClick={() => setStep((current) => current - 1)}><ArrowLeft aria-hidden="true" /> Back</button>}
        {step < 2 ? <button type="button" onClick={next}>Continue <ArrowRight aria-hidden="true" /></button> : <button type="submit" disabled={status === "sending" || locked}><Mail aria-hidden="true" />{status === "sending" ? "Sending…" : locked ? "Message sent" : "Send message"}</button>}
      </div>
      <p className="art-contact-status" role="status" aria-live="polite">{status === "error" && "Could not send. Try again."}</p>
    </form>
  );
}
