import { Heart, Users, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const initiatives = [
  { id: "1", title: "1:1 Mentorship", focus: "Open for new mentees", icon: Heart },
  { id: "2", title: "Guest Speaking", focus: "Available for bookings", icon: Users },
  { id: "3", title: "Digital Correspondence", focus: "Always open", icon: MessageCircle },
];

export function MentorshipSection() {
  const email = "alexa.thoennes@gmail.com";
  const mailtoLink = `mailto:${email}?subject=Mentorship%20Inquiry`;

  return (
    <section id="mentorship" className="py-16 px-6 bg-sidebar/30">
      <div className="max-w-3xl mx-auto border border-gold/20 rounded-2xl p-8 md:p-12 bg-card/50 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left: Content & CTA */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Mentorship</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I’m passionate about sharing knowledge and supporting through mentorship. 
              Whether it’s a CV review or a school talk, I'm open to new connections.
            </p>
            
            <Button asChild size="lg" className="rounded-full group">
              <a href={mailtoLink}>
                <Mail className="mr-2 h-4 w-4" />
                Get in touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Right: Compressed Focus List */}
          <div className="w-full md:w-auto shrink-0 space-y-3">
            {initiatives.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 px-4 py-3 rounded-xl bg-background/50 border border-border/50 w-full md:w-64"
              >
                <item.icon className="h-5 w-5 text-primary shrink-0" />
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground leading-none mb-1">{item.title}</p>
                  <p className="text-[10px] uppercase tracking-tighter text-primary/70 font-bold">{item.focus}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
