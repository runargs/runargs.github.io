import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeSection() {
  return (
    <section id="resume" className="py-20 px-6 md:px-12 bg-sidebar/5">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative flourish */}
        <div className="mb-8">
          <span className="font-flourish text-4xl text-primary/30">❧</span>
        </div>

        {/* Section header */}
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Resume</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">
          A comprehensive overview of my experience, skills, and education
        </p>

        {/* Resume preview card */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8 shadow-warm">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-primary" />
            <span className="font-serif text-xl">Your Name — Resume 2024</span>
          </div>

          {/* Brief summary */}
          <div className="text-left space-y-4 text-sm text-foreground/80 mb-8">
            <div className="p-4 bg-sidebar/50 rounded">
              <h4 className="font-medium text-foreground mb-2">Experience Highlights</h4>
              <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                <li>10+ years in design and product development</li>
                <li>Led teams at Fortune 500 companies and startups</li>
                <li>Expertise in design systems, UX strategy, and leadership</li>
              </ul>
            </div>

            <div className="p-4 bg-sidebar/50 rounded">
              <h4 className="font-medium text-foreground mb-2">Education</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>M.S. Human-Computer Interaction</li>
                <li>B.A. Visual Design</li>
              </ul>
            </div>
          </div>

          {/* Download button */}
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </Button>
        </div>

        {/* Contact note */}
        <p className="text-sm text-muted-foreground">
          For inquiries, please reach out via{" "}
          <a href="mailto:hello@example.com" className="text-primary hover:underline">
            email
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary hover:underline">
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
