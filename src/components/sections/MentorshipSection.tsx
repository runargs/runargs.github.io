import { ArrowRight, Mail, MessageCircle, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const collaborationPaths = [
  { id: "1", title: "Product conversations", focus: "AI, evaluation, synthesis, adoption", icon: Sparkles },
  { id: "2", title: "Human-impact work", focus: "Health, food, climate, finance, public-interest tech", icon: Users },
  { id: "3", title: "Food and culture", focus: "Private dining, hosting, events, sensory systems", icon: MessageCircle },
];

export function MentorshipSection() {
  const email = "alexa.thoennes@gmail.com";
  const mailtoLink = `mailto:${email}?subject=Website%20Inquiry`;

  return (
    <section id="mentorship" className="py-16 px-6 bg-background/30">
      <div className="max-w-4xl mx-auto border border-gold/20 rounded-2xl p-8 md:p-12 bg-card/50 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-3">Contact paths</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Reach out</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Useful reasons to get in touch: AI product work, healthspan or human-impact products, writing, collaboration, culinary events, or a specific question.
            </p>

            <Button asChild size="lg" className="rounded-full group">
              <a href={mailtoLink}>
                <Mail className="mr-2 h-4 w-4" />
                Send email
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className="w-full md:w-auto shrink-0 space-y-3">
            {collaborationPaths.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-background/50 border border-border/50 w-full md:w-72">
                <item.icon className="h-5 w-5 text-primary shrink-0" />
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground leading-none mb-1">{item.title}</p>
                  <p className="text-[10px] uppercase tracking-tighter text-primary/70 font-bold leading-snug">{item.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
